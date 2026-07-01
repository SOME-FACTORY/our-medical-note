import type { CreateGroupActionState, FlowStep, SpaceType } from "./home-onboarding-panel.types";

type HomeOnboardingFooterActionsProps = {
  canAddTarget: boolean;
  canContinueGroup: boolean;
  createGroupStatus: CreateGroupActionState["status"];
  finalGroupFormId: string;
  flowStep: FlowStep;
  isCreatingGroup: boolean;
  onMoveToForm: () => void;
  onMoveToGroupForm: () => void;
  onMoveToTarget: () => void;
  onMoveToComplete: () => void;
  selectedSpace: SpaceType;
};

export function HomeOnboardingFooterActions({
  canAddTarget,
  canContinueGroup,
  createGroupStatus,
  finalGroupFormId,
  flowStep,
  isCreatingGroup,
  onMoveToForm,
  onMoveToGroupForm,
  onMoveToTarget,
  onMoveToComplete,
  selectedSpace,
}: HomeOnboardingFooterActionsProps) {
  return (
    <div className="flex shrink-0 gap-2">
      {flowStep === "form" || flowStep === "target" ? (
        <button
          className="app-focus app-interactive h-12 whitespace-nowrap rounded-[1rem] border border-[#e2e5ef] bg-white px-5 text-sm font-bold text-[#6e7284] hover:border-[#d6dae8] hover:text-[#4f53c9]"
          onClick={flowStep === "form" ? onMoveToGroupForm : onMoveToForm}
          type="button"
        >
          이전
        </button>
      ) : null}

      {flowStep === "select" ? (
        <button
          className="app-focus app-interactive h-12 shrink-0 whitespace-nowrap rounded-[1rem] bg-[#4f53c9] px-6 text-sm font-bold text-white shadow-[0_16px_26px_-20px_rgba(40,42,70,.62)]"
          onClick={onMoveToForm}
          type="button"
        >
          기록 공간 만들기
        </button>
      ) : null}

      {flowStep === "form" ? (
        <button
          className="app-focus app-interactive h-12 shrink-0 whitespace-nowrap rounded-[1rem] bg-[#4f53c9] px-6 text-sm font-bold text-white shadow-[0_16px_26px_-20px_rgba(40,42,70,.62)] disabled:cursor-not-allowed disabled:bg-[#dcdde6] disabled:text-[#a3a6b6]"
          disabled={!canContinueGroup}
          onClick={selectedSpace === "personal" ? onMoveToComplete : onMoveToTarget}
          type="button"
        >
          {selectedSpace === "personal" ? "확인하기" : "대상자 추가"}
        </button>
      ) : null}

      {flowStep === "target" ? (
        <button
          className="app-focus app-interactive h-12 shrink-0 whitespace-nowrap rounded-[1rem] bg-[#2a8f84] px-6 text-sm font-bold text-white shadow-[0_16px_26px_-20px_rgba(40,42,70,.62)] disabled:cursor-not-allowed disabled:bg-[#dcdde6] disabled:text-[#a3a6b6]"
          disabled={!canAddTarget}
          onClick={onMoveToComplete}
          type="button"
        >
          대상자 추가 완료
        </button>
      ) : null}

      {flowStep === "complete" ? (
        <button
          className="app-focus app-interactive h-12 shrink-0 whitespace-nowrap rounded-[1rem] bg-[#4f53c9] px-6 text-sm font-bold text-white shadow-[0_16px_26px_-20px_rgba(40,42,70,.62)] disabled:cursor-not-allowed disabled:bg-[#dcdde6] disabled:text-[#a3a6b6]"
          disabled={isCreatingGroup || createGroupStatus === "success"}
          form={finalGroupFormId}
          type="submit"
        >
          {isCreatingGroup
            ? "만드는 중..."
            : createGroupStatus === "success"
              ? "생성 완료"
              : selectedSpace === "personal"
                ? "첫 기록 시작하기"
                : "초대 설정으로 계속"}
        </button>
      ) : null}
    </div>
  );
}
