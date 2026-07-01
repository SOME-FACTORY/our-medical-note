export type SpaceType = "personal" | "care";
export type FlowStep = "select" | "form" | "target" | "complete";

export type CreateGroupActionState = {
  groupId?: string;
  message: string;
  status: "idle" | "success" | "error";
};
