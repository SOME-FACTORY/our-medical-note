function SkeletonBlock({
  className = "",
  rounded = "rounded-[1rem]",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={`skeleton-surface ${rounded} ${className}`} />;
}

export default function LoginLoading() {
  return (
    <main className="min-h-dvh bg-[#e9ebf2] text-[#23263a]">
      <section className="mx-auto flex min-h-dvh w-full max-w-app items-center justify-center px-5 py-6 tablet:px-8 wide:px-0">
        <div className="grid w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#e4e7f2] tablet:min-h-[720px] tablet:grid-cols-[minmax(0,1fr)_340px] desktop:min-h-[760px] desktop:grid-cols-[minmax(0,1fr)_460px]">
          <section className="paper-surface hidden min-w-0 bg-[#fbfbfe] tablet:flex tablet:flex-col tablet:px-6 tablet:py-8 desktop:px-12 desktop:py-10">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="size-14" rounded="rounded-[1.1rem]" />
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="mt-2 h-3 w-28" />
              </div>
            </div>
            <div className="mt-20">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="mt-5 h-16 w-80" rounded="rounded-[1.2rem]" />
              <SkeletonBlock className="mt-5 h-5 w-72" />
            </div>
            <SkeletonBlock className="mt-auto h-72 w-full" rounded="rounded-[1.35rem]" />
          </section>

          <section className="flex min-h-dvh min-w-0 flex-col bg-gradient-to-b from-[#f7f8fc] to-[#eef0fa] px-7 py-9 tablet:min-h-0 tablet:px-5 tablet:py-8 desktop:px-9 desktop:py-10">
            <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
              <div className="mt-16">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="mt-4 h-16 w-64" rounded="rounded-[1.2rem]" />
                <SkeletonBlock className="mt-4 h-4 w-56" />
              </div>
              <SkeletonBlock className="mt-7 h-28 w-full" rounded="rounded-[1.35rem]" />
              <div className="mt-auto space-y-4">
                <SkeletonBlock className="h-10 w-full" />
                <SkeletonBlock className="h-14 w-full" rounded="rounded-[1.1rem]" />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
