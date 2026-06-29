import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../database.types";

export type AppSupabaseClient = SupabaseClient<Database>;

export type AuthUserProfile = {
  email?: string | null;
  id: string;
  user_metadata?: Record<string, unknown>;
};

export type ApiResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export function toError(error: unknown) {
  if (error instanceof Error) {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return new Error(error.message);
  }

  return new Error("Supabase request failed");
}
