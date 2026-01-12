import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/userSlice/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, lastName, email, location } = userData;
    if (!name || !lastName || !email || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    dispatch(updateUser({ name, email, lastName, location }));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
