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
  const navigate = useNavigate();
  const { loading, error, sports, isDeleted, isDeactivated, isReactivated } =
    useSelector((state) => state.allSports);

  const errMsg = useCallback(
    (message = "") =>
      toast.error(message, { position: toast.POSITION.BOTTOM_CENTER }),
    []
  );

  const successMsg = useCallback(
    (message = "") =>
      toast.success(message, { position: toast.POSITION.BOTTOM_CENTER }),
    []
  );

  const handleDeleteSport = useCallback(
    (id) => {
      dispatch(deleteSport(id));
    },
    [dispatch]
  );

  const handleDeactivateSport = useCallback(
    (id) => {
      dispatch(deactivateSport(id));
    },
    [dispatch]
  );

  const handleReactivateSport = useCallback(
    (id) => {
      dispatch(reactivateSport(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(allSports());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, errMsg]);

  useEffect(() => {
    if (isDeleted) {
      successMsg("Sport deleted successfully");
      dispatch({ type: DELETE_SPORT_RESET });
    }
  }, [isDeleted, successMsg, dispatch]);

  useEffect(() => {
    if (isDeactivated) {
      successMsg("Sport deactivated successfully");
      dispatch({ type: DEACTIVATE_SPORT_RESET });
    }
  }, [isDeactivated, successMsg, dispatch]);

  useEffect(() => {
    if (isReactivated) {
      successMsg("Sport reactivated successfully");
      dispatch({ type: REACTIVATE_SPORT_RESET });
    }
  }, [isReactivated, successMsg, dispatch]);

  const toggleSportActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateSport(id));
      successMsg("Sport Reactivated Successfully");
      console.log("Sport reactivated:", id);
    } else {
      await dispatch(deactivateSport(id));
      successMsg("Sport Deactivated Successfully");
      console.log("Sport deactivated:", id);
    }
    dispatch(allSports());
  };

  const setSports = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Action By",
          field: "by",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
          sort: "desc",
        },
      ],
      rows: [],
    };

    if (sports) {
      sports.forEach((sport) => {
        sport.history.forEach((historyEntry) => {
          const createdAtFormatted = new Date(
            historyEntry.createdAt
          ).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          // Determine the color based on status
          const statusColor =
            historyEntry.status === "active" ? "green" : "red";

          data.rows.push({
            name: historyEntry.name,
            status: (
              <span style={{ color: statusColor }}>{historyEntry.status}</span>
            ),
            by: historyEntry.by,
            createdAt: createdAtFormatted,
          });
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
                Create Sport
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
