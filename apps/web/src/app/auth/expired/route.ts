import { NextResponse, type NextRequest } from "next/server";

import { clearAppSession } from "@/lib/auth/session-lifecycle";
import { createSupabaseWritableServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseWritableServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  const response = NextResponse.redirect(
    new URL("/login?error=session_expired", request.url),
  );

  clearAppSession(response);

  return response;
}
