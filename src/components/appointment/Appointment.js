import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAppointment
  );

  const user = useSelector((state) => state.auth.user);

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

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     const isDateValid = isDateAvailable(timeStart, timeEnd);
  //     const isTimeValid = isTimeAvailable(timeStart, timeEnd);

  //     if (!isDateValid) {
  //       toast.error("Selected date is not available");
  //       return;
  //     }

  //     if (!isTimeValid) {
  //       toast.error("Selected time is not available");
  //       return;
  //     }

  //     const status = "Pending";
  //     const reason = "N/A";
  //     const key = " ";

  //     const appointmentData = {
  //       userId: user._id,
  //       attendees: attendees,
  //       location: location,
  //       title: title,
  //       description: description,
  //       timeStart: timeStart,
  //       timeEnd: timeEnd,
  //       professor: professor,
  //       status: status,
  //       reason: reason,
  //       key: key,
  //       appointmentType: selectedRadio, // Add appointment type to data
  //     };

  //     try {
  //       await dispatch(createAppointment(appointmentData));
  //       navigate("/calendar");
  //       toast.success("Appointment requested successfully");
  //     } catch (error) {
  //       console.error("Error creating appointment:", error);
  //       toast.error("Failed to request appointment");
  //     }
  //   }
  // };

  const submitHandler = async (e) => {
  e.preventDefault();

  if (validateForm()) {
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

    // Set appointment status based on radio button selection
    const status = selectedRadio === "PE Class" ? "PE Class" : "Pending";
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
      status: status,
      reason: reason,
      key: key,
      appointmentType: selectedRadio, // Add appointment type to data
    };

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
    const startDay = new Date(startTime).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const endDay = new Date(endTime).toLocaleDateString("en-US", {
      weekday: "long",
    });

    return startDay === endDay && settingsData.day_schedule.includes(startDay);
  };

  const isTimeAvailable = (startTime, endTime) => {
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
              placeholder="Title ex.Practice Basketball, etc..."
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
              className={`form-control ${errors.description && "is-invalid"}`}
              id="body_field"
              placeholder="Describe the event..."
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location_field">Location:</label>
            <select
              id="location_field"
              className={`form-control ${errors.location && "is-invalid"}`}
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
            <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          {/* <div className="form-group">
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
          </div> */}

          {user.role === "professor" && (
            <div className="form-group">
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

          <button
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            REQUEST
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewAppointment;
