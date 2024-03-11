import axios from "axios";
import {
  NEW_NOTIFICATION_REQUEST,
  NEW_NOTIFICATION_SUCCESS,
  NEW_NOTIFICATION_FAIL,
  NEW_NOTIFICATION_RESET,
  NOTIFICATION_DETAILS_REQUEST,
  NOTIFICATION_DETAILS_SUCCESS,
  NOTIFICATION_DETAILS_FAIL,
  ALL_NOTIFICATIONS_REQUEST,
  ALL_NOTIFICATIONS_SUCCESS,
  ALL_NOTIFICATIONS_FAIL,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
  CLEAR_ERRORS,
  SET_NOTIFICATIONS,
} from "../constants/notificationConstants";

export const newNotification = (notification) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_NOTIFICATION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/notification/new`,
      notification,
      config
    );
    dispatch({
      type: NEW_NOTIFICATION_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_NOTIFICATION_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_NOTIFICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getNotificationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTIFICATION_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/notification/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: NOTIFICATION_DETAILS_SUCCESS,
      payload: data.notification,
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NOTIFICATIONS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/notifications`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_NOTIFICATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateNotifications = (status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTIFICATION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/notifications/update`,
      { status },
      config
    );
    dispatch({
      type: UPDATE_NOTIFICATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NOTIFICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/notification/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_NOTIFICATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTIFICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setNotifications = (notifications) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
