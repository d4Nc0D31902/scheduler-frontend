import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearCart } from "../../actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const [paymentMethod, setPaymentMethod] = useState("Walk-In");
  const [referenceNum, setReferenceNum] = useState("");
  const [referenceNumError, setReferenceNumError] = useState("");
  const [screenShot, setScreenShot] = useState([]);
  const [screenShotPreview, setScreenShotPreview] = useState([]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    paymentMeth: paymentMethod,
    reference_num: referenceNum,
    screenShot: screenShot,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const validateReferenceNum = () => {
    if (paymentMethod === "GCash" && referenceNum.length !== 13) {
      setReferenceNumError("Reference # must be exactly 13 numbers");
      return false;
    } else {
      setReferenceNumError("");
      return true;
    }
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files);

    setScreenShotPreview([]);
    setScreenShot([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setScreenShotPreview((oldArray) => [...oldArray, reader.result]);
          setScreenShot((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    if (!validateReferenceNum()) {
      return;
    }

    if (paymentMethod === "GCash" && screenShot.length === 0) {
      errMsg("Screenshot is required for GCash payment");
      return;
    }

    order.paymentInfo = {
      id: "pi_1DpdYh2eZvKYlo2CYIynhU32",
      status: "succeeded",
    };
    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <div className="mt-3">
            <h5 className="mb-3">Payment Instructions:</h5>
            <div className="card">
              <div className="card-body">
                <p className="mb-0">
                  <strong>For Walk-In Payments (Cash Payment):</strong>
                </p>
                <ul className="mb-0">
                  <li>
                    Please ensure to bring a printed copy of the receipt or have
                    the email notification readily available on your electronic
                    device when visiting our organization's office.
                  </li>
                  <li>
                    Upon arrival, kindly present the receipt or email
                    notification to the authorized personnel at the office
                    reception.
                  </li>
                  <li>
                    Payment for your order should be made in cash at the office.
                    Our staff will guide you through the payment process.
                  </li>
                </ul>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <p className="mb-0">
                  <strong>For GCash Payments (Electronic Payment):</strong>
                </p>
                <ul className="mb-0">
                  <li>
                    To proceed with GCash payment, kindly utilize your GCash
                    mobile application to scan the provided QR code.
                  </li>
                  <li>
                    After scanning the QR code, complete the transaction by
                    following the prompts on your GCash application.
                  </li>
                  <li>
                    Upon successful completion of the transaction, you are
                    required to upload a screenshot of the transaction
                    confirmation as proof of payment.
                  </li>
                  <li>
                    Additionally, please provide the reference number associated
                    with the transaction to facilitate order processing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <form className="shadow-lg" onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Select Payment Method:</label>
              <div>
                <input
                  type="radio"
                  id="walkIn"
                  name="paymentMethod"
                  value="Walk-In"
                  checked={paymentMethod === "Walk-In"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="walkIn" className="ml-2 mr-4">
                  Walk-In (Cash Payment)
                </label>
                <input
                  type="radio"
                  id="gcash"
                  name="paymentMethod"
                  value="GCash"
                  checked={paymentMethod === "GCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="gcash" className="ml-2">
                  GCash (Electronic Payment)
                </label>
              </div>
              {paymentMethod === "GCash" && (
                <Fragment>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src="/images/qr.png"
                      alt="GCash QR Code"
                      style={{
                        width: "50%",
                        height: "auto",
                        marginBottom: "10px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                  <label className="form-label mt-3">Upload Screenshot:</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="screenshot"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handleScreenshotChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Please! Upload here the transaction payment "GCASH"
                    </label>
                  </div>
                  {screenShotPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Screenshot Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </Fragment>
              )}

              {paymentMethod === "GCash" && referenceNumError && (
                <div className="invalid-feedback">{referenceNumError}</div>
              )}
            </div>

            {paymentMethod === "GCash" && (
              <div className="mb-3">
                <label htmlFor="referenceNum" className="form-label">
                  Reference #:
                </label>
                <input
                  type="text"
                  id="referenceNum"
                  className={`form-control ${
                    referenceNumError ? "is-invalid" : ""
                  }`}
                  value={referenceNum}
                  onChange={(e) => setReferenceNum(e.target.value)}
                  onBlur={validateReferenceNum}
                  pattern="[0-9]{13}"
                  title="Reference # must be exactly 13 numeric numbers"
                />

                {referenceNumError && (
                  <div className="invalid-feedback">{referenceNumError}</div>
                )}
              </div>
            )}
            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              ORDER{" "}
              {` - ₱${
                orderInfo &&
                orderInfo.totalPrice.toLocaleString("en-PH", {
                  maximumFractionDigits: 2,
                })
              }`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
