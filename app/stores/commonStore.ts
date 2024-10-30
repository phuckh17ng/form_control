import { PaletteMode } from "@mui/material";
import { create } from "zustand";

export type CommonState = {
  theme?: PaletteMode | undefined;
  isLoading: boolean;
  navigateLoading: {
    isNavigating: boolean;
    animate?: "opening" | "closing";
  };
  isFirstVisit: boolean;
};

export type CommonActions = {
  setLoading: (val?: boolean) => void;
  setTheme: (val?: PaletteMode | undefined) => void;
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
    theme: undefined,
  };
};

export const defaultInitState: CommonState = {
  isLoading: false,
  navigateLoading: { isNavigating: false },
  isFirstVisit: true,
  theme: undefined,
};

export const useCommonStore = create<CommonStore>((set) => ({
  ...defaultInitState,
  setTheme: (val) => set((state) => ({ ...state, theme: val })),
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
