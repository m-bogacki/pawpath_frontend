import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TAuth, TCredentials, TRegister, TToken } from "../Types/Auth";
import { AuthAPI, UserAPI } from "../api/client";
import { toast } from "react-toastify";
import { getInitialAuthData } from "../utils/utilityFunctions";
import { isExpired } from "react-jwt";
import { TUser } from "../Types/User";
import { TAddress } from "../Types/Address";
import { AxiosResponse } from "axios";

const initialState: TAuth = {
  ...getInitialAuthData(),
  isLoading: false,
  error: null,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
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
  "auth/register",
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
  "auth/autologin",
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

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (
    { userId, userData }: { userId: number; userData: Partial<TUser> },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await UserAPI.updateUser(userId, userData);

      return fulfillWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);
export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async (
    { userId, userAddress }: { userId: number; userAddress: Partial<TAddress> },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await UserAPI.updateUserAddress(userId, userAddress);

      return fulfillWithValue(response);
    } catch (error: any) {
      console.log(error);

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
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoggedUser(state, action: PayloadAction<Partial<TUser>>) {
      state.user = action.payload as TUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.token = action.payload.data.access;
        state.refresh = action.payload.data.refresh;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", action.payload.data.access);
        localStorage.setItem("refresh", action.payload.data.refresh);
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action: any) => {
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
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<AxiosResponse>) => {
          state.isLoading = false;
          state.user = { ...state.user, ...action.payload.data };
          toast.success("User data updated");
        }
      )
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("User data update failed");
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserAddress.fulfilled,
        (state, action: PayloadAction<AxiosResponse<TAddress>>) => {
          state.isLoading = false;
          state.user = { ...state.user!, address: action.payload.data };
          toast.success("User address updated");
        }
      )
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("User address update failed");
      });
  },
});

export const { logout, setError, setLoggedUser } = authSlice.actions;

export default authSlice.reducer;
