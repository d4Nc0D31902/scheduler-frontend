import React, { Fragment, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowDetails, clearErrors } from "../../actions/borrowActions";
import ReactToPrint from "react-to-print";
import PrintableBorrowDetails from "./PrintableBorrowDetails";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BorrowDetails = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    borrow = {},
  } = useSelector((state) => state.borrowDetails);
  const {
    borrowingInfo = {},
    borrowItems = [],
    user = "",
    date_return,
    issue = "",
    status = "",
    reason_status = "",
  } = borrow;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getBorrowDetails(id));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

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

  const borrowingDetails =
    borrowingInfo &&
    `${formatBorrowDateTime(borrowingInfo.date_borrow)} - ${
      borrowingInfo.reason_borrow
    }`;

  const componentRef = useRef();

  const handleDownloadPDF = () => {
    if (!componentRef.current) return;

    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("borrow-slip.pdf");
    });
  };

  const handleDownloadButtonClick = () => {
    handleDownloadPDF();
  };

  return (
    <Fragment>
      <MetaData title={"Borrow Details"} />

      {loading ? (
        <Loader />
      ) : borrow && borrowingInfo ? (
        <div className="" style={{ marginLeft: "270px", marginRight: "140px" }}>
          <div className="row" style={{ marginTop: "30px" }}>
            <div
              className="col-12 col-lg-7 borrow-details"
              ref={componentRef}
              style={{ marginRight: "10px", border: "solid" }}
            >
              <h3
                className="card-title"
                style={{
                  fontFamily: "sans-serif",
                  textAlign: "center",
                  marginBottom: "10px",

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
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
              </h3>
              <h4 className="my-4 text-center">BORROWING INFORMATION</h4>

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
                        <Link to={`/product/${item.equipment}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <h4 className="mb-4 text-center">BORROW DETAILS</h4>

              <p>
                <b>Requester:</b> {user}
              </p>

              <p className="mb-4">
                <b>Request Info:</b> {borrowingDetails || "N/A"}
              </p>

              <p>
                <b>Date Returned:</b>{" "}
                {date_return ? date_return : "Not returned yet"}
              </p>

              <p>
                <b>Issue:</b> {issue}
              </p>

              <p>
                <b>Status:</b> {status}
              </p>

              <p>
                <b>Reason Status:</b> {reason_status}
              </p>

              <div style={{ textAlign: "center", margin: "20px 0" }}>
                {/* <ReactToPrint
                trigger={() => (
                  <button className="btn btn-primary">Print</button>
                )}
                content={() => componentRef.current}
              /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No borrow details available.</p>
      )}
      <div style={{ marginLeft: "470px", marginTop: "30px" }}>
        <button
          className="btn btn-primary ml-2"
          onClick={handleDownloadButtonClick}
        >
          Download Borrowing Slip
        </button>
      </div>
      <div style={{ display: "none" }}>
        <PrintableBorrowDetails
          ref={componentRef}
          borrow={borrow}
          borrowingInfo={borrowingInfo}
          borrowItems={borrowItems}
          user={user}
          date_return={date_return}
          issue={issue}
          status={status}
          reason_status={reason_status}
          borrowingDetails={borrowingDetails}
        />
      </div>
    </Fragment>
  );
};

export default BorrowDetails;
