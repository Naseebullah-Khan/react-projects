import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice/userSlice";
import JobSlice from "./features/job/jobSlice";
import AllJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: JobSlice,
    allJobs: AllJobsSlice,
  },
});
