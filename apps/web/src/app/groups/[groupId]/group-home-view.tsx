import { GroupHomeMain } from "./group-home-main";
import { GroupHomeRightPanel } from "./group-home-right-panel";
import {
  GroupHomeSidebar,
  MobileGroupHeader,
} from "./group-home-sidebar";

type GroupHomeViewProps = {
  group: {
    iconKey: string | null;
    id: string;
    name: string;
  };
};

export function GroupHomeView({ group }: GroupHomeViewProps) {
  const isPersonalSpace = group.iconKey === "personal";
  const groupSubtitle = isPersonalSpace ? "개인 의료 기록" : "가족 의료 기록";

  return (
    <main className="min-h-dvh bg-[#dfe2ec] text-[#25283b]">
      <section className="mx-auto flex min-h-dvh w-full max-w-[1500px] items-stretch justify-center p-0 tablet:p-4">
        <div className="soft-enter grid min-h-dvh w-full overflow-hidden bg-[#f4f5f9] shadow-[0_28px_80px_-58px_rgba(28,30,55,.72)] ring-1 ring-[#cfd4e3] tablet:min-h-[calc(100dvh-2rem)] tablet:rounded-[1.75rem] tablet:grid-cols-[260px_minmax(0,1fr)] desktop:grid-cols-[286px_minmax(0,1fr)_320px]">
          <GroupHomeSidebar groupName={group.name} subtitle={groupSubtitle} />

          <section className="flex min-h-dvh flex-col tablet:min-h-0">
            <MobileGroupHeader groupName={group.name} subtitle={groupSubtitle} />
            <GroupHomeMain />
          </section>

          <GroupHomeRightPanel />
        </div>
      </section>
    </main>
  );
}
