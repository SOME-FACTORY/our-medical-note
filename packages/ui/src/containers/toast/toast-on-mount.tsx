"use client";

import { useState } from "react";

import { ToastItem } from "../../components/toast";
import type { Toast, ToastInput } from "../../components/toast";
import { ToastViewport } from "./toast-provider";

const EXIT_DURATION_MS = 220;
const DEFAULT_DURATION_MS = 3000;

type ToastOnMountProps = {
  toast: ToastInput;
};

export function ToastOnMount({ toast }: ToastOnMountProps) {
  const [visibleToast, setVisibleToast] = useState<Toast | null>(() => ({
    description: toast.description,
    durationMs: toast.durationMs ?? DEFAULT_DURATION_MS,
    id: "initial-toast",
    isLeaving: false,
    title: toast.title,
    variant: toast.variant ?? "info",
  }));

  const dismissToast = () => {
    setVisibleToast((currentToast) =>
      currentToast ? { ...currentToast, isLeaving: true } : null,
    );

    window.setTimeout(() => {
      setVisibleToast(null);
    }, EXIT_DURATION_MS);
  };

  if (!visibleToast) return null;

  return (
    <ToastViewport dataAttribute="initial-toast-root">
      <ToastItem onDismiss={dismissToast} toast={visibleToast} />
    </ToastViewport>
  );
}
