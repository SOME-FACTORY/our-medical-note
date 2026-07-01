import Link from "next/link";

import { rightRecentRecords } from "./group-home-data";

export function GroupHomeRightPanel() {
  return (
    <aside className="hidden border-l border-[#dfe3ef] bg-[#fbfbfe] p-6 desktop:block">
      <p className="text-xl font-bold">오늘의 기록</p>
      <p className="mt-1 text-sm font-bold text-[#9aa0b4]">2026년 6월 28일</p>
      <button
        className="app-focus app-interactive mt-6 h-14 w-full rounded-[1.15rem] bg-[#4f53c9] text-sm font-bold text-white shadow-[0_18px_30px_-24px_rgba(40,42,70,.7)]"
        type="button"
      >
        새 병원 기록 추가
      </button>

      <section className="mt-6 rounded-[1.25rem] border border-[#e2e6f2] bg-white p-5 shadow-[0_16px_34px_-32px_rgba(28,30,55,.45)]">
        <p className="text-sm font-bold text-[#9aa0b4]">최근 기록</p>
        <div className="mt-4 space-y-4">
          {rightRecentRecords.map((record) => (
            <div className="flex items-start gap-3" key={record.title}>
              <span className="grid size-10 place-items-center rounded-[0.9rem] bg-[#f0f2f8] text-xs font-bold text-[#4f53c9]">
                {record.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{record.title}</p>
                <p className="mt-1 truncate text-xs font-semibold text-[#8a8fa4]">
                  {record.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[1.25rem] border border-[#e2e6f2] bg-white p-5 shadow-[0_16px_34px_-32px_rgba(28,30,55,.45)]">
        <p className="text-sm font-bold text-[#9aa0b4]">빠른 이동</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["타임라인", "그룹 관리", "초대"].map((label) => (
            <Link
              className="app-focus app-interactive rounded-full bg-[#f0f2f8] px-4 py-2 text-sm font-bold text-[#64697d] hover:bg-[#e8ebf5]"
              href="#"
              key={label}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
