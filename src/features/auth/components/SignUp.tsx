import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";

import {
  selectAuthError,
  selectAuthLoading,
} from "../../../redux/selectors/authSelectors";

import { clearAuthError } from "../../../redux/slices/authSlice";

import { registerUser } from "../../../redux/thunk/authThunks";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectAuthLoading);
  const apiError = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [localError, setLocalError] =
    useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setLocalError(null);

    if (apiError) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLocalError(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!name) {
      setLocalError("Please enter your name.");
      return;
    }

    if (!email) {
      setLocalError("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      setLocalError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(
        registerUser({
          name,
          email,
          password,
        })
      ).unwrap();

      navigate("/chat", {
        replace: true,
      });
    } catch {
      // API error is already stored in Redux.
    }
  };

  const error = localError ?? apiError;

  return (
    <main className="sign-up">
      <div
        className="sign-up__background"
        aria-hidden="true"
      >
        <span className="sign-up__glow sign-up__glow--one" />
        <span className="sign-up__glow sign-up__glow--two" />
        <span className="sign-up__grid" />
      </div>

      <header className="sign-up__header">
        <button
          type="button"
          className="sign-up__logo"
          onClick={() => navigate("/")}
          aria-label="Go to Pulse home"
        >
          <span className="sign-up__logo-mark">
            P
          </span>

          <span className="sign-up__logo-text">
            PULSE
          </span>
        </button>

        <Link
          to="/login"
          className="sign-up__login-link"
        >
          Sign in
        </Link>
      </header>

      <section className="sign-up__content">
        <div className="sign-up__intro">
          <span className="sign-up__eyebrow">
            CREATE ACCOUNT
          </span>

          <h1 className="sign-up__title">
            Join the
            <span>conversation.</span>
          </h1>

          <p className="sign-up__description">
            Create your Pulse account and start
            connecting with people in real time.
          </p>

          <div
            className="sign-up__visual"
            aria-hidden="true"
          >
            <div className="sign-up__visual-ring sign-up__visual-ring--one" />
            <div className="sign-up__visual-ring sign-up__visual-ring--two" />
            <div className="sign-up__visual-ring sign-up__visual-ring--three" />

            <div className="sign-up__visual-center">
              <span />
            </div>
          </div>
        </div>

        <form
          className="sign-up__card"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="sign-up__card-header">
            <span>WELCOME</span>

            <h2>Create your account</h2>

            <p>
              Fill in your details to get started.
            </p>
          </div>

          <div className="sign-up__fields">
            <label className="sign-up__field">
              <span>Name</span>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                disabled={isLoading}
                required
              />
            </label>

            <label className="sign-up__field">
              <span>Email</span>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </label>

            <label className="sign-up__field">
              <span>Password</span>

              <div className="sign-up__password">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />

                <button
                  type="button"
                  className="sign-up__password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  disabled={isLoading}
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

            <label className="sign-up__field">
              <span>Confirm password</span>

              <div className="sign-up__password">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />

                <button
                  type="button"
                  className="sign-up__password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>
          </div>

          {error && (
            <div
              className="sign-up__error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="sign-up__submit"
            disabled={isLoading}
          >
            <span>
              {isLoading
                ? "Creating account..."
                : "Create account"}
            </span>

            <span aria-hidden="true">
              →
            </span>
          </button>

          <p className="sign-up__switch">
            Already have an account?

            <Link to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>

      <footer className="sign-up__footer">
        <span>Pulse</span>

        <span>
          Simple · Fast · Connected
        </span>
      </footer>
    </main>
  );
};

export default SignUp;