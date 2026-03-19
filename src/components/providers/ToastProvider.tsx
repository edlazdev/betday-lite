"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ToastContainer } from "@/components/ui/shared/ToastContainer";
import { ToastVariant, ToastState, ToastContextValue } from "@/types";

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 800;
const TOAST_EXIT_MS = 200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ToastState>(null);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    setIsExiting(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setState(null);
      setIsExiting(false);
      timeoutRef.current = null;
    }, TOAST_EXIT_MS);
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState({ message, variant });
      setIsExiting(false);
      timeoutRef.current = setTimeout(() => hide(), TOAST_DURATION_MS);
    },
    [hide]
  );

  const value: ToastContextValue = {
    success: (msg) => toast(msg, "success"),
    error: (msg) => toast(msg, "error"),
    warning: (msg) => toast(msg, "warning"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        message={state?.message}
        variant={state?.variant ?? "success"}
        isExiting={isExiting}
        onDismiss={hide}
      />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
