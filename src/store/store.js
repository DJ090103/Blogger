import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: Authreducer,
  },
});
