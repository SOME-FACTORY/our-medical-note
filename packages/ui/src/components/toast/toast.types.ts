export type ToastVariant = "info" | "success" | "error" | "warning";

export type ToastInput = {
  description?: string;
  durationMs?: number;
  title: string;
  variant?: ToastVariant;
};

export type Toast = Required<Pick<ToastInput, "durationMs" | "variant">> &
  Pick<ToastInput, "description" | "title"> & {
    id: string;
    isLeaving: boolean;
  };

export type ToastContextValue = {
  dismissToast: (id: string) => void;
  showToast: (toast: ToastInput) => string;
};
