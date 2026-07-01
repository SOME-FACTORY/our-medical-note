"use client";

import { useEffect, useState } from "react";

export type HomeSetupStep = "space" | "target" | "invite";
export type HomeOnboardingStepState = {
  activeStep: HomeSetupStep;
  completedSteps: HomeSetupStep[];
  skippedSteps: HomeSetupStep[];
};

const setupSteps: Array<{
  description: string;
  id: HomeSetupStep;
  title: string;
}> = [
  {
    description: "혼자 쓸지, 함께 쓸지 정해요.",
    id: "space",
    title: "기록 공간 만들기",
  },
  {
    description: "가족·돌봄 공간에서 먼저 추가해요.",
    id: "target",
    title: "대상자 추가",
  },
  {
    description: "필요할 때 초대하고 연결해요.",
    id: "invite",
    title: "초대와 관계 연결",
  },
];

const defaultStepState: HomeOnboardingStepState = {
  activeStep: "space",
  completedSteps: [],
  skippedSteps: [],
};

function getStepStatus(
  stepId: HomeSetupStep,
  stepState: HomeOnboardingStepState,
) {
  if (stepState.skippedSteps.includes(stepId)) return "건너뜀";
  if (stepState.completedSteps.includes(stepId)) return "완료";
  if (stepId === stepState.activeStep) return "현재 단계";
  return "다음";
}

function useHomeOnboardingStepState() {
  const [stepState, setStepState] =
    useState<HomeOnboardingStepState>(defaultStepState);
  useEffect(() => {
    const handleStepChange = (event: Event) => {
      const nextStepState = (event as CustomEvent<HomeOnboardingStepState>)
        .detail;
      setStepState(nextStepState);
    };

    window.addEventListener("home-onboarding-step-change", handleStepChange);

    return () => {
      window.removeEventListener(
        "home-onboarding-step-change",
        handleStepChange,
      );
    };
  }, []);

  return stepState;
}

export function HomeOnboardingProgress() {
  const stepState = useHomeOnboardingStepState();

  return (
    <nav className="mt-9 space-y-2" aria-label="처음 설정 단계">
      {setupSteps.map((step) => {
        const status = getStepStatus(step.id, stepState);
        const isActive = status === "현재 단계";
        const isDone = status === "완료";
        const isSkipped = status === "건너뜀";

        return (
          <div
            className={`app-interactive rounded-[1.25rem] border p-4 ${
              isActive
                ? "border-[#d8dcf0] bg-white shadow-[0_14px_28px_-26px_rgba(40,42,70,.5)]"
              : isDone
                  ? "border-[#d6eadf] bg-white/75"
                  : isSkipped
                    ? "border-[#e5e7ef] bg-white/45"
                  : "border-transparent bg-white/45"
            }`}
            key={step.id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 text-sm font-bold">{step.title}</p>
              <span
                className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  isActive
                    ? "bg-[#eef0fb] text-[#4f53c9]"
                    : isDone
                      ? "bg-[#f4fbf7] text-[#35734b]"
                      : isSkipped
                        ? "bg-[#f0f2f8] text-[#8a8fa4]"
                      : "bg-[#f0f2f8] text-[#8a8fa4]"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#74798e]">
              {step.description}
            </p>
          </div>
        );
      })}
    </nav>
  );
}

export function HomeOnboardingStageHeader() {
  const stepState = useHomeOnboardingStepState();
  const header = getStageHeader(stepState);

  return (
    <div className="border-b border-[#edf0f8] px-5 py-5 desktop:px-7 desktop:py-6">
      <p className="text-sm font-bold text-[#4f53c9]">{header.title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#707487]">
        {header.description}
      </p>
    </div>
  );
}

function getStageHeader(stepState: HomeOnboardingStepState) {
  const isPersonalComplete =
    stepState.completedSteps.includes("space") &&
    stepState.skippedSteps.includes("target") &&
    stepState.skippedSteps.includes("invite");

  if (isPersonalComplete) {
    return {
      description:
        "나만 쓰는 기록 공간이 준비됐어요. 대상자 추가와 초대는 건너뛰었어요.",
      title: "설정 완료 / 개인 기록 공간",
    };
  }

  if (stepState.activeStep === "target") {
    return {
      description: "이 그룹에서 누구의 기록을 남길지 정해요.",
      title: "2단계 / 대상자 추가",
    };
  }

  if (stepState.activeStep === "invite") {
    return {
      description: "대상자까지 준비했어요. 필요한 사람을 초대할 수 있어요.",
      title: "3단계 / 초대와 관계 연결",
    };
  }

  return {
    description:
      "초대 전에도 기록은 시작할 수 있어요. 먼저 기록을 담을 공간을 만들어요.",
    title: "1단계 / 기록 공간",
  };
}
