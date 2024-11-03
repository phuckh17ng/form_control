"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useCommonStore } from "../stores/commonStore";

export default function useNavigate() {
  const router = useRouter();
  const { setNavigateLoading, setCustomCursor, setLoading } = useCommonStore();
  const pathname = usePathname();
  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      setCustomCursor(false);
      setNavigateLoading(true, "opening");
      const timeoutId = setTimeout(() => {
        setNavigateLoading(false, "opening");
        setLoading();
      }, 2600);

      // Update REF
      savedPathNameRef.current = pathname;

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, setCustomCursor, setLoading, setNavigateLoading]);

  const navigate = useCallback(
    // Navigate to the given path with a delay before transitioning
    (path: string) => {
      if (pathname === path) return;
      setLoading();
      setNavigateLoading(true, "closing");
      const timeoutId = setTimeout(() => {
        // Delay before closing the navigation loading state
        router.push(path);
      }, 1800);

      return () => {
        clearTimeout(timeoutId);
      };
    },

    [pathname, router, setLoading, setNavigateLoading]
  );

  return navigate;
}
