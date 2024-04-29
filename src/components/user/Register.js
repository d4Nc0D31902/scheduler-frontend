import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    course: "",
    year: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/user.png");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { name, email, password, department, course, year } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordButtonIcon = showPassword ? faEyeSlash : faEye;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      setErrors({ ...errors, registerError: error });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, errors]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors = { ...newErrors, name: "Full Name is required" };
      isValid = false;
    } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)+$/.test(name)) {
      newErrors = {
        ...newErrors,
        name: "Please enter a valid Full Name format (e.g., John Doe)",
      };
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;
    if (!email.trim()) {
      newErrors = { ...newErrors, email: "Email is required" };
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors = {
        ...newErrors,
        email: "Email must be in the format firstname.lastname",
      };
      isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (password.length < 6 || !passwordPattern.test(password)) {
      newErrors = {
        ...newErrors,
        password:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
      };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     const formData = new FormData();
  //     formData.set("name", name);
  //     formData.set("email", email + "@tup.edu.ph");
  //     formData.set("password", password);
  //     formData.set("avatar", avatar);
  //     formData.set("department", department);
  //     formData.set("course", course);
  //     formData.set("year", year);

  //     dispatch(register(formData));
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email + "@tup.edu.ph");
      formData.set("password", password);
      formData.set("avatar", avatar);
      formData.set("department", department);
      formData.set("course", course);
      formData.set("year", year);

      dispatch(register(formData))
        .then((response) => {
          toast.success("Registration Successful");
        })
        .catch((error) => {
          toast.error("Registration Failed");
        });
    }
  };

  const onChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // const departments = [
  //   "BS Engineering Program",
  //   "BS Degree Program",
  //   "BTVTED Program",
  //   "BET Program",
  // ];

  const departments = [
    "BS Engineering Program",
    "BS Degree Program",
    "BTVTED Program",
    "BET Program",
  ];

  // const coursesByDepartment = {
  //   "BS Engineering Program": ["BSCE", "BSEE", "BSEcE", "BSME"],
  //   "BS Degree Program": ["BSIT", "BSES"],
  //   "BTVTED Program": ["BTVTEDET", "BTVTEDELXT", "BETVTEDICT", "BTVTEDICT-CH"],
  //   "BET Program": [
  //     "BETAT",
  //     "BETCHT",
  //     "BETCT",
  //     "BETET",
  //     "BETELXT",
  //     "BETHVAC/RT",
  //     "BETMT",
  //     "BETMECT",
  //     "BETNDT",
  //     "BETDMT",
  //     "BETEMT",
  //     "BETICT",
  //   ],
  // };

  const coursesByDepartment = {
    // "N/A": ["N/A"],
    "BS Engineering Program": ["N/A", "BSCE", "BSEE", "BSEcE", "BSME"],
    "BS Degree Program": ["N/A", "BSIT", "BSES"],
    "BTVTED Program": [
      "N/A",
      "BTVTEDET",
      "BTVTEDELXT",
      "BETVTEDICT",
      "BTVTEDICT-CH",
    ],
    "BET Program": [
      // "N/A",
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

  // const years = ["1st Year", " 2nd Year", "3rd Year", "4th Year", "Alumni"];

  const years = [
    // "N/A",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Alumni",
  ];

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="row wrapper" style={{ margin: "20px" }}>
        <div className="col-10 col-lg-5">
          <form
            className=""
            onSubmit={submitHandler}
            encType="multipart/form-data"
            style={{ margin: "20px", boxShadow: "2px 2px 12px 2px " }}
          >
            <h3
              className="card-title"
              style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                marginBottom: "20px",
                margin: "0px",
              }}
            >
              TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
            </h3>
            <h1
              className="mb-4 text-center"
              style={{
                backgroundColor: "maroon",
                padding: "10px",
                borderRadius: "2px",
                color: "white",
              }}
            >
              Registration form
            </h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name:</label>
              <input
                type="text"
                id="name_field"
                className={`form-control ${errors.name && "is-invalid"}`}
                name="name"
                value={name}
                placeholder="John Doe"
                onChange={onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email:</label>
              <div className="d-flex">
                <input
                  type="text"
                  id="email_field"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  name="email"
                  value={email}
                  placeholder="john.doe"
                  onChange={onChange}
                />
                <input
                  type="text"
                  id="email_field"
                  className="form-control"
                  value="@tup.edu.ph"
                  disabled
                />
              </div>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="password_field">Password:</label>
              <input
                type="password"
                id="password_field"
                className={`form-control ${errors.password && "is-invalid"}`}
                name="password"
                value={password}
                placeholder="Enter Password"
                onChange={onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="password_field">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password_field"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={toggleShowPassword}
                  >
                    <FontAwesomeIcon icon={togglePasswordButtonIcon} />
                  </button>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <label htmlFor="department_field">Department:</label>
              <select
                id="department_field"
                className={`form-control ${errors.department && "is-invalid"}`}
                name="department"
                value={department}
                onChange={onChange}
              >
                <option value="" disabled selected>
                  Select Department
                </option>
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>

            {/* Course Dropdown */}
            <div className="form-group">
              <label htmlFor="course_field">Course:</label>
              <select
                id="course_field"
                className={`form-control ${errors.course && "is-invalid"}`}
                name="course"
                value={course}
                onChange={onChange}
              >
                <option value="" disabled selected>
                  Select Course
                </option>
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

            {/* Year Dropdown */}
            <div className="form-group">
              <label htmlFor="year_field">Year:</label>
              <select
                id="year_field"
                className={`form-control ${errors.year && "is-invalid"}`}
                name="year"
                value={year}
                onChange={onChange}
              >
                <option value="" disabled selected>
                  Select Year
                </option>
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
            {/* End of Dropdowns */}

            <div className="form-group">
              <label htmlFor="avatar_upload">Profile:</label>
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
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
