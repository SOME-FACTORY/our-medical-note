import type { CreateGroupActionState, SpaceType } from "./home-onboarding-panel.types";

type GroupCompleteStepProps = {
  formAction: (formData: FormData) => void;
  formId: string;
  groupName: string;
  isSaved: boolean;
  isSubmitting: boolean;
  onReset: () => void;
  serverMessage: string;
  serverStatus: CreateGroupActionState["status"];
  selectedSpace: SpaceType;
  targetName: string;
  targetRelation: string;
};

export function GroupCompleteStep({
  formAction,
  formId,
  groupName,
  isSaved,
  isSubmitting,
  onReset,
  serverMessage,
  serverStatus,
  selectedSpace,
  targetName,
  targetRelation,
}: GroupCompleteStepProps) {
  const isPersonalSpace = selectedSpace === "personal";

  return (
    <div className="soft-enter rounded-[1.25rem] border border-[#d6eadf] bg-[#f7fbf8] p-5 shadow-[0_16px_34px_-32px_rgba(28,30,55,.5)]">
      <form action={formAction} id={formId}>
        <input name="group_name" type="hidden" value={groupName} />
        <input name="selected_space" type="hidden" value={selectedSpace} />
      </form>
      <p className="text-sm font-bold text-[#2a8f84]">
        {isSaved
          ? "기록 공간 생성 완료"
          : isPersonalSpace
            ? "기록 공간 만들 준비 완료"
            : "그룹과 대상자 준비 완료"}
      </p>
      <h2 className="mt-3 text-xl font-bold leading-8">{groupName}</h2>
      <p className="mt-2 text-sm leading-6 text-[#557065]">
        {isSaved
          ? "이제 이 공간에 첫 기록을 남길 수 있어요."
          : isPersonalSpace
            ? "마지막 버튼을 누르면 나만 보는 기록 공간을 만들고 첫 기록을 시작해요."
            : `${targetName}님을 ${targetRelation} 관계의 기록할 사람으로 추가했어요. 마지막 버튼을 누르면 그룹을 만들어요.`}
      </p>
      {serverStatus === "error" && serverMessage ? (
        <p className="mt-4 rounded-[1rem] border border-[#f1d7d2] bg-[#fff8f7] px-4 py-3 text-sm font-semibold text-[#c95745]">
          {serverMessage}
        </p>
      ) : null}
      {!isSaved ? (
        <button
          className="app-focus app-interactive mt-5 h-11 rounded-[1rem] border border-[#cfe3d7] bg-white px-4 text-sm font-bold text-[#35734b] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          onClick={onReset}
          type="button"
        >
          다시 설정하기
        </button>
      ) : null}
    </div>
  );
}
