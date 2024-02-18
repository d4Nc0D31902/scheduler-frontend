import React, { Fragment, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";
import "../../App.css";

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  const handlePrintCalendar = () => {
    window.print();
  };

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-12 col-lg-7 order-details">
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
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
              </h3>
              <h4 className="my-4 text-center">ORDER INFORMATION</h4>

              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>₱{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <h4 className="mb-4 text-center">TRANSACTION DETAILS</h4>

              {/* <p>
                <b>Customer Name:</b> {user && user.name}
              </p> */}
              <p>
                <b>Customer:</b> {order && order.customer}
              </p>

              <p>
                <b>Phone Number:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>

              <p className="mb-4">
                <b>Address: </b>
                {shippingDetails}
              </p>

              <p>
                <b>Payment Amount:</b> ₱{totalPrice}
              </p>

              <p>
                <b>Screenshot: </b>
              </p>
              {order && order.screenShot && order.screenShot.length > 0 ? (
                <Fragment>
                  {order.screenShot.map((image, index) => (
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

              <hr />

              <p>
                <b>Payment Method:</b> {order && order.paymentMeth}
              </p>

              <p>
                <b>Reference Number:</b> {order && order.reference_num}
              </p>
              
              <p>
                <b>Payment Status: </b>
                <b className={isPaid ? "greenColor" : "redColor"}>
                  {isPaid ? "PAID" : "NOT PAID"}
                </b>
              </p>
              <p style={{ marginBottom: "100px" }}>
                <b>Order Status: </b>{" "}
                <b
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderStatus}
                </b>
              </p>
              <button
                className="btn btn-primary text-center print-button"
                onClick={handlePrintCalendar}
                style={{
                  backgroundColor: "maroon",
                  marginRight: "20px",
                  padding: "10px 35px",
                  marginBottom: "200px",
                }}
              >
                Print Receipt
              </button>
            </div>
          </div>

          {/* <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>

              <p>
                <b>Name:</b> {user && user.name}
              </p>

              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>

              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>

              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>

              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>

              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr /> */}

          {/* <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div> */}

          {/* <hr />
            </div>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
