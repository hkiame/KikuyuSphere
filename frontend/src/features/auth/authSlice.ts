import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "./authService";
import { LoginData, RegisterUserData } from "../../types/auth";

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState = {
  user: user ?? null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

interface registerUser extends RegisterUserData {
  message: string;
}

export const registerUser = createAsyncThunk<registerUser, RegisterUserData>(
  "auth/register",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      return await registerUserAPI(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk<registerUser, LoginData>(
  "auth/login",
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      return await loginUserAPI(credentials);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = "";
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
        state.isLoggedIn = false;
        state.isSuccess = false;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
