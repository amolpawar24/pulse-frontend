import { useEffect } from "react";

import { useAppSelector } from "../../../../redux/hooks/useAppSelector";
import {
  selectThemeColor,
  selectThemeMode,
} from "../../../../redux/selectors/themeSelectors";

const ThemeController = () => {
  const mode = useAppSelector(selectThemeMode);
  const color = useAppSelector(selectThemeColor);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.themeMode = mode;
    root.dataset.themeColor = color;
  }, [mode, color]);

  return null;
};

export default ThemeController;