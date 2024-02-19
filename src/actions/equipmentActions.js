import axios from "axios";
import {
  NEW_EQUIPMENT_REQUEST,
  NEW_EQUIPMENT_SUCCESS,
  NEW_EQUIPMENT_FAIL,
  NEW_EQUIPMENT_RESET,
  MY_EQUIPMENTS_REQUEST,
  MY_EQUIPMENTS_SUCCESS,
  MY_EQUIPMENTS_FAIL,
  EQUIPMENT_DETAILS_REQUEST,
  EQUIPMENT_DETAILS_SUCCESS,
  EQUIPMENT_DETAILS_FAIL,
  ALL_EQUIPMENTS_REQUEST,
  ALL_EQUIPMENTS_SUCCESS,
  ALL_EQUIPMENTS_FAIL,
  UPDATE_EQUIPMENT_SUCCESS,
  UPDATE_EQUIPMENT_REQUEST,
  UPDATE_EQUIPMENT_FAIL,
  UPDATE_EQUIPMENT_RESET,
  DELETE_EQUIPMENT_REQUEST,
  DELETE_EQUIPMENT_SUCCESS,
  DELETE_EQUIPMENT_FAIL,
  DELETE_EQUIPMENT_RESET,
  DEACTIVATE_EQUIPMENT_REQUEST,
  DEACTIVATE_EQUIPMENT_SUCCESS,
  DEACTIVATE_EQUIPMENT_FAIL,
  DEACTIVATE_EQUIPMENT_RESET,
  REACTIVATE_EQUIPMENT_REQUEST,
  REACTIVATE_EQUIPMENT_SUCCESS,
  REACTIVATE_EQUIPMENT_FAIL,
  REACTIVATE_EQUIPMENT_RESET,
  CLEAR_ERRORS,
  SET_EQUIPMENTS,
} from "../constants/equipmentConstants.js";

export const newEquipment = (equipment) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_EQUIPMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/equipment/new`,
      equipment,
      config
    );
    dispatch({
      type: NEW_EQUIPMENT_SUCCESS,
      payload: data,
    });

    // Do not dispatch NEW_EQUIPMENT_RESET here, leave it to the component
  } catch (error) {
    dispatch({
      type: NEW_EQUIPMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myEquipments = () => async (dispatch) => {
  try {
    dispatch({ type: MY_EQUIPMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/equipments/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_EQUIPMENTS_SUCCESS,
      payload: data.equipments,
    });
  } catch (error) {
    dispatch({
      type: MY_EQUIPMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getEquipmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EQUIPMENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/equipment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: EQUIPMENT_DETAILS_SUCCESS,
      payload: data.equipment,
    });
  } catch (error) {
    dispatch({
      type: EQUIPMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allEquipments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EQUIPMENTS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/equipments`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ALL_EQUIPMENTS_SUCCESS,
      payload: data.equipmentList,
    });
  } catch (error) {
    dispatch({
      type: ALL_EQUIPMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateEquipment = (id, equipmentData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EQUIPMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/equipment/${id}`,
      equipmentData,
      config
    );
    dispatch({
      type: UPDATE_EQUIPMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EQUIPMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteEquipment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EQUIPMENT_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/equipment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_EQUIPMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EQUIPMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deactivateEquipment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEACTIVATE_EQUIPMENT_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/equipment/deactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: DEACTIVATE_EQUIPMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_EQUIPMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reactivateEquipment = (id) => async (dispatch) => {
  try {
    dispatch({ type: REACTIVATE_EQUIPMENT_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/equipment/reactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: REACTIVATE_EQUIPMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_EQUIPMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setEquipments = (equipments) => ({
  type: SET_EQUIPMENTS,
  payload: equipments,
});

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
