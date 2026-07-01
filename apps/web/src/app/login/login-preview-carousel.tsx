"use client";

import Image from "next/image";

import { DraggableCardCarousel } from "@ours-medical-note/ui/components/carousel";

const featureSlides = [
  {
    body: "진료 전에 물어볼 내용을 적어둘 수 있어요.",
    imageAlt: "진료 전 메모를 준비하는 노트와 달력 일러스트",
    imageSrc: "/features/login-carousel/pre-visit-note.png",
    mobileBody: "물어볼 내용을 적어요.",
    title: "진료 전 질문 메모",
  },
  {
    body: "부모님이나 아이의 병원 기록도 대신 남길 수 있어요.",
    imageAlt: "작성자와 대상자가 구분된 기록 카드 일러스트",
    imageSrc: "/features/login-carousel/delegated-note.png",
    mobileBody: "가족 기록도 남겨요.",
    title: "가족 기록도 대신 작성",
  },
  {
    body: "처방전이나 약 봉투에서 확인한 내용을 함께 정리해요.",
    imageAlt: "처방전과 약 봉투를 확인하는 스캔 일러스트",
    imageSrc: "/features/login-carousel/prescription-review.png",
    mobileBody: "약 정보도 정리해요.",
    title: "약 정보 정리",
  },
  {
    body: "기록마다 함께 볼 가족이나 돌봄 그룹을 고를 수 있어요.",
    imageAlt: "선택된 그룹에만 기록을 공유하는 보안 일러스트",
    imageSrc: "/features/login-carousel/group-sharing.png",
    mobileBody: "함께 볼 사람을 골라요.",
    title: "함께 볼 사람 선택",
  },
];

const AUTO_PLAY_MS = 7000;

type LoginPreviewCarouselProps = {
  className?: string;
  compact?: boolean;
};

export function LoginPreviewCarousel({
  className = "",
  compact = false,
}: LoginPreviewCarouselProps) {
  return (
    <DraggableCardCarousel
      ariaLabel={
        compact
          ? "로그인 화면 모바일 기능 미리보기"
          : "로그인 화면 기능 미리보기"
      }
      autoPlayMs={AUTO_PLAY_MS}
      className={className}
      getItemKey={(slide) => slide.title}
      getItemLabel={(slide) => `${slide.title} 보기`}
      indicatorClassName={compact ? "mt-3" : ""}
      itemClassName={compact ? "px-1.5" : "px-2"}
      items={featureSlides}
      renderItem={(slide, index) => (
        <article
          className={`app-interactive rounded-[1.35rem] border border-[#e8eaf3] bg-white/90 shadow-[0_18px_36px_-32px_rgba(40,42,70,.46)] ${
            compact ? "p-3.5 tablet:p-4" : "p-4"
          }`}
        >
          {compact ? (
            <div className="flex gap-3 tablet:gap-4">
              <div className="relative size-[74px] shrink-0 overflow-hidden rounded-2xl bg-[#f7f8fc] tablet:size-24">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 96px, 74px"
                  src={slide.imageSrc}
                />
              </div>
              <div className="min-w-0 flex-1 tablet:flex tablet:flex-col tablet:justify-center">
                <h2 className="text-base font-bold leading-6">
                  {slide.title}
                </h2>
                <p className="mt-1.5 text-sm leading-5 text-[#6b6f84]">
                  {slide.mobileBody}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="relative h-32 overflow-hidden rounded-[1rem] bg-[#f7f8fc]">
                <Image
                  alt={slide.imageAlt}
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes="320px"
                  src={slide.imageSrc}
                />
              </div>

              <h2 className="mt-4 text-lg font-bold leading-7">
                {slide.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6b6f84]">
                {slide.body}
              </p>
            </>
          )}
        </article>
      )}
    />
  );
}
