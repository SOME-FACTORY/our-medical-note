import type { FlowStep, SpaceType } from "./home-onboarding-panel.types";
import type { HomeOnboardingStepState } from "./home-onboarding-progress";

export const spaceOptions: Array<{
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

export const detailBySpace: Record<
  SpaceType,
  {
    body: string;
    footer: string;
    title: string;
  }
> = {
  care: {
    body: "가족이나 돌봄 관계의 기록을 모을 그룹을 만들어요. 초대와 대상자 연결은 다음 단계에서 이어가요.",
    footer: "기록 공간은 그룹이에요. 만든 뒤 그 안에서만 기록을 공유하게 됩니다.",
    title: "그룹 기록 공간",
  },
  personal: {
    body: "혼자 쓰는 공간도 그룹처럼 만들어요. 나중에 필요해지면 함께 볼 사람을 초대할 수 있어요.",
    footer: "먼저 나만 보는 기록 공간을 만들고, 공유는 기록마다 선택해요.",
    title: "나만 보는 공간",
  },
};

export const relationOptions = [
  "엄마",
  "아빠",
  "배우자",
  "자녀",
  "형제자매",
  "친구",
  "돌봄 대상",
  "기타",
];

export function getDefaultGroupName(spaceType: SpaceType) {
  return spaceType === "personal" ? "내 의료 기록" : "가족 의료 기록";
}

export function getFooterText(
  flowStep: FlowStep,
  selectedSpace: SpaceType,
  defaultFooter: string,
) {
  if (flowStep === "form") {
    return "개인 공간은 확인 화면으로 가고, 가족·돌봄 공간은 다음 화면에서 대상자를 추가해요.";
  }

  if (flowStep === "target") {
    return "가족·돌봄 기록은 누구의 기록인지 먼저 정해야 나중에 그룹 안에서 헷갈리지 않아요.";
  }

  if (flowStep === "complete") {
    return selectedSpace === "personal"
      ? "아직 저장 전이에요. 첫 기록을 시작할 때 기록 공간을 만듭니다."
      : "아직 저장 전이에요. 다음으로 넘어갈 때 그룹을 만듭니다.";
  }

  return defaultFooter;
}

export function getStepState(
  flowStep: FlowStep,
  selectedSpace: SpaceType,
): HomeOnboardingStepState {
  if (flowStep === "target") {
    return {
      activeStep: "target",
      completedSteps: ["space"],
      skippedSteps: [],
    };
  }

  if (flowStep === "complete" && selectedSpace === "personal") {
    return {
      activeStep: "space",
      completedSteps: ["space"],
      skippedSteps: ["target", "invite"],
    };
  }

  if (flowStep === "complete" && selectedSpace === "care") {
    return {
      activeStep: "invite",
      completedSteps: ["space", "target"],
      skippedSteps: [],
    };
  }

  return {
    activeStep: "space",
    completedSteps: [],
    skippedSteps: [],
  };
}
