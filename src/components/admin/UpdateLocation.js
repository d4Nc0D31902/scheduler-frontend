import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
import {
  updateLocation,
  getLocationDetails,
  clearErrors,
} from "../../actions/locationActions";
import { UPDATE_LOCATION_RESET } from "../../constants/locationConstants";

const UpdateLocation = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error, location } = useSelector((state) => state.locationDetails);

  // Set default values to prevent "Cannot destructure property 'loading' of 'undefined'" error
  const {
    loading = false,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.location) || {};

  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (!location || location._id !== id) {
      dispatch(getLocationDetails(id));
    } else {
      setName(location.name);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/locations");
      successMsg("Location updated successfully");
      dispatch({ type: UPDATE_LOCATION_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, location, id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedLocation = {
      name,
    };

    await dispatch(updateLocation(location._id, updatedLocation));

    // Show toast message
    toast.success("Location updated successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    // // Reload the page
    // window.location.reload();

    // Navigate to "/admin/locations"
    navigate("/admin/locations");
  };
  const inputStyle = {
    marginBottom: "10px",
    width: "100%",
  };

  return (
    <Fragment>
      <MetaData title={"Update Location"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">

          <div className="wrapper my-5">

            <form className="shadow-lg" onSubmit={submitHandler}>
              <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
              </h3>
              <h1 className="mb-4 text-center" style={{ backgroundColor: "maroon", padding: "10px", borderRadius: "20px", color: "white" }}>Update Location Name</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name of the Location:</label>
                <TextField
                  id="name_field"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button
                id="update_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateLocation;
