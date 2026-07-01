function SkeletonBlock({
  className = "",
  rounded = "rounded-[1rem]",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={`skeleton-surface ${rounded} ${className}`} />;
}

export default function HomeLoading() {
  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="grid w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[260px_1fr] desktop:min-h-[760px] desktop:grid-cols-[286px_1fr]">
          <aside className="paper-surface hidden flex-col border-r border-[#e4e7f2] bg-[#fbfbfe] p-5 tablet:flex desktop:p-7">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="size-14" rounded="rounded-[1.1rem]" />
              <div className="min-w-0 flex-1">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="mt-2 h-3 w-24" />
              </div>
            </div>

            <div className="mt-9 space-y-3">
              <SkeletonBlock className="h-20 w-full" rounded="rounded-[1.25rem]" />
              <SkeletonBlock className="h-20 w-full" rounded="rounded-[1.25rem]" />
              <SkeletonBlock className="h-20 w-full" rounded="rounded-[1.25rem]" />
            </div>

            <SkeletonBlock className="mt-auto h-28 w-full" rounded="rounded-[1.25rem]" />
          </aside>

          <section className="flex min-h-dvh flex-col bg-[#f4f5f8] tablet:min-h-0">
            <header className="flex items-start justify-between gap-4 px-6 pb-4 pt-12 tablet:px-7 tablet:pt-8 desktop:px-10 desktop:pt-10">
              <div className="min-w-0 flex-1">
                <SkeletonBlock className="h-4 w-44" />
                <SkeletonBlock className="mt-3 h-9 w-64" />
              </div>
              <SkeletonBlock className="h-10 w-20" />
            </header>

            <div className="flex flex-1 flex-col px-6 pb-8 tablet:px-7 desktop:px-10">
              <div className="flex flex-1 flex-col rounded-[1.45rem] border border-[#ebecf3] bg-white shadow-[0_18px_40px_-34px_rgba(40,42,70,.42)]">
                <div className="border-b border-[#edf0f8] px-5 py-5 desktop:px-7 desktop:py-6">
                  <SkeletonBlock className="h-4 w-36" />
                  <SkeletonBlock className="mt-3 h-4 w-72" />
                </div>
                <div className="grid gap-4 p-5 desktop:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] desktop:p-7">
                  <div className="space-y-3">
                    <SkeletonBlock className="h-28 w-full" rounded="rounded-[1.25rem]" />
                    <SkeletonBlock className="h-28 w-full" rounded="rounded-[1.25rem]" />
                  </div>
                  <SkeletonBlock className="h-56 w-full" rounded="rounded-[1.25rem]" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
