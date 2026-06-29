create extension if not exists pgcrypto;

create type public.group_member_role as enum ('owner', 'member');
create type public.group_member_status as enum ('active');
create type public.group_invite_status as enum ('active', 'revoked', 'expired');
create type public.medical_note_status as enum ('draft', 'saved');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.people (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  linked_profile_id uuid unique references public.profiles(id) on delete set null,
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.care_groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  icon_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.care_group_invites (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.care_groups(id) on delete cascade,
  inviter_id uuid not null references public.profiles(id) on delete cascade,
  token_hash text not null unique check (char_length(trim(token_hash)) > 0),
  status public.group_invite_status not null default 'active',
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.care_group_invite_acceptances (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references public.care_group_invites(id) on delete cascade,
  accepted_by uuid not null references public.profiles(id) on delete cascade,
  accepted_at timestamptz not null default now(),
  unique (invite_id, accepted_by)
);

create table public.care_group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.care_groups(id) on delete cascade,
  person_id uuid not null references public.people(id) on delete cascade,
  role public.group_member_role not null default 'member',
  status public.group_member_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, person_id)
);

create table public.care_group_member_relations (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null,
  viewer_person_id uuid not null,
  target_person_id uuid not null,
  relation_name text not null check (char_length(trim(relation_name)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, viewer_person_id, target_person_id),
  check (viewer_person_id <> target_person_id),
  foreign key (group_id, viewer_person_id)
    references public.care_group_members(group_id, person_id)
    on delete cascade,
  foreign key (group_id, target_person_id)
    references public.care_group_members(group_id, person_id)
    on delete cascade
);

create table public.medical_notes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  subject_person_id uuid not null references public.people(id) on delete restrict,
  title text,
  note_date date not null default current_date,
  body text not null default '',
  visit_place text,
  status public.medical_note_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.medical_note_group_shares (
  id uuid primary key default gen_random_uuid(),
  note_id uuid not null references public.medical_notes(id) on delete cascade,
  group_id uuid not null references public.care_groups(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (note_id, group_id)
);

create index people_owner_id_idx on public.people(owner_id);
create index people_linked_profile_id_idx on public.people(linked_profile_id);
create index care_groups_owner_id_idx on public.care_groups(owner_id);
create index care_group_invites_group_id_idx on public.care_group_invites(group_id);
create index care_group_invites_inviter_id_idx on public.care_group_invites(inviter_id);
create index care_group_invite_acceptances_accepted_by_idx
  on public.care_group_invite_acceptances(accepted_by);
create index care_group_members_group_id_idx on public.care_group_members(group_id);
create index care_group_members_person_id_idx on public.care_group_members(person_id);
create index care_group_member_relations_target_idx
  on public.care_group_member_relations(group_id, target_person_id);
create index medical_notes_author_id_idx on public.medical_notes(author_id);
create index medical_notes_subject_person_id_idx on public.medical_notes(subject_person_id);
create index medical_note_group_shares_group_id_idx on public.medical_note_group_shares(group_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger people_set_updated_at
before update on public.people
for each row execute function public.set_updated_at();

create trigger care_groups_set_updated_at
before update on public.care_groups
for each row execute function public.set_updated_at();

create trigger care_group_invites_set_updated_at
before update on public.care_group_invites
for each row execute function public.set_updated_at();

create trigger care_group_members_set_updated_at
before update on public.care_group_members
for each row execute function public.set_updated_at();

create trigger care_group_member_relations_set_updated_at
before update on public.care_group_member_relations
for each row execute function public.set_updated_at();

create trigger medical_notes_set_updated_at
before update on public.medical_notes
for each row execute function public.set_updated_at();

create or replace function public.current_user_person_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id
  from public.people p
  where p.linked_profile_id = auth.uid()
  limit 1
$$;

create or replace function public.is_group_owner(target_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.care_groups g
    where g.id = target_group_id
      and g.owner_id = auth.uid()
  )
$$;

create or replace function public.is_active_group_member(target_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.care_group_members gm
    join public.people p on p.id = gm.person_id
    where gm.group_id = target_group_id
      and gm.status = 'active'
      and p.linked_profile_id = auth.uid()
  )
$$;

create or replace function public.ensure_current_user_person()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  target_person_id uuid;
  target_name text;
begin
  if auth.uid() is null then
    raise exception 'authentication is required';
  end if;

  select p.id
  into target_person_id
  from public.people p
  where p.linked_profile_id = auth.uid()
  limit 1;

  if target_person_id is not null then
    return target_person_id;
  end if;

  select profiles.name
  into target_name
  from public.profiles
  where profiles.id = auth.uid();

  if target_name is null then
    raise exception 'profile is required before joining a group';
  end if;

  insert into public.people (owner_id, linked_profile_id, name)
  values (auth.uid(), auth.uid(), target_name)
  returning id into target_person_id;

  return target_person_id;
end;
$$;

create or replace function public.group_has_person(target_group_id uuid, target_person_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.care_group_members gm
    where gm.group_id = target_group_id
      and gm.person_id = target_person_id
      and gm.status = 'active'
  )
$$;

create or replace function public.can_access_person(target_person_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.people p
    where p.id = target_person_id
      and (
        p.owner_id = auth.uid()
        or p.linked_profile_id = auth.uid()
        or exists (
          select 1
          from public.care_group_members gm
          where gm.person_id = p.id
            and public.is_active_group_member(gm.group_id)
        )
      )
  )
$$;

create or replace function public.is_note_author(target_note_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.medical_notes n
    where n.id = target_note_id
      and n.author_id = auth.uid()
  )
$$;

create or replace function public.can_view_note(target_note_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.medical_notes n
    where n.id = target_note_id
      and (
        n.author_id = auth.uid()
        or exists (
          select 1
          from public.medical_note_group_shares s
          where s.note_id = n.id
            and public.is_active_group_member(s.group_id)
            and public.group_has_person(s.group_id, n.subject_person_id)
        )
      )
  )
$$;

create or replace function public.validate_medical_note_group_share()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_subject_person_id uuid;
begin
  select subject_person_id
  into target_subject_person_id
  from public.medical_notes
  where id = new.note_id;

  if target_subject_person_id is null then
    raise exception 'medical note % does not exist', new.note_id;
  end if;

  if not public.group_has_person(new.group_id, target_subject_person_id) then
    raise exception 'note subject must be an active member of the shared group';
  end if;

  return new;
end;
$$;

create or replace function public.accept_care_group_invite(target_token_hash text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  target_invite public.care_group_invites%rowtype;
  target_person_id uuid;
begin
  if auth.uid() is null then
    raise exception 'authentication is required';
  end if;

  select *
  into target_invite
  from public.care_group_invites
  where token_hash = target_token_hash
    and status = 'active'
    and (expires_at is null or expires_at > now())
  limit 1;

  if target_invite.id is null then
    raise exception 'invite is not active';
  end if;

  target_person_id := public.ensure_current_user_person();

  insert into public.care_group_members (group_id, person_id, role, status)
  values (target_invite.group_id, target_person_id, 'member', 'active')
  on conflict (group_id, person_id) do update
  set status = 'active',
      updated_at = now();

  insert into public.care_group_invite_acceptances (invite_id, accepted_by)
  values (target_invite.id, auth.uid())
  on conflict (invite_id, accepted_by) do nothing;

  return target_invite.group_id;
end;
$$;

create or replace function public.create_care_group(target_name text, target_icon_key text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  target_group_id uuid;
  target_person_id uuid;
begin
  if auth.uid() is null then
    raise exception 'authentication is required';
  end if;

  if target_name is null or char_length(trim(target_name)) = 0 then
    raise exception 'group name is required';
  end if;

  target_person_id := public.ensure_current_user_person();

  insert into public.care_groups (owner_id, name, icon_key)
  values (auth.uid(), target_name, target_icon_key)
  returning id into target_group_id;

  insert into public.care_group_members (group_id, person_id, role, status)
  values (target_group_id, target_person_id, 'owner', 'active');

  return target_group_id;
end;
$$;

create trigger medical_note_group_shares_validate_subject
before insert or update on public.medical_note_group_shares
for each row execute function public.validate_medical_note_group_share();

alter table public.profiles enable row level security;
alter table public.people enable row level security;
alter table public.care_groups enable row level security;
alter table public.care_group_invites enable row level security;
alter table public.care_group_invite_acceptances enable row level security;
alter table public.care_group_members enable row level security;
alter table public.care_group_member_relations enable row level security;
alter table public.medical_notes enable row level security;
alter table public.medical_note_group_shares enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (id = auth.uid());

create policy "profiles_insert_own"
on public.profiles for insert
with check (id = auth.uid());

create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "people_select_accessible"
on public.people for select
using (public.can_access_person(id));

create policy "people_insert_owned"
on public.people for insert
with check (
  owner_id = auth.uid()
  and (linked_profile_id is null or linked_profile_id = auth.uid())
);

create policy "people_update_owned_or_self"
on public.people for update
using (owner_id = auth.uid())
with check (
  owner_id = auth.uid()
  and (linked_profile_id is null or linked_profile_id = auth.uid())
);

create policy "people_delete_owned"
on public.people for delete
using (owner_id = auth.uid());

create policy "care_groups_select_member_or_owner"
on public.care_groups for select
using (owner_id = auth.uid() or public.is_active_group_member(id));

create policy "care_groups_insert_owned"
on public.care_groups for insert
with check (owner_id = auth.uid());

create policy "care_groups_update_owner"
on public.care_groups for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "care_groups_delete_owner"
on public.care_groups for delete
using (owner_id = auth.uid());

create policy "care_group_invites_select_group_owner"
on public.care_group_invites for select
using (public.is_group_owner(group_id));

create policy "care_group_invites_insert_group_owner"
on public.care_group_invites for insert
with check (
  public.is_group_owner(group_id)
  and inviter_id = auth.uid()
);

create policy "care_group_invites_update_group_owner"
on public.care_group_invites for update
using (public.is_group_owner(group_id))
with check (public.is_group_owner(group_id));

create policy "care_group_invites_delete_group_owner"
on public.care_group_invites for delete
using (public.is_group_owner(group_id));

create policy "care_group_invite_acceptances_select_group_owner_or_self"
on public.care_group_invite_acceptances for select
using (
  accepted_by = auth.uid()
  or exists (
    select 1
    from public.care_group_invites i
    where i.id = invite_id
      and public.is_group_owner(i.group_id)
  )
);

create policy "care_group_members_select_group_member_or_owner"
on public.care_group_members for select
using (public.is_group_owner(group_id) or public.is_active_group_member(group_id));

create policy "care_group_members_insert_group_owner"
on public.care_group_members for insert
with check (
  public.is_group_owner(group_id)
  and public.can_access_person(person_id)
);

create policy "care_group_members_update_group_owner"
on public.care_group_members for update
using (public.is_group_owner(group_id))
with check (
  public.is_group_owner(group_id)
  and public.can_access_person(person_id)
);

create policy "care_group_members_delete_group_owner"
on public.care_group_members for delete
using (public.is_group_owner(group_id));

create policy "care_group_member_relations_select_group_member"
on public.care_group_member_relations for select
using (public.is_active_group_member(group_id));

create policy "care_group_member_relations_insert_viewer"
on public.care_group_member_relations for insert
with check (
  public.is_active_group_member(group_id)
  and viewer_person_id = public.current_user_person_id()
);

create policy "care_group_member_relations_update_viewer"
on public.care_group_member_relations for update
using (
  public.is_active_group_member(group_id)
  and viewer_person_id = public.current_user_person_id()
)
with check (
  public.is_active_group_member(group_id)
  and viewer_person_id = public.current_user_person_id()
);

create policy "care_group_member_relations_delete_viewer"
on public.care_group_member_relations for delete
using (
  public.is_active_group_member(group_id)
  and viewer_person_id = public.current_user_person_id()
);

create policy "medical_notes_select_author_or_shared_group_member"
on public.medical_notes for select
using (public.can_view_note(id));

create policy "medical_notes_insert_author"
on public.medical_notes for insert
with check (
  author_id = auth.uid()
  and public.can_access_person(subject_person_id)
);

create policy "medical_notes_update_author"
on public.medical_notes for update
using (author_id = auth.uid())
with check (
  author_id = auth.uid()
  and public.can_access_person(subject_person_id)
);

create policy "medical_notes_delete_author"
on public.medical_notes for delete
using (author_id = auth.uid());

create policy "medical_note_group_shares_select_author_or_group_member"
on public.medical_note_group_shares for select
using (public.is_note_author(note_id) or public.is_active_group_member(group_id));

create policy "medical_note_group_shares_insert_author_and_group_member"
on public.medical_note_group_shares for insert
with check (
  public.is_note_author(note_id)
  and public.is_active_group_member(group_id)
  and exists (
    select 1
    from public.medical_notes n
    where n.id = note_id
      and public.group_has_person(group_id, n.subject_person_id)
  )
);

create policy "medical_note_group_shares_delete_author_or_group_owner"
on public.medical_note_group_shares for delete
using (public.is_note_author(note_id) or public.is_group_owner(group_id));
