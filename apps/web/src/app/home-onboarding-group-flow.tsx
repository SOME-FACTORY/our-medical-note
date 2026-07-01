import { relationOptions, spaceOptions } from "./home-onboarding-panel.constants";
import type { SpaceType } from "./home-onboarding-panel.types";

type SpaceSelectStepProps = {
  onSelectSpace: (spaceType: SpaceType) => void;
  selectedSpace: SpaceType;
};

export function SpaceSelectStep({
  onSelectSpace,
  selectedSpace,
}: SpaceSelectStepProps) {
  return (
    <div className="space-y-3">
      {spaceOptions.map((option) => {
        const isSelected = option.value === selectedSpace;

        return (
          <button
            aria-pressed={isSelected}
            className={`app-focus app-interactive w-full rounded-[1.25rem] border p-4 text-left hover:border-[#d8dcf0] hover:bg-[#fbfbfe] ${
              isSelected
                ? "border-[#d8dcf0] bg-[#fbfbfe] shadow-[0_14px_28px_-26px_rgba(40,42,70,.5)]"
                : "border-[#e8eaf3] bg-white"
            }`}
            key={option.value}
            onClick={() => onSelectSpace(option.value)}
            type="button"
          >
            <span className="block text-base font-bold">{option.label}</span>
            <span className="mt-2 block text-sm leading-6 text-[#707487]">
              {option.helper}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type GroupFormStepProps = {
  groupName: string;
  onGroupNameChange: (value: string) => void;
  selectedSpace: SpaceType;
};

export function GroupFormStep({
  groupName,
  onGroupNameChange,
  selectedSpace,
}: GroupFormStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-[#4f53c9]">그룹 만들기</p>
        <h2 className="mt-2 text-xl font-bold leading-8">
          {selectedSpace === "personal"
            ? "나만 보는 기록 공간을 만들어요"
            : "함께 볼 기록 공간을 만들어요"}
        </h2>
      </div>

      <label className="app-interactive block rounded-[1.25rem] border border-[#e8eaf3] bg-white p-4">
        <span className="text-sm font-bold text-[#555b72]">그룹 이름</span>
        <input
          className="app-focus mt-3 h-12 w-full rounded-[1rem] border border-[#dfe3ef] bg-[#fbfbfe] px-4 text-base font-bold transition focus:border-[#4f53c9] focus:bg-white"
          maxLength={30}
          onChange={(event) => onGroupNameChange(event.target.value)}
          placeholder="예: 엄마와 나"
          value={groupName}
        />
      </label>
    </div>
  );
}

type TargetFormStepProps = {
  customRelation: string;
  onCustomRelationChange: (value: string) => void;
  onTargetNameChange: (value: string) => void;
  onTargetRelationChange: (value: string) => void;
  targetName: string;
  targetRelation: string;
};

export function TargetFormStep({
  customRelation,
  onCustomRelationChange,
  onTargetNameChange,
  onTargetRelationChange,
  targetName,
  targetRelation,
}: TargetFormStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-[#4f53c9]">대상자 추가</p>
        <h2 className="mt-2 text-xl font-bold leading-8">
          이 공간에서 누구의 기록을 남길까요?
        </h2>
      </div>

      <label className="app-interactive block rounded-[1.25rem] border border-[#e8eaf3] bg-white p-4">
        <span className="text-sm font-bold text-[#555b72]">이름 또는 별명</span>
        <input
          className="app-focus mt-3 h-12 w-full rounded-[1rem] border border-[#dfe3ef] bg-[#fbfbfe] px-4 text-base font-bold transition focus:border-[#4f53c9] focus:bg-white"
          maxLength={24}
          onChange={(event) => onTargetNameChange(event.target.value)}
          placeholder="예: 엄마"
          value={targetName}
        />
        <span className="mt-3 block text-sm leading-6 text-[#707487]">
          앱 안에서 구분하기 위한 이름이에요. 실명 대신 별명으로 적어도
          됩니다.
        </span>
      </label>

      <label className="app-interactive block rounded-[1.25rem] border border-[#e8eaf3] bg-white p-4">
        <span className="text-sm font-bold text-[#555b72]">나와의 관계</span>
        <select
          className="app-focus mt-3 h-12 w-full rounded-[1rem] border border-[#dfe3ef] bg-[#fbfbfe] px-4 text-base font-bold transition focus:border-[#4f53c9] focus:bg-white"
          onChange={(event) => onTargetRelationChange(event.target.value)}
          value={targetRelation}
        >
          {relationOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {targetRelation === "기타" ? (
          <input
            className="app-focus mt-3 h-12 w-full rounded-[1rem] border border-[#dfe3ef] bg-[#fbfbfe] px-4 text-base font-bold transition focus:border-[#4f53c9] focus:bg-white"
            maxLength={20}
            onChange={(event) => onCustomRelationChange(event.target.value)}
            placeholder="예: 이모, 삼촌, 보호자"
            value={customRelation}
          />
        ) : null}
      </label>
    </div>
  );
}
