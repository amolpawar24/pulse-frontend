import type { RootState } from "../store/store";

export const selectThemeMode = (state: RootState) => {
  return state.theme.mode;
};

export const selectThemeColor = (state: RootState) => {
  return state.theme.color;
};