import axios from "axios";
import {
  NEW_LOCATION_REQUEST,
  NEW_LOCATION_SUCCESS,
  NEW_LOCATION_FAIL,
  NEW_LOCATION_RESET,
  MY_LOCATIONS_REQUEST,
  MY_LOCATIONS_SUCCESS,
  MY_LOCATIONS_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_DETAILS_FAIL,
  ALL_LOCATIONS_REQUEST,
  ALL_LOCATIONS_SUCCESS,
  ALL_LOCATIONS_FAIL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_FAIL,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
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

export const newLocation = (location) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_LOCATION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/location/new`,
      location,
      config
    );
    dispatch({
      type: NEW_LOCATION_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_LOCATION_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_LOCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myLocations = () => async (dispatch) => {
  try {
    dispatch({ type: MY_LOCATIONS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/locations/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_LOCATIONS_SUCCESS,
      payload: data.locations,
    });
  } catch (error) {
    dispatch({
      type: MY_LOCATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getLocationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/location/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: LOCATION_DETAILS_SUCCESS,
      payload: data.location,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allLocations = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOCATIONS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/locations`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_LOCATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_LOCATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateLocation = (id, locationData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOCATION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/location/${id}`,
      locationData,
      config
    );
    dispatch({
      type: UPDATE_LOCATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LOCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteLocation = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LOCATION_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/location/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_LOCATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LOCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deactivateLocation = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEACTIVATE_LOCATION_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/location/deactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: DEACTIVATE_LOCATION_SUCCESS,
      payload: data.location,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_LOCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reactivateLocation = (id) => async (dispatch) => {
  try {
    dispatch({ type: REACTIVATE_LOCATION_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/location/reactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: REACTIVATE_LOCATION_SUCCESS,
      payload: data.location,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_LOCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setLocations = (locations) => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
