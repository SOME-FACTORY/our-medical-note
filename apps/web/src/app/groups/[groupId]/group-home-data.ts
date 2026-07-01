import type { GroupHomeIconName } from "./group-home-icons";

export const groupMenuItems = [
  { href: "#", icon: "home", label: "홈" },
  { href: "#", icon: "record", label: "기록 추가" },
  { href: "#", icon: "timeline", label: "타임라인" },
  { href: "#", icon: "group", label: "그룹 관리" },
  { href: "#", icon: "invite", label: "초대" },
] satisfies Array<{
  href: string;
  icon: GroupHomeIconName;
  label: string;
}>;

export const recentRecords = [
  {
    date: "2024.05.10",
    initial: "엄",
    meta: "서울의원 · 감기, 기침",
    person: "엄마",
  },
  {
    date: "2024.05.08",
    initial: "아",
    meta: "서울내과 · 혈압 체크",
    person: "아빠",
  },
  {
    date: "2024.05.07",
    initial: "나",
    meta: "강남정형외과 · 허리 통증",
    person: "나",
  },
];

export const quickActions = [
  { icon: "record", label: "빠른 기록", tone: "primary" },
  { icon: "timeline", label: "타임라인", tone: "plain" },
  { icon: "group", label: "그룹 관리", tone: "plain" },
] satisfies Array<{
  icon: GroupHomeIconName;
  label: string;
  tone: "plain" | "primary";
}>;

export const rightRecentRecords = [
  {
    icon: "병",
    meta: "내과 · 감기 증상 · 5월 10일",
    title: "엄마 · 서울의원",
  },
  {
    icon: "약",
    meta: "허리 통증 · 4월 22일",
    title: "아빠 · 정형외과",
  },
];
