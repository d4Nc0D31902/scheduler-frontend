import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newSport, clearErrors } from "../../actions/sportActions";
import { NEW_SPORT_RESET } from "../../constants/sportConstants";

const NewSport = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newSport);

  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });

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
      navigate("/admin/sports");
      message("Sport created successfully");
      dispatch({ type: NEW_SPORT_RESET });
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sportData = {
      name,
    };

    try {
      await dispatch(newSport(sportData));
      successMsg("Sport created successfully");
      navigate("/admin/sports");
    } catch (error) {
      errMsg("Failed to create sport");
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Sport"} />

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
                <h1 className="mb-4 text-center">Add New Sport</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name of the Sport:</label>
                  <input
                    type="text"
                    id="name_field"
                    placeholder="Input New Sport"
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

export default NewSport;
