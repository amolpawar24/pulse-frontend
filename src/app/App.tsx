import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { selectAccessToken } from "../redux/selectors/authSelectors";
import { fetchCurrentUser } from "../redux/thunk/authThunks";
import { router } from "../routes/routeConfig";

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAccessToken);

  // After a page refresh, load the user from the saved token
  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
};

export default App;