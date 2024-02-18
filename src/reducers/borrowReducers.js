import {
  CREATE_BORROW_REQUEST,
  CREATE_BORROW_SUCCESS,
  CREATE_BORROW_FAIL,
  MY_BORROWS_REQUEST,
  MY_BORROWS_SUCCESS,
  MY_BORROWS_FAIL,
  BORROW_DETAILS_REQUEST,
  BORROW_DETAILS_SUCCESS,
  BORROW_DETAILS_FAIL,
  ALL_BORROWS_REQUEST,
  ALL_BORROWS_SUCCESS,
  ALL_BORROWS_FAIL,
  UPDATE_BORROW_REQUEST,
  UPDATE_BORROW_SUCCESS,
  UPDATE_BORROW_RESET,
  UPDATE_BORROW_FAIL,
  DELETE_BORROW_REQUEST,
  DELETE_BORROW_SUCCESS,
  DELETE_BORROW_RESET,
  DELETE_BORROW_FAIL,
  CLEAR_ERRORS,
} from "../constants/borrowConstants";

export const newBorrowReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BORROW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BORROW_SUCCESS:
      return {
        ...state,
        loading: false,
        borrow: action.payload,
      };
    case CREATE_BORROW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// borrowReducers.js

export const myBorrowsReducer = (
  state = { loading: false, borrowings: [], error: null },
  action
) => {
  switch (action.type) {
    case MY_BORROWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MY_BORROWS_SUCCESS:
      console.log("Borrows Success Payload:", action.payload); // Add this line to log the success payload
      return {
        ...state,
        loading: false,
        borrowings: action.payload,
        error: null,
      };
    case MY_BORROWS_FAIL:
      console.log("Borrows Fail Payload:", action.payload); // Add this line to log the fail payload
      return {
        ...state,
        loading: false,
        borrowings: [],
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const borrowDetailsReducer = (
  state = { loading: false, borrow: {} },
  action
) => {
  switch (action.type) {
    case BORROW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BORROW_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrow: action.payload.borrowing, // Update to action.payload.borrowing
      };
    case BORROW_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const allBorrowsReducer = (
  state = { loading: false, borrows: [] },
  action
) => {
  switch (action.type) {
    case ALL_BORROWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_BORROWS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrows: action.payload, // Update to action.payload
      };

    case ALL_BORROWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const borrowReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_BORROW_REQUEST:
    case DELETE_BORROW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BORROW_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_BORROW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BORROW_FAIL:
    case DELETE_BORROW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_BORROW_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_BORROW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
