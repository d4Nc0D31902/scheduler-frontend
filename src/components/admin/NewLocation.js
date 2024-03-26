import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newLocation, clearErrors } from "../../actions/locationActions";
import { NEW_LOCATION_RESET } from "../../constants/locationConstants";

const NewLocation = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newLocation);

  const navigate = useNavigate();
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/locations");
      message("Location created successfully");
      dispatch({ type: NEW_LOCATION_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const locationData = {
      name,
    };

    dispatch(newLocation(locationData))
      .then(() => {
        navigate("/admin/locations");
        message("Location created successfully");
      })
      .catch((error) => {
        console.error("Error creating location:", error);
      });
  };

  return (
    <Fragment>
      <MetaData title={"New Location"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h3
                  className="card-title"
                  style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    marginBottom: "10px",
                    margin: "20px",
                  }}
                >
                  <img
                    src="/images/tupt_logo.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "25px",
                    }}
                    alt="Logo"
                  />
                  TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                </h3>
                <h1 className="mb-4 text-center">Add New Location</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Add a Location:</label>
                  <input
                    placeholder="Input Location Here"
                    type="text"
                    id="name_field"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  ADD
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewLocation;
