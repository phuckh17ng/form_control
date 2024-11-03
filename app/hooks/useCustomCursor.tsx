import { useCommonStore } from "../stores/commonStore";

export default function useCustomCursor(isUsed: boolean, cursor?: string) {
  const { setCustomCursor } = useCommonStore();

  return setCustomCursor(isUsed, cursor);
}
