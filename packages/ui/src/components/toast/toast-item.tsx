"use client";

import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Toast, ToastVariant } from "./toast.types";

const DRAG_DISMISS_DISTANCE = 96;

const variantClassName: Record<ToastVariant, string> = {
  error: "border-[#efc9c3] bg-[#fff8f7] text-[#a84035]",
  info: "border-[#dfe4f4] bg-[#f8f9ff] text-[#4246b8]",
  success: "border-[#d8e8dd] bg-[#f7fbf8] text-[#35734b]",
  warning: "border-[#efdcb5] bg-[#fffaf0] text-[#9f611b]",
};

const indicatorClassName: Record<ToastVariant, string> = {
  error: "bg-[#d05a48]",
  info: "bg-[#4f53c9]",
  success: "bg-[#3aa99f]",
  warning: "bg-[#f5b84c]",
};

type ToastItemProps = {
  onDismiss: (id: string) => void;
  toast: Toast;
};

export function ToastItem({ onDismiss, toast }: ToastItemProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  useEffect(() => {
    if (toast.isLeaving) return;

    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [onDismiss, toast.durationMs, toast.id, toast.isLeaving]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (toast.isLeaving) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    startXRef.current = event.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const nextDragX = Math.max(0, event.clientX - startXRef.current);
    setDragX(nextDragX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragX >= DRAG_DISMISS_DISTANCE) {
      onDismiss(toast.id);
      return;
    }

    setDragX(0);
  };

  const toastStyle = {
    "--toast-duration": `${toast.durationMs}ms`,
    "--toast-x": dragX > 0 ? `${dragX}px` : "0px",
  } as CSSProperties;
  const hasDescription = Boolean(toast.description);

  return (
    <div
      className={`toast-motion pointer-events-auto touch-pan-y select-none rounded-lg border px-4 py-3 shadow-[0_18px_40px_-26px_rgba(38,45,70,.55)] backdrop-blur ${variantClassName[toast.variant]}`}
      data-dragging={isDragging}
      data-state={toast.isLeaving ? "closing" : "open"}
      data-toast-item=""
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={toastStyle}
    >
      <div
        className={`grid grid-cols-[0.625rem_minmax(0,1fr)_1.75rem] gap-3 ${
          hasDescription ? "items-start" : "items-center"
        }`}
      >
        <span
          aria-hidden="true"
          className={`size-2.5 rounded-full ${
            hasDescription ? "mt-[0.4375rem]" : ""
          } ${indicatorClassName[toast.variant]}`}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold leading-5">
            {toast.title}
          </p>
          {toast.description ? (
            <p className="mt-1 text-sm font-semibold leading-6 text-[#6b6f84]">
              {toast.description}
            </p>
          ) : null}
        </div>
        <button
          aria-label="토스트 닫기"
          className="relative flex size-7 items-center justify-center rounded-full text-[#9aa0b5] transition before:absolute before:h-3.5 before:w-0.5 before:rotate-45 before:rounded-full before:bg-current after:absolute after:h-3.5 after:w-0.5 after:-rotate-45 after:rounded-full after:bg-current hover:bg-[#f3f4f8] hover:text-[#5c6174]"
          onClick={() => onDismiss(toast.id)}
          type="button"
        />
      </div>
    </div>
  );
}
