import { create } from "zustand";

export type CommonState = {
  isLoading: boolean;
  navigateLoading: {
    isNavigating: boolean;
    animate?: "opening" | "closing";
  };
  isFirstVisit: boolean;
};

export type CommonActions = {
  setLoading: (val?: boolean) => void;
  setNavigateLoading: (
    isNavigating: boolean,
    anmiate?: "opening" | "closing"
  ) => void;
  setFristVisit: (val: boolean) => void;
};

export type CommonStore = CommonState & CommonActions;

export const initCommonStore = (): CommonState => {
  return {
    isLoading: false,
    navigateLoading: { isNavigating: false },
    isFirstVisit: true,
  };
};

export const defaultInitState: CommonState = {
  isLoading: false,
  navigateLoading: { isNavigating: false },
  isFirstVisit: true,
};

export const useCommonStore = create<CommonStore>((set) => ({
  ...defaultInitState,
  setLoading: (val?) =>
    set((state) => ({ ...state, isLoading: val || !state.isLoading })),
  setNavigateLoading: (isNavigating, animate) =>
    set((state) => ({
      ...state,
      navigateLoading: {
        isNavigating: isNavigating,
        animate: animate,
      },
    })),
  setFristVisit: (val) =>
    set((state) => ({
      ...state,
      isFirstVisit: val,
    })),
}));
