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
      <section class="h-100 gradient-custom">
        <div class="container py-5">
          <div class="row d-flex justify-content-center my-4">
            <div class="col-md-8">
              <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0">EQUIPMENT TO BORROW</h5>
                </div>
                <div class="card-body">
                  {borrowCartItems.map((item, index) => (
                    <Fragment key={index}>
                      <div class="row">
                        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src={item.image} class="w-100" alt={item.name} />
                            <a href="#!">
                              <div class="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                            </a>
                          </div>
                        </div>
                        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p><strong>{item.name}</strong></p>
                          <p>Quantity: {item.quantity}</p>
                          <Link to={`/product/${item.equipment}`} class="btn btn-primary btn-sm me-1 mb-2">View Details</Link>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <p class="text-start text-md-center"><strong>{item.price}</strong></p>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="mb-3">Information</h5>
                  <p><b>Name:</b> {user && user.name}</p>
                  <hr />
                  <h5 class="mt-4">Item Summary</h5>
                  <p>Total Items: <span class="order-summary-values">{totalItems}</span></p>
                </div>
              </div>
              <div class="card mb-4 mb-lg-0">
                <div class="card-body">
                  <button id="checkout_btn" class="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Borrow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ConfirmBorrow;