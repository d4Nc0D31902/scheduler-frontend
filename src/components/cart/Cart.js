import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTimes,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add merchandise first.");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <section
      className="h-100 h-custom"
      style={{
        backgroundColor: "#D3D3D3",
        backgroundImage: "linear-gradient(to right, #800000, #D3D3D3)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <MetaData title={"Your Cart"} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          PRE-ORDERED ITEMS
                        </h1>
                      </div>
                      <hr className="my-4" />
                      {cartItems.length === 0 ? (
                        <p className="text-center">
                          Your cart is empty.{" "}
                          <Link to="/store">Go back to shopping</Link>
                        </p>
                      ) : (
                        <>
                          {cartItems.map((item) => (
                            <Fragment key={item.product}>
                              <div className="row mb-4 d-flex justify-content-between align-items-center">
                                <div className="col-md-2 col-lg-2 col-xl-2">
                                  <img
                                    src={item.image}
                                    className="img-fluid rounded-3"
                                    alt="Product"
                                  />
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-3">
                                  <h6 className="text-muted">
                                    {item.category}
                                  </h6>
                                  <h6 className="text-black mb-0">
                                    {item.name}
                                  </h6>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                  <button
                                    className="btn btn-link px-2"
                                    onClick={() =>
                                      decreaseQty(item.product, item.quantity)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faMinus} />
                                  </button>
                                  <input
                                    id="form1"
                                    min="0"
                                    name="quantity"
                                    value={item.quantity}
                                    type="number"
                                    className="form-control form-control-sm"
                                  />
                                  <button
                                    className="btn btn-link px-2"
                                    onClick={() =>
                                      increaseQty(
                                        item.product,
                                        item.quantity,
                                        item.stock
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                  <h6 className="mb-0"> ₱ {item.price}</h6>
                                </div>
                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                  <a
                                    href="#!"
                                    className="text-muted"
                                    onClick={() =>
                                      removeCartItemHandler(item.product)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </a>
                                </div>
                              </div>
                              <hr className="my-4" />
                            </Fragment>
                          ))}
                          <div className="pt-5">
                            <h6 className="mb-0">
                              <Link to="/store" className="text-body">
                                <FontAwesomeIcon
                                  icon={faLongArrowAltLeft}
                                  className="me-2"
                                />
                                Back to shop
                              </Link>
                            </h6>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      {/* Summary details */}
                      {cartItems.length > 0 && (
                        <>
                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase">
                              {cartItems.length} MERCHANDISE{" "}
                            </h5>
                            <h5>
                              ₱{" "}
                              {cartItems
                                .reduce(
                                  (acc, item) =>
                                    acc + item.quantity * item.price,
                                  0
                                )
                                .toLocaleString("en-PH", {
                                  maximumFractionDigits: 2,
                                })}
                            </h5>
                          </div>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>
                              ₱{" "}
                              {cartItems
                                .reduce(
                                  (acc, item) =>
                                    acc + item.quantity * item.price,
                                  0
                                )
                                .toLocaleString("en-PH", {
                                  maximumFractionDigits: 2,
                                })}
                            </h5>
                          </div>

                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            onClick={checkoutHandler}
                          >
                            PROCESS ORDER
                          </button>
                        </>
                      )}
                      {cartItems.length === 0 && (
                        <p className="text-danger text-center">
                          Your cart is empty. Please add merchandise first.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
