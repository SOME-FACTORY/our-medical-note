"use client";

import { useState } from "react";

type SpaceType = "personal" | "care";

const spaceOptions: Array<{
  helper: string;
  label: string;
  value: SpaceType;
}> = [
  {
    helper: "내 병원 기록부터 차분히 정리해요.",
    label: "나만 쓰는 기록 공간",
    value: "personal",
  },
  {
    helper: "가까운 사람의 기록도 먼저 남길 수 있어요.",
    label: "가족·돌봄 기록 공간",
    value: "care",
  },
];

const detailBySpace: Record<
  SpaceType,
  {
    body: string;
    footer: string;
    title: string;
  }
> = {
  care: {
    body: "상대가 아직 가입하지 않아도 괜찮아요. 먼저 기록하고, 초대는 나중에 연결해요.",
    footer: "다음 단계에서 기록할 사람의 이름과 관계를 적어요.",
    title: "초대는 나중에",
  },
  personal: {
    body: "내 병원 방문만 먼저 정리해요. 필요해지면 가족·돌봄 기록으로 넓힐 수 있어요.",
    footer: "혼자 시작해도 나중에 함께 쓸 수 있어요.",
    title: "혼자 시작하기",
  },
};

export function HomeOnboardingPanel() {
  const [selectedSpace, setSelectedSpace] = useState<SpaceType>("personal");
  const detail = detailBySpace[selectedSpace];

  return (
    <>
      <div className="grid gap-4 p-5 desktop:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] desktop:p-7">
        <div className="space-y-3">
          {spaceOptions.map((option) => {
            const isSelected = option.value === selectedSpace;

            return (
              <button
                aria-pressed={isSelected}
                className={`w-full rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#d8dcf0] hover:bg-[#fbfbfe] ${
                  isSelected
                    ? "border-[#d8dcf0] bg-[#fbfbfe]"
                    : "border-[#e8eaf3] bg-white"
                }`}
                key={option.value}
                onClick={() => setSelectedSpace(option.value)}
                type="button"
              >
                <span className="block text-base font-bold">
                  {option.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#707487]">
                  {option.helper}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="rounded-[1.25rem] bg-[#f7f8fc] p-5 desktop:p-6">
          <p className="text-sm font-bold text-[#7c80a0]">{detail.title}</p>
          <p className="mt-4 text-sm leading-7 text-[#555b72]">
            {detail.body}
          </p>
        </aside>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-[#edf0f8] px-5 py-5 tablet:flex-row tablet:items-center tablet:justify-between desktop:px-7">
        <p className="max-w-2xl flex-1 text-sm leading-6 text-[#707487]">
          {detail.footer}
        </p>
        <button
          className="h-12 shrink-0 cursor-not-allowed whitespace-nowrap rounded-[1rem] bg-[#dcdde6] px-6 text-sm font-bold text-[#a3a6b6]"
          disabled
          type="button"
        >
          기록 공간 만들기
        </button>
      </div>
    </>
  );
}
