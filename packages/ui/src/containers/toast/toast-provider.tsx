"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ToastItem } from "../../components/toast";
import type {
  Toast,
  ToastContextValue,
  ToastInput,
} from "../../components/toast";

const DEFAULT_DURATION_MS = 3000;
const EXIT_DURATION_MS = 220;
const MOBILE_TOAST_LIMIT = 2;
const DESKTOP_TOAST_LIMIT = 3;

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function useToastLimit() {
  const [limit, setLimit] = useState(MOBILE_TOAST_LIMIT);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 48rem)");
    const updateLimit = () => {
      setLimit(mediaQuery.matches ? DESKTOP_TOAST_LIMIT : MOBILE_TOAST_LIMIT);
    };

    updateLimit();
    mediaQuery.addEventListener("change", updateLimit);

    return () => mediaQuery.removeEventListener("change", updateLimit);
  }, []);

  return limit;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const visibleLimit = useToastLimit();

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.map((toast) =>
        toast.id === id ? { ...toast, isLeaving: true } : toast,
      ),
    );

    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      );
    }, EXIT_DURATION_MS);
  }, []);

  const showToast = useCallback(
    (toastInput: ToastInput) => {
      const id = createToastId();

      setToasts((currentToasts) =>
        [
          {
            description: toastInput.description,
            durationMs: toastInput.durationMs ?? DEFAULT_DURATION_MS,
            id,
            isLeaving: false,
            title: toastInput.title,
            variant: toastInput.variant ?? "info",
          },
          ...currentToasts,
        ].slice(0, visibleLimit),
      );

      return id;
    },
    [visibleLimit],
  );

  const contextValue = useMemo<ToastContextValue>(
    () => ({ dismissToast, showToast }),
    [dismissToast, showToast],
  );

  const visibleToasts = toasts.slice(0, visibleLimit);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastViewport dataAttribute="toast-root">
        {visibleToasts.map((toast) => (
          <ToastItem
            key={toast.id}
            onDismiss={dismissToast}
            toast={toast}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}

type ToastViewportProps = {
  children: ReactNode;
  dataAttribute: "initial-toast-root" | "toast-root";
};

export function ToastViewport({
  children,
  dataAttribute,
}: ToastViewportProps) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className="pointer-events-none fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2.5 tablet:right-6 tablet:top-6"
      data-initial-toast-root={dataAttribute === "initial-toast-root" ? "" : undefined}
      data-toast-root={dataAttribute === "toast-root" ? "" : undefined}
      role="status"
    >
      {children}
    </div>
  );
}
