import { useState } from "react";

import About from "./components/About";
import Features from "./components/Features";
import Navbar from "./components/Navbar";

export type HomeView = "about" | "features";

const IndexHome = () => {
  const [activeView, setActiveView] = useState<HomeView>("about");

  return (
    <main className="home-page">
      <div
        className="home-page__background"
        aria-hidden="true"
      >
        <span className="home-page__orb home-page__orb--one" />
        <span className="home-page__orb home-page__orb--two" />
        <span className="home-page__orb home-page__orb--three" />

        <span className="home-page__grid" />

        <span className="home-page__noise" />

        <span className="home-page__line home-page__line--one" />
        <span className="home-page__line home-page__line--two" />
      </div>

      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <section className="home-page__content">
        {activeView === "about" && <About />}

        {activeView === "features" && <Features />}
      </section>

      <div
        className="home-page__status"
        aria-hidden="true"
      >
        <span className="home-page__status-dot" />
        <span>REAL-TIME COMMUNICATION</span>
      </div>
    </main>
  );
};

export default IndexHome;