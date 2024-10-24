import { create } from "zustand";

export type CommonState = {
  isLoading: boolean;
};

export type CommonActions = {
  setLoading: (val?: boolean) => void;
};

export type CommonStore = CommonState & CommonActions;

export const initCommonStore = (): CommonState => {
  return { isLoading: false };
};

export const defaultInitState: CommonState = {
  isLoading: false,
};

export const useCommonStore = create<CommonStore>((set) => ({
  isLoading: false,
  setLoading: (val?) =>
    set((state) => ({ isLoading: val || !state.isLoading })),
}));
