import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";

export const Store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
