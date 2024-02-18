import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [availability, setAvailability] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setDepartment(user.department);
      setCourse(user.course);
      setYear(user.year);
      setAvailability(user.availability);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully!");
      dispatch(loadUser());
      navigate("/me", { replace: true });
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    formData.set("department", department);
    formData.set("course", course);
    formData.set("year", year);
    formData.set("availability", availability);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>
            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <div className="d-flex">
                <input
                  type="text"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="department_field">Department</label>
              <input
                type="text"
                id="department_field"
                className="form-control"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled
              />
            </div>
            {user.role !== "professor" && (
              <div className="form-group">
                <label htmlFor="course_field">Course</label>
                <input
                  type="text"
                  id="course_field"
                  className="form-control"
                  name="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled
                />
              </div>
            )}
            {user.role !== "professor" && (
              <div className="form-group">
                <label htmlFor="year_field">Year</label>
                <input
                  type="text"
                  id="year_field"
                  className="form-control"
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  disabled
                />
              </div>
            )}
            {/* Toggle switch for availability */}
            {/* <div className="form-group">
              <label htmlFor="availability_field">Availability</label>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="availability_field"
                  checked={availability === "available"}
                  onChange={() =>
                    setAvailability(
                      availability === "available"
                        ? "not available"
                        : "available"
                    )
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="availability_field"
                >
                  {availability === "available" ? "Available" : "Not Available"}
                </label>
              </div>
            </div> */}

            <div className="form-group">
              <label htmlFor="availability_field">Availability</label>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="availability_field"
                  checked={availability === "available"}
                  onChange={() =>
                    setAvailability(
                      availability === "available"
                        ? "not available"
                        : "available"
                    )
                  }
                  disabled={user.role === "user" || user.role === "officer"}
                />
                <label
                  className="custom-control-label"
                  htmlFor="availability_field"
                >
                  {availability === "available" ? "Available" : "Not Available"}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
