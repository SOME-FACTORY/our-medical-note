-- Manual SQL scenario for the first RLS boundary.
-- Run this against a local Supabase database after applying migrations.
--
-- The app should create auth users first, then set request.jwt.claim.sub when
-- checking visibility as each user.

begin;

-- Scenario to preserve:
-- 1. A writes a medical note about Mom.
-- 2. A shares the note only to the Mom Care group.
-- 3. The Family group and Friends group must not receive implicit access.
-- 4. A group that does not contain Mom must not be a valid share target.

-- This file is intentionally a placeholder until local Supabase auth fixtures
-- are introduced. The invariant is enforced in the schema by:
-- - medical_note_group_shares being the only note sharing table
-- - validate_medical_note_group_share()
-- - medical_notes_select_author_or_shared_group_member

rollback;
