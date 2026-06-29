import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeClassName = {
  sm: "size-11 rounded-2xl",
  md: "size-16 rounded-[1.35rem]",
  lg: "size-20 rounded-[1.6rem]",
};

export function BrandLogo({ priority = false, size = "sm" }: BrandLogoProps) {
  return (
    <Image
      alt="우리 가족 의료노트"
      className={`${sizeClassName[size]} object-cover shadow-[0_18px_30px_-18px_rgba(34,132,209,.75)]`}
      height={1024}
      priority={priority}
      src="/brand/family-health-note-icon.png"
      width={1024}
    />
  );
}

