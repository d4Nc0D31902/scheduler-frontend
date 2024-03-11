import {
  NEW_NOTIFICATION_REQUEST,
  NEW_NOTIFICATION_SUCCESS,
  NEW_NOTIFICATION_FAIL,
  MY_NOTIFICATIONS_REQUEST,
  MY_NOTIFICATIONS_SUCCESS,
  MY_NOTIFICATIONS_FAIL,
  NOTIFICATION_DETAILS_REQUEST,
  NOTIFICATION_DETAILS_SUCCESS,
  NOTIFICATION_DETAILS_FAIL,
  ALL_NOTIFICATIONS_REQUEST,
  ALL_NOTIFICATIONS_SUCCESS,
  ALL_NOTIFICATIONS_FAIL,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_RESET,
  UPDATE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_RESET,
  DELETE_NOTIFICATION_FAIL,
  DEACTIVATE_NOTIFICATION_REQUEST,
  DEACTIVATE_NOTIFICATION_SUCCESS,
  DEACTIVATE_NOTIFICATION_FAIL,
  REACTIVATE_NOTIFICATION_REQUEST,
  REACTIVATE_NOTIFICATION_SUCCESS,
  REACTIVATE_NOTIFICATION_FAIL,
  CLEAR_ERRORS,
  SET_NOTIFICATIONS,
} from "../constants/notificationConstants";

export const newNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: action.payload,
      };

    case NEW_NOTIFICATION_FAIL:
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

export const myNotificationsReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case MY_NOTIFICATIONS_REQUEST:
      return {
        loading: true,
      };

    case MY_NOTIFICATIONS_SUCCESS:
      return {
        loading: false,
        notifications: action.payload,
      };

    case MY_NOTIFICATIONS_FAIL:
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

export const notificationDetailsReducer = (
  state = { notification: {} },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NOTIFICATION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: action.payload,
      };

    case NOTIFICATION_DETAILS_FAIL:
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

export const allNotificationsReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case ALL_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.notifications,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_NOTIFICATIONS_FAIL:
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

// export const notificationReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_NOTIFICATION_REQUEST:
//     case DELETE_NOTIFICATION_REQUEST:
//     case DEACTIVATE_NOTIFICATION_REQUEST:
//     case REACTIVATE_NOTIFICATION_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_NOTIFICATION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };

//     case DELETE_NOTIFICATION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case DEACTIVATE_NOTIFICATION_SUCCESS:
//     case REACTIVATE_NOTIFICATION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         notification: action.payload,
//       };

//     case UPDATE_NOTIFICATION_FAIL:
//     case DELETE_NOTIFICATION_FAIL:
//     case DEACTIVATE_NOTIFICATION_FAIL:
//     case REACTIVATE_NOTIFICATION_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     case UPDATE_NOTIFICATION_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };

//     case DELETE_NOTIFICATION_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

export const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_REQUEST:
    case DELETE_NOTIFICATION_REQUEST:
    case DEACTIVATE_NOTIFICATION_REQUEST:
    case REACTIVATE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_NOTIFICATION_SUCCESS:
      // Update the status of the updated notification in the notifications array
      const updatedNotificationId = action.payload; // Assuming payload is the ID of the updated notification
      const updatedNotifications = state.notifications.map((notification) => {
        if (notification._id === updatedNotificationId) {
          // Update the status of the notification
          return { ...notification, status: "read" }; // Assuming the status should be set to "read"
        } else {
          return notification;
        }
      });

      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        notifications: updatedNotifications,
      };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DEACTIVATE_NOTIFICATION_SUCCESS:
    case REACTIVATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: action.payload,
      };

    case UPDATE_NOTIFICATION_FAIL:
    case DELETE_NOTIFICATION_FAIL:
    case DEACTIVATE_NOTIFICATION_FAIL:
    case REACTIVATE_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_NOTIFICATION_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_NOTIFICATION_RESET:
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
