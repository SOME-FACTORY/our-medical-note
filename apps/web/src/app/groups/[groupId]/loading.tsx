function SkeletonBlock({
  className = "",
  rounded = "rounded-[1rem]",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={`skeleton-surface ${rounded} ${className}`} />;
}

export default function GroupHomeLoading() {
  return (
    <main className="min-h-dvh bg-[#dfe2ec] text-[#25283b]">
      <section className="mx-auto flex min-h-dvh w-full max-w-[1500px] items-stretch justify-center p-0 tablet:p-4">
        <div className="grid min-h-dvh w-full overflow-hidden bg-[#f4f5f9] shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#cfd4e3] tablet:min-h-[calc(100dvh-2rem)] tablet:rounded-[1.75rem] tablet:grid-cols-[260px_minmax(0,1fr)] desktop:grid-cols-[286px_minmax(0,1fr)_320px]">
          <aside className="hidden flex-col border-r border-[#dfe3ef] bg-[#f7f8fc] p-5 tablet:flex desktop:p-7">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="size-14" rounded="rounded-[1.1rem]" />
              <div className="min-w-0 flex-1">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="mt-2 h-3 w-24" />
              </div>
            </div>

            <SkeletonBlock className="mt-9 h-20 w-full" rounded="rounded-[1.35rem]" />
            <div className="mt-8 space-y-3">
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
            </div>
            <SkeletonBlock className="mt-auto h-32 w-full" rounded="rounded-[1.25rem]" />
          </aside>

          <section className="flex min-h-dvh flex-col tablet:min-h-0">
            <header className="border-b border-[#e2e6f2] bg-white px-5 py-5 tablet:hidden">
              <SkeletonBlock className="h-7 w-40" />
              <div className="mt-4 flex gap-2">
                <SkeletonBlock className="h-9 w-20 rounded-full" />
                <SkeletonBlock className="h-9 w-24 rounded-full" />
                <SkeletonBlock className="h-9 w-20 rounded-full" />
              </div>
            </header>

            <div className="flex-1 px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-10">
              <div className="hidden items-center justify-between tablet:flex">
                <SkeletonBlock className="h-11 w-36" />
                <div className="flex gap-2">
                  <SkeletonBlock className="size-11" />
                  <SkeletonBlock className="size-11" />
                </div>
              </div>

              <SkeletonBlock className="mt-2 h-4 w-20 tablet:mt-12" />
              <div className="mt-4 grid gap-3">
                <SkeletonBlock className="h-24 w-full" rounded="rounded-[1.25rem]" />
                <SkeletonBlock className="h-24 w-full" rounded="rounded-[1.25rem]" />
                <SkeletonBlock className="h-24 w-full" rounded="rounded-[1.25rem]" />
              </div>

              <SkeletonBlock className="mt-8 h-4 w-20" />
              <div className="mt-4 grid gap-3 tablet:grid-cols-3">
                <SkeletonBlock className="h-28 w-full" rounded="rounded-[1.25rem]" />
                <SkeletonBlock className="h-28 w-full" rounded="rounded-[1.25rem]" />
                <SkeletonBlock className="h-28 w-full" rounded="rounded-[1.25rem]" />
              </div>
            </div>
          </section>

          <aside className="hidden border-l border-[#dfe3ef] bg-[#fbfbfe] p-6 desktop:block">
            <SkeletonBlock className="h-7 w-28" />
            <SkeletonBlock className="mt-2 h-4 w-32" />
            <SkeletonBlock className="mt-6 h-14 w-full" rounded="rounded-[1.15rem]" />
            <SkeletonBlock className="mt-6 h-48 w-full" rounded="rounded-[1.25rem]" />
            <SkeletonBlock className="mt-5 h-32 w-full" rounded="rounded-[1.25rem]" />
          </aside>
        </div>
      </section>
    </main>
  );
}
