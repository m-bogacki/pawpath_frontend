import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./animalsSlice";
import authReducer from "./authSlice";
import animalCareReducer from "./animalCareSlice";
// import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    animalCare: animalCareReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
