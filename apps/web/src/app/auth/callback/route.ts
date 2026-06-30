import { NextResponse, type NextRequest } from "next/server";
import { ensureSignedInProfile } from "@ours-medical-note/supabase";

import { markAppSessionStarted } from "@/lib/auth/session-lifecycle";
import { createSupabaseWritableServerClient } from "@/lib/supabase/server";

function getSafeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth", request.url));
  }

  const supabase = await createSupabaseWritableServerClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/login?error=auth", request.url));
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(new URL("/login?error=auth", request.url));
  }

  const { error: profileError } = await ensureSignedInProfile(supabase, user);

  if (profileError) {
    return NextResponse.redirect(new URL("/login?error=profile", request.url));
  }

  const redirectUrl = new URL(next, request.url);
  redirectUrl.searchParams.set("message", "logged_in");

  const response = NextResponse.redirect(redirectUrl);
  markAppSessionStarted(response);

  return response;
}
