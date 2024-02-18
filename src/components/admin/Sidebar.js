import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/announcement">
              <i className="fa fa-bullhorn"></i> Announcements
            </Link>
          </li>
          <li>
            <a
              href="#appointmentSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-calendar"></i> Schedules
            </a>

            <ul className="collapse list-unstyled" id="appointmentSubmenu">
              <li>
                <Link to="/admin/appointments">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/locations">
                  <i className="fa fa-thumb-tack"></i> Location
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/loc/history">
                  <i className="fa fa-file"></i> Location Logs
                </Link>
              </li> */}
              {/* <li>
                <Link to="/admin/app/history">
                  <i className="fa fa-file"></i> Schedule Logs
                </Link>
              </li> */}
            </ul>
          </li>

          {/* <li>
            <a
              href="#borrowSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-bullhorn"></i> Borrow Requests
            </a>

            <ul className="collapse list-unstyled" id="borrowSubmenu"> */}
          <li>
            <Link to="/admin/borrows">
              <i className="fa fa-clipboard"></i> Borrow Requests
            </Link>
          </li>
          {/* <li>
                <Link to="/admin/bor/history">
                  <i className="fa fa-file"></i> Borrowing Logs
                </Link>
              </li> */}
          {/* </ul> */}
          {/* <Link to="/admin/borrows">
              <i className="fa fa-bullhorn"></i> Borrow Requests
            </Link> */}
          {/* </li> */}

          <li>
            <a
              href="#equipmentSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-archive"></i> Equipments
            </a>

            <ul className="collapse list-unstyled" id="equipmentSubmenu">
              <li>
                <Link to="/admin/equipments">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/sports">
                  <i className="fa fa-dribbble"></i> Sport
                </Link>
              </li>
              <li>
                <Link to="/admin/equipments/stock">
                  <i className="fa fa-briefcase"></i> Stock
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/eq/history">
                  <i className="fa fa-file"></i> Equipment Logs
                </Link>
              </li> */}
              {/* <li>
                <Link to="/admin/sp/history">
                  <i className="fa fa-file"></i> Sport Logs
                </Link>
              </li> */}
              {/* <li>
                <Link to="/admin/stock/history">
                  <i className="fa fa-file"></i> Stock Logs
                </Link>
              </li> */}
            </ul>
          </li>

          {/* <li>
            <Link to="/admin/sports">
              <i className="fa fa-dribbble"></i> Sport
            </Link>
          </li> */}

          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Merch Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>
          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>

            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
              <li>
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
              <li>
                <Link to="/admin/categories">
                  <i className="fa fa-list-alt"></i> Categories
                </Link>
              </li>
              <li>
                <Link to="/admin/products/stock">
                  <i className="fa fa-briefcase"></i> Stock
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/stock/list">
                  <i className="fa fa-file"></i> Stock Logs
                </Link>
              </li> */}
            </ul>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
          <li>
            <Link to="/settings/6581a5b1466cfcabab4cc84f">
              <i className="fa fa-gear"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <a
              href="#logsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-file"></i> Logs
            </a>

            <ul className="collapse list-unstyled" id="logsSubmenu">
              <li>
                <Link to="/admin/app/history">
                  <i className="fa fa-file"></i> Schedule Logs
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/loc/history">
                  <i className="fa fa-file"></i> Location Logs
                </Link>
              </li> */}
              <li>
                <Link to="/admin/bor/history">
                  <i className="fa fa-file"></i> Borrowing Logs
                </Link>
              </li>
              <li>
                <Link to="/admin/order/logs">
                  <i className="fa fa-file"></i> Order Logs
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/sp/history">
                  <i className="fa fa-file"></i> Sport Logs
                </Link>
              </li>
              <li>
                <Link to="/admin/eq/history">
                  <i className="fa fa-file"></i> Equipment Logs
                </Link>
              </li> */}
              <li>
                <Link to="/admin/stock/history">
                  <i className="fa fa-file"></i> Equipment Stock Logs
                </Link>
              </li>
              <li>
                <Link to="/admin/stock/list">
                  <i className="fa fa-file"></i> Product Stock Logs
                </Link>
              </li>
            </ul>
          </li>

          {/* <li>
            <Link to="/admin/appointments">
              <i className="fa fa-calendar"></i> Appointments
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
