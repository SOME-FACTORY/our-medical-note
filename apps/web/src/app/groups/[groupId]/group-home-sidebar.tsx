import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

import { groupMenuItems } from "./group-home-data";
import { GroupHomeIconTile } from "./group-home-icons";

type GroupHomeSidebarProps = {
  groupName: string;
  subtitle: string;
};

export function GroupHomeSidebar({
  groupName,
  subtitle,
}: GroupHomeSidebarProps) {
  return (
    <aside className="hidden flex-col border-r border-[#dfe3ef] bg-[#f7f8fc] p-5 tablet:flex desktop:p-7">
      <div className="flex items-center gap-3">
        <BrandLogo priority />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">우리 가족 의료노트</p>
          <p className="mt-1 text-xs font-semibold text-[#8a8fa4]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="app-interactive mt-9 rounded-[1.35rem] border border-[#e2e6f2] bg-white p-4 shadow-[0_16px_34px_-30px_rgba(28,30,55,.55)]">
        <div className="flex items-center gap-3">
          <GroupHomeIconTile name="group" />
          <div className="min-w-0">
            <p className="truncate text-base font-bold">{groupName}</p>
            <p className="mt-1 text-sm font-semibold text-[#8a8fa4]">4명</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-1" aria-label="그룹 메뉴">
        {groupMenuItems.map((item, index) => (
          <Link
            aria-current={index === 0 ? "page" : undefined}
            className={`app-focus app-interactive flex h-12 items-center gap-3 rounded-[1rem] px-4 text-sm font-bold hover:bg-white ${
              index === 0
                ? "bg-white text-[#23263a] shadow-[0_12px_26px_-26px_rgba(28,30,55,.55)]"
                : "text-[#64697d]"
            }`}
            href={item.href}
            key={item.label}
          >
            <GroupHomeIconTile name={item.icon} size="sm" />
            {item.label}
          </Link>
        ))}
      </nav>

      <NextScheduleCard />
    </aside>
  );
}

export function MobileGroupHeader({
  groupName,
  subtitle,
}: GroupHomeSidebarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#e2e6f2] bg-white/95 px-5 py-5 backdrop-blur tablet:hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#8a8fa4]">{subtitle}</p>
          <h1 className="mt-1 truncate text-2xl font-bold">{groupName}</h1>
        </div>
        <Link
          className="app-focus app-interactive inline-flex h-10 shrink-0 items-center justify-center rounded-[1rem] bg-[#4f53c9] px-4 text-sm font-bold text-white shadow-[0_14px_24px_-20px_rgba(40,42,70,.62)]"
          href="#"
        >
          기록 추가
        </Link>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto" aria-label="모바일 메뉴">
        {groupMenuItems.map((item) => (
          <Link
            className="app-focus shrink-0 rounded-full bg-[#f0f2f8] px-4 py-2 text-sm font-bold text-[#64697d]"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function NextScheduleCard() {
  return (
    <div className="app-interactive mt-auto rounded-[1.25rem] border border-[#e2e6f2] bg-white p-4 shadow-[0_16px_34px_-32px_rgba(28,30,55,.5)]">
      <p className="text-xs font-bold text-[#9aa0b4]">다음 일정</p>
      <p className="mt-3 text-sm font-bold leading-6">아빠 내과 재방문</p>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#8a8fa4]">
        7월 18일 오전 10:30 · 서울가정의학과
      </p>
    </div>
  );
}
