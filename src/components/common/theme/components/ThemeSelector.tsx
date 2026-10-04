import {
  setThemeColor,
  setThemeMode,
  type ThemeColor,
  type ThemeMode,
} from "../../../../redux/slices/themeSlice";

import { useAppDispatch } from "../../../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../../redux/hooks/useAppSelector";

import {
  selectThemeColor,
  selectThemeMode,
} from "../../../../redux/selectors/themeSelectors";

const themeColors: ThemeColor[] = [
  "red",
  "blue",
  "green",
  "pink",
  "orange",
];

const ThemeSelector = () => {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectThemeMode);
  const color = useAppSelector(selectThemeColor);

  const handleModeChange = (nextMode: ThemeMode) => {
    dispatch(setThemeMode(nextMode));
  };

  const handleColorChange = (nextColor: ThemeColor) => {
    dispatch(setThemeColor(nextColor));
  };

  return (
    <section
      className="theme-selector"
      aria-labelledby="theme-selector-title"
    >
      <div className="theme-selector__header">
        <span className="theme-selector__eyebrow">
          PULSE
        </span>

        <h1
          id="theme-selector-title"
          className="theme-selector__title"
        >
          Appearance
        </h1>

        <p className="theme-selector__description">
          Customize the appearance and accent color
          of Pulse.
        </p>
      </div>

      <div className="theme-selector__section">
        <span className="theme-selector__label">
          Appearance
        </span>

        <div
          className="theme-selector__modes"
          role="group"
          aria-label="Appearance mode"
        >
          <button
            type="button"
            className={`theme-selector__mode ${
              mode === "dark"
                ? "theme-selector__mode--active"
                : ""
            }`}
            onClick={() => handleModeChange("dark")}
            aria-pressed={mode === "dark"}
          >
            <span
              className="theme-selector__mode-icon"
              aria-hidden="true"
            >
              ◐
            </span>

            <span>Dark</span>
          </button>

          <button
            type="button"
            className={`theme-selector__mode ${
              mode === "light"
                ? "theme-selector__mode--active"
                : ""
            }`}
            onClick={() => handleModeChange("light")}
            aria-pressed={mode === "light"}
          >
            <span
              className="theme-selector__mode-icon"
              aria-hidden="true"
            >
              ☼
            </span>

            <span>Light</span>
          </button>
        </div>
      </div>

      <div className="theme-selector__section">
        <span className="theme-selector__label">
          Theme Color
        </span>

        <div
          className="theme-selector__colors"
          role="group"
          aria-label="Theme color"
        >
          {themeColors.map((themeColor) => (
            <button
              key={themeColor}
              type="button"
              className={`theme-selector__color theme-selector__color--${themeColor} ${
                color === themeColor
                  ? "theme-selector__color--active"
                  : ""
              }`}
              onClick={() => handleColorChange(
                themeColor,
              )}
              aria-label={`Use ${themeColor} theme color`}
              aria-pressed={color === themeColor}
            >
              <span
                className="theme-selector__color-dot"
                aria-hidden="true"
              />

              <span className="theme-selector__color-name">
                {themeColor}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeSelector;