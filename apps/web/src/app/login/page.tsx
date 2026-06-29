import { redirect } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { LoginForm } from "./login-form";

const featureHighlights = [
  {
    accent: "bg-[#4f53c9]",
    description: "작성자와 대상자를 구분",
    title: "기록 대상자 분리",
  },
  {
    accent: "bg-[#3aa99f]",
    description: "선택한 관계에만 공개",
    title: "그룹별 공유",
  },
  {
    accent: "bg-[#f5b84c]",
    description: "3/6/12개월 흐름 확인",
    title: "기록 기반 리포트",
  },
];

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "auth") {
    return "로그인을 완료하지 못했어요. 잠시 후 다시 시도해 주세요.";
  }

  if (error === "oauth") {
    return "카카오 로그인 연결을 시작하지 못했어요.";
  }

  if (error === "config") {
    return "Supabase 설정을 먼저 추가해 주세요.";
  }

  return null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [params, supabase] = await Promise.all([
    searchParams,
    createSupabaseServerClient(),
  ]);

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/");
    }
  }

  const isConfigured = getSupabasePublicConfig() !== null;
  const errorMessage = getErrorMessage(params?.error);

  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_32px_90px_-50px_rgba(28,30,55,.65)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[minmax(0,1fr)_380px] desktop:min-h-[760px] desktop:grid-cols-[minmax(0,1fr)_500px]">
          <div className="hidden bg-[#fbfbfe] px-7 py-8 tablet:flex tablet:flex-col desktop:px-12 desktop:py-10">
            <div className="flex items-center gap-3">
              <BrandLogo priority />
              <div>
                <p className="text-sm font-extrabold desktop:text-base">
                  우리 가족 의료노트
                </p>
                <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                  가족 의료 기록
                </p>
              </div>
            </div>

            <div className="mt-auto max-w-xl">
              <p className="text-sm font-bold text-[#4f53c9]">
                관계별로 안전하게 나누는 의료 기록
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#23263a] desktop:mt-5 desktop:text-5xl">
                필요한 사람에게만,
                <br />
                필요한 기록만 공유해요.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#6b6f84] desktop:mt-6 desktop:text-base desktop:leading-8">
                병원 방문 전후의 증상, 진료 메모, 처방 정보를 가족이나 돌봄
                관계 안에서 정리할 수 있도록 준비하고 있어요.
              </p>
            </div>

            <div className="mt-8 grid gap-2.5 desktop:mt-10 desktop:grid-cols-3 desktop:gap-3">
              {featureHighlights.map((item) => (
                <div
                  className="flex items-center gap-3 rounded-2xl border border-[#e8eaf3] bg-white/85 p-3 shadow-[0_10px_24px_-24px_rgba(40,42,70,.45)] desktop:block desktop:p-4"
                  key={item.title}
                >
                  <div
                    className={`size-2.5 shrink-0 rounded-full ${item.accent} desktop:mb-3 desktop:size-3`}
                  />
                  <div>
                    <p className="text-sm font-extrabold text-[#34384d]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#8a8fa4]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-dvh flex-col bg-gradient-to-b from-[#f7f8fc] to-[#eef0fa] px-7 py-10 tablet:min-h-0 tablet:px-7 tablet:py-8 desktop:px-9 desktop:py-10">
            <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
              <div className="flex justify-center tablet:hidden">
                <BrandLogo priority size="lg" />
              </div>

              <div className="mt-10 text-center tablet:mt-12 desktop:mt-16">
                <p className="text-sm font-bold text-[#4f53c9]">
                  시작하기 전에
                </p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight tablet:text-[1.65rem] desktop:text-3xl">
                  안전 안내를
                  <br />
                  먼저 확인해 주세요
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#6b6f84] tablet:text-sm desktop:text-[15px]">
                  로그인 전 한 번만 확인하면 됩니다. 정식 약관 동의는 별도
                  단계에서 다룰 예정이에요.
                </p>
              </div>

              <div className="mt-7 rounded-3xl border border-[#e8eaf3] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(40,42,70,.45)] desktop:mt-8">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#fff0e8] text-sm font-extrabold text-[#d97757]">
                    !
                  </div>
                  <p className="text-sm leading-7 text-[#6d7284]">
                    본 서비스는 병원 방문 기록을 정리하기 위한 도구이며,
                    진단이나 치료를 대신하지 않습니다. 의료 판단은 의료
                    전문가와 상담해 주세요.
                  </p>
                </div>
              </div>

              {errorMessage ? (
                <p className="mt-4 rounded-2xl border border-[#f1d7d2] bg-white px-4 py-3 text-sm font-semibold text-[#d05a48]">
                  {errorMessage}
                </p>
              ) : null}

              {!isConfigured ? (
                <p className="mt-4 rounded-2xl border border-[#e8eaf3] bg-white px-4 py-3 text-sm leading-6 text-[#6b6f84]">
                  `NEXT_PUBLIC_SUPABASE_URL`과
                  `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 설정하면 카카오 로그인을
                  시작할 수 있어요.
                </p>
              ) : null}

              <LoginForm isConfigured={isConfigured} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

