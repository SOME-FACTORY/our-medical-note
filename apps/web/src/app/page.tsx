import { redirect } from "next/navigation";

import { ToastOnMount } from "@ours-medical-note/ui/containers/toast";

import { BrandLogo } from "@/components/brand-logo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { HomeOnboardingPanel } from "./home-onboarding-panel";

const setupSteps = [
  {
    description: "혼자 쓸지, 함께 쓸지 정해요.",
    status: "현재 단계",
    title: "기록 공간 만들기",
  },
  {
    description: "초대 전에도 먼저 추가할 수 있어요.",
    status: "다음",
    title: "대상자 추가",
  },
  {
    description: "필요할 때 초대하고 연결해요.",
    status: "이후",
    title: "초대와 관계 연결",
  },
];

type HomePageProps = {
  searchParams?: Promise<{
    message?: string;
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

  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      {toastMessage ? (
        <>
          <ToastOnMount toast={{ title: toastMessage, variant: "success" }} />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.history.replaceState(window.history.state,"",window.location.pathname+window.location.hash);',
            }}
          />
        </>
      ) : null}

      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="grid w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[260px_1fr] desktop:min-h-[760px] desktop:grid-cols-[286px_1fr]">
          <aside className="paper-surface hidden flex-col border-r border-[#e4e7f2] bg-[#fbfbfe] p-5 tablet:flex desktop:p-7">
            <div className="flex items-center gap-3">
              <BrandLogo priority />
              <div>
                <p className="text-sm font-bold">우리 가족 의료노트</p>
                <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                  처음 설정
                </p>
              </div>
            </div>

            <nav className="mt-9 space-y-2" aria-label="처음 설정 단계">
              {setupSteps.map((step, index) => (
                <div
                  className={`rounded-[1.25rem] border p-4 ${
                    index === 0
                      ? "border-[#d8dcf0] bg-white shadow-[0_14px_28px_-26px_rgba(40,42,70,.5)]"
                      : "border-transparent bg-white/45"
                  }`}
                  key={step.title}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 text-sm font-bold">{step.title}</p>
                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        index === 0
                          ? "bg-[#eef0fb] text-[#4f53c9]"
                          : "bg-[#f0f2f8] text-[#8a8fa4]"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#74798e]">
                    {step.description}
                  </p>
                </div>
              ))}
            </nav>

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
                <p className="truncate text-sm font-medium text-[#8a8fa4]">
                  {displayName}님, 처음 기록을 준비해요
                </p>
                <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-normal tablet:mt-1 tablet:text-2xl">
                  어떤 공간에서 시작할까요?
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <form action="/auth/logout" className="shrink-0" method="post">
                  <button
                    className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[1rem] border border-[#e2e5ef] bg-white px-4 text-sm font-bold text-[#6e7284] transition hover:-translate-y-0.5 hover:border-[#d6dae8] hover:text-[#4f53c9]"
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
                <div className="border-b border-[#edf0f8] px-5 py-5 desktop:px-7 desktop:py-6">
                  <p className="text-sm font-bold text-[#4f53c9]">
                    1단계 / 기록 공간
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#707487]">
                    초대 전에도 기록은 시작할 수 있어요. 공간과 대상자를 먼저
                    만들고, 연결은 나중에 해요.
                  </p>
                </div>

                <HomeOnboardingPanel />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
