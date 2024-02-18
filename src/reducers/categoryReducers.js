import {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  MY_CATEGORIES_REQUEST,
  MY_CATEGORIES_SUCCESS,
  MY_CATEGORIES_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_FAIL,
  CLEAR_ERRORS,
  SET_CATEGORIES,
  DEACTIVATE_CATEGORY_REQUEST,
  DEACTIVATE_CATEGORY_SUCCESS,
  DEACTIVATE_CATEGORY_FAIL,
  DEACTIVATE_CATEGORY_RESET,
  REACTIVATE_CATEGORY_REQUEST,
  REACTIVATE_CATEGORY_SUCCESS,
  REACTIVATE_CATEGORY_FAIL,
  REACTIVATE_CATEGORY_RESET,
} from "../constants/categoryConstants";

export const newCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DEACTIVATE_CATEGORY_REQUEST:
    case REACTIVATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DEACTIVATE_CATEGORY_SUCCESS:
    case REACTIVATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case DEACTIVATE_CATEGORY_FAIL:
    case REACTIVATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DEACTIVATE_CATEGORY_RESET:
    case REACTIVATE_CATEGORY_RESET:
      return {
        ...state,
        message: null,
        error: null,
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

export const myCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case MY_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case MY_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case MY_CATEGORIES_FAIL:
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

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case CATEGORY_DETAILS_FAIL:
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

export const allCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_CATEGORIES_FAIL:
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

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_CATEGORY_RESET:
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
