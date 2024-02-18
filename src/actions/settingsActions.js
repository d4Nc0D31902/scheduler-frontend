import axios from "axios";
import {
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAIL,
  CLEAR_SETTINGS_ERRORS,
} from "../constants/settingsConstants";

export const updateSettings = (settingsData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SETTINGS_REQUEST });
  
      const url = `${process.env.REACT_APP_API}/api/v1/settings/6581a5b1466cfcabab4cc84f`;
  
      const { data } = await axios.put(url, settingsData, {
        withCredentials: true, //correct
      });
  
      dispatch({
        type: UPDATE_SETTINGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SETTINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSettings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SETTINGS_REQUEST });

    // Make API request to fetch settings
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/settings/6581a5b1466cfcabab4cc84f`);

    dispatch({
      type: GET_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SETTINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearSettingsErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_SETTINGS_ERRORS });
};
