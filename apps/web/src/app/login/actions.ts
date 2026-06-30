"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseWritableServerClient } from "@/lib/supabase/server";

function getRedirectOrigin() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  return null;
}

export async function signInWithKakao(formData: FormData) {
  if (formData.get("safety_notice_confirmed") !== "on") {
    redirect("/login?error=notice");
  }

  const supabase = await createSupabaseWritableServerClient();

  if (!supabase) {
    redirect("/login?error=config");
  }

  const headerStore = await headers();
  const origin =
    getRedirectOrigin() ??
    `${headerStore.get("x-forwarded-proto") ?? "http"}://${headerStore.get("host")}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
    provider: "kakao",
  });

  if (error || !data.url) {
    redirect("/login?error=oauth");
  }

  redirect(data.url);
}
