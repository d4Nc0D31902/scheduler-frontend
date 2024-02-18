import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import BorrowingSteps from "./BorrowingSteps";
import { useSelector } from "react-redux";

const ConfirmBorrow = () => {
  const { borrowCartItems } = useSelector((state) => state.borrowCart);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve borrowingInfo from location state
  const borrowingInfo = location.state?.borrowingInfo;

  // Extract date_borrow and reason_borrow
  const dateOfBorrow = borrowingInfo?.date_borrow;
  const reasonOfBorrow = borrowingInfo?.reason_borrow;

  // Calculate totalItems
  const totalItems = borrowCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const processToPayment = () => {
    const data = {
      totalItems,
      dateOfBorrow, // Pass dateOfBorrow and reasonOfBorrow when navigating
      reasonOfBorrow,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/borrow", { state: { borrowingInfo } }); // Pass borrowingInfo when navigating
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      {/* <BorrowingSteps borrowingInfo confirmBorrow /> */}
      <BorrowingSteps confirmBorrow />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Information</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          {/* <p>
            <b>Date of Borrow:</b> {dateOfBorrow}
          </p> */}
          {/* <p>
            <b>Reason for Borrow:</b> {reasonOfBorrow}
          </p> */}
          <hr />

          <h4 className="mt-4">Your Items:</h4>
          {borrowCartItems.map((item) => (
            <Fragment key={item.equipment}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt="Equipment"
                      height="45"
                      width="65"
                    />
                  </div>
                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.equipment}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x {item.name}
                    </p>
                  </div>
                </div>
              </div>

              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Item Summary</h4>

            <hr />

            <p>
              Total Items:{" "}
              <span className="order-summary-values">{totalItems}</span>
            </p>

            <hr />

            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Borrow
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmBorrow;
