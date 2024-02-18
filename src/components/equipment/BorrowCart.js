import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBorrowCart,
  removeItemFromBorrowCart,
} from "../../actions/borrowCartActions";

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
    <Fragment>
      <MetaData title={"Your Borrow Cart"} />
      {borrowCartItems.length === 0 ? (
        <h2 className="mt-5">Nothing to Borrow</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            You are Borrowing: <b>{borrowCartItems.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {borrowCartItems.map((item) => (
                <Fragment key={item.equipment}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Equipment"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/equipments/${item.equipment}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        {/* <p id="card_item_price">{item.price}</p> */}
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.equipment, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.equipment,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() =>
                            removeBorrowCartItemHandler(item.equipment)
                          }
                        ></i>
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
                  Total of Items:{" "}
                  <span className="order-summary-values">
                    {borrowCartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Items)
                  </span>
                </p>
                {/* <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {borrowCartItems
                      .reduce(
                        // (acc, item) => acc + item.quantity * item.price,
                        (acc, item) => acc + item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p> */}
                <hr />

                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BorrowCart;
