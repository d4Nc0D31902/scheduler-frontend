import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allAppointments,
  clearErrors,
  deleteAppointment,
} from "../../actions/appointmentActions";
import { DELETE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const AppointmentsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, appointments } = useSelector(
    (state) => state.allAppointments
  );
  const { isDeleted } = useSelector((state) => state.appointment);
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    dispatch(allAppointments());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Appointment deleted successfully");
      navigate("/admin/appointments");
      dispatch({ type: DELETE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteAppointmentHandler = (id) => {
    dispatch(deleteAppointment(id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Moved":
        return "orange";
      case "PE Class":
        return "green";
      case "Pending":
        return "orange";
      case "Denied":
        return "red";
      case "On Process":
        return "red";
      default:
        return "";
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredAppointments = () => {
    if (selectedStatus === "All") {
      return appointments;
    }
    return appointments.filter((appointment) =>
      appointment.history.some(
        (historyRecord) => historyRecord.status === selectedStatus
      )
    );
  };

  const setAppointments = () => {
    const data = {
      columns: [
        {
          label: "Title",
          field: "schedTitle",
          sort: "asc",
        },
        {
          label: "Requester",
          field: "requester",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Location",
          field: "location",
          sort: "asc",
        },
        {
          label: "Professor",
          field: "professor",
          sort: "asc",
        },
        {
          label: "Date & Time Start",
          field: "timeStart",
          sort: "asc",
        },
        {
          label: "Date & Time End",
          field: "timeEnd",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Officer",
          field: "by",
          sort: "asc",
        },
        {
          label: "Date of Log",
          field: "createdAt",
          sort: "asc",
        },
      ],
      rows: [],
    };

    const filteredData = filteredAppointments();

    if (filteredData) {
      filteredData.forEach((appointment) => {
        appointment.history.forEach((historyRecord, index) => {
          if (
            historyRecord.status === selectedStatus ||
            selectedStatus === "All"
          ) {
            const statusColor = getStatusColor(historyRecord.status);

            data.rows.push({
              schedTitle: historyRecord.schedTitle,
              requester: historyRecord.requester,
              description: historyRecord.description,
              location: historyRecord.location,
              professor: historyRecord.professor,
              timeStart: new Date(historyRecord.timeStart).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
              timeEnd: new Date(historyRecord.timeEnd).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
              status: (
                <span style={{ color: statusColor }}>
                  {historyRecord.status}
                </span>
              ),
              by: historyRecord.by,
              createdAt: new Date(historyRecord.createdAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              ),
            });
          }
        });
      });

      // Sort the rows by createdAt in descending order
      data.rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Schedules"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Schedule History Logs</h1>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Moved">Moved</option>
                <option value="Denied">Denied</option>
                <option value="On Process">On Process</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setAppointments()}
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

export default AppointmentsList;
