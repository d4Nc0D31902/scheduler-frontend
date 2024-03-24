import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link } from "react-router-dom";
import "../../Calendar.css";
import { TextField, Button } from "@mui/material";
function MyCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.role === "admin";
  const isOfficer = isAuthenticated && user.role === "officer";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_API}/api/v1/appointments`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();

  //         const approvedAppointments = data.appointments
  //           .filter(
  //             (appointment) =>
  //               appointment.status === "Approved" ||
  //               appointment.status === "PE Class" ||
  //               appointment.status === "Moved"
  //           )
  //           .map((appointment) => ({
  //             title: appointment.title,
  //             start: appointment.timeStart,
  //             end: appointment.timeEnd,
  //             id: appointment._id,
  //             details: {
  //               ...appointment,
  //               requester:
  //                 appointment.status === "PE Class"
  //                   ? appointment.requester
  //                   : appointment.requester,
  //             },
  //           }));

  //         setAppointments(approvedAppointments);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching appointments: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/appointments`
        );
        if (response.ok) {
          const data = await response.json();

          const approvedAppointments = data.appointments
            .filter(
              (appointment) =>
                appointment.status === "Approved" ||
                appointment.status === "PE Class" ||
                appointment.status === "Moved"
            )
            .map((appointment) => ({
              title: appointment.title,
              start: appointment.timeStart,
              end: appointment.timeEnd,
              id: appointment._id,
              details: {
                ...appointment,
                requester:
                  appointment.status === "PE Class"
                    ? appointment.requester
                    : appointment.requester,
              },
            }));

          // Fetch data from the external API
          const externalResponse = await fetch(
            "http://calendash.online/api/getAllCalendars"
          );
          if (externalResponse.ok) {
            const externalData = await externalResponse.json();

            // Combine both sets of data
            const combinedAppointments = [...approvedAppointments];

            externalData.forEach((entry) => {
              const {
                organization,
                department,
                status,
                event_name,
                start,
                end,
                venueName,
              } = entry;
              combinedAppointments.push({
                title: event_name,
                start: start,
                end: end,
                id: organization + department, // You can use a unique identifier here
                details: {
                  organization: organization,
                  department: department,
                  status: status,
                  venueName: venueName,
                  // Include any other details you need
                },
              });
            });

            setAppointments(combinedAppointments);
          } else {
            console.error("Error fetching external data");
          }
        }
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEventClick = (info) => {
    setSelectedAppointment(info.event.extendedProps.details);
  };

  const handleJoinClick = async () => {
    try {
      if (selectedAppointment) {
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Error handling join click: ", error);
    }
  };

  const confirmJoinAppointment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/appointment/join/${selectedAppointment._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedAppointment(data.appointment);
        setShowConfirmationModal(false);
        // Force a page reload
        window.location.reload();
      } else {
        console.error("Failed to join appointment: ", response.statusText);
      }
    } catch (error) {
      console.error("Error confirming join appointment: ", error);
    }
  };
  const inputStyle = {
    marginRight: "10px",
    fontFamily: "Verdana, sans-serif",
    fontSize: "26px",
    color: "#333",
    width: "100%",
    padding: "5px",
  };

  const buttonStyle = {
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "5px",
    padding: "5px 20px",
    cursor: "pointer",
  };

  const errorTextStyle = {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
    fontFamily: "Verdana, sans-serif",
    fontSize: "16px",
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setKeyInput("");
    setKeyError("");
  };

  const handleKeyInputChange = (e) => {
    setKeyInput(e.target.value);
  };

  const handleKeySubmit = () => {
    if (selectedAppointment.key === keyInput) {
      setKeyError("");
      handleJoinClick();
    } else {
      setKeyError("Sorry, wrong key");
    }
  };

  const handlePrintCalendar = () => {
    window.print();
  };

  return (
    <div>
      <div className="center-request">
        <Link to="/request">
          <button
            className="btn btn-primary request"
            style={{ backgroundColor: "maroon", marginRight: "20px" }}
          >
            Request Schedule
          </button>
        </Link>
        <button
          className="btn btn-primary"
          onClick={handlePrintCalendar}
          style={{
            backgroundColor: "maroon",
            marginRight: "20px",
            padding: "10px 35px",
          }}
        >
          Print Calendar
        </button>
      </div>
      <div className="printableHeader">
        <h6
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
          <p style={{ fontSize: "12px", marginTop: "14px" }}>
            The Technological University of the Philippines shall be premier
            state university with recognized excellence in engineering and
            technology education at per with the leading university in the ASEAN
            region.
          </p>
          <h4
            className="my-4 text-center"
            style={{ textDecoration: "underline" }}
          >
            SCHEDULES
          </h4>
        </h6>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        weekends={true}
        events={appointments}
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div className="event-dot"></div>
            <p className="event-title">{eventInfo.event.title}</p>
          </div>
        )}
        eventClick={handleEventClick}
        eventClassNames="custom-event-dot"
      />

      {selectedAppointment && (
        <div className="modal active">
          <div className="modal-content" style={{ backgroundColor: "#800000" }}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3
              className="card-title text-center"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
                marginTop: "20px",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              <img
                src="/images/tupt_logo.png"
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
                alt="Logo"
              />
              TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
            </h3>
            <hr style={{ borderColor: "white" }} />
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {selectedAppointment.title}
            </h2>
            <p
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {selectedAppointment.status === "PE Class"
                ? "Professor"
                : "Requester"}
              : {selectedAppointment.requester}
            </p>
            <p
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Location: {selectedAppointment.location}
            </p>
            <div className="time-container " style={{ display: "flex" }}>
              <p
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "16px",
                  color: "#fff",
                  marginRight: "5px",
                }}
              >
                Scheduled time: {formatTime(selectedAppointment.timeStart)}
              </p>
              <p
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                to {formatTime(selectedAppointment.timeEnd)}
              </p>
            </div>
            {selectedAppointment.status !== "PE Class" && (
              <>
                <p
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  Attendees:
                </p>
                <ul
                  className="attendees-list"
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "16px",
                    color: "#fff",
                    textAlign: "center",
                    listStyle: "none",
                    padding: "0",
                  }}
                >
                  {selectedAppointment.attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))}
                </ul>
                {isAuthenticated && (
                  <>
                    <div className="key-input-container">
                      <TextField
                        id="keyInput"
                        label="Enter Key"
                        variant="outlined"
                        value={keyInput}
                        onChange={handleKeyInputChange}
                        placeholder="Enter here the key (e.g. ASDA123)"
                        style={inputStyle}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleKeySubmit}
                        style={buttonStyle}
                      >
                        Join
                      </Button>
                      {keyError && (
                        <p className="key-error" style={errorTextStyle}>
                          {keyError}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={handleCloseConfirmationModal}>
              &times;
            </span>
            <h2>Confirmation</h2>
            <p>Are you sure you want to join this appointment?</p>
            <button
              className="btn btn-primary button-join"
              onClick={confirmJoinAppointment}
            >
              Yes, Join
            </button>
            <button
              className="btn btn-danger button-cancel"
              onClick={handleCloseConfirmationModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
