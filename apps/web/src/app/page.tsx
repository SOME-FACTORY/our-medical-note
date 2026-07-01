import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

import { listMyCareGroups } from "@ours-medical-note/supabase";
import { ToastOnMount } from "@ours-medical-note/ui/containers/toast";

import { BrandLogo } from "@/components/brand-logo";
import { LAST_GROUP_COOKIE_NAME } from "@/lib/auth/session-lifecycle";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ClearUrlOnMount } from "./clear-url-on-mount";
import { HomeGroupsDashboard } from "./home-groups-dashboard";
import { HomeOnboardingPanel } from "./home-onboarding-panel";
import {
  HomeOnboardingProgress,
  HomeOnboardingStageHeader,
} from "./home-onboarding-progress";

type HomePageProps = {
  searchParams?: Promise<{
    message?: string;
    view?: string;
  }>;
};

function getToastMessage(message?: string) {
  if (message === "logged_in") {
    return "로그인했어요.";
  }

  return null;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
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

  const displayName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.email ??
    "나";
  const toastMessage = getToastMessage(params?.message);
  const groupsResult = await listMyCareGroups(supabase);
  const groups = groupsResult.data ?? [];
  const isCreatingGroup = params?.view === "create-group";

  if (groups.length > 0 && !isCreatingGroup) {
    const cookieStore = await cookies();
    const lastGroupId = cookieStore.get(LAST_GROUP_COOKIE_NAME)?.value;
    const shouldShowGroupSelector = params?.view === "groups";
    if (
      !shouldShowGroupSelector &&
      lastGroupId &&
      groups.some((group) => group.id === lastGroupId)
    ) {
      redirect(`/groups/${lastGroupId}`);
    }

    return (
      <HomeGroupsDashboard
        displayName={String(displayName)}
        groups={groups}
        toastMessage={toastMessage}
      />
    );
  }

  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      {toastMessage ? (
        <>
          <ToastOnMount toast={{ title: toastMessage, variant: "success" }} />
          <ClearUrlOnMount />
        </>
      ) : null}

      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="soft-enter grid w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[260px_1fr] desktop:min-h-[760px] desktop:grid-cols-[286px_1fr]">
          <aside className="paper-surface hidden flex-col border-r border-[#e4e7f2] bg-[#fbfbfe] p-5 tablet:flex desktop:p-7">
            <div className="flex items-center gap-3">
              <BrandLogo priority />
              <div>
                <p className="text-sm font-bold">우리 가족 의료노트</p>
                <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                  {isCreatingGroup ? "새 그룹 만들기" : "처음 설정"}
                </p>
              </div>
            </div>

            <HomeOnboardingProgress />

            <div className="mt-auto rounded-[1.25rem] border border-[#e8eaf3] bg-white/75 p-4">
              <p className="text-xs font-bold text-[#7c80a0]">공유 원칙</p>
              <p className="mt-3 text-sm font-medium leading-6 text-[#555b72]">
                기록은 저장할 때 선택한 그룹 안에서만 보입니다.
              </p>
            </div>
          </aside>

          <section className="flex min-h-dvh flex-col bg-[#f4f5f8] tablet:min-h-0">
            <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 px-6 pb-4 pt-12 tablet:flex tablet:items-center tablet:justify-between tablet:px-7 tablet:pt-8 desktop:px-10 desktop:pt-10">
              <div className="min-w-0">
                {isCreatingGroup && groups.length > 0 ? (
                  <Link
                    className="app-focus mb-3 inline-flex rounded-lg text-sm font-bold text-[#4f53c9] transition hover:text-[#3f43b4]"
                    href="/?view=groups"
                  >
                    그룹 목록으로
                  </Link>
                ) : null}
                <p className="truncate text-sm font-medium text-[#8a8fa4]">
                  {displayName}님,{" "}
                  {isCreatingGroup
                    ? "새 기록 공간을 만들어요"
                    : "처음 기록을 준비해요"}
                </p>
                <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-normal tablet:mt-1 tablet:text-2xl">
                  {isCreatingGroup
                    ? "어떤 그룹을 추가할까요?"
                    : "어떤 공간에서 시작할까요?"}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <form action="/auth/logout" className="shrink-0" method="post">
                  <button
                    className="app-focus app-interactive inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[1rem] border border-[#e2e5ef] bg-white px-4 text-sm font-bold text-[#6e7284] hover:border-[#d6dae8] hover:text-[#4f53c9]"
                    type="submit"
                  >
                    로그아웃
                  </button>
                </form>
                <div className="hidden size-11 items-center justify-center rounded-full border border-[#ebecf3] bg-white text-sm font-bold text-[#4f53c9] tablet:flex">
                  {String(displayName).charAt(0)}
                </div>
              </div>
            </header>

            <div className="flex flex-1 flex-col px-6 pb-8 tablet:px-7 desktop:px-10">
              <div className="soft-enter flex flex-1 flex-col rounded-[1.45rem] border border-[#ebecf3] bg-white shadow-[0_18px_40px_-34px_rgba(40,42,70,.42)]">
                <HomeOnboardingStageHeader />

                <HomeOnboardingPanel />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
