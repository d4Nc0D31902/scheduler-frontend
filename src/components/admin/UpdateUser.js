import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setDepartment(user.department || "");
      setCourse(user.course || "");
      setYear(user.year || "");
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");
      navigate("/admin/users");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);
    formData.set("department", department);
    formData.set("course", course);
    formData.set("year", year);
    dispatch(updateUser(user._id, formData));
  };

  const departments = [
    "BS Engineering Program",
    "BS Degree Program",
    "BTVTED Program",
    "BET Program",
  ];

  const coursesByDepartment = {
    "BS Engineering Program": ["BSCE", "BSEE", "BSEcE", "BSME"],
    "BS Degree Program": ["BSIT", "BSES"],
    "BTVTED Program": ["BTVTEDET", "BTVTEDELXT", "BETVTEDICT", "BTVTEDICT-CH"],
    "BET Program": [
      "BETAT",
      "BETCHT",
      "BETCT",
      "BETET",
      "BETELXT",
      "BETHVAC/RT",
      "BETMT",
      "BETMECT",
      "BETNDT",
      "BETDMT",
      "BETEMT",
      "BETICT",
    ],
  };

  const courses = coursesByDepartment[department] || [];

  const years = ["1st Year", " 2nd Year", "3rd Year", "4th Year", "Alumni"];
  const inputStyle = {
    marginBottom: "10px",
    width: "100%",
  };
  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1
                  className="mb-4 text-center"
                  style={{
                    backgroundColor: "maroon",
                    padding: "20px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  Update User
                </h1>

                <div className="form-group">
                  <TextField
                    id="name_field"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    id="email_field"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Conditionally render Department Dropdown */}
                {role !== "admin" && (
                  <div className="form-group">
                    <label htmlFor="department_field">Department:</label>
                    <select
                      id="department_field"
                      className={`form-control ${
                        errors.department && "is-invalid"
                      }`}
                      name="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dep) => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <div className="invalid-feedback">
                        {errors.department}
                      </div>
                    )}
                  </div>
                )}

                {/* Conditionally render Course Dropdown based on user's role */}
                {role !== "professor" && role !== "admin" && (
                  <div className="form-group">
                    <label htmlFor="course_field">Course:</label>
                    <select
                      id="course_field"
                      className={`form-control ${
                        errors.course && "is-invalid"
                      }`}
                      name="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {courses.map((crs) => (
                        <option key={crs} value={crs}>
                          {crs}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <div className="invalid-feedback">{errors.course}</div>
                    )}
                  </div>
                )}

                {/* Conditionally render Year Dropdown based on user's role */}
                {role !== "professor" && role !== "admin" && (
                  <div className="form-group">
                    <label htmlFor="year_field">Year:</label>
                    <select
                      id="year_field"
                      className={`form-control ${errors.year && "is-invalid"}`}
                      name="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {years.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <div className="invalid-feedback">{errors.year}</div>
                    )}
                  </div>
                )}
                {/* End of Conditional Rendering */}

                <div className="form-group">
                  <label htmlFor="role_field">Role:</label>
                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      // Clear Course and Year if role is Professor
                      if (e.target.value === "professor") {
                        setCourse("");
                        setYear("");
                      } else if (
                        e.target.value === "user" ||
                        e.target.value === "officer"
                      ) {
                      }
                    }}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="officer">Officer</option>
                    <option value="professor">Professor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
