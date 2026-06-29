# Supabase

This directory stores Supabase database migrations, SQL checks, Edge Functions,
and generated client types for Our's Medical Note.

## Package API

Reusable Supabase domain calls live in `api/` and are exported from the
`@ours-medical-note/supabase` workspace package. Apps should create their own
Supabase client for their runtime, then pass it into these functions.

```ts
import { createCareGroup } from "@ours-medical-note/supabase";

await createCareGroup(supabase, {
  name: "우리 가족",
  iconKey: "family",
});
```

## Initial schema direction

- `profiles` represents authenticated app users.
- `people` represents real people who can be medical-note subjects.
- `care_group_invites` represents active invite links or QR codes.
- `care_group_members` contains only users who joined the group after login.
- `care_group_member_relations` stores per-group relationship labels such as
  `엄마`, `아빠`, `동생`, or `보호자`.
- `medical_notes` separates the note author from the note subject.
- `medical_note_group_shares` is the only sharing boundary for medical notes.

Before an invited user signs up or logs in, the invite stays outside the member
list. After the user accepts the invite, `accept_care_group_invite()` creates or
finds that user's `people` row, inserts an active `care_group_members` row, and
records the acceptance.

The first schema intentionally avoids `note_attachments`. OCR fields can be
added directly to `medical_notes` later if the first product slice needs a
single OCR result per note.

## Applying this schema

For a new Supabase project:

1. Create or link a Supabase project.
2. Configure Kakao as an auth provider in Supabase.
3. Apply the SQL in `supabase/migrations/` with Supabase CLI.
4. Generate TypeScript database types after the remote schema is applied.

## Local Kakao auth

Local Supabase reads Kakao OAuth settings from `supabase/.env`.
Copy `supabase/.env.example` to `supabase/.env`, then fill in the values from
Kakao Developers:

```bash
SUPABASE_AUTH_EXTERNAL_KAKAO_CLIENT_ID=<kakao-rest-api-key>
SUPABASE_AUTH_EXTERNAL_KAKAO_SECRET=<kakao-client-secret>
```

Register the local Supabase Auth callback URL in Kakao Developers:

```text
http://127.0.0.1:54321/auth/v1/callback
```

Kakao requires an exact redirect URI match. Keep the app origin as
`http://localhost:3000` locally, and do not mix it with
`http://127.0.0.1:3000` in the browser or environment variables.

Enable these Kakao Login consent items because Supabase Auth's Kakao provider
requests them by default:

- Nickname
- Profile image
- Kakao account email

The web app should keep using its own local environment values:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The invite URL should contain the raw token, while the database stores only a
hash in `care_group_invites.token_hash`. The app or server route should hash the
raw token before calling `accept_care_group_invite(token_hash)`.

Useful commands from the repository root:

```bash
supabase login
supabase link --workdir services/supabase --project-ref <project-ref>
supabase db push --workdir services/supabase
supabase gen types typescript --project-id <project-ref> > services/supabase/database.types.ts
```
