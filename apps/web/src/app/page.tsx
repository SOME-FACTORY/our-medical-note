const visits = [
  {
    person: "엄마",
    group: "가족 그룹",
    title: "내과 방문 전 증상 정리",
    date: "오늘 14:30",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    person: "나",
    group: "개인 기록",
    title: "처방 약 복용 메모",
    date: "어제",
    tone: "border-sky-200 bg-sky-50 text-sky-800",
  },
  {
    person: "할머니",
    group: "돌봄 그룹",
    title: "6개월 방문 추이 확인",
    date: "이번 주",
    tone: "border-rose-200 bg-rose-50 text-rose-800",
  },
];

const reportBars = [
  { label: "증상 메모", width: "w-10/12", color: "bg-emerald-500" },
  { label: "복약 변화", width: "w-7/12", color: "bg-sky-500" },
  { label: "후속 할 일", width: "w-5/12", color: "bg-rose-500" },
];

export default function Home() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto grid min-h-dvh w-full max-w-7xl gap-10 px-5 py-8 md:grid-cols-[1fr_420px] md:items-center md:px-8 lg:px-10">
        <div className="flex flex-col gap-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                OM
              </div>
              <div>
                <p className="text-sm font-semibold">Our&apos;s Medical Note</p>
                <p className="text-xs text-zinc-500">관계 기반 의료 기록</p>
              </div>
            </div>
            <button className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
              기록 시작
            </button>
          </header>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              병원 가기 전, 가족과 함께 준비하는 노트
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-950 dark:text-white md:text-6xl">
              의료 기록은 사람과 그룹을 기준으로 안전하게 정리합니다.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 md:text-lg">
              증상 메모, 진료 중 기록, 약 정보, 후속 할 일을 한 곳에 모으고
              필요한 그룹에만 공유할 수 있게 준비 중입니다.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-2xl font-semibold">3</p>
              <p className="mt-1 text-sm text-zinc-500">공유 그룹</p>
            </div>
            <div className="border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-2xl font-semibold">12</p>
              <p className="mt-1 text-sm text-zinc-500">이번 달 기록</p>
            </div>
            <div className="border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-2xl font-semibold">6개월</p>
              <p className="mt-1 text-sm text-zinc-500">리포트 범위</p>
            </div>
          </div>
        </div>

        <aside className="border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30">
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <div>
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                오늘의 준비
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                기록 대상자와 공유 그룹을 먼저 확인하세요.
              </p>
            </div>
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
              안전 공유
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {visits.map((visit) => (
              <article
                className="border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                key={visit.title}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${visit.tone}`}
                  >
                    {visit.person}
                  </span>
                  <span className="text-xs text-zinc-500">{visit.date}</span>
                </div>
                <h2 className="mt-3 text-base font-semibold text-zinc-950 dark:text-white">
                  {visit.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">{visit.group}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">6개월 리포트</p>
              <p className="text-xs text-zinc-500">기록 기반 추이</p>
            </div>
            <div className="space-y-3">
              {reportBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 flex justify-between text-xs text-zinc-500">
                    <span>{bar.label}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className={`h-full ${bar.width} ${bar.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
