import {
  combineReducers,
} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import chatReducer from "../slices/chatSlice";
// import notificationReducer from "../slices/notificationSlice";
import presenceReducer from "../slices/presenceSlice";
import themeReducer from "../slices/themeSlice";
import userReducer from "../slices/userSlice";

/* -------------------------------------------------------------------------- */
/* Root Reducer                                                               */
/* -------------------------------------------------------------------------- */

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
//   notification: notificationReducer,
  presence: presenceReducer,
  theme: themeReducer,
  user: userReducer,
});

export default rootReducer;