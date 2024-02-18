import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../../Equipment.css";
import { addItemToBorrowCart } from "../../actions/borrowCartActions";

const Equipment = ({ equipment }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) =>
      equipment.stock > 0
        ? Math.min(prevQuantity + 1, equipment.stock)
        : prevQuantity
    );
  };

  const addToBorrowCart = () => {
    dispatch(addItemToBorrowCart(equipment._id, quantity))
      .then(() => {
        // Display success toast message
        toast.success("Item Added");
      })
      .catch((error) => {
        // Display error toast message
        toast.error(error.message || "Failed to Add Item");
      });
  };

  if (equipment.status === "active") {
    return (
      <div
        className="card col-lg-12 col-md-12"
        style={{ maxWidth: "450px", marginBottom: "125px" }}
      >
        <img
          src={equipment.images[0].url}
          className="card-img-top"
          alt={equipment.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{equipment.name}</h5>
          <p className="card-text">{equipment.description}</p>
          <p className="card-stock">
            <small className="text-muted">
              Available Stock: {equipment.stock}
            </small>
          </p>
          {equipment.stock > 0 && (
            <>
              <p className="card-stock">
                <small className="text-muted">Quantity</small>
              </p>
              <div className="quantity-control">
                <button
                  className="btn btn-outline-secondary"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1 || equipment.stock === 0}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={increaseQuantity}
                  disabled={
                    quantity === equipment.stock || equipment.stock === 0
                  }
                >
                  +
                </button>
              </div>
            </>
          )}
          {equipment.stock > 0 && (
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToBorrowCart}
            >
              Borrow
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Equipment;
