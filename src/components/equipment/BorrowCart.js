import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import "./cartborrow.css";
import {
  addItemToBorrowCart,
  removeItemFromBorrowCart,
} from "../../actions/borrowCartActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTimes, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

const BorrowCart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { borrowCartItems } = useSelector((state) => state.borrowCart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToBorrowCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToBorrowCart(id, newQty));
  };

  const removeBorrowCartItemHandler = (id) => {
    dispatch(removeItemFromBorrowCart(id));
  };

  const checkoutHandler = () => {
    navigate("/confirmBorrow");
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "white" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">BORROWING LIST</h1>
                        <h6 className="mb-0 text-muted">{borrowCartItems.length} items to borrow</h6>
                      </div>
                      <hr className="my-4" />


                      {borrowCartItems.map((item) => (
                        <Fragment key={item.equipment}>
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.image}
                                className="img-fluid rounded-3" alt="Cotton T-shirt"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">

                              <h6 className="text-black mb-0"> {item.name}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button className="btn btn-link px-2" onClick={() => decreaseQty(item.equipment, item.quantity)}>
                                <FontAwesomeIcon icon={faMinus} />
                              </button>

                              <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control form-control-sm" />

                              <button className="btn btn-link px-2" onClick={() => increaseQty(item.equipment, item.quantity, item.stock)}>
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>

                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" className="text-muted" onClick={() => removeBorrowCartItemHandler(item.equipment)}>
                                <FontAwesomeIcon icon={faTimes} />
                              </a>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </Fragment>
                      ))}


                      <div className="pt-5">
                        <h6 className="mb-0"><a href="#!" className="text-body"><FontAwesomeIcon icon={faLongArrowAltLeft} />Back to shop</a></h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />



                      <p>
                        Total of Items:{" "}
                        <span className="order-summary-values">
                          {borrowCartItems.reduce(
                            (acc, item) => acc + Number(item.quantity),
                            0
                          )}{" "}
                          (Items)
                        </span>
                      </p>






                      <button type="button" className="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark" onClick={checkoutHandler}>
                        Continue
                      </button>

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

export default BorrowCart;