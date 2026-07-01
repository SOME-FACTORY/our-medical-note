import Link from "next/link";

import { quickActions, recentRecords } from "./group-home-data";
import { GroupHomeIconTile } from "./group-home-icons";
import { NextScheduleCard } from "./group-home-sidebar";

export function GroupHomeMain() {
  return (
    <div className="flex-1 px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-10">
      <div className="hidden items-center justify-between gap-4 tablet:flex">
        <Link
          className="app-focus app-interactive inline-flex h-11 items-center justify-center rounded-[1rem] border border-[#e2e6f2] bg-white px-5 text-sm font-bold text-[#4f53c9] shadow-[0_12px_24px_-24px_rgba(28,30,55,.6)] hover:border-[#d6dae8]"
          href="/?view=groups"
        >
          그룹 선택으로 이동
        </Link>
        <div className="flex gap-2">
          <button
            aria-label="그룹 홈 설정"
            className="app-focus app-interactive grid size-11 place-items-center rounded-[1rem] border border-[#e2e6f2] bg-white"
            type="button"
          >
            <GroupHomeIconTile name="gear" size="sm" />
          </button>
          <button
            aria-label="기록 추가"
            className="app-focus app-interactive grid size-11 place-items-center rounded-[1rem] border border-[#e2e6f2] bg-white"
            type="button"
          >
            <GroupHomeIconTile name="record" size="sm" />
          </button>
        </div>
      </div>

      <RecentRecordsSection />
      <QuickActionsSection />

      <section className="mt-8 desktop:hidden">
        <NextScheduleCard />
      </section>
    </div>
  );
}

function RecentRecordsSection() {
  return (
    <section className="mt-2 tablet:mt-12">
      <p className="text-sm font-bold text-[#8a8fa4]">최근 기록</p>
      <div className="mt-4 grid gap-3">
        {recentRecords.map((record) => (
          <Link
            className="app-focus app-interactive grid min-h-20 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[1.25rem] border border-[#e5e8f2] bg-white px-4 py-4 shadow-[0_14px_30px_-30px_rgba(28,30,55,.45)] hover:border-[#d8dcf0] hover:shadow-[0_20px_42px_-34px_rgba(28,30,55,.62)] tablet:px-5"
            href="#"
            key={`${record.person}-${record.date}`}
          >
            <span className="grid size-12 place-items-center rounded-[1rem] bg-[#f0f1ff] text-base font-bold text-[#4f53c9]">
              {record.initial}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-bold">
                {record.person}{" "}
                <span className="ml-2 text-sm font-semibold text-[#9aa0b4]">
                  {record.date}
                </span>
              </span>
              <span className="mt-1 block truncate text-sm font-semibold text-[#74798e]">
                {record.meta}
              </span>
            </span>
            <span className="text-lg font-bold text-[#c2c7d6]">{">"}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuickActionsSection() {
  return (
    <section className="mt-8">
      <p className="text-sm font-bold text-[#8a8fa4]">빠른 메뉴</p>
      <div className="mt-4 grid gap-3 tablet:grid-cols-3">
        {quickActions.map((action) => (
          <button
            className={`app-focus app-interactive min-h-28 rounded-[1.25rem] border p-5 text-sm font-bold shadow-[0_16px_34px_-30px_rgba(28,30,55,.5)] ${
              action.tone === "primary"
                ? "border-[#4f53c9] bg-[#4f53c9] text-white hover:shadow-[0_22px_38px_-28px_rgba(79,83,201,.8)]"
                : "border-[#e5e8f2] bg-white text-[#4c5065] hover:border-[#d8dcf0]"
            }`}
            key={action.label}
            type="button"
          >
            <GroupHomeIconTile name={action.icon} />
            <span className="mt-3 block">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
