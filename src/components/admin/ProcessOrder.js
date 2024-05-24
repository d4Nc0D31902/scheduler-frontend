import React, { Fragment, useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  let { id } = useParams();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
    paymentMeth,
    reference_num,
  } = order;

  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = id;

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Order updated successfully");

      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();

    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
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

                  <h4 className="my-4 text-center">MERCH ORDERS</h4>
                  <div
                    className="cart-item my-1"
                    style={{ backgroundColor: "" }}
                  >
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="65"
                              width="65"
                            />
                            <hr />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
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

                  <h4 className="mb-4 text-center">PAYMENT INFORMATION</h4>

                  <p>
                    <b>Customer :</b> {order && order.customer}
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

                  <p>
                    <b>Reference #:</b> {reference_num}
                  </p>

                  <p>
                    <b>Payment Method:</b> {paymentMeth}
                  </p>

                  <hr />

                  <p>
                    <b>Order Status: </b>{" "}
                    <b
                      className={
                        order.orderStatus &&
                        String(order.orderStatus).includes("Sold")
                          ? "greenColor"
                          : order.orderStatus === "Paid"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {orderStatus}
                    </b>
                  </p>

                  <hr />

                  <h4
                    className="my-4 text-center"
                    style={{ marginBottom: "200px" }}
                  >
                    Status
                  </h4>

                  <div className="form-group" style={{ marginBottom: "" }}>
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Pending</option>
                      <option value="For Pickup">For Pickup</option>
                      <option value="Sold">Sold</option>
                      <option value="Denied">Denied</option>
                      {order.paymentMeth === "Walk-In" && (
                        <option value="Paid">Paid</option>
                      )}
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(order._id)}
                    style={{ marginBottom: "200px" }}
                    disabled={
                      order.orderStatus === "Sold" ||
                      order.orderStatus === "Denied" ||
                      order.orderStatus === "On Process"
                    }
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

export default ProcessOrder;
