import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectIsAuthenticated } from "../redux/selectors/authSelectors";

// For login/register only: logged-in users go straight to the chat
const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;