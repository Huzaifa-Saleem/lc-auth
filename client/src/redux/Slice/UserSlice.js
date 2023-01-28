import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  Success: false,
  user: [],
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = true;
    },
    setSuccess: (state) => {
      state.Success = true;
      state.isLoading = false;
      state.error = "";
      state.isError = false;
    },
    getUser: (state, action) => {
      state.isLoading = false;
      state.user.push(action.payload);
    },
    clearError: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.isError = false;
    },
  },
});

export const { setError, setLoading, setSuccess, getUser, clearError } =
  UserSlice.actions;
export default UserSlice.reducer;
