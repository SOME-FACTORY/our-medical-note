import type { NextRequest, NextResponse } from "next/server";

export const APP_SESSION_COOKIE_NAME = "omn_session_started_at";
export const APP_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const LAST_GROUP_COOKIE_NAME = "omn_last_group_id";

const APP_SESSION_MAX_AGE_MS = APP_SESSION_MAX_AGE_SECONDS * 1000;

function getCookieOptions() {
  return {
    httpOnly: true,
    maxAge: APP_SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function markAppSessionStarted(response: NextResponse) {
  response.cookies.set(
    APP_SESSION_COOKIE_NAME,
    String(Date.now()),
    getCookieOptions(),
  );
}

export function rememberLastGroup(response: NextResponse, groupId: string) {
  response.cookies.set(LAST_GROUP_COOKIE_NAME, groupId, getCookieOptions());
}

export function clearAppSession(response: NextResponse) {
  response.cookies.set(APP_SESSION_COOKIE_NAME, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(LAST_GROUP_COOKIE_NAME, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
}

export function hasValidAppSession(request: NextRequest) {
  const startedAt = Number(request.cookies.get(APP_SESSION_COOKIE_NAME)?.value);

  if (!Number.isFinite(startedAt)) {
    return false;
  }

  return Date.now() - startedAt <= APP_SESSION_MAX_AGE_MS;
}
