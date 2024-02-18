import React, { forwardRef } from "react";
import { Link, useParams } from "react-router-dom";

const PrintableBorrowDetails = forwardRef(
  (
    {
      borrow,
      borrowingInfo,
      borrowItems,
      user,
      date_return,
      issue,
      status,
      reason_status,
      borrowingDetails,
    },
    ref
  ) => {
    const formatBorrowDateTime = (date) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDateTime = new Date(date).toLocaleDateString(
        "en-US",
        options
      );
      return formattedDateTime;
    };

    return (
      <div ref={ref} style={{ borderStyle: "solid", borderColor: "black", margin: "100px" }}>
        <div className="col-12 col-lg-7 borrow-details">
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
            <p style={{ fontSize: "12px", marginTop: "14px" }}>The Technological University of the Philippines shall be premier state university with recognized excellence in
              engineering and technology education at per with the leading university in the ASEAN region.</p>
            <h4 className="my-4 text-center" style={{ textDecoration: "underline" }}>BORROWER'S SLIP</h4>
          </h6>

          <div
            className="cart-item my-1"
            style={{ backgroundColor: "" }}
          >



            <h4 className="mb-4 text-center">SPORTS AND CULTURAL DEVELOPMENT OFFICE</h4>


            <p>
              <b>Borrower's Information:</b> {user}
            </p>
            <p className="mb-4">
              <b>Borrowing Information:</b> {borrowingDetails || "N/A"}
            </p>
            <h4 className="mb-4 text-center">ITEM(S) BORROWED:</h4>

            {borrowItems &&
              borrowItems.map((item) => (
                <div key={item._id} className="row my-5">

                  <div className="col-3 col-lg-2 text-center">

                    <hr />
                    <h6 >Quantity: </h6>
                    {item.quantity}
                    <hr />

                  </div>
                  <div className="col-5 col-lg-4 text-center">
                    <hr />
                    <h6>Item/s Description</h6>
                    <Link to={`/product/${item.equipment}`}>
                      {item.name}
                    </Link>
                    <hr />
                  </div>
                  <div className="col-4 col-lg-2  text-center">
                    <hr />
                    <img
                      src={item.image}
                      alt={item.name}
                      height="50"
                      width="50"
                    />
                    <hr />
                  </div>
                </div>
              ))}
          </div>

          <p>
            <b>Date Return:</b>{" "}
            {date_return
              ? formatBorrowDateTime(date_return)
              : "Not returned yet"}
          </p>
          <hr />
          <p>
            <b>Issue:</b> {issue}
          </p>
          <hr />
          <p>
            <b>Status:</b> {status}
          </p>
          <hr />
          <p>
            <b>Reason Status:</b> {reason_status}
          </p>
          <hr />
        </div>

















        {/* <h3>Borrowing Slip</h3>
        <div>
      

          <div className="cart-item my-1">
            {borrowItems.length > 0 &&
              borrowItems.map((item) => (
                <div key={item._id} className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={`/product/${item.equipment}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>Quantity: {item.quantity}</p>
                  </div>

                </div>
              ))} */}
        {/* <p>
              <b>Date Return:</b>{" "}
              {date_return
                ? formatBorrowDateTime(date_return)
                : "Not returned yet"}
            </p>
            <p>
              <b>Issue:</b> {issue}
            </p>

            <p>
              <b>Status:</b> {status}
            </p>

            <p>
              <b>Reason Status:</b> {reason_status}
            </p> */}


        {/* <p>
            <b>Borrower:</b> {user}
          </p>

          <p className="mb-4">
            <b>Borrowing Info:</b> {borrowingDetails || "N/A"}
          </p>

          <p>
            <b>Date Return:</b>{" "}
            {date_return
              ? formatBorrowDateTime(date_return)
              : "Not returned yet"}
          </p>

          <p>
            <b>Issue:</b> {issue}
          </p>

          <p>
            <b>Status:</b> {status}
          </p>

          <p>
            <b>Reason Status:</b> {reason_status}
          </p> */}
      </div>

    );
  }
);

export default PrintableBorrowDetails;
