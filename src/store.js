import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ReduxLogger from "redux-logger";
import appReducer from "./redux/appSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    app: appReducer,
  },
});

export var AppDispatch = store.dispatch;
export var RootState = store.getState;
export var AppThunk = store.dispatch;
