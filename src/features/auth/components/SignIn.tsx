import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <section
      className="sign-in"
      aria-labelledby="sign-in-title"
    >
      <div className="sign-in__intro">
        <button
          type="button"
          className="sign-in__brand"
          onClick={() => {
            window.location.href = "/";
          }}
          aria-label="Back to Pulse home"
        >
          {"PULSE".split("").map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </button>

        <span className="sign-in__eyebrow">
          WELCOME BACK
        </span>

        <h1
          id="sign-in-title"
          className="sign-in__title"
        >
          Continue the
          <br />
          <span>conversation.</span>
        </h1>

        <p className="sign-in__description">
          Sign in to return to your conversations and stay
          connected in real time.
        </p>
      </div>

      <div
        className="sign-in__visual"
        aria-hidden="true"
      >
        <div className="sign-in__visual-ring sign-in__visual-ring--outer" />
        <div className="sign-in__visual-ring sign-in__visual-ring--middle" />
        <div className="sign-in__visual-ring sign-in__visual-ring--inner" />

        <div className="sign-in__visual-core">
          <span />
        </div>
      </div>

      <form
        className="sign-in__card"
        onSubmit={handleSubmit}
      >
        <div className="sign-in__card-header">
          <span>ACCOUNT</span>

          <h2>Sign in</h2>

          <p>
            Enter your details to access your account.
          </p>
        </div>

        <div className="sign-in__fields">
          <label className="sign-in__field">
            <span>Email</span>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="sign-in__field">
            <span>Password</span>

            <div className="sign-in__password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="sign-in__password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="sign-in__submit"
        >
          <span>Sign in</span>
          <span aria-hidden="true">→</span>
        </button>

        <button
          type="button"
          className="sign-in__back"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Back to home
        </button>
      </form>
    </section>
  );
};

export default SignIn;