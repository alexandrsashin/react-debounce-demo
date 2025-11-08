import { useRef, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<T>) => callbackRef.current(...args), delay),
    [delay]
  );

  useEffect(() => {
    return () => debouncedFn.cancel();
  }, [debouncedFn]);

  return debouncedFn;
}
