import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice/userSlice";
import JobSlice from "./features/job/jobSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: JobSlice,
  },
});
