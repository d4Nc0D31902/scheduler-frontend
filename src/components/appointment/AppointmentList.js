import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    return appointments.filter(
      (appointment) => appointment.status === selectedStatus
    );
  };

  const setAppointments = () => {
    const data = {
      columns: [
        // {
        //   label: "Appointment ID",
        //   field: "id",
        //   sort: "asc",
        // },
        {
          label: "Requester",
          field: "requester",
          sort: "asc",
        },
        {
          label: "Attendees",
          field: "attendees",
          sort: "asc",
        },
        {
          label: "Title",
          field: "title",
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
          label: "Time Start",
          field: "timeStart",
          sort: "asc",
        },
        {
          label: "Time End",
          field: "timeEnd",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Reason of Status",
          field: "reason",
          sort: "asc",
        },
        {
          label: "Key ID",
          field: "key",
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

    // if (appointments) {
    //   appointments.forEach((appointment) => {
    //     const attendeesList = appointment.attendees.map((attendee, index) => (
    //       <li key={index}>{attendee}</li>
    //     ));
    //     const statusColor = getStatusColor(appointment.status);
    const filteredData = filteredAppointments();

    if (filteredData) {
      filteredData.forEach((appointment) => {
        const attendeesList = appointment.attendees.map((attendee, index) => (
          <li key={index}>{attendee}</li>
        ));

        const statusColor = getStatusColor(appointment.status);

        data.rows.push({
          requester: appointment.requester,
          attendees: <ul>{attendeesList}</ul>,
          title: appointment.title,
          description: appointment.description,
          location: appointment.location,
          professor: appointment.professor,
          timeStart: new Date(appointment.timeStart).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          timeEnd: new Date(appointment.timeEnd).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: (
            <span style={{ color: statusColor }}>{appointment.status}</span>
          ),
          reason: appointment.reason,
          key: appointment.key,
          actions: (
            <Fragment>
              <Link
                to={`/admin/appointment/${appointment._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
            </Fragment>
          ),
        });
      });
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
            <h1 className="my-5">All Schedules</h1>
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
                <option value="Denied">Denied</option>
                <option value="On Process">On Process</option>
                <option value="Moved">Moved</option>
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
