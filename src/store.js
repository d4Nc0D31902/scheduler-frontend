import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
  googleLoginReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { borrowCartReducer } from "./reducers/borrowCartReducers";
import {
  newNotificationReducer, // Updated import
  myNotificationsReducer, // Updated import
  notificationDetailsReducer, // Updated import
  allNotificationsReducer, // Updated import
  notificationReducer, // Updated import
} from "./reducers/notificationReducers"; // Updated import
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";
import {
  newAppointmentReducer,
  myAppointmentsReducer,
  appointmentDetailsReducer,
  allAppointmentsReducer,
  appointmentReducer,
} from "./reducers/appointmentReducers";
import {
  newLocationReducer,
  myLocationsReducer,
  locationDetailsReducer,
  allLocationsReducer,
  locationReducer,
} from "./reducers/locationReducers";
import {
  newSportReducer,
  mySportsReducer,
  sportDetailsReducer,
  allSportsReducer,
  sportReducer,
} from "./reducers/sportReducers";
import {
  newCategoryReducer, // Updated import
  myCategoriesReducer, // Updated import
  categoryDetailsReducer, // Updated import
  allCategoriesReducer, // Updated import
  categoryReducer, // Updated import
} from "./reducers/categoryReducers"; // Updated import
import {
  newAnnouncementReducer,
  myAnnouncementsReducer,
  announcementDetailsReducer,
  allAnnouncementsReducer,
  announcementReducer,
} from "./reducers/announcementReducers";
import {
  newBorrowReducer,
  myBorrowsReducer,
  borrowDetailsReducer,
  allBorrowsReducer,
  borrowReducer,
} from "./reducers/borrowReducers";
import {
  newEquipmentReducer,
  myEquipmentsReducer,
  equipmentDetailsReducer,
  allEquipmentsReducer,
  equipmentReducer,
} from "./reducers/equipmentReducers";
import {
  salesPerMonthReducer,
  productSalesReducer,
} from "./reducers/chartReducers";

import { settingsReducer } from "./reducers/settingsReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  borrowCart: borrowCartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  googleLogin: googleLoginReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  newAppointment: newAppointmentReducer,
  myAppointments: myAppointmentsReducer,
  appointmentDetails: appointmentDetailsReducer,
  allAppointments: allAppointmentsReducer,
  appointment: appointmentReducer,
  newLocation: newLocationReducer,
  myLocations: myLocationsReducer,
  locationDetails: locationDetailsReducer,
  allLocations: allLocationsReducer,
  newSport: newSportReducer,
  mySports: mySportsReducer,
  sportDetails: sportDetailsReducer,
  allSports: allSportsReducer,
  newCategory: newCategoryReducer, // Updated key
  myCategories: myCategoriesReducer, // Updated key
  categoryDetails: categoryDetailsReducer, // Updated key
  allCategories: allCategoriesReducer, // Updated key
  categoryReducer: categoryReducer, // Updated key
  newAnnouncement: newAnnouncementReducer,
  myAnnouncements: myAnnouncementsReducer,
  announcementDetails: announcementDetailsReducer,
  allAnnouncements: allAnnouncementsReducer,
  newBorrow: newBorrowReducer,
  myBorrows: myBorrowsReducer,
  borrowDetails: borrowDetailsReducer,
  allBorrows: allBorrowsReducer,
  newEquipment: newEquipmentReducer,
  myEquipments: myEquipmentsReducer,
  equipmentDetails: equipmentDetailsReducer,
  allEquipments: allEquipmentsReducer,
  settings: settingsReducer,
  locationReducer: locationReducer,
  sportReducer: sportReducer,
  announcementReducer: announcementReducer,
  borrowReducer: borrowReducer,
  equipmentReducer: equipmentReducer,
  newNotification: newNotificationReducer, // Add new notification reducer
  myNotifications: myNotificationsReducer, // Add my notifications reducer
  notificationDetails: notificationDetailsReducer, // Add notification details reducer
  allNotifications: allNotificationsReducer, // Add all notifications reducer
  notificationReducer: notificationReducer, // Add notification reducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  borrowCart: {
    borrowCartItems: localStorage.getItem("borrowCartItems")
      ? JSON.parse(localStorage.getItem("borrowCartItems"))
      : [],
    borrowingInfo: localStorage.getItem("borrowingInfo")
      ? JSON.parse(localStorage.getItem("borrowingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
