// borrowCartActions.js

import axios from "axios";
import {
  ADD_TO_BORROW_CART,
  REMOVE_ITEM_BORROW_CART,
  SAVE_BORROWING_INFO,
  CLEAR_BORROW_CART,
} from "../constants/borrowCartConstants";

export const addItemToBorrowCart =
  (id, quantity) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/equipment/${id}`
      );
      dispatch({
        type: ADD_TO_BORROW_CART,
        payload: {
          equipment: data.equipment._id,
          name: data.equipment.name,
          description: data.equipment.description,
          image: data.equipment.images[0].url,
          stock: data.equipment.stock,
          quantity,
        },
      });
      localStorage.setItem(
        "borrowCartItems",
        JSON.stringify(getState().borrowCart.borrowCartItems)
      );
    } catch (error) {
      console.error("Error adding item to borrow cart:", error);
    }
  };

export const removeItemFromBorrowCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_BORROW_CART,
    payload: id,
  });
  localStorage.setItem(
    "borrowCartItems",
    JSON.stringify(getState().borrowCart.borrowCartItems)
  );
};

export const saveBorrowingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_BORROWING_INFO,
    payload: data,
  });
  localStorage.setItem("borrowingInfo", JSON.stringify(data));
};

export const clearBorrowCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_BORROW_CART,
  });
};
