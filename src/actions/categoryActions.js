import axios from "axios";
import {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  MY_CATEGORIES_REQUEST,
  MY_CATEGORIES_SUCCESS,
  MY_CATEGORIES_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  ALL_CATEGORIES_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
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

export const newCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/new`,
      category,
      config
    );
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_CATEGORY_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myCategories = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CATEGORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/categories/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: MY_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/categories`,
      { withCredentials: true }
    );
    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/category/${id}`,
      categoryData,
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/category/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deactivateCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEACTIVATE_CATEGORY_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/category/deactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: DEACTIVATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reactivateCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: REACTIVATE_CATEGORY_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/category/reactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: REACTIVATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
