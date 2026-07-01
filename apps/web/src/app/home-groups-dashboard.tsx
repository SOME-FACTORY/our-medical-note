import Link from "next/link";

import { ToastOnMount } from "@ours-medical-note/ui/containers/toast";

import { BrandLogo } from "@/components/brand-logo";

import { ClearUrlOnMount } from "./clear-url-on-mount";

type HomeGroup = {
  iconKey: string | null;
  id: string;
  name: string;
  role: "member" | "owner";
};

type HomeGroupsDashboardProps = {
  displayName: string;
  groups: HomeGroup[];
  toastMessage: string | null;
};

export function HomeGroupsDashboard({
  displayName,
  groups,
  toastMessage,
}: HomeGroupsDashboardProps) {
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
                  그룹 선택
                </p>
              </div>
            </div>

            <nav className="mt-9 space-y-2" aria-label="내 그룹 목록">
              {groups.map((group) => (
                <Link
                  className="app-focus app-interactive block rounded-[1.25rem] border border-transparent bg-white/45 p-4 hover:border-[#d8dcf0] hover:bg-white"
                  href={`/groups/${group.id}/enter`}
                  key={group.id}
                >
                  <p className="truncate text-sm font-bold">{group.name}</p>
                  <p className="mt-2 text-xs font-semibold text-[#74798e]">
                    {group.role === "owner" ? "내가 만든 공간" : "함께 보는 공간"}
                  </p>
                </Link>
              ))}
            </nav>
          </aside>

          <section className="flex min-h-dvh flex-col bg-[#f4f5f8] tablet:min-h-0">
            <header className="flex items-start justify-between gap-4 px-6 pb-4 pt-12 tablet:px-7 tablet:pt-8 desktop:px-10 desktop:pt-10">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#8a8fa4]">
                  {displayName}님, 기록할 공간을 골라요
                </p>
                <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-normal tablet:mt-1 tablet:text-2xl">
                  그룹 목록
                </h1>
              </div>
              <form action="/auth/logout" className="shrink-0" method="post">
                <button
                  className="app-focus app-interactive inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[1rem] border border-[#e2e5ef] bg-white px-4 text-sm font-bold text-[#6e7284] hover:border-[#d6dae8] hover:text-[#4f53c9]"
                  type="submit"
                >
                  로그아웃
                </button>
              </form>
            </header>

            <div className="grid flex-1 gap-4 px-6 pb-8 tablet:px-7 desktop:px-10">
              <section className="rounded-[1.45rem] border border-[#ebecf3] bg-white p-5 shadow-[0_18px_40px_-34px_rgba(40,42,70,.42)] desktop:p-7">
                <p className="text-sm font-bold text-[#4f53c9]">
                  들어갈 그룹
                </p>
                <div className="mt-5 grid gap-3">
                  {groups.map((group) => (
                    <Link
                      className="app-focus app-interactive grid gap-3 rounded-[1.25rem] border border-[#e4e7f2] bg-[#fbfbfe] p-4 hover:border-[#d8dcf0] hover:bg-white hover:shadow-[0_20px_42px_-34px_rgba(28,30,55,.62)] tablet:grid-cols-[minmax(0,1fr)_auto] tablet:items-center"
                      href={`/groups/${group.id}/enter`}
                      key={group.id}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-base font-bold">
                          {group.name}
                        </span>
                        <span className="mt-2 block text-sm font-semibold text-[#74798e]">
                          {group.role === "owner"
                            ? "내가 만든 공간"
                            : "함께 보는 공간"}
                        </span>
                      </span>
                      <span className="inline-flex h-10 items-center justify-center rounded-[1rem] bg-[#4f53c9] px-4 text-sm font-bold text-white shadow-[0_14px_24px_-20px_rgba(40,42,70,.62)]">
                        선택
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  className="app-focus app-interactive mt-5 inline-flex h-12 items-center justify-center rounded-[1rem] border border-[#d8dcf0] bg-white px-5 text-sm font-bold text-[#4f53c9] hover:bg-[#fbfbfe]"
                  href="/?view=create-group"
                >
                  새 그룹 만들기
                </Link>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
