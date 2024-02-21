import React, { Fragment, useState, useEffect, useRef } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAppointmentDetails,
  clearErrors,
} from "../../actions/appointmentActions";
import ReactToPrint from "react-to-print";
import PrintableLetter from "./PrintableLetter";
import "../../Calendar.css";

const AppointmentView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [key, setKey] = useState("");

  const dispatch = useDispatch();
  const { error, appointment } = useSelector(
    (state) => state.appointmentDetails
  );
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
    if (!appointment || appointment._id !== id) {
      dispatch(getAppointmentDetails(id));
    } else {
      setTitle(appointment.title);
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
  }, [dispatch, error, appointment, id]);

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

  const componentRef = useRef();

  const generateRandomKey = () => {
    const randomKey = Math.random().toString(36).substr(2, 6).toUpperCase();
    setKey(randomKey);
  };

  return (
    <Fragment>
      <MetaData title={"Appointment View"} />
      <div className=" row">
        <div className="wrapper my-4 text-center hide-on-print">
          <div className="" ref={componentRef}>
            <h3
              className="card-title"
              style={{
                fontFamily: "sans-serif",
                textAlign: "center",
                marginBottom: "10px",
                margin: "20px",
                backgroundColor: "maroon",
                color: "white",
                padding: "20px",
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
              TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES TAGUIG CITY
              <p style={{ fontSize: "18px", marginTop: "14px" }}>
                The Technological University of the Philippines shall be premier
                state university with recognized excellence in engineering and
                technology education at per with the leading university in the
                ASEAN region.
              </p>
              <h4
                className="my-4 text-center"
                style={{ textDecoration: "underline" }}
              >
                Schedule Permit
              </h4>
            </h3>
            <div className="form-group">
              <div className="letter-info">
                <h3>{title}</h3>
                <p style={{ fontSize: "12px" }}>{description}</p>
                <div className="attendees">
                  <h5>ATTENDEES:</h5>
                  <ul className="attendees-list">
                    {attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))}
                  </ul>
                </div>
                <div className="location-time">
                  <div className="location">
                    <h5>LOCATION:</h5>
                    <p>{location}</p>
                  </div>
                  <div className="time">
                    <h5>TIME:</h5>
                    <p>
                      <span>
                        Time Start:{" "}
                        {new Date(timeStart).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(timeStart).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>{" "}
                      <br />{" "}
                      <span>
                        {" "}
                        Time End:{" "}
                        {new Date(timeEnd).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(timeEnd).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="status">
                  <h4>Status:</h4>
                  <p>{status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <ReactToPrint
          trigger={() => (
            <button
              className="btn btn-primary"
              style={{ padding: "12px 45px" }}
              disabled={appointment && appointment.status !== "Approved"}
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
        {/* 
        <button
          className="btn btn-secondary ml-3"
          onClick={() => window.print()}
          style={{ padding: "12px 24px" }}
        >
          Print Letter
        </button> */}
      </div>

      {/* Render PrintableLetter only if appointment exists and timeStart is valid */}
      {appointment && appointment.timeStart && (
        <div className="print-only">
          <PrintableLetter appointment={appointment} />
        </div>
      )}
    </Fragment>
  );
};

export default AppointmentView;
