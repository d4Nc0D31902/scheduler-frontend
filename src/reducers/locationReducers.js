import {
  NEW_LOCATION_REQUEST,
  NEW_LOCATION_SUCCESS,
  NEW_LOCATION_FAIL,
  MY_LOCATIONS_REQUEST,
  MY_LOCATIONS_SUCCESS,
  MY_LOCATIONS_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_DETAILS_FAIL,
  ALL_LOCATIONS_REQUEST,
  ALL_LOCATIONS_SUCCESS,
  ALL_LOCATIONS_FAIL,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_RESET,
  UPDATE_LOCATION_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_RESET,
  DELETE_LOCATION_FAIL,
  DEACTIVATE_LOCATION_REQUEST,
  DEACTIVATE_LOCATION_SUCCESS,
  DEACTIVATE_LOCATION_FAIL,
  REACTIVATE_LOCATION_REQUEST,
  REACTIVATE_LOCATION_SUCCESS,
  REACTIVATE_LOCATION_FAIL,
  CLEAR_ERRORS,
  SET_LOCATIONS,
} from "../constants/locationConstants";

export const newLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload,
      };

    case NEW_LOCATION_FAIL:
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

export const myLocationsReducer = (state = { locations: [] }, action) => {
  switch (action.type) {
    case MY_LOCATIONS_REQUEST:
      return {
        loading: true,
      };

    case MY_LOCATIONS_SUCCESS:
      return {
        loading: false,
        locations: action.payload,
      };

    case MY_LOCATIONS_FAIL:
      return {
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

export const locationDetailsReducer = (state = { location: {} }, action) => {
  switch (action.type) {
    case LOCATION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOCATION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload,
      };

    case LOCATION_DETAILS_FAIL:
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

export const allLocationsReducer = (state = { locations: [] }, action) => {
  switch (action.type) {
    case ALL_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload.locations,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_LOCATIONS_FAIL:
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

export const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION_REQUEST:
    case DELETE_LOCATION_REQUEST:
    case DEACTIVATE_LOCATION_REQUEST: // Add this case
    case REACTIVATE_LOCATION_REQUEST: // Add this case
      return {
        ...state,
        loading: true,
      };

    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DEACTIVATE_LOCATION_SUCCESS: // Add this case
    case REACTIVATE_LOCATION_SUCCESS: // Add this case
      return {
        ...state,
        loading: false,
        location: action.payload,
      };

    case UPDATE_LOCATION_FAIL:
    case DELETE_LOCATION_FAIL:
    case DEACTIVATE_LOCATION_FAIL: // Add this case
    case REACTIVATE_LOCATION_FAIL: // Add this case
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LOCATION_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_LOCATION_RESET:
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
