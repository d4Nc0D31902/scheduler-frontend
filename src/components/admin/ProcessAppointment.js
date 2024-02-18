import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetails,
  updateAppointment,
  clearErrors,
} from "../../actions/appointmentActions";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const ProcessAppointment = () => {
  const [status, setStatus] = useState("");
  const [key, setKey] = useState("");

  const dispatch = useDispatch();

  let { id } = useParams();

  const { loading, appointment = {} } = useSelector(
    (state) => state.appointmentDetails
  );

  const {
    requester,
    attendees,
    location,
    title,
    description,
    timeStart,
    timeEnd,
    status: appointmentStatus,
  } = appointment;

  const { error, isUpdated } = useSelector((state) => state.appointment);

  const appointmentId = id;

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getAppointmentDetails(appointmentId));

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Appointment updated successfully");

      dispatch({ type: UPDATE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, isUpdated, appointmentId]);

  const updateAppointmentHandler = (id) => {
    const formData = new FormData();

    formData.set("status", status);

    dispatch(updateAppointment(id, formData));
  };

  const generateRandomKey = () => {
    const randomKey = Math.random().toString(36).substr(2, 6).toUpperCase();
    setKey(randomKey);
  };

  return (
    <Fragment>
      <MetaData
        title={`Process Appointment # ${appointment && appointment._id}`}
      />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Appointment # {appointment._id}</h2>

                  <h4 className="mb-4">Appointment Details</h4>

                  <p>
                    <b>Requester:</b> {requester}
                  </p>

                  <p>
                    <b>Attendees:</b>
                    <ul>
                      {attendees &&
                        attendees.map((attendee, index) => (
                          <li key={index}>{attendee}</li>
                        ))}
                    </ul>
                  </p>

                  <p className="mb-4">
                    <b>Location:</b> {location}
                  </p>

                  <p>
                    <b>Title:</b> {title}
                  </p>

                  <p>
                    <b>Description:</b> {description}
                  </p>

                  <p>
                    <b>Start Time:</b> {new Date(timeStart).toLocaleString()}
                  </p>

                  <p>
                    <b>End Time:</b> {new Date(timeEnd).toLocaleString()}
                  </p>

                  <hr />

                  <h4 className="my-4">Appointment Status:</h4>

                  <p
                    className={
                      appointmentStatus &&
                      String(appointmentStatus).includes("Pending")
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    <b>{appointmentStatus}</b>
                  </p>

                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>

                      <option value="Approved">Approved</option>

                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="key_field">Key</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="key_field"
                        className="form-control"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        disabled
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={generateRandomKey}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateAppointmentHandler(appointment._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessAppointment;
