import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateSport,
  getSportDetails,
  clearErrors,
} from "../../actions/sportActions";
import { UPDATE_SPORT_RESET } from "../../constants/sportConstants";

const UpdateSport = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error, sport } = useSelector((state) => state.sportDetails);

  // Set default values to prevent "Cannot destructure property 'loading' of 'undefined'" error
  const {
    loading = false,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.sport) || {};

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
    if (!sport || sport._id !== id) {
      dispatch(getSportDetails(id));
    } else {
      setName(sport.name);
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
      navigate("/admin/sports");
      successMsg("Sport updated successfully");
      dispatch({ type: UPDATE_SPORT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, sport, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedSport = {
      name,
    };
    try {
      await dispatch(updateSport(sport._id, updatedSport));
      successMsg("Sport updated successfully");
      navigate("/admin/sports");
    } catch (error) {
      errMsg("Failed to update sport");
    }
  };
  
  return (
    <Fragment>
      <MetaData title={"Update Sport"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
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
              <h1
                className="mb-4 text-center"
                style={{
                  backgroundColor: "maroon",
                  padding: "10px",
                  borderRadius: "20px",
                  color: "white",
                }}
              >
                Update Sport
              </h1>

              <div className="form-group">
                <label htmlFor="name_field">Sport Name:</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

export default UpdateSport;
