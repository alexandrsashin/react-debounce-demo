import { renderHook } from "@testing-library/react";
import { useDebouncedCallback } from "./useDebouncedCallback";

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should debounce the callback", async () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 100));

    result.current();
    result.current();
    result.current();

    expect(callback).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(150);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should use the latest callback when debounced function is called", async () => {
    let result = "initial";
    const callback1 = () => {
      result = "first";
    };
    const callback2 = () => {
      result = "second";
    };

    const { result: hookResult, rerender } = renderHook(
      ({ callback, delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { callback: callback1, delay: 100 } }
    );

    hookResult.current();

    // Update callback before debounce executes
    rerender({ callback: callback2, delay: 100 });

    await vi.advanceTimersByTimeAsync(150);

    expect(result).toBe("second");
  });

  it("should preserve callbackRef across re-renders with same delay", () => {
    const callback = () => {
      // no-op
    };

    const { result, rerender } = renderHook(
      ({ callback, delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { callback, delay: 100 } }
    );

    const firstDebounced = result.current;

    rerender({ callback, delay: 100 });

    const secondDebounced = result.current;

    expect(firstDebounced).toBe(secondDebounced);
  });

  it("should update callbackRef when callback changes", async () => {
    const calls: string[] = [];
    const callback1 = () => {
      calls.push("first");
    };
    const callback2 = () => {
      calls.push("second");
    };

    const { result: hookResult, rerender } = renderHook(
      ({ callback, delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { callback: callback1, delay: 100 } }
    );

    hookResult.current();
    await vi.advanceTimersByTimeAsync(150);

    rerender({ callback: callback2, delay: 100 });

    hookResult.current();
    await vi.advanceTimersByTimeAsync(150);

    expect(calls).toEqual(["first", "second"]);
  });

  it("should maintain correct callbackRef with multiple rapid callback changes", async () => {
    let result = "";
    const callbacks = [
      () => {
        result = "a";
      },
      () => {
        result = "b";
      },
      () => {
        result = "c";
      },
    ];

    const { result: hookResult, rerender } = renderHook(
      ({ callback, delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { callback: callbacks[0], delay: 100 } }
    );

    hookResult.current();

    rerender({ callback: callbacks[1], delay: 100 });
    rerender({ callback: callbacks[2], delay: 100 });

    await vi.advanceTimersByTimeAsync(150);

    expect(result).toBe("c");
  });

  it("should cancel pending debounced callback on unmount", async () => {
    const callback = vi.fn();

    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, 100)
    );

    result.current();

    // Unmount before debounce executes
    unmount();

    await vi.advanceTimersByTimeAsync(150);

    // Callback should NOT have been called
    expect(callback).not.toHaveBeenCalled();
  });
});
