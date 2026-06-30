create or replace function public.auth_user_display_name(
  user_metadata jsonb,
  user_email text
)
returns text
language sql
stable
set search_path = public
as $$
  select coalesce(
    nullif(btrim(user_metadata ->> 'name'), ''),
    nullif(btrim(user_metadata ->> 'full_name'), ''),
    nullif(btrim(user_metadata ->> 'nickname'), ''),
    nullif(btrim(user_email), ''),
    '이름 없음'
  )
$$;

create or replace function public.handle_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_name text;
begin
  target_name := public.auth_user_display_name(
    new.raw_user_meta_data,
    new.email
  );

  insert into public.profiles (id, name)
  values (new.id, target_name)
  on conflict (id) do nothing;

  insert into public.people (owner_id, linked_profile_id, name)
  values (new.id, new.id, target_name)
  on conflict (linked_profile_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_auth_user_created();

insert into public.profiles (id, name)
select
  users.id,
  public.auth_user_display_name(users.raw_user_meta_data, users.email)
from auth.users
where not exists (
  select 1
  from public.profiles
  where profiles.id = users.id
);

insert into public.people (owner_id, linked_profile_id, name)
select
  users.id,
  users.id,
  public.auth_user_display_name(users.raw_user_meta_data, users.email)
from auth.users
where not exists (
  select 1
  from public.people
  where people.linked_profile_id = users.id
);
