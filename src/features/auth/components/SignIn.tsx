import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";

import {
  selectAuthError,
  selectAuthLoading,
} from "../../../redux/selectors/authSelectors";

import { clearAuthError } from "../../../redux/slices/authSlice";
import { loginUser } from "../../../redux/thunk/authThunks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: form.email.trim(),
          password: form.password,
        })
      ).unwrap();

      navigate("/chat", {
        replace: true,
      });
    } catch {
      // Authentication error is handled by Redux.
    }
  };

  return (
    <section
      className="sign-in"
      aria-labelledby="sign-in-title"
    >
      {/* Background */}
      <div
        className="sign-in__background"
        aria-hidden="true"
      >
        <span className="sign-in__orb sign-in__orb--one" />
        <span className="sign-in__orb sign-in__orb--two" />
        <span className="sign-in__orb sign-in__orb--three" />

        <span className="sign-in__grid" />

        <span className="sign-in__line sign-in__line--one" />
        <span className="sign-in__line sign-in__line--two" />
      </div>

      {/* Top bar */}
      <header className="sign-in__topbar">
        <button
          type="button"
          className="sign-in__brand"
          onClick={() => navigate("/")}
          aria-label="Go to Pulse home"
        >
          <span className="sign-in__brand-mark">
            P
          </span>

          <span className="sign-in__brand-name">
            PULSE
          </span>
        </button>

        <button
          type="button"
          className="sign-in__home-link"
          onClick={() => navigate("/")}
        >
          <span>Home</span>
          <span aria-hidden="true">↗</span>
        </button>
      </header>

      <div className="sign-in__layout">
        {/* Left side */}
        <div className="sign-in__intro">
          <div className="sign-in__eyebrow">
            <span className="sign-in__eyebrow-dot" />
            SECURE ACCESS
          </div>

          <h1
            id="sign-in-title"
            className="sign-in__title"
          >
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p className="sign-in__description">
            Continue your conversations,
            connect with people, and stay
            in sync in real time.
          </p>

          <div className="sign-in__status">
            <span className="sign-in__status-dot" />

            <span>
              REAL-TIME COMMUNICATION
            </span>
          </div>
        </div>

        {/* Decorative visual */}
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

          <span className="sign-in__visual-point sign-in__visual-point--one" />
          <span className="sign-in__visual-point sign-in__visual-point--two" />
          <span className="sign-in__visual-point sign-in__visual-point--three" />
        </div>

        {/* Sign in card */}
        <form
          className="sign-in__card"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__card-header">
            <span className="sign-in__card-label">
              ACCOUNT
            </span>

            <h2>Sign in</h2>

            <p>
              Enter your credentials to continue.
            </p>
          </div>

          <div className="sign-in__fields">
            {/* Email */}
            <label className="sign-in__field">
              <span className="sign-in__field-label">
                Email address
              </span>

              <div className="sign-in__input-wrap">
                <span
                  className="sign-in__input-icon"
                  aria-hidden="true"
                >
                  @
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </label>

            {/* Password */}
            <label className="sign-in__field">
              <span className="sign-in__field-label">
                Password
              </span>

              <div className="sign-in__input-wrap">
                <span
                  className="sign-in__input-icon sign-in__input-icon--password"
                  aria-hidden="true"
                >
                  •••
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="sign-in__password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={isLoading}
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div
              className="sign-in__error"
              role="alert"
            >
              <span
                className="sign-in__error-icon"
                aria-hidden="true"
              >
                !
              </span>

              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="sign-in__submit"
            disabled={
              isLoading ||
              !form.email.trim() ||
              !form.password
            }
          >
            <span>
              {isLoading
                ? "Signing in..."
                : "Sign in"}
            </span>

            <span
              className="sign-in__submit-arrow"
              aria-hidden="true"
            >
              {isLoading ? "..." : "→"}
            </span>
          </button>

          {/* Register */}
          <div className="sign-in__switch">
            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
              disabled={isLoading}
            >
              Create account
              <span aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {/* Back */}
          <button
            type="button"
            className="sign-in__back"
            onClick={() => navigate("/")}
            disabled={isLoading}
          >
            <span aria-hidden="true">
              ←
            </span>

            Back to home
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="sign-in__footer">
        <span>PULSE</span>

        <span>
          PRIVATE · FAST · REAL-TIME
        </span>
      </footer>
    </section>
  );
};

export default SignIn;