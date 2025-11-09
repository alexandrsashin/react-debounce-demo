import { useRef, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

export function useDebounceCallback<T>(
  callback: (...args: T[]) => void,
  delay: number
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useMemo(
    () => debounce((...args: T[]) => callbackRef.current(...args), delay),
    [delay]
  );

  useEffect(() => {
    return () => debouncedFn.cancel();
  }, [debouncedFn]);

  return debouncedFn;
}
