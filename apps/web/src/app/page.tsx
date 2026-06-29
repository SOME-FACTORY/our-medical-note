import { redirect } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
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

  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_32px_90px_-50px_rgba(28,30,55,.65)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[210px_1fr] desktop:min-h-[760px] desktop:grid-cols-[264px_1fr]">
          <aside className="hidden flex-col border-r border-[#e4e7f2] bg-gradient-to-b from-[#fbfbfe] to-[#f2f4fb] p-5 tablet:flex desktop:p-7">
            <div className="flex items-center gap-3">
              <BrandLogo priority />
              <div>
                <p className="text-sm font-extrabold">우리 가족 의료노트</p>
                <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                  가족 의료 기록
                </p>
              </div>
            </div>

            <div className="mt-7 text-xs font-extrabold tracking-[0.08em] text-[#a1a6ba] desktop:mt-9">
              그룹
            </div>
            <div className="mt-3 rounded-3xl border border-[#e7e9f3] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(40,42,70,.35)]">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#eef0fb] text-xl">
                  +
                </div>
                <div>
                  <p className="text-sm font-extrabold">내 그룹</p>
                  <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
                    아직 그룹 없음
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-3xl border border-[#e5e8f3] bg-white p-4">
              <p className="text-xs font-extrabold tracking-[0.04em] text-[#9aa0b5]">
                다음 단계
              </p>
              <p className="mt-3 text-sm font-extrabold leading-6">
                그룹 만들기와 초대 흐름을 이어서 붙일 수 있어요.
              </p>
            </div>
          </aside>

          <div className="flex min-h-dvh flex-col bg-[#f4f5f8] tablet:min-h-0">
            <header className="flex items-center justify-between gap-4 px-6 pb-4 pt-12 tablet:px-7 tablet:pt-8 desktop:px-10 desktop:pt-10">
              <div>
                <p className="text-sm font-bold text-[#8b8fa3]">
                  {displayName}님
                </p>
                <h1 className="mt-1 text-2xl font-extrabold">내 그룹</h1>
              </div>
              <div className="flex size-11 items-center justify-center rounded-full border border-[#ebecf3] bg-white text-sm font-extrabold text-[#4f53c9]">
                {String(displayName).charAt(0)}
              </div>
            </header>

            <div className="flex flex-1 flex-col px-6 pb-8 tablet:px-7 desktop:px-10">
              <div className="flex flex-1 items-center justify-center rounded-[1.75rem] border border-[#ebecf3] bg-white p-6 text-center shadow-[0_18px_40px_-34px_rgba(40,42,70,.45)] desktop:p-8">
                <div className="max-w-sm">
                  <div className="mx-auto flex justify-center">
                    <BrandLogo priority size="md" />
                  </div>
                  <h2 className="mt-6 text-xl font-extrabold">
                    아직 만든 그룹이 없어요
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#707487]">
                    이번 단계에서는 로그인까지만 연결했습니다. 다음 단계에서
                    가족, 돌봄, 친구 그룹을 만들고 초대할 수 있게 이어가면
                    됩니다.
                  </p>
                  <button
                    className="mt-7 h-12 rounded-2xl bg-[#dcdde6] px-6 text-sm font-extrabold text-[#a3a6b6]"
                    disabled
                    type="button"
                  >
                    그룹 만들기 준비 중
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

