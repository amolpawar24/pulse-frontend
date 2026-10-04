import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

export type ThemeColor =
  | "red"
  | "blue"
  | "green"
  | "pink"
  | "orange";

interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
}

const VALID_COLORS: ThemeColor[] = [
  "red",
  "blue",
  "green",
  "pink",
  "orange",
];

const getStoredMode = (): ThemeMode => {
  const storedMode = localStorage.getItem(
    "pulse-theme-mode",
  );

  if (
    storedMode === "dark" ||
    storedMode === "light"
  ) {
    return storedMode;
  }

  return "dark";
};

const getStoredColor = (): ThemeColor => {
  const storedColor = localStorage.getItem(
    "pulse-theme-color",
  );

  if (
    VALID_COLORS.includes(
      storedColor as ThemeColor,
    )
  ) {
    return storedColor as ThemeColor;
  }

  return "blue";
};

const initialState: ThemeState = {
  mode: getStoredMode(),
  color: getStoredColor(),
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    setThemeMode: (
      state,
      action: PayloadAction<ThemeMode>,
    ) => {
      state.mode = action.payload;

      localStorage.setItem(
        "pulse-theme-mode",
        action.payload,
      );
    },

    setThemeColor: (
      state,
      action: PayloadAction<ThemeColor>,
    ) => {
      state.color = action.payload;

      localStorage.setItem(
        "pulse-theme-color",
        action.payload,
      );
    },

    toggleThemeMode: (state) => {
      state.mode =
        state.mode === "dark"
          ? "light"
          : "dark";

      localStorage.setItem(
        "pulse-theme-mode",
        state.mode,
      );
    },
  },
});

export const {
  setThemeMode,
  setThemeColor,
  toggleThemeMode,
} = themeSlice.actions;

export default themeSlice.reducer;