import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const [errors, setErrors] = useState({});

  const { name, email, password, department, course, year } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

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
      newErrors = { ...newErrors, name: "Name is required" };
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
    if (password.length < 6) {
      newErrors = {
        ...newErrors,
        password: "Password must be at least 6 characters long",
      };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  

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

  
  const departments = [
    "BS Engineering Program",
    "BS Degree Program",
    "BTVTED Program",
    "BET Program",
  ];


  const coursesByDepartment = {
    "N/A": ["N/A"],
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
      "N/A",
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

 

  const years = [
    "N/A",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Alumni",
  ];



  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <div className="registration-container">
        <form onSubmit={submitHandler} encType="multipart/form-data" className="registration-form">
          <h3 className="form-title">TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES</h3>
          <h1 className="form-subtitle">Registration form</h1>
          <TextField
            id="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            error={errors.name ? true : false}
            helperText={errors.name}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            error={errors.password ? true : false}
            helperText={errors.password}
          />
          <TextField
            id="department"
            select
            label="Department"
            variant="outlined"
            fullWidth
            margin="normal"
            value={department}
            onChange={(e) => setUser({ ...user, department: e.target.value })}
            error={errors.department ? true : false}
            helperText={errors.department}
          >
            {departments.map((dep) => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="course"
            select
            label="Course"
            variant="outlined"
            fullWidth
            margin="normal"
            value={course}
            onChange={(e) => setUser({ ...user, course: e.target.value })}
            error={errors.course ? true : false}
            helperText={errors.course}
          >
            {courses.map((crs) => (
              <MenuItem key={crs} value={crs}>
                {crs}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="year"
            select
            label="Year"
            variant="outlined"
            fullWidth
            margin="normal"
            value={year}
            onChange={(e) => setUser({ ...user, year: e.target.value })}
            error={errors.year ? true : false}
            helperText={errors.year}
          >
            {years.map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            REGISTER
          </Button>
        </form>
      </div>
    </Fragment>
  );
};



export default Register;
