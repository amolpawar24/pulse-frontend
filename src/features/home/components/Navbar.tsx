import type { HomeView } from "../index.Home";

interface NavbarProps {
  activeView: HomeView;
  onViewChange: (view: HomeView) => void;
}

const Navbar = ({
  activeView,
  onViewChange,
}: NavbarProps) => {
  return (
    <header className="home-navbar">
      <button
        type="button"
        className="home-navbar__brand"
        onClick={() => onViewChange("about")}
        aria-label="Pulse home"
      >
        {"PULSE".split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="home-navbar__letter"
          >
            {letter}
          </span>
        ))}
      </button>

      <nav
        className="home-navbar__navigation"
        aria-label="Main navigation"
      >
        <button
          type="button"
          className={`home-navbar__link ${
            activeView === "about"
              ? "home-navbar__link--active"
              : ""
          }`}
          onClick={() => onViewChange("about")}
        >
          <span>About</span>

          {activeView === "about" && (
            <span
              className="home-navbar__pulse"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          type="button"
          className={`home-navbar__link ${
            activeView === "features"
              ? "home-navbar__link--active"
              : ""
          }`}
          onClick={() => onViewChange("features")}
        >
          <span>Features</span>

          {activeView === "features" && (
            <span
              className="home-navbar__pulse"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          type="button"
          className="home-navbar__signin"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          <span>Sign In</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;