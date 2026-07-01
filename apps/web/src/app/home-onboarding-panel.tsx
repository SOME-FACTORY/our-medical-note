"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createOnboardingGroup } from "./home-onboarding-actions";
import { GroupCompleteStep } from "./home-onboarding-complete-step";
import { HomeOnboardingFooterActions } from "./home-onboarding-footer-actions";
import {
  GroupFormStep,
  TargetFormStep,
  SpaceSelectStep,
} from "./home-onboarding-group-flow";
import {
  detailBySpace,
  getDefaultGroupName,
  getFooterText,
  getStepState,
} from "./home-onboarding-panel.constants";
import type {
  CreateGroupActionState,
  FlowStep,
  SpaceType,
} from "./home-onboarding-panel.types";
import type { HomeOnboardingStepState } from "./home-onboarding-progress";

const FINAL_GROUP_FORM_ID = "home-onboarding-final-group-form";
const initialCreateGroupState: CreateGroupActionState = {
  message: "",
  status: "idle",
};

export function HomeOnboardingPanel() {
  const router = useRouter();
  const [createGroupState, createGroupAction, isCreatingGroup] = useActionState(
    createOnboardingGroup,
    initialCreateGroupState,
  );
  const [selectedSpace, setSelectedSpace] = useState<SpaceType>("personal");
  const [flowStep, setFlowStep] = useState<FlowStep>("select");
  const [groupName, setGroupName] = useState(getDefaultGroupName("personal"));
  const [targetName, setTargetName] = useState("");
  const [targetRelation, setTargetRelation] = useState("엄마");
  const [customRelation, setCustomRelation] = useState("");
  const detail = detailBySpace[selectedSpace];
  const trimmedGroupName = groupName.trim();
  const trimmedTargetName = targetName.trim();
  const trimmedCustomRelation = customRelation.trim();
  const resolvedTargetRelation =
    targetRelation === "기타" ? trimmedCustomRelation : targetRelation;
  const canAddTarget =
    selectedSpace === "personal" ||
    (trimmedTargetName.length > 0 && resolvedTargetRelation.length > 0);

  useEffect(() => {
    const nextStepState = getStepState(flowStep, selectedSpace);

    window.dispatchEvent(
      new CustomEvent<HomeOnboardingStepState>("home-onboarding-step-change", {
        detail: nextStepState,
      }),
    );
  }, [flowStep, selectedSpace]);

  useEffect(() => {
    if (createGroupState.status === "success" && createGroupState.groupId) {
      router.replace(`/groups/${createGroupState.groupId}/enter`);
    }
  }, [createGroupState.groupId, createGroupState.status, router]);

  const handleSelectSpace = (spaceType: SpaceType) => {
    setSelectedSpace(spaceType);
    setGroupName(getDefaultGroupName(spaceType));
    setTargetName("");
    setTargetRelation("엄마");
    setCustomRelation("");
  };

  const resetFlow = () => {
    setFlowStep("select");
    setTargetName("");
    setTargetRelation("엄마");
    setCustomRelation("");
  };

  return (
    <>
      <div className="grid gap-4 p-5 desktop:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] desktop:p-7">
        <div className="min-w-0">
          {flowStep === "select" ? (
            <SpaceSelectStep
              selectedSpace={selectedSpace}
              onSelectSpace={handleSelectSpace}
            />
          ) : null}

          {flowStep === "form" ? (
            <GroupFormStep
              groupName={groupName}
              selectedSpace={selectedSpace}
              onGroupNameChange={setGroupName}
            />
          ) : null}

          {flowStep === "target" ? (
            <TargetFormStep
              customRelation={customRelation}
              targetName={targetName}
              targetRelation={targetRelation}
              onCustomRelationChange={setCustomRelation}
              onTargetNameChange={setTargetName}
              onTargetRelationChange={setTargetRelation}
            />
          ) : null}

          {flowStep === "complete" ? (
            <GroupCompleteStep
              formAction={createGroupAction}
              formId={FINAL_GROUP_FORM_ID}
              groupName={trimmedGroupName}
              isSaved={createGroupState.status === "success"}
              isSubmitting={isCreatingGroup}
              serverMessage={createGroupState.message}
              serverStatus={createGroupState.status}
              selectedSpace={selectedSpace}
              targetName={trimmedTargetName}
              targetRelation={resolvedTargetRelation}
              onReset={resetFlow}
            />
          ) : null}
        </div>

        <aside className="rounded-[1.25rem] bg-[#f7f8fc] p-5 desktop:p-6">
          <p className="text-sm font-bold text-[#7c80a0]">{detail.title}</p>
          <p className="mt-4 text-sm leading-7 text-[#555b72]">
            {flowStep === "complete"
              ? selectedSpace === "personal"
                ? "이제 바로 첫 기록을 시작할 수 있어요."
                : "이제 필요한 사람을 초대하고 함께 볼 기록을 정리할 수 있어요."
              : detail.body}
          </p>

          <div className="mt-5 rounded-[1rem] border border-[#e4e7f2] bg-white p-4">
            <p className="text-xs font-bold text-[#8a8fa4]">공유 범위</p>
            <p className="mt-2 text-sm leading-6 text-[#555b72]">
              이 공간에 저장한 기록은 이 그룹 안에서만 볼 수 있게 다뤄야
              해요.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-[#edf0f8] px-5 py-5 tablet:flex-row tablet:items-center tablet:justify-between desktop:px-7">
        <p className="max-w-2xl flex-1 text-sm leading-6 text-[#707487]">
          {getFooterText(flowStep, selectedSpace, detail.footer)}
        </p>
        <HomeOnboardingFooterActions
          canAddTarget={canAddTarget}
          canContinueGroup={Boolean(trimmedGroupName)}
          createGroupStatus={createGroupState.status}
          finalGroupFormId={FINAL_GROUP_FORM_ID}
          flowStep={flowStep}
          isCreatingGroup={isCreatingGroup}
          selectedSpace={selectedSpace}
          onMoveToComplete={() => setFlowStep("complete")}
          onMoveToForm={() => setFlowStep("form")}
          onMoveToGroupForm={() => setFlowStep("select")}
          onMoveToTarget={() => setFlowStep("target")}
        />
      </div>
    </>
  );
}
