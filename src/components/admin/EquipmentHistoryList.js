import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allEquipments,
  clearErrors,
  deactivateEquipment,
  reactivateEquipment,
} from "../../actions/equipmentActions";
import {
  DEACTIVATE_EQUIPMENT_RESET,
  REACTIVATE_EQUIPMENT_RESET,
} from "../../constants/equipmentConstants";

const EquipmentsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, equipments } = useSelector(
    (state) => state.allEquipments
  );
  const { isDeactivated, isReactivated } =
    useSelector((state) => state.equipment) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allEquipments());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeactivated) {
      successMsg("Equipment deactivated successfully");
      console.log("Equipment deactivated:", isDeactivated);
      dispatch({ type: DEACTIVATE_EQUIPMENT_RESET });
    }
    if (isReactivated) {
      successMsg("Equipment reactivated successfully");
      console.log("Equipment reactivated:", isReactivated);
      dispatch({ type: REACTIVATE_EQUIPMENT_RESET });
    }
  }, [dispatch, error, isDeactivated, isReactivated]);

  const toggleEquipmentActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateEquipment(id));
      successMsg("Equipment Reactivated Successfully");
      console.log("Equipment reactivated:", id);
    } else {
      await dispatch(deactivateEquipment(id));
      successMsg("Equipment Reactivated Successfully");
      console.log("Equipment deactivated:", id);
    }
    dispatch(allEquipments());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "Red";
      default:
        return "";
    }
  };

  const setEquipments = () => {
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
          field: "actionBy",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "actionAt",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (equipments && equipments.length > 0) {
      equipments.forEach((equipment) => {
        if (equipment.history && equipment.history.length > 0) {
          equipment.history.forEach((historyLog) => {
            data.rows.push({
              name: equipment.name,
              //   status: historyLog.status,
              status: (
                <span style={{ color: getStatusColor(historyLog.status) }}>
                  {historyLog.status}
                </span>
              ),
              actionBy: historyLog.by,
              actionAt: new Date(historyLog.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          });
        } else {
          console.log("Equipments data is empty or undefined.");
        }
      });
    }
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Equipments"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Equipments</h1>
              <Link to="/admin/equipment" className="btn btn-primary">
                Create Equipment
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setEquipments()}
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

export default EquipmentsList;
