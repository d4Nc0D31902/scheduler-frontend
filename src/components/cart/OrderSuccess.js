import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  sessionStorage.clear();
  localStorage.clear();
  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      <div className="row justify-content-center" style={{ marginTop: "100px" }}>
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <div className="text-center mb-4">
              <img
                src="/images/tupt_logo.png"
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "25px",
                }}
                alt="Logo"
              />
              <h5 className="card-title mb-0">
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES TAGUIG CITY
              </h5>
              <p className="card-text" style={{ fontSize: "12px", marginTop: "10px" }}>
                The Technological University of the Philippines shall be
                premier state university with recognized excellence in
                engineering and technology education at per with the
                leading university in the ASEAN region.
              </p>
            </div>
            <hr />
            <div className="text-center">
              <h2 className="mb-3">Thank you for your support!</h2>
              <p className="mb-4">Your items have been pre-ordered successfully.</p>
              <Link to="/orders/me" className="btn btn-primary">View Your Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default OrderSuccess;