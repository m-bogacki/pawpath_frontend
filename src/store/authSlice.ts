import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAuth, TCredentials } from "../Types/Auth";
import { AuthAPI } from "../api/client";
import { toast } from "react-toastify";
import { getInitialAuthData } from "../utils/utilityFunctions";
import { TUser } from "../Types/User";

const initialState: TAuth = {
  ...getInitialAuthData(),
  isLoading: false,
  error: null,
  user: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (credentials: TCredentials, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AuthAPI.login(credentials),
        {
          success: "Succesfully authenticated",
          pending: "Checking...",
          error: "Something went wrong. Check your credentials.",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.refresh = null;
      state.error = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
    setLoggedUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.token = action.payload.data.access;
        state.refresh = action.payload.data.refresh;
        localStorage.setItem("token", action.payload.data.access);
        localStorage.setItem("refresh", action.payload.data.refresh);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setLoggedUser } = authSlice.actions;

export default authSlice.reducer;
