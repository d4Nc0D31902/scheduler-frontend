import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import PrintableLetter from "./PrintableLetter";
import "./appointment.css";
import {
  createAppointment,
  clearErrors,
} from "../../actions/appointmentActions";
import { NEW_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const NewAppointment = () => {
  const [attendees, setAttendees] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [locations, setLocations] = useState([]);
  const [professor, setProfessor] = useState("");
  const [users, setUsers] = useState([]);
  const [settingsData, setSettingsData] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [screenShot, setScreenShot] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAppointment
  );

  // const user = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user) || {};

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const getMinDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/settings/6581a5b1466cfcabab4cc84f`
        );
        setSettingsData(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/calendar");
      message("Appointment created successfully");
      dispatch({ type: NEW_APPOINTMENT_RESET });
    }
  }, [dispatch, error, success, navigate]);

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
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/users`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Reset professor data when location changes
    setProfessor("");
  }, [location]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!title.trim()) {
      newErrors = { ...newErrors, title: "Title is required" };
      isValid = false;
    }

    if (!description.trim()) {
      newErrors = { ...newErrors, description: "Description is required" };
      isValid = false;
    }

    if (!location.trim()) {
      newErrors = { ...newErrors, location: "Location is required" };
      isValid = false;
    }

    if (!timeStart || !timeEnd) {
      newErrors = { ...newErrors, time: "Start and End time are required" };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length > 50) {
      setDescriptionError("Description should be 50 characters or less");
    } else {
      setDescriptionError("");
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenShot([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setScreenShot((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const fetchUserAppointments = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/appointments/me`,
        { withCredentials: true }
      );
      return response.data.appointments;
    } catch (error) {
      console.error("Error fetching user appointments:", error);
      return [];
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (screenShot.length === 0) {
        const isAdmin = user && user.role === "admin";
        // Check if any file has been selected
        toast.error("Please select a file.");
        return;
      }
      const isAdmin = user && user.role === "admin";

      const isDateValid = isDateAvailable(timeStart, timeEnd);
      const isTimeValid = isTimeAvailable(timeStart, timeEnd);

      if (!isDateValid) {
        toast.error("Selected date is not available");
        return;
      }

      if (!isTimeValid) {
        toast.error("Selected time is not available");
        return;
      }

      // Set appointment status based on user role
      let status = selectedRadio === "PE Class" ? "PE Class" : "Pending";
      if (isAdmin) {
        status = "Approved";
      }

      const reason = "N/A";
      const key = " ";

      const appointmentData = {
        userId: user._id,
        attendees: attendees,
        location: location,
        title: title,
        description: description,
        timeStart: timeStart,
        timeEnd: timeEnd,
        professor: professor,
        status: status, // Update appointment status here
        reason: reason,
        key: key,
        appointmentType: selectedRadio, // Add appointment type to data
        screenShot: screenShot,
      };

      // Fetch all appointments of the logged-in user
      const userAppointments = await fetchUserAppointments(user._id);

      // Condition 1: User can only create an appointment once per day
      const hasAppointmentOnSameDay = userAppointments.some((appointment) => {
        const appointmentDate = new Date(
          appointment.createdAt
        ).toLocaleDateString();
        const currentDate = new Date("05-04-2024").toLocaleDateString();
        return appointmentDate === currentDate;
      });
      if (hasAppointmentOnSameDay) {
        toast.error("You can only create one appointment per day.");
        return;
      }

      // Condition 2: User can only have three Approved appointments per week
      const approvedAppointmentsThisWeek = userAppointments.filter(
        (appointment) => {
          const appointmentDate = new Date(appointment.createdAt);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate - appointmentDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7 && appointment.status === "Pending";
        }
      );
      if (
        approvedAppointmentsThisWeek.length >= 3 &&
        selectedRadio !== "PE Class"
      ) {
        toast.error("You can only have three Approved appointments per week.");
        return;
      }

      // Condition 3: User cannot create an appointment with the same timeStart, timeEnd, and location
      const hasOverlappingAppointment = userAppointments.some((appointment) => {
        return (
          appointment.location === location &&
          ((new Date(appointment.timeStart) <= new Date(timeStart) &&
            new Date(timeStart) <= new Date(appointment.timeEnd)) ||
            (new Date(appointment.timeStart) <= new Date(timeEnd) &&
              new Date(timeEnd) <= new Date(appointment.timeEnd)))
        );
      });
      if (hasOverlappingAppointment) {
        toast.error(
          "You already have an appointment with the same time and location."
        );
        return;
      }

      try {
        await dispatch(createAppointment(appointmentData));
        navigate("/calendar");
        toast.success("Appointment requested successfully");
      } catch (error) {
        console.error("Error creating appointment:", error);
        toast.error("Failed to request appointment");
      }
    }
  };

  const isDateAvailable = (startTime, endTime) => {
    if (user && user.role === "admin") {
      return true; // All dates are available for admin
    }

    const startDay = new Date(startTime).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const endDay = new Date(endTime).toLocaleDateString("en-US", {
      weekday: "long",
    });

    return settingsData.day_schedule.includes(startDay);
  };

  const isTimeAvailable = (startTime, endTime) => {
    if (user.role === "admin") {
      return true; // All times are available for admin
    }
    const parseTimeString = (timeString) => {
      const [time, meridiem] = timeString.split(" ");
      const [hours, minutes] = time.split(":");

      let h = parseInt(hours);
      const m = parseInt(minutes || 0);

      if (meridiem === "PM" && h !== 12) {
        h += 12;
      } else if (meridiem === "AM" && h === 12) {
        h = 0;
      }

      return h * 60 + m;
    };

    const extractTime = (dateString) => {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes}`;
    };

    const morningStart = parseTimeString(settingsData.morning_schedule[0]);
    const morningEnd = parseTimeString(settingsData.morning_schedule[1]);
    const afternoonStart = parseTimeString(settingsData.afternoon_schedule[0]);
    const afternoonEnd = parseTimeString(settingsData.afternoon_schedule[1]);

    const selectedStartTime = parseTimeString(extractTime(startTime));
    const selectedEndTime = parseTimeString(extractTime(endTime));

    const isStartValid =
      (selectedStartTime >= morningStart && selectedStartTime <= morningEnd) ||
      (selectedStartTime >= afternoonStart &&
        selectedStartTime <= afternoonEnd);

    const isEndValid =
      (selectedEndTime >= morningStart && selectedEndTime <= morningEnd) ||
      (selectedEndTime >= afternoonStart && selectedEndTime <= afternoonEnd);

    return isStartValid && isEndValid;
  };
  return (
    <Fragment>
      <div className="wrapper my-5">
        <form
          onSubmit={submitHandler}
          style={{ borderStyle: "solid", borderWidth: "2px" }}
        >
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
              style={{ width: "100px", height: "100px", marginRight: "25px" }}
              alt="Logo"
            />
            TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
          </h3>
          <h1
            className="mb-4 text-center"
            style={{
              backgroundColor: "maroon",
              padding: "20px",
              borderRadius: "20px",
              color: "white",
            }}
          >
            Request Schedule
          </h1>

          <div className="form-group">
            <label htmlFor="title_field">Title:</label>
            <input
              type="text"
              placeholder="Basketball Game"
              id="title_field"
              className={`form-control ${errors.title && "is-invalid"}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="body_field">Description</label>
            <textarea
              className={`form-control ${
                descriptionError && "is-invalid"
              }hide-on-print`}
              id="body_field"
              placeholder="Description of the Request"
              rows="8"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <small className="form-text text-muted">{characterCount}/50</small>
            {descriptionError && (
              <div className="invalid-feedback">{descriptionError}</div>
            )}
          </div>

          <div className="form-group hide-on-print">
            <label htmlFor="location_field">Location:</label>
            <select
              id="location_field"
              className={`form-control ${
                errors.location && "is-invalid"
              }hide-on-print`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
            {errors.location && (
              <div className="invalid-feedback">{errors.location}</div>
            )}
          </div>

          {location === "Outdoor Court" && (
            <div className="form-group hide-on-print">
              <label htmlFor="professor_field">Professor:</label>
              <select
                id="professor_field"
                className="form-control"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
              >
                <option value="" disabled>
                  Select Professor
                </option>
                {users
                  .filter(
                    (professor) =>
                      professor.role === "professor" &&
                      professor.availability === "available" &&
                      professor._id !== user._id
                  )
                  .map((professor) => (
                    <option key={professor._id} value={professor.name}>
                      {professor.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="form-group hide-on-print">
            <label htmlFor="timeStart_field">Date & Time Start:</label>
            <input
              type="datetime-local"
              id="timeStart_field"
              className={`form-control ${errors.time && "is-invalid"}`}
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              min={getMinDateTime()}
            />
            {errors.time && (
              <div className="invalid-feedback">{errors.time}</div>
            )}
          </div>

          <div className="form-group hide-on-print">
            <label htmlFor="endTime_field">Date & Time End:</label>
            <input
              type="datetime-local"
              id="endTime_field"
              className={`form-control ${errors.time && "is-invalid"}`}
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              min={getMinDateTime()}
            />
            {errors.time && (
              <div className="invalid-feedback">{errors.time}</div>
            )}
          </div>

          {user.role === "professor" && (
            <div className="form-group hide-on-print">
              <label>Appointment Type:</label>
              <div>
                <input
                  type="radio"
                  id="pe_class"
                  value="PE Class"
                  checked={selectedRadio === "PE Class"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor="pe_class" style={{ marginRight: "10px" }}>
                  PE Class
                </label>
              </div>
            </div>
          )}

          <div className="form-group hide-on-print">
            <label className="form-label mt-3">Upload Waiver & Letter:</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                multiple
                onChange={handleScreenshotChange}
                required // Add the required attribute here
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
            {screenShot.length > 0 && (
              <div className="mt-3">
                {screenShot.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginRight: "10px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="button" // Change type to button
              className="btn btn-secondary ml-3 hide-on-print"
              onClick={() => window.print()}
              style={{ padding: "12px 24px" }}
            >
              Print Letter and Waiver
            </button>
          </div>

          {/* Render PrintableLetter only if appointment exists and timeStart is valid */}
          <div className="print-only">
            <PrintableLetter appointment />
          </div>

          <button
            id="login_button"
            type="submit"
            className="btn btn-block py-3 hide-on-print"
            disabled={loading}
            style={{ backgroundColor: "maroon", color: "white" }}
          >
            REQUEST APPOINTMENT
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewAppointment;
