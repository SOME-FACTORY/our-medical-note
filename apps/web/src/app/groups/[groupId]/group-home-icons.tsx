export type GroupHomeIconName =
  | "gear"
  | "group"
  | "home"
  | "invite"
  | "record"
  | "timeline";

const iconToneByName: Record<GroupHomeIconName, string> = {
  gear: "bg-[#f0f2f8] text-[#64697d]",
  group: "bg-[#eef0fb] text-[#4f53c9]",
  home: "bg-[#fff3df] text-[#d47a1f]",
  invite: "bg-[#edf8f6] text-[#1d8c80]",
  record: "bg-[#eef0ff] text-[#4f53c9]",
  timeline: "bg-[#f4f0ff] text-[#7755d4]",
};

type GroupHomeIconTileProps = {
  name: GroupHomeIconName;
  size?: "md" | "sm";
};

export function GroupHomeIconTile({
  name,
  size = "md",
}: GroupHomeIconTileProps) {
  const sizeClass = size === "sm" ? "size-7 rounded-[0.75rem]" : "size-11";
  const strokeWidth = size === "sm" ? 2.35 : 2;

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-[1rem] ${sizeClass} ${iconToneByName[name]}`}
    >
      <IconSvg name={name} strokeWidth={strokeWidth} />
    </span>
  );
}

function IconSvg({
  name,
  strokeWidth,
}: {
  name: GroupHomeIconName;
  strokeWidth: number;
}) {
  return (
    <svg
      className="size-[58%]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
    >
      {getIconPath(name)}
    </svg>
  );
}

function getIconPath(name: GroupHomeIconName) {
  if (name === "home") {
    return (
      <>
        <path d="M4 11.2 12 4l8 7.2" />
        <path d="M6.8 10.3v8.2h10.4v-8.2" />
        <path d="M10 18.5v-5h4v5" />
      </>
    );
  }

  if (name === "record") {
    return (
      <>
        <path d="M7 4.5h7.2L18 8.3v11.2H7z" />
        <path d="M14 4.8V9h4" />
        <path d="M9.8 12.5h4.8" />
        <path d="M9.8 16h4.8" />
      </>
    );
  }

  if (name === "timeline") {
    return (
      <>
        <path d="M7 6h10" />
        <path d="M7 12h10" />
        <path d="M7 18h10" />
        <path d="M4 6h.1" />
        <path d="M4 12h.1" />
        <path d="M4 18h.1" />
      </>
    );
  }

  if (name === "group") {
    return (
      <>
        <path d="M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M4.5 19c.7-3 2.4-4.5 5-4.5s4.3 1.5 5 4.5" />
        <path d="M16.5 11.2a2.4 2.4 0 1 0-1.3-4.5" />
        <path d="M15.8 14.6c1.9.3 3.1 1.7 3.7 4.4" />
      </>
    );
  }

  if (name === "invite") {
    return (
      <>
        <path d="M9.3 11a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8Z" />
        <path d="M4.5 19c.7-2.9 2.3-4.3 4.8-4.3 1.4 0 2.5.4 3.3 1.3" />
        <path d="M17.5 13.5v6" />
        <path d="M14.5 16.5h6" />
      </>
    );
  }

  return (
    <>
      <path d="M12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z" />
      <path d="M18.2 13.4a6.8 6.8 0 0 0 .1-1.4l2-1.4-2-3.4-2.4 1a7.8 7.8 0 0 0-1.2-.7L14.4 5h-4.8l-.4 2.5c-.4.2-.8.4-1.2.7l-2.4-1-2 3.4 2 1.4a6.8 6.8 0 0 0 .1 1.4l-2.1 1.5 2 3.4 2.5-1c.3.3.7.5 1.1.7l.4 2.5h4.8l.4-2.5c.4-.2.8-.4 1.1-.7l2.5 1 2-3.4z" />
    </>
  );
}
