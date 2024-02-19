import axios from "axios";
import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  NEW_APPOINTMENT_RESET,
  MY_APPOINTMENTS_REQUEST,
  MY_APPOINTMENTS_SUCCESS,
  MY_APPOINTMENTS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
  ALL_APPOINTMENTS_FAIL,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  APPOINTMENT_JOIN_SUCCESS,
  APPOINTMENT_JOIN_FAIL,
  // USER_APPOINTMENTS_REQUEST,
  // USER_APPOINTMENTS_SUCCESS,
  // USER_APPOINTMENTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/appointmentConstants";

export const createAppointment =
  (appointment) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_APPOINTMENT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/appointment/new`,
        appointment,
        config
      );
      dispatch({
        type: CREATE_APPOINTMENT_SUCCESS,
        payload: data,
      });

      // Dispatch NEW_APPOINTMENT_RESET when the request is successful
      dispatch({ type: NEW_APPOINTMENT_RESET });
    } catch (error) {
      dispatch({
        type: CREATE_APPOINTMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const myAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: MY_APPOINTMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/appointments/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_APPOINTMENTS_SUCCESS,
      payload: data.appointments,
    });
  } catch (error) {
    dispatch({
      type: MY_APPOINTMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAppointmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/appointment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data.appointment,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_APPOINTMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/appointments`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_APPOINTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_APPOINTMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAppointment = (id, appointmentData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_APPOINTMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/appointment/${id}`,
      appointmentData,
      config
    );
    dispatch({
      type: UPDATE_APPOINTMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_APPOINTMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_APPOINTMENT_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/appointment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_APPOINTMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_APPOINTMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const joinAppointment = (appointmentId) => async (dispatch) => {
  try {

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/appointments/${appointmentId}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: APPOINTMENT_JOIN_SUCCESS,
        payload: data.appointment, 
      });
    } else {
      dispatch({
        type: APPOINTMENT_JOIN_FAIL,
        payload: data.message, 
      });
    }
  } catch (error) {
    console.error("Error joining appointment: ", error);
    dispatch({
      type: APPOINTMENT_JOIN_FAIL,
      payload: "Failed to join appointment",
    });
  }
};
