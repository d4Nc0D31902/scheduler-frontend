import React, { Fragment } from "react";
import "../../Calendar.css";
const PrintableLetter = ({ appointment }) => {
  // Define formatDate function
  // const formatDate = (dateTime) => {
  //   const formattedDate = new Date(dateTime).toISOString().slice(0, 10);
  //   return formattedDate;
  // };

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Define formatTime function
  const formatTime = (dateTime) => {
    const formattedTime = new Date(dateTime).toLocaleTimeString();
    return formattedTime;
  };

  return (
    <div className="center-div" style={{ marginBottom: "150px" }}>
      <div className="wrapper my-12 col-12  " style={{ borderStyle: "solid", borderColor: "black", borderWidth: "4px" }}>
        <div className="letter ">
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
            <p style={{ fontSize: "16px", marginTop: "14px", padding: "20px" }}>
              The Technological University of the Philippines shall be premier
              state university and the model of excellence in technology
              education in the country in a knowledge-based economy of the 21st
              century.
            </p>
            <h4
              className="my-4 text-center"
              style={{ textDecoration: "underline" }}
            >
              Schedule Permit
            </h4>
          </h6>
          <div className=" " style={{ padding: "40px" }}>
            <p>Date: {formatDate(appointment.timeStart)}</p>
            <p>Dear (Department Head),</p>
            <p>
              We are writing to inform you about your upcoming appointment
              titled {appointment.title} scheduled on{" "}
              {formatDate(appointment.timeStart)} at{" "}
              {formatTime(appointment.timeStart)}. That will also be player or
              will occur on {appointment.location}
            </p>
            {/* <p>Location: {appointment.location}</p> */}
            <p>
              Please make sure to arrive on time and bring any necessary
              documents with you.
            </p>
            <p>Best regards,</p>
            <p>(Your Organization/Name)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableLetter;
