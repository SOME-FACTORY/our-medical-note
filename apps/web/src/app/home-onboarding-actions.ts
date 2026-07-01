"use server";

import { revalidatePath } from "next/cache";

import { createCareGroup } from "@ours-medical-note/supabase";

import { createSupabaseWritableServerClient } from "@/lib/supabase/server";

import type { CreateGroupActionState } from "./home-onboarding-panel.types";

function getStringField(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function createOnboardingGroup(
  _previousState: CreateGroupActionState,
  formData: FormData,
): Promise<CreateGroupActionState> {
  const groupName = getStringField(formData, "group_name");
  const selectedSpace = getStringField(formData, "selected_space");

  if (selectedSpace !== "personal" && selectedSpace !== "care") {
    return {
      message: "기록 공간 종류를 다시 선택해 주세요.",
      status: "error",
    };
  }

  if (!groupName) {
    return {
      message: "그룹 이름을 입력해 주세요.",
      status: "error",
    };
  }

  if (groupName.length > 30) {
    return {
      message: "그룹 이름은 30자 이내로 입력해 주세요.",
      status: "error",
    };
  }

  const supabase = await createSupabaseWritableServerClient();

  if (!supabase) {
    return {
      message: "Supabase 설정을 먼저 확인해 주세요.",
      status: "error",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "로그인 후 다시 시도해 주세요.",
      status: "error",
    };
  }

  const result = await createCareGroup(supabase, {
    iconKey: selectedSpace,
    name: groupName,
  });

  if (result.error) {
    return {
      message: "그룹을 만들지 못했어요. 잠시 후 다시 시도해 주세요.",
      status: "error",
    };
  }

  revalidatePath("/");

  return {
    groupId: result.data.groupId,
    message: "그룹을 만들었어요.",
    status: "success",
  };
}
