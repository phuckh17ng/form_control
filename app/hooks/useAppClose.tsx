import { useCallback, useEffect, useMemo, useState } from "react";

export default function useAppClose() {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event?.key?.toUpperCase();
    const prevKey = event.ctrlKey || event.metaKey ? "CONTROL" : "ALT";

    if (
      key === "F5" ||
      (key === "W" && prevKey === "CONTROL") ||
      (key === "R" && prevKey === "CONTROL") ||
      (key === "F4" && prevKey === "ALT") ||
      (key === "F4" && prevKey === "CONTROL")
    ) {
      setIsLeaving(true);
    }
  }, []);

  const handleMouseOver = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsLeaving(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, handleMouseOut, handleMouseOver]);

  return useMemo(() => isLeaving, [isLeaving]);
}
