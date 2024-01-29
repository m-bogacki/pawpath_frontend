import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animalsSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: { animals: animalsReducer, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
