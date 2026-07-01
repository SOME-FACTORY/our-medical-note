import { redirect } from "next/navigation";

import { ToastOnMount } from "@ours-medical-note/ui/containers/toast";

import { BrandLogo } from "@/components/brand-logo";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { ClearUrlOnMount } from "../clear-url-on-mount";
import { LoginForm } from "./login-form";
import { LoginPreviewCarousel } from "./login-preview-carousel";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    message?: string;
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

  if (error === "notice") {
    return "안전 안내를 확인한 뒤 카카오 로그인을 시작해 주세요.";
  }

  if (error === "profile") {
    return "로그인은 완료됐지만 사용자 정보를 준비하지 못했어요. 다시 시도해 주세요.";
  }

  if (error === "session_expired") {
    return "로그인 유지 기간이 지나 다시 로그인이 필요해요.";
  }

  return null;
}

function getToastMessage(message?: string) {
  if (message === "logged_out") {
    return "로그아웃했어요.";
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
  const toastMessage = getToastMessage(params?.message);

  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      {toastMessage ? (
        <>
          <ToastOnMount toast={{ title: toastMessage, variant: "success" }} />
          <ClearUrlOnMount />
        </>
      ) : null}

      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="soft-enter grid w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[minmax(0,1fr)_340px] desktop:min-h-[760px] desktop:grid-cols-[minmax(0,1fr)_460px]">
          <section className="paper-surface hidden min-w-0 bg-[#fbfbfe] tablet:flex tablet:flex-col tablet:px-6 tablet:py-8 desktop:px-12 desktop:py-10">
            <div className="flex items-center gap-3">
              <BrandLogo priority />
              <div>
                <p className="text-sm font-bold desktop:text-base">
                  우리 가족 의료노트
                </p>
                <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                  병원 다녀온 일을 잊지 않게
                </p>
              </div>
            </div>

            <div className="soft-enter mt-10 max-w-xl desktop:mt-20">
              <p className="text-sm font-bold text-[#4f53c9]">
                증상, 질문, 약 이야기까지
              </p>
              <h1 className="mt-4 text-[1.65rem] font-bold leading-tight desktop:text-[2.65rem]">
                병원 다녀온 날,
                <br />
                잊기 전에 <span className="whitespace-nowrap">적어두세요.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#6b6f84] desktop:text-base desktop:leading-8">
                내 기록도, 가족 기록도 필요한 만큼만 함께 볼 수 있어요.
              </p>
            </div>

            <LoginPreviewCarousel className="mt-auto max-w-xl" />
          </section>

          <section className="flex min-h-dvh min-w-0 flex-col bg-gradient-to-b from-[#f7f8fc] to-[#eef0fa] px-7 py-9 tablet:min-h-0 tablet:px-5 tablet:py-8 desktop:px-9 desktop:py-10">
            <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
              <div className="flex justify-center tablet:hidden">
                <BrandLogo priority size="lg" />
              </div>

              <div className="soft-enter mt-10 tablet:mt-14 desktop:mt-16">
                <p className="text-sm font-bold text-[#4f53c9]">
                  기록을 시작해요
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight tablet:text-[1.65rem] desktop:text-3xl">
                  병원 다녀온 일을
                  <br />
                  바로 적어두세요
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-[#6b6f84] tablet:text-sm desktop:text-[15px]">
                  증상, 질문, 약 정보를 한곳에 남겨요.
                </p>
              </div>

              <LoginPreviewCarousel
                className="mt-6 tablet:hidden"
                compact
              />

              <div className="app-interactive mt-7 rounded-[1.35rem] border border-[#e8eaf3] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(40,42,70,.42)] desktop:mt-8">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#fff3e7] text-sm font-bold text-[#b96742]">
                    !
                  </div>
                  <p className="text-sm leading-7 text-[#6d7284]">
                    병원 방문 기록을 정리하는 도구예요.
                    <br />
                    진단이나 치료를 대신하지 않아요.
                  </p>
                </div>
              </div>

              {errorMessage ? (
                <p className="mt-4 rounded-2xl border border-[#f1d7d2] bg-white px-4 py-3 text-sm font-semibold text-[#c95745]">
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
          </section>
        </div>
      </section>
    </main>
  );
}
