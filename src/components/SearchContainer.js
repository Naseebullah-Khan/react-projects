import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import {
  clearFilters,
  handleJobFilterChange,
} from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
  const { sortOptions, search, searchStatus, searchType, sort, isLoading } =
    useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (isLoading) return;
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleJobFilterChange({ name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
          />
          <FormRowSelect
            type="text"
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            onChange={handleChange}
            options={["all", ...statusOptions]}
          />
          <FormRowSelect
            type="text"
            labelText="type"
            name="searchType"
            value={searchType}
            onChange={handleChange}
            options={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            type="text"
            name="sort"
            value={sort}
            onChange={handleChange}
            options={sortOptions}
          />
          <button
            type="button"
            disabled={isLoading}
            className="btn btn-block btn-danger"
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
