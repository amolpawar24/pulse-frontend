import SignIn from "./components/SignIn";

const IndexAuth = () => {
  return (
    <main className="auth-page">
      <div className="auth-page__background" aria-hidden="true">
        <span className="auth-page__orb auth-page__orb--one" />
        <span className="auth-page__orb auth-page__orb--two" />
        <span className="auth-page__orb auth-page__orb--three" />
        <span className="auth-page__grid" />
        <span className="auth-page__noise" />
      </div>

      <SignIn />
    </main>
  );
};

export default IndexAuth;