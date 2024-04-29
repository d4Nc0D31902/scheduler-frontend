import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import ConfirmBorrow from "./components/equipment/ConfirmBorrow.js";
import Borrow from "./components/equipment/Borrow.js";
import BorrowingInfo from "./components/equipment/BorrowingInfo.js";
import ProcessBorrow from "./components/admin/ProcessBorrow.js";
import BorrowDetails from "./components/equipment/BorrowDetails.js";
import BorrowCart from "./components/equipment/BorrowCart.js";

import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import ProductsStockList from "./components/admin/ProductsStockList.js";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateProductStock from "./components/admin/UpdateProductStock.js";
import OrdersList from "./components/admin/OrdersList";
import OrderLogs from "./components/admin/OrderLogs.js";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import ProductStockLogs from "./components/admin/ProductStockLogs.js";

import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

import Calendar from "./components/calendar/Calendar";
import Appointment from "./components/appointment/Appointment";
import AppointmentList from "./components/appointment/AppointmentList";
import UpdateAppointment from "./components/appointment/UpdateAppointment";
import MyAppointment from "./components/appointment/MyAppointment";
import AppointmentView from "./components/appointment/AppointmentView.js";
import AppHistoryList from "./components/admin/AppHistoryList.js";
import LocationHistoryList from "./components/admin/LocationHistoryList.js";
// import ProcessAppointment from "./components/admin/ProcessAppointment.js";

import LocationList from "./components/location/LocationList";
import NewLocation from "./components/admin/NewLocation";
import UpdateLocation from "./components/admin/UpdateLocation";

import SportList from "./components/admin/SportList";
import NewSport from "./components/admin/NewSport";
import UpdateSport from "./components/admin/UpdateSport";

import EquipmentList from "./components/admin/EquipmentList";
import NewEquipment from "./components/admin/NewEquipment";
import UpdateEquipment from "./components/admin/UpdateEquipment";
import UpdateEquipmentStock from "./components/admin/UpdateEquipmentStock.js";
import EquipmentHistoryList from "./components/admin/EquipmentHistoryList.js";
import EquipmentStockList from "./components/admin/EquipmentStockList.js";
import EquipmentStockLogs from "./components/admin/EquipmentStockLogs.js";

import BorrowList from "./components/admin/BorrowList.js";
import BorrowHistoryList from "./components/admin/BorrowHistoryList.js";

import SportHistoryList from "./components/admin/SportHistoryList.js";

// import UpdateBorrow from "./components/admin/UpdateBorrow.js";

import Settings from "./components/admin/SettingsComponent.js";

import NewAnnouncement from "./components/admin/NewAnnouncement.js";
import AllAnnouncement from "./components/announcement/AllAnnouncement";
import AnnouncementCard from "./components/announcement/AnnouncementCard";
import UpdateAnnouncement from "./components/admin/UpdateAnnouncement.js";

import EquipmentContainer from "./components/equipment/EquipmentContainer.js";
// import EquipmentBorrow from "./components/equipment/EquipmentBorrow.js";
import MyBorrow from "./components/equipment/MyBorrow.js";

import CategoryList from "./components/admin/CategoryList.js";
import NewCategory from "./components/admin/NewCategory.js";
import UpdateCategory from "./components/admin/UpdateCategory.js";

import HomePage from "./components/homepage/HomePage.js";
import Notification from "./components/notification/Notification.js";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/store" element={<Home />} exact="true" />
        <Route path="/" element={<HomePage />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route
          path="/equipmentz"
          element={<EquipmentContainer />}
          exact="true"
        />
        {/* <Route
          path="/equipment/borrow"
          element={<EquipmentBorrow />}
          exact="true"
        /> */}
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/notifications" element={<Notification />} exact="true" />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route path="/cart" element={<Cart />} exact="true" />
        <Route path="/borrowCart" element={<BorrowCart />} exact="true" />
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/calendar" element={<Calendar />} exact="true" />
        <Route path="/request" element={<Appointment />} exact="true" />
        <Route
          path="/appointments/me"
          element={
            <ProtectedRoute>
              <MyAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/equipment/me"
          element={
            <ProtectedRoute>
              <MyBorrow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments/"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <AppointmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/app/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <AppHistoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/SP/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <SportHistoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/eq/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <EquipmentHistoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/loc/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <LocationHistoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bor/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <BorrowHistoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrows/"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <BorrowList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipments/"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <EquipmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipments/stock"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <EquipmentStockList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock/history"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <EquipmentStockLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/6581a5b1466cfcabab4cc84f"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/locations/"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <LocationList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/location"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipment"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewEquipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipment/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateEquipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipment/stock/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateEquipmentStock />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/borrow/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateBorrow />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/sport"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewSport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sports"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <SportList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcement"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewAnnouncement />
            </ProtectedRoute>
          }
        />
        <Route path="/announcements" element={<AllAnnouncement />} />
        <Route
          path="/admin/appointment/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment/:id"
          element={
            <ProtectedRoute isAdmin={false} isOfficer={false}>
              <AppointmentView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcement/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateAnnouncement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/location/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sport/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateSport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/location"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewLocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/borrowingInfo"
          element={
            <ProtectedRoute>
              <BorrowingInfo />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmBorrow"
          element={
            <ProtectedRoute>
              <ConfirmBorrow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrow"
          element={
            <ProtectedRoute>
              <Borrow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrow/:id"
          element={
            <ProtectedRoute>
              <BorrowDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock/list"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProductStockLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/stock"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProductsStockList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/stock/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateProductStock />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <OrdersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/logs"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <OrderLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrow/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProcessBorrow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} isOfficer={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
    </div>
  );
}

export default App;
