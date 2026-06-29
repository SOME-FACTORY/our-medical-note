import type { ApiResult, AppSupabaseClient } from "./client";
import { toError } from "./client";

export async function saveCareGroupMemberRelation(
  supabase: AppSupabaseClient,
  input: {
    groupId: string;
    relationName: string;
    targetPersonId: string;
    viewerPersonId: string;
  },
): Promise<ApiResult<{ ok: true }>> {
  const { error } = await supabase.from("care_group_member_relations").upsert(
    {
      group_id: input.groupId,
      relation_name: input.relationName,
      target_person_id: input.targetPersonId,
      viewer_person_id: input.viewerPersonId,
    },
    { onConflict: "group_id,viewer_person_id,target_person_id" },
  );

  if (error) {
    return { data: null, error: toError(error) };
  }

  return { data: { ok: true }, error: null };
}
