import { useCallback } from "react";
import { toast as defaultToast } from "sonner"; // or your toast lib

export function useToast() {
  return {
    toast: useCallback((options) => {
      defaultToast(options);
    }, []),
  };
}
