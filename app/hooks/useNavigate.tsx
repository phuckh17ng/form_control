import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCommonStore } from "../stores/commonStore";

export default function useNavigate() {
  const router = useRouter();
  const { setNavigateLoading } = useCommonStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRouterChanged, setRouterChanged] = useState(false);
  useEffect(() => {
    setRouterChanged(true);
    return () => {
      setRouterChanged(false);
    };
  }, [pathname, searchParams]);

  const navigate = useCallback(
    (path: string) => {
      if (pathname === path) return;
      setNavigateLoading(true, "closing");

      const timeout1 = setTimeout(() => {
        router.push(path);
        if (isRouterChanged) {
          setNavigateLoading(true, "opening");
        }
      }, 3000);

      const timeout2 = setTimeout(() => {
        setNavigateLoading(false, "opening");
      }, 5000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    },

    [isRouterChanged, pathname, router, setNavigateLoading]
  );

  return navigate;
}
