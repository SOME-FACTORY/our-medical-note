import type { ApiResult, AppSupabaseClient, AuthUserProfile } from "./client";
import { toError } from "./client";

export function getUserDisplayName(user: AuthUserProfile) {
  const metadataName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.user_metadata?.nickname;

  if (typeof metadataName === "string" && metadataName.trim().length > 0) {
    return metadataName.trim();
  }

  if (user.email) {
    return user.email;
  }

  return "이름 없음";
}

export async function ensureSignedInProfile(
  supabase: AppSupabaseClient,
  user: AuthUserProfile,
): Promise<ApiResult<{ personId: string }>> {
  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    name: getUserDisplayName(user),
  });

  if (profileError) {
    return { data: null, error: toError(profileError) };
  }

  const { data: personId, error: personError } = await supabase.rpc(
    "ensure_current_user_person",
  );

  if (personError) {
    return { data: null, error: toError(personError) };
  }

  return { data: { personId }, error: null };
}
