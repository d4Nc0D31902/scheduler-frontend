import React, { Fragment, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allLocations,
  clearErrors,
  deleteLocation,
  deactivateLocation,
  reactivateLocation,
} from "../../actions/locationActions";
import {
  DELETE_LOCATION_RESET,
  DEACTIVATE_LOCATION_RESET,
  REACTIVATE_LOCATION_RESET,
} from "../../constants/locationConstants";

const LocationsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, locations, isDeleted, isDeactivated, isReactivated } =
    useSelector((state) => state.allLocations);

  const errMsg = useCallback(
    (message = "") =>
      toast.error(message, { position: toast.POSITION.BOTTOM_CENTER }),
    []
  );

  // const successMsg = useCallback(
  //   (message = "") =>
  //     toast.success(message, { position: toast.POSITION.BOTTOM_CENTER }),
  //   []
  // );

  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  const handleDeleteLocation = useCallback(
    (id) => {
      dispatch(deleteLocation(id));
    },
    [dispatch]
  );

  const handleDeactivateLocation = useCallback(
    (id) => {
      dispatch(deactivateLocation(id));
    },
    [dispatch]
  );

  const handleReactivateLocation = useCallback(
    (id) => {
      dispatch(reactivateLocation(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(allLocations());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, errMsg]);

  useEffect(() => {
    if (isDeleted) {
      successMsg("Location deleted successfully");
      dispatch({ type: DELETE_LOCATION_RESET });
    }
  }, [isDeleted, successMsg, dispatch]);

  useEffect(() => {
    if (isDeactivated) {
      successMsg("Location deactivated successfully");
      dispatch({ type: DEACTIVATE_LOCATION_RESET });
    }
  }, [isDeactivated, successMsg, dispatch]);

  useEffect(() => {
    if (isReactivated) {
      successMsg("Location reactivated successfully");
      dispatch({ type: REACTIVATE_LOCATION_RESET });
    }
  }, [isReactivated, successMsg, dispatch]);

  const toggleLocationActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateLocation(id));
      successMsg("Location Reactivated Successfully");
      console.log("Location reactivated:", id);
    } else {
      await dispatch(deactivateLocation(id));
      successMsg("Location Deactivated Successfully");
      console.log("Location deactivated:", id);
    }
    dispatch(allLocations());
  };

  const setLocations = () => {
    const data = {
      columns: [
        {
          label: "Location",
          field: "name",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (locations) {
      locations.forEach((location) => {
        data.rows.push({
          name: location.name,
          actions: (
            <Fragment>
              {location.status === "active" && (
                <Link
                  to={`/admin/location/${location._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              )}
              <button
                className={`btn ${
                  location.status === "inactive" ? "btn-success" : "btn-danger"
                } py-1 px-2 ml-2`}
                onClick={() =>
                  toggleLocationActivation(
                    location._id,
                    location.status === "inactive"
                  )
                }
              >
                <i
                  className={`fa ${
                    location.status === "inactive"
                      ? "fa-check-circle"
                      : "fa-times-circle"
                  }`}
                ></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Locations"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Locations</h1>
              <Link to="/admin/location" className="btn btn-primary">
                Add New Location
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setLocations()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default LocationsList;
