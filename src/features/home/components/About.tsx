const About = () => {
  return (
    <section className="home-about">
      <div className="home-about__content">
        <div className="home-about__eyebrow">
          <span className="home-about__eyebrow-line" />
          <span>PRIVATE. FAST. CONNECTED.</span>
        </div>

        <h1 className="home-about__title">
          Conversations
          <span>that move.</span>
        </h1>

        <p className="home-about__description">
          Pulse is a real-time communication experience
          designed for fast conversations, meaningful
          connections, and effortless presence.
        </p>

        <div className="home-about__actions">
          <button
            type="button"
            className="home-about__primary"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <span>Start chatting</span>
            <span aria-hidden="true">↗</span>
          </button>

          <div className="home-about__signal">
            <span className="home-about__signal-dot" />
            <span>Live communication</span>
          </div>
        </div>
      </div>

      <div className="home-about__visual">
        <div className="home-about__orb" />

        <div className="home-about__ring home-about__ring--outer" />
        <div className="home-about__ring home-about__ring--middle" />
        <div className="home-about__ring home-about__ring--inner" />

        <div className="home-about__pulse-card">
          <div className="home-about__pulse-header">
            <span>LIVE SIGNAL</span>
            <span className="home-about__pulse-live">
              LIVE
            </span>
          </div>

          <div
            className="home-about__wave"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="home-about__pulse-footer">
            <span>CONNECTED</span>
            <span>●</span>
          </div>
        </div>

        <div className="home-about__floating-card home-about__floating-card--top">
          <span className="home-about__floating-icon">
            ✦
          </span>

          <div>
            <strong>Instant</strong>
            <span>delivery</span>
          </div>
        </div>

        <div className="home-about__floating-card home-about__floating-card--bottom">
          <span className="home-about__floating-icon">
            ◉
          </span>

          <div>
            <strong>Always</strong>
            <span>connected</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;