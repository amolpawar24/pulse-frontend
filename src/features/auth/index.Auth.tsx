import { useLocation } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const IndexAuth = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";

  return (
    <main className="auth-page">
      <div className="auth-page__background" aria-hidden="true">
        <span className="auth-page__orb auth-page__orb--one" />
        <span className="auth-page__orb auth-page__orb--two" />
        <span className="auth-page__orb auth-page__orb--three" />
        <span className="auth-page__grid" />
        <span className="auth-page__noise" />
      </div>

      {isRegister ? <SignUp /> : <SignIn />}
    </main>
  );
};

export default IndexAuth;