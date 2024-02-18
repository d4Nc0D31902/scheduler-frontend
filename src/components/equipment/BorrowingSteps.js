import React from "react";
import { Link } from "react-router-dom";
// const CheckoutSteps = ({ borrowingInfo, confirmBorrow, borrow }) => {
  const CheckoutSteps = ({ confirmBorrow, borrow }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {/* {borrowingInfo ? (
        <Link to="/borrowingInfo" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Borrowing Information</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Borrowing Information</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )} */}
      {confirmBorrow ? (
        <Link to="/confirmBorrow" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Confirm Request</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Request</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {borrow ? (
        <Link to="/borrow" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Request</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Request</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};
export default CheckoutSteps;
