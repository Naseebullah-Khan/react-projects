import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { toast } from "react-toastify";
import {
  clearValues,
  handleJobChange,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";

const AddJob = () => {
  const {
    isEditing,
    company,
    position,
    jobLocation,
    isLoading,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleJobChange({ value, name }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleJobChange({ name: "jobLocation", value: user.location }));
    }
  }, [dispatch, isEditing, user.location]);

  const handleClear = () => {
    dispatch(clearValues({ position, company, jobLocation, jobType, status }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        }),
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            onChange={handleChange}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            onChange={handleChange}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            onChange={handleChange}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            onChange={handleChange}
            options={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="job type"
            onChange={handleChange}
            options={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClear}
            >
              clear
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
