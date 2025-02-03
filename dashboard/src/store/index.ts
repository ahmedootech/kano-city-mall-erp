import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { uiReducer } from "./features/ui";
import { signInReducer} from "./features/signup";
const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signInReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
