import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { GroupHomeView } from "./group-home-view";

type GroupPageProps = {
  params: Promise<{
    groupId: string;
  }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
  const { groupId } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: group } = await supabase
    .from("care_groups")
    .select("id, name, icon_key")
    .eq("id", groupId)
    .maybeSingle();

  if (!group) {
    redirect("/");
  }

  return (
    <GroupHomeView
      group={{
        iconKey: group.icon_key,
        id: group.id,
        name: group.name,
      }}
    />
  );
}
