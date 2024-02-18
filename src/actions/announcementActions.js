import axios from "axios";
import {
  NEW_ANNOUNCEMENT_REQUEST,
  NEW_ANNOUNCEMENT_SUCCESS,
  NEW_ANNOUNCEMENT_FAIL,
  NEW_ANNOUNCEMENT_RESET,
  MY_ANNOUNCEMENTS_REQUEST,
  MY_ANNOUNCEMENTS_SUCCESS,
  MY_ANNOUNCEMENTS_FAIL,
  ANNOUNCEMENT_DETAILS_REQUEST,
  ANNOUNCEMENT_DETAILS_SUCCESS,
  ANNOUNCEMENT_DETAILS_FAIL,
  ALL_ANNOUNCEMENTS_REQUEST,
  ALL_ANNOUNCEMENTS_SUCCESS,
  ALL_ANNOUNCEMENTS_FAIL,
  UPDATE_ANNOUNCEMENT_SUCCESS,
  UPDATE_ANNOUNCEMENT_REQUEST,
  UPDATE_ANNOUNCEMENT_FAIL,
  DELETE_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  CLEAR_ERRORS,
  SET_ANNOUNCEMENTS,
} from "../constants/announcementConstants.js";

export const newAnnouncement = (announcement) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_ANNOUNCEMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/announcement/new`,
      announcement,
      config
    );
    dispatch({
      type: NEW_ANNOUNCEMENT_SUCCESS,
      payload: data,
    });

    // Dispatch NEW_ANNOUNCEMENT_RESET after success
    dispatch({ type: NEW_ANNOUNCEMENT_RESET });
  } catch (error) {
    dispatch({
      type: NEW_ANNOUNCEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myAnnouncements = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ANNOUNCEMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/announcements/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_ANNOUNCEMENTS_SUCCESS,
      payload: data.announcements,
    });
  } catch (error) {
    dispatch({
      type: MY_ANNOUNCEMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAnnouncementDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ANNOUNCEMENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/announcement/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: ANNOUNCEMENT_DETAILS_SUCCESS,
      payload: data.announcement,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAnnouncements = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ANNOUNCEMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/announcements`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_ANNOUNCEMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ANNOUNCEMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAnnouncement =
  (id, announcementData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ANNOUNCEMENT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/admin/announcement/${id}`,
        announcementData,
        config
      );
      dispatch({
        type: UPDATE_ANNOUNCEMENT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ANNOUNCEMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ANNOUNCEMENT_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/announcement/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_ANNOUNCEMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ANNOUNCEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setAnnouncements = (announcements) => ({
  type: SET_ANNOUNCEMENTS,
  payload: announcements,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
