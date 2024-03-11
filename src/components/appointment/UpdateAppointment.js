import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateAppointment,
  getAppointmentDetails,
  clearErrors,
} from "../../actions/appointmentActions";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const UpdateAppointment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [key, setKey] = useState("");
  const [locations, setLocations] = useState([]);
  const [moveSelected, setMoveSelected] = useState(false);
  const [professor, setProfessor] = useState("");
  const [override, setOverride] = useState(false);
  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { error, appointment } = useSelector(
    (state) => state.appointmentDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.appointment);
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
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/locations`
        );
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!appointment || appointment._id !== id) {
      dispatch(getAppointmentDetails(id));
    } else {
      setTitle(appointment.title);
      setProfessor(appointment.professor || "");
      setDescription(appointment.description);
      setLocation(appointment.location);
      setTimeStart(formatDateTimeLocal(appointment.timeStart));
      setTimeEnd(formatDateTimeLocal(appointment.timeEnd));
      setStatus(appointment.status);
      setAttendees(appointment.attendees || []);
      setReason(appointment.reason);
      setKey(appointment.key);
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
      navigate("/admin/appointments");
      successMsg("Appointment updated successfully");
      dispatch({ type: UPDATE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, appointment, id]);

  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toISOString().slice(0, 16);
    return formattedDate;
  };

  const formatDateTimeLocal = (dateTime) => {
    const date = new Date(dateTime);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16);
  };

  const submitHandler = (e) => {
    e.preventDefault();
   
      const updatedAppointment = {
        title,
        description,
        location,
        timeStart,
        timeEnd,
        status,
        attendees,
        reason,
        key,
        professor,
      };
      dispatch(updateAppointment(appointment._id, updatedAppointment));
  };

  const generateRandomKey = () => {
    const randomKey = Math.random().toString(36).substr(2, 6).toUpperCase();
    setKey(randomKey);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    if (value === "Denied" || value === "Pending") {
      setKey("");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Update Schedules"} />
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
                className="mb-4  text-center"
                style={{
                  backgroundColor: "maroon",
                  padding: "20px",
                  borderRadius: "20px",
                  color: "white",
                }}
              >
                Update Schedules
              </h1>

              <div className="form-group">
                <label htmlFor="title_field">Title:</label>
                <input
                  type="text"
                  id="title_field"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!override}
                />
              </div>

              <div className="form-group">
                <label htmlFor="body_field">Description:</label>
                <textarea
                  className="form-control"
                  id="body_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!override}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="location_field">Location:</label>
                <select
                  id="location_field"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!override}
                >
                  <option value="" disabled selected>
                    Select a Location
                  </option>
                  {locations.map((loc) => {
                    if (loc.status !== "inactive") {
                      return (
                        <option key={loc._id} value={loc.name}>
                          {loc.name}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="professor_field">Professor:</label>
                <input
                  type="text"
                  id="professor_field"
                  className="form-control"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  disabled={!override}
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeStart_field">Date & Start Time:</label>
                <input
                  type="datetime-local"
                  id="timeStart_field"
                  className="form-control"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  disabled={!override}
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeEnd_field">Date & End Time:</label>
                <input
                  type="datetime-local"
                  id="timeEnd_field"
                  className="form-control"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  disabled={!override}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status_field">Status:</label>
                <select
                  id="status_field"
                  className="form-control"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    handleStatusChange(e.target.value);
                  }}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Denied">Denied</option>
                  <option value="Moved">Moved</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reason_field">Reason of Status:</label>
                <select
                  id="reason_field"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select a reason
                  </option>
                  <option value="N/A">N/A</option>
                  <option value="Reason 1">Reason 1</option>
                  <option value="Reason 2">Reason 2</option>
                  <option value="Reason 3">Reason 3</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="override_checkbox">Override:</label>
                <input
                  type="checkbox"
                  id="override_checkbox"
                  checked={override}
                  onChange={() => setOverride(!override)}
                />
              </div>

              <p>
                <b>Waiver & Letter: </b>
              </p>
              {appointment &&
              appointment.screenShot &&
              appointment.screenShot.length > 0 ? (
                <Fragment>
                  {appointment.screenShot.map((image, index) => (
                    <div key={index} className="row">
                      <div className="col-3">
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={image.url}
                            alt={`Screenshot ${index + 1}`}
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <p>No screenshots uploaded</p>
              )}

              <div className="form-group">
                <label htmlFor="key_field">Key ID:</label>
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
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={generateRandomKey}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
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

export default UpdateAppointment;
