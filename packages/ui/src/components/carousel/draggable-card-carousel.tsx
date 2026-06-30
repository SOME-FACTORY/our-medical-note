"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type DraggableCardCarouselProps<TItem> = {
  ariaLabel: string;
  autoPlayMs?: number;
  className?: string;
  getItemLabel: (item: TItem, index: number) => string;
  getItemKey: (item: TItem, index: number) => string;
  indicatorClassName?: string;
  itemClassName?: string;
  items: TItem[];
  renderItem: (item: TItem, index: number, isActive: boolean) => ReactNode;
  trackClassName?: string;
};

const DRAG_THRESHOLD_PX = 44;
const USER_INTERACTION_PAUSE_MS = 5000;

function getNextIndex(currentIndex: number, itemCount: number) {
  return (currentIndex + 1) % itemCount;
}

function getPreviousIndex(currentIndex: number, itemCount: number) {
  return (currentIndex - 1 + itemCount) % itemCount;
}

export function DraggableCardCarousel<TItem>({
  ariaLabel,
  autoPlayMs = 4200,
  className = "",
  getItemLabel,
  getItemKey,
  indicatorClassName = "",
  itemClassName = "",
  items,
  renderItem,
  trackClassName = "",
}: DraggableCardCarouselProps<TItem>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastUserInteractionAt, setLastUserInteractionAt] = useState(0);
  const pointerStartXRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2 || autoPlayMs <= 0 || isDragging) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const timeSinceInteraction = lastUserInteractionAt
      ? Date.now() - lastUserInteractionAt
      : USER_INTERACTION_PAUSE_MS;
    const delayMs = Math.max(
      autoPlayMs,
      USER_INTERACTION_PAUSE_MS - timeSinceInteraction,
    );

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => getNextIndex(currentIndex, items.length));
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, autoPlayMs, isDragging, items.length, lastUserInteractionAt]);

  if (items.length === 0) return null;

  const finishDrag = () => {
    if (!isDragging) return;

    setLastUserInteractionAt(Date.now());

    if (dragOffset <= -DRAG_THRESHOLD_PX) {
      setActiveIndex((currentIndex) => getNextIndex(currentIndex, items.length));
    }

    if (dragOffset >= DRAG_THRESHOLD_PX) {
      setActiveIndex((currentIndex) =>
        getPreviousIndex(currentIndex, items.length),
      );
    }

    pointerStartXRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (items.length < 2) return;

    setLastUserInteractionAt(Date.now());
    pointerStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartXRef.current === null) return;

    const viewportWidth = viewportRef.current?.clientWidth ?? 1;
    const nextOffset = event.clientX - pointerStartXRef.current;
    const clampedOffset = Math.max(
      Math.min(nextOffset, viewportWidth * 0.34),
      viewportWidth * -0.34,
    );

    setDragOffset(clampedOffset);
  };

  const translateX = `calc(-${activeIndex * 100}% + ${dragOffset}px)`;

  return (
    <div aria-label={ariaLabel} className={className}>
      <div
        className={`overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerCancel={finishDrag}
        onPointerDown={handlePointerDown}
        onPointerLeave={finishDrag}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        ref={viewportRef}
      >
        <div
          className={`flex touch-pan-y select-none ${
            isDragging ? "" : "transition-transform duration-500 ease-out"
          } ${trackClassName}`}
          style={{ transform: `translateX(${translateX})` }}
        >
          {items.map((item, index) => (
            <div
              aria-hidden={index !== activeIndex}
              className={`min-w-full ${itemClassName}`}
              key={getItemKey(item, index)}
            >
              {renderItem(item, index, index === activeIndex)}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div
          className={`mt-5 flex items-center justify-center gap-2 ${indicatorClassName}`}
        >
          {items.map((item, index) => (
            <button
              aria-label={getItemLabel(item, index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-[#4f53c9]"
                  : "w-2.5 bg-[#d9ddea] hover:bg-[#bfc5db]"
              }`}
              key={getItemKey(item, index)}
              onClick={() => {
                setLastUserInteractionAt(Date.now());
                setActiveIndex(index);
              }}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
