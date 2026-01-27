import customFetch from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";
// import authHeader from "../../utils/authHeader"; // Authorization Header - Utils Approach

// Authorization Header - File Approach
// const authHeader = (thunkAPI) => {
//   return {
//     headers: {
//       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//     },
//   };
// };

export const createJobThunk = async (job, thunkAPI) => {
  try {
    // const response = await customFetch.post("/jobs", job, authHeader(thunkAPI)); // Authorization Header - File Approach
    // const response = await customFetch.post("/jobs", job, authHeader(thunkAPI)); // Authorization Header - Utils Approach
    const response = await customFetch.post("/jobs", job); // Authorization Header - Axios Interceptors Approach
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    // const response = await customFetch.delete(
    //   `/jobs/${jobId}`,
    //   authHeader(thunkAPI),
    // ); // Authorization Header - File Approach
    // const response = await customFetch.delete(
    //   `/jobs/${jobId}`,
    //   authHeader(thunkAPI),
    // ); // Authorization Header - Utils Approach
    const response = await customFetch.delete(`/jobs/${jobId}`); // Authorization Header - Axios Interceptors Approach
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    // const response = await customFetch.patch(
    //   `/jobs/${jobId}`,
    //   job,
    //   authHeader(thunkAPI),
    // ); // Authorization Header - File Approach
    // const response = await customFetch.patch(
    //   `/jobs/${jobId}`,
    //   job,
    //   authHeader(thunkAPI),
    // ); // Authorization Header - Utils Approach
    const response = await customFetch.patch(`/jobs/${jobId}`, job); // Authorization Header - Axios Interceptors Approach
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
