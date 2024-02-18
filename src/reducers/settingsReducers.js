import {
    UPDATE_SETTINGS_REQUEST,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_FAIL,
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL,
    CLEAR_SETTINGS_ERRORS,
  } from "../constants/settingsConstants";
  
  const initialState = {
    settings: {},
    loading: false,
    error: null,
  };
  
  export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SETTINGS_REQUEST:
      case GET_SETTINGS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_SETTINGS_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: action.payload,
        };
  
      case GET_SETTINGS_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: action.payload,
        };
  
      case UPDATE_SETTINGS_FAIL:
      case GET_SETTINGS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_SETTINGS_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  