import {
  ADD_TO_BORROW_CART,
  REMOVE_ITEM_BORROW_CART,
  SAVE_BORROWING_INFO,
  CLEAR_BORROW_CART,
} from "../constants/borrowCartConstants";

export const borrowCartReducer = (
  state = { borrowCartItems: [], borrowingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_BORROW_CART:
      const item = action.payload;
      const isItemExist = state.borrowCartItems.find(
        (i) => i.equipment === item.equipment
      );
      if (isItemExist) {
        return {
          ...state,
          borrowCartItems: state.borrowCartItems.map((i) =>
            i.equipment === isItemExist.equipment ? item : i
          ),
        };
      } else {
        return {
          ...state,
          borrowCartItems: [...state.borrowCartItems, item],
        };
      }
    case REMOVE_ITEM_BORROW_CART:
      return {
        ...state,
        borrowCartItems: state.borrowCartItems.filter(
          (i) => i.equipment !== action.payload
        ),
      };

    case SAVE_BORROWING_INFO:
      return {
        ...state,
        borrowingInfo: action.payload,
      };
    case CLEAR_BORROW_CART:
      return {
        ...state,
        borrowCartItems: [],
        borrowingInfo: {},
      };
    default:
      return state;
  }
};
