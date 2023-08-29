import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserAPI } from "./authService";

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState = {
  user: user ?? null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk<User, User>(
  "auth/register",
  async (userData: User, { rejectWithValue }) => {
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
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
