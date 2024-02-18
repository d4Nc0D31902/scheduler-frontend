import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allSports,
  clearErrors,
  deleteSport,
  deactivateSport,
  reactivateSport,
} from "../../actions/sportActions";
import {
  DELETE_SPORT_RESET,
  DEACTIVATE_SPORT_RESET,
  REACTIVATE_SPORT_RESET,
} from "../../constants/sportConstants";

const SportsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, sports } = useSelector((state) => state.allSports);
  const { isDeleted, isDeactivated, isReactivated } =
    useSelector((state) => state.sport) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allSports());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Sport deleted successfully");
      navigate("/admin/sports");
      dispatch({ type: DELETE_SPORT_RESET });
    }
    if (isDeactivated) {
      successMsg("Sport deactivated successfully");
      dispatch({ type: DEACTIVATE_SPORT_RESET });
    }
    if (isReactivated) {
      successMsg("Sport reactivated successfully");
      dispatch({ type: REACTIVATE_SPORT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, isDeactivated, isReactivated]);

  const deleteSportHandler = (id) => {
    dispatch(deleteSport(id));
  };

  const toggleSportActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateSport(id));
      successMsg("Sport Category Reactivated Successfully");
      console.log("Sport reactivated:", id);
    } else {
      await dispatch(deactivateSport(id));
      successMsg("Sport Category Deactivated Successfully");
      console.log("Sport deactivated:", id);
    }
    dispatch(allSports());
  };

  const setSports = () => {
    const data = {
      columns: [
        {
          label: "Sport",
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

    if (sports) {
      sports.forEach((sport) => {
        data.rows.push({
          name: sport.name,
          actions: (
            <Fragment>
              {sport.status === "active" && (
                <Link
                  to={`/admin/sport/${sport._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              )}
              <button
                className={`btn ${
                  sport.status === "inactive" ? "btn-success" : "btn-danger"
                } py-1 px-2 ml-2`}
                onClick={() =>
                  toggleSportActivation(sport._id, sport.status === "inactive")
                }
              >
                <i
                  className={`fa ${
                    sport.status === "inactive"
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
      <MetaData title={"All Sports"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Sports</h1>
              <Link to="/admin/sport" className="btn btn-primary">
                Add New Sport
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setSports()}
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

export default SportsList;
