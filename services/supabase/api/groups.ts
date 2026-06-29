import type { ApiResult, AppSupabaseClient } from "./client";
import { toError } from "./client";

export async function createCareGroup(
  supabase: AppSupabaseClient,
  input: {
    iconKey?: string | null;
    name: string;
  },
): Promise<ApiResult<{ groupId: string }>> {
  const { data: groupId, error } = await supabase.rpc("create_care_group", {
    target_icon_key: input.iconKey ?? undefined,
    target_name: input.name,
  });

  if (error) {
    return { data: null, error: toError(error) };
  }

  return { data: { groupId }, error: null };
}

export async function listMyCareGroups(
  supabase: AppSupabaseClient,
): Promise<
  ApiResult<
    Array<{
      iconKey: string | null;
      id: string;
      name: string;
      role: "member" | "owner";
    }>
  >
> {
  const { data, error } = await supabase
    .from("care_group_members")
    .select(
      `
        role,
        group:care_groups (
          id,
          name,
          icon_key
        )
      `,
    )
    .order("created_at", { ascending: true });

  if (error) {
    return { data: null, error: toError(error) };
  }

  const groups =
    data
      ?.map((membership) => {
        if (!membership.group) {
          return null;
        }

        return {
          iconKey: membership.group.icon_key,
          id: membership.group.id,
          name: membership.group.name,
          role: membership.role,
        };
      })
      .filter((group) => group !== null) ?? [];

  return { data: groups, error: null };
}
