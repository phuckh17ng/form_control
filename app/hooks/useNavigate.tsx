"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useCommonStore } from "../stores/commonStore";

export default function useNavigate() {
  const router = useRouter();
  const { setNavigateLoading, setLoading } = useCommonStore();
  const pathname = usePathname();
  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      setNavigateLoading(true, "opening");
      const timeoutId = setTimeout(() => {
        setNavigateLoading(false, "opening");
        setLoading();
      }, 2000);

      // Update REF
      savedPathNameRef.current = pathname;

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, setLoading, setNavigateLoading]);

  const navigate = useCallback(
    (path: string) => {
      if (pathname === path) return;
      setLoading();
      setNavigateLoading(true, "closing");

      const timeoutId = setTimeout(() => {
        router.push(path);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    },

    [pathname, router, setLoading, setNavigateLoading]
  );

  return navigate;
}
