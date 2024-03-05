import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemToBorrowCart } from "../../actions/borrowCartActions";
import "../../Equipment.css";

const Equipment = ({ equipment }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => (equipment.stock > 0 ? Math.min(prevQuantity + 1, equipment.stock) : prevQuantity));
  };

  const addToBorrowCart = () => {
    dispatch(addItemToBorrowCart(equipment._id, quantity))
      .then(() => {
        toast.success("Item Added");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to Add Item");
      });
  };

  return (
    <div className="card h-100">
      <img src={equipment.images[0].url} className="card-img-top" alt={equipment.name} />
      <div className="card-body">
        <h5 className="card-title">{equipment.name}</h5>
        <p className="card-text">{equipment.description}</p>
        <p className="card-text">Available Stock: {equipment.stock}</p>
        {equipment.stock > 0 && (
          <>
            <div className="quantity-control d-flex justify-content-center align-items-center">
              <button className="btn btn-outline-secondary btn-sm mr-2" onClick={decreaseQuantity} disabled={quantity === 1}>
                -
              </button>
              <span className="quantity mr-2">{quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={increaseQuantity}
                disabled={quantity === equipment.stock}
              >
                +
              </button>
            </div>
            <button type="button" className="btn btn-primary mx-auto d-block mt-3" onClick={addToBorrowCart} style={{ backgroundColor: "maroon" }}>
              Borrow
            </button>
          </>
        )}
      </div>
    </div>
  );
};

Equipment.propTypes = {
  equipment: PropTypes.object.isRequired,
};

export default Equipment;