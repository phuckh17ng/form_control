import { useEffect, useState } from "react";

/**
 * Custom hook for get changing value after delay.
 * @param value string
 * @param delay number
 * @return delayed value.
 */
export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
