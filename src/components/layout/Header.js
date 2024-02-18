import React, { Fragment, useState } from "react";
import "../../App.css";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { borrowCartItems } = useSelector((state) => state.borrowCart);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const logoutHandler = () => {
    dispatch(logout())
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error("Logout failed");
      });
  };

  const isHomePage = location.pathname === "/";
  const isStore = location.pathname === "/store";

  return (
    <Fragment>
      <ToastContainer />
      <nav className="navbar row">
        <div className="col-lg-1 col-md-5 ">
          <div className="navbar-brand ">
            <Link to="/">
              <img
                src="/images/tupt_logo.png"
                style={{ width: "70px", height: "70px", marginLeft: "50px" }}
                alt="Logo"
              />
              {isStore ? null : (
                <p
                  style={{
                    position: "absolute",
                    top: "26px",
                    left: "140px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  TUP-T SCHEDULER
                </p>
              )}
            </Link>
          </div>
        </div>

        {isStore && (
          <div className="col-lg-3 col-sm-6 col-md-3">
            <Search />
          </div>
        )}

        <div className=" col-md-6   text-center">
          <div
            className="d-flex align-items-center justify-content-end"
            style={{ marginRight: "10px" }}
          >
            <div
              className={`burger-icon ${showMenu ? "active" : ""}`}
              onClick={() => setShowMenu(!showMenu)}
              style={{ marginRight: showMenu ? "20px" : "0" }}
            >
              <i className="fa fa-bars"></i>
            </div>

            <div className="nav-links">
              {!isHomePage && (
                <>
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-shopping-basket"></i> Cart
                      <span className="ml-1" id="cart_count">
                        {cartItems.length}
                      </span>
                    </span>
                  </Link>

                  <Link
                    to="/borrowCart"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-briefcase"></i> Items
                      <span className="ml-1" id="cart_count">
                        {borrowCartItems.length}
                      </span>
                    </span>
                  </Link>

                  <Link
                    to="/announcements"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-bullhorn"></i> Announcements
                    </span>
                  </Link>

                  <Link
                    to="/calendar"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-calendar"></i> Schedules
                    </span>
                  </Link>

                  <Link
                    to="/store"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-product-hunt"></i> Merch
                    </span>
                  </Link>

                  <Link
                    to="/equipmentz"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    <span id="cart">
                      <i className="fa fa-wrench"></i> Equipments
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* {!isHomePage && (
              <>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-shopping-basket"></i> Cart
                    <span className="ml-1" id="cart_count">
                      {cartItems.length}
                    </span>
                  </span>
                </Link>

                <Link
                  to="/borrowCart"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-briefcase"></i> Borrowed
                    <span className="ml-1" id="cart_count">
                      {borrowCartItems.length}
                    </span>
                  </span>
                </Link>

                <Link
                  to="/calendar"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-calendar"></i> Calendar
                  </span>
                </Link>

                <Link
                  to="/announcements"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-bullhorn"></i> Announcements
                  </span>
                </Link>

                <Link
                  to="/store"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-product-hunt"></i> Merch
                  </span>
                </Link>

                <Link
                  to="/equipmentz"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <span id="cart">
                    <i className="fa fa-wrench"></i> Equipment
                  </span>
                </Link>
              </>
            )} */}

            {user ? (
              <div className="ml-4 dropdown d-inline">
                <Link
                  to="#!"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>

                  <span>{user && user.name}</span>
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                >
                  {user &&
                    (user.role === "admin" || user.role === "officer") && (
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    )}

                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>

                  <Link className="dropdown-item" to="/equipment/me">
                    Borrowed
                  </Link>

                  <Link className="dropdown-item" to="/appointments/me">
                    Schedules
                  </Link>

                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>

                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              !loading && (
                <Link
                  to="/login"
                  className="btn ml-4"
                  id="login_btn"
                  style={{ marginLeft: "10px" }}
                >
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
