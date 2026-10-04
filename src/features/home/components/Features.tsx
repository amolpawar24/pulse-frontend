const Features = () => {
  return (
    <section className="home-features">
      <div className="home-features__intro">
        <div className="home-features__eyebrow">
          <span className="home-features__eyebrow-line" />
          <span>BUILT FOR CONNECTION</span>
        </div>

        <h1 className="home-features__title">
          Everything you need.
          <span>Nothing in the way.</span>
        </h1>

        <p className="home-features__description">
          A focused communication layer built around
          speed, clarity, presence, and a seamless
          real-time experience.
        </p>
      </div>

      <div className="home-features__grid">
        <article className="home-feature-card home-feature-card--large">
          <div className="home-feature-card__number">
            01
          </div>

          <div className="home-feature-card__icon">
            ↯
          </div>

          <div className="home-feature-card__body">
            <h2>Real-time messaging</h2>

            <p>
              Messages move instantly through a
              responsive real-time communication layer.
            </p>
          </div>

          <div className="home-feature-card__line" />
        </article>

        <article className="home-feature-card">
          <div className="home-feature-card__number">
            02
          </div>

          <div className="home-feature-card__icon">
            ◌
          </div>

          <div className="home-feature-card__body">
            <h2>Presence</h2>

            <p>
              Know when people are available,
              connected, and ready to talk.
            </p>
          </div>

          <div className="home-feature-card__line" />
        </article>

        <article className="home-feature-card">
          <div className="home-feature-card__number">
            03
          </div>

          <div className="home-feature-card__icon">
            ⌁
          </div>

          <div className="home-feature-card__body">
            <h2>Clean experience</h2>

            <p>
              A focused interface that keeps the
              conversation at the center.
            </p>
          </div>

          <div className="home-feature-card__line" />
        </article>

        <article className="home-feature-card">
          <div className="home-feature-card__number">
            04
          </div>

          <div className="home-feature-card__icon">
            ◈
          </div>

          <div className="home-feature-card__body">
            <h2>Built to scale</h2>

            <p>
              A foundation designed for a growing
              communication platform.
            </p>
          </div>

          <div className="home-feature-card__line" />
        </article>
      </div>
    </section>
  );
};

export default Features;