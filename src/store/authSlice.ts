import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAuth, TCredentials, TRegister, TToken } from "../Types/Auth";
import { AuthAPI } from "../api/client";
import { toast } from "react-toastify";
import { getInitialAuthData } from "../utils/utilityFunctions";
import { TUser } from "../Types/User";
import { create } from "domain";
import { isExpired } from "react-jwt";
import { act } from "react-dom/test-utils";

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

export const signup = createAsyncThunk(
  "user/register",
  async (credentials: TRegister, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AuthAPI.signup(credentials),
        {
          success: "Succesfully authenticated",
          pending: "Checking...",
          error: "Something went wrong. Check your credentials.",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "user/autologin",
  async (refresh: TToken, { fulfillWithValue, rejectWithValue }) => {
    if (isExpired(refresh)) {
      toast.error("Refresh Token is expired, you need to Sign in again.");
      logout();
    }
    try {
      const response = await AuthAPI.refreshToken(refresh);
      return fulfillWithValue(response.data.access);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
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
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
    setLoggedUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
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
        state.error = null;
        localStorage.setItem("token", action.payload.data.access);
        localStorage.setItem("refresh", action.payload.data.refresh);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(autoLogin.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload);
      })
      .addCase(autoLogin.rejected, (state) => {
        logout();
      });
  },
});

export const { logout, setLoggedUser, setError } = authSlice.actions;

export default authSlice.reducer;
