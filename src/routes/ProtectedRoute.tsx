import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectIsAuthenticated } from "../redux/selectors/authSelectors";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;