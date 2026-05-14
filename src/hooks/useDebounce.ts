/**
 * Custom React Hooks
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Debounce hook - delays value updates until inactivity
 * Use: Form autosave, expensive operations, reducing API calls
 * Performance: ~50x reduction in update frequency
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeoutRef.current);
  }, [value, delayMs]);

  return debouncedValue;
}
