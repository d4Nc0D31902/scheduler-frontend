import {
  NEW_ANNOUNCEMENT_REQUEST,
  NEW_ANNOUNCEMENT_SUCCESS,
  NEW_ANNOUNCEMENT_FAIL,
  MY_ANNOUNCEMENTS_REQUEST,
  MY_ANNOUNCEMENTS_SUCCESS,
  MY_ANNOUNCEMENTS_FAIL,
  ANNOUNCEMENT_DETAILS_REQUEST,
  ANNOUNCEMENT_DETAILS_SUCCESS,
  ANNOUNCEMENT_DETAILS_FAIL,
  ALL_ANNOUNCEMENTS_REQUEST,
  ALL_ANNOUNCEMENTS_SUCCESS,
  ALL_ANNOUNCEMENTS_FAIL,
  UPDATE_ANNOUNCEMENT_REQUEST,
  UPDATE_ANNOUNCEMENT_SUCCESS,
  UPDATE_ANNOUNCEMENT_RESET,
  UPDATE_ANNOUNCEMENT_FAIL,
  DELETE_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_RESET,
  DELETE_ANNOUNCEMENT_FAIL,
  CLEAR_ERRORS,
  SET_ANNOUNCEMENTS,
} from "../constants/announcementConstants";

export const newAnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true, // Set success to true
        announcement: action.payload,
      };
    case SET_ANNOUNCEMENTS: // Add this case
      return {
        ...state,
        announcements: action.payload,
      };
    case NEW_ANNOUNCEMENT_FAIL:
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

export const myAnnouncementsReducer = (
  state = { announcements: [] },
  action
) => {
  switch (action.type) {
    case MY_ANNOUNCEMENTS_REQUEST:
      return {
        loading: true,
      };
    case SET_ANNOUNCEMENTS: // Add this case
      return {
        ...state,
        announcements: action.payload,
      };

    case MY_ANNOUNCEMENTS_SUCCESS:
      return {
        loading: false,
        announcements: action.payload,
      };

    case MY_ANNOUNCEMENTS_FAIL:
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

export const announcementDetailsReducer = (
  state = { announcement: {} },
  action
) => {
  switch (action.type) {
    case ANNOUNCEMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ANNOUNCEMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        announcement: action.payload,
      };

    case ANNOUNCEMENT_DETAILS_FAIL:
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

export const allAnnouncementsReducer = (
  state = { announcements: [] },
  action
) => {
  switch (action.type) {
    case ALL_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_ANNOUNCEMENTS: // Add this case
      return {
        ...state,
        announcements: action.payload,
      };

    case ALL_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        announcements: action.payload.announcements,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ANNOUNCEMENTS_FAIL:
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

export const announcementReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ANNOUNCEMENT_REQUEST:
    case DELETE_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ANNOUNCEMENT_FAIL:
    case DELETE_ANNOUNCEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ANNOUNCEMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ANNOUNCEMENT_RESET:
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
