"use client";

import { ToastContainerProps } from "@/types";

const variantClasses = {
  success:
    "bg-green-600 text-white shadow-lg dark:bg-green-700",
  error:
    "bg-red-600 text-white shadow-lg dark:bg-red-700",
  warning:
    "bg-yellow-600 text-white shadow-lg dark:bg-yellow-700",
};

export function ToastContainer({
  message,
  variant,
  isExiting,
  onDismiss,
}: ToastContainerProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-20 z-50 max-w-sm"
    >
      <div
        onClick={onDismiss}
        className={`
          cursor-pointer rounded-lg px-4 py-3 transition-all duration-200 ease-out
          toast-enter ${isExiting ? "toast-exit" : ""}
          ${variantClasses[variant]}
        `}
      >
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
