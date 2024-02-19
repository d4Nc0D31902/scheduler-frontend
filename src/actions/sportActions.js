import axios from "axios";
import {
  NEW_SPORT_REQUEST,
  NEW_SPORT_SUCCESS,
  NEW_SPORT_FAIL,
  NEW_SPORT_RESET,
  MY_SPORTS_REQUEST,
  MY_SPORTS_SUCCESS,
  MY_SPORTS_FAIL,
  SPORT_DETAILS_REQUEST,
  SPORT_DETAILS_SUCCESS,
  SPORT_DETAILS_FAIL,
  ALL_SPORTS_REQUEST,
  ALL_SPORTS_SUCCESS,
  ALL_SPORTS_FAIL,
  UPDATE_SPORT_SUCCESS,
  UPDATE_SPORT_REQUEST,
  UPDATE_SPORT_FAIL,
  DELETE_SPORT_REQUEST,
  DELETE_SPORT_SUCCESS,
  DELETE_SPORT_FAIL,
  DEACTIVATE_SPORT_REQUEST,
  DEACTIVATE_SPORT_SUCCESS,
  DEACTIVATE_SPORT_FAIL,
  REACTIVATE_SPORT_REQUEST,
  REACTIVATE_SPORT_SUCCESS,
  REACTIVATE_SPORT_FAIL,
  CLEAR_ERRORS,
  SET_SPORTS,
} from "../constants/sportConstants";

export const newSport = (sport) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_SPORT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/sport/new`,
      sport,
      config
    );
    dispatch({
      type: NEW_SPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const mySports = () => async (dispatch) => {
  try {
    dispatch({ type: MY_SPORTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/sports/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_SPORTS_SUCCESS,
      payload: data.sports,
    });
  } catch (error) {
    dispatch({
      type: MY_SPORTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSportDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPORT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/sport/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: SPORT_DETAILS_SUCCESS,
      payload: data.sport,
    });
  } catch (error) {
    dispatch({
      type: SPORT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allSports = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SPORTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/sports`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_SPORTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SPORTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSport = (id, sportData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SPORT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/sport/${id}`,
      sportData,
      config
    );
    dispatch({
      type: UPDATE_SPORT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deactivateSport = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEACTIVATE_SPORT_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/sport/deactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: DEACTIVATE_SPORT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_SPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reactivateSport = (id) => async (dispatch) => {
  try {
    dispatch({ type: REACTIVATE_SPORT_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/sport/reactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: REACTIVATE_SPORT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_SPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteSport = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SPORT_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/sport/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_SPORT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SPORT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setSports = (sports) => ({
  type: SET_SPORTS,
  payload: sports,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
