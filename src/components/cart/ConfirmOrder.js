import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalPrice = itemsPrice.toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">
                    {" "}
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
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      The Technological University of the Philippines shall be
                      premier state university with recognized excellence in
                      engineering and technology education at per with the
                      leading university in the ASEAN region.
                    </p>
                  </h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">PRE-ORDER LIST</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.product}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "80px" }}
                            />
                            <Link
                              to={`/product/${item.product}`}
                              className="ms-2"
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      <p>
                        <strong>AMOUNT TO PAY:</strong> ₱{totalPrice}
                      </p>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">PRE-ORDERED SUMMARY</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Name:</strong>
                      <span>{user && user.name}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Email:</strong>
                      <span>{user && user.email}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Phone:</strong>
                      <span>{shippingInfo.phoneNo}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Address:</strong>
                      <span>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Subtotal: </strong>
                      <span>
                        ₱
                        {totalPrice.toLocaleString("en-PH", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </li>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={processToPayment}
                    >
                      Proceed to Payment
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ConfirmOrder;
