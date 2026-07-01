import { NextResponse, type NextRequest } from "next/server";

import { rememberLastGroup } from "@/lib/auth/session-lifecycle";
import { createSupabaseWritableServerClient } from "@/lib/supabase/server";

type EnterGroupRouteContext = {
  params: Promise<{
    groupId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: EnterGroupRouteContext,
) {
  const { groupId } = await params;
  const supabase = await createSupabaseWritableServerClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data: group } = await supabase
    .from("care_groups")
    .select("id")
    .eq("id", groupId)
    .maybeSingle();

  if (!group) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.redirect(
    new URL(`/groups/${group.id}`, request.url),
  );
  rememberLastGroup(response, group.id);

  return response;
}
