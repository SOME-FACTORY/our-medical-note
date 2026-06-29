import { createHash, randomBytes } from "node:crypto";

import type { ApiResult, AppSupabaseClient } from "./client";
import { toError } from "./client";

export function createInviteToken() {
  return randomBytes(24).toString("base64url");
}

export function hashInviteToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createCareGroupInvite(
  supabase: AppSupabaseClient,
  input: {
    groupId: string;
    inviterId: string;
  },
): Promise<ApiResult<{ token: string }>> {
  const token = createInviteToken();
  const { error } = await supabase.from("care_group_invites").insert({
    group_id: input.groupId,
    inviter_id: input.inviterId,
    token_hash: hashInviteToken(token),
  });

  if (error) {
    return { data: null, error: toError(error) };
  }

  return { data: { token }, error: null };
}

export async function acceptCareGroupInvite(
  supabase: AppSupabaseClient,
  token: string,
): Promise<ApiResult<{ groupId: string }>> {
  const { data: groupId, error } = await supabase.rpc(
    "accept_care_group_invite",
    {
      target_token_hash: hashInviteToken(token),
    },
  );

  if (error) {
    return { data: null, error: toError(error) };
  }

  return { data: { groupId }, error: null };
}
