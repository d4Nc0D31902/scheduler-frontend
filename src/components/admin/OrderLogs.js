import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All"); // State to track the selected filter

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders(filter)); // Fetch orders based on the selected filter
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, filter, error, isDeleted, navigate]);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Customer",
          field: "customer",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Total Price",
          field: "totalPrice",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Payment Method",
          field: "paymentMethod",
          sort: "asc",
        },
        {
          label: "Reference Number",
          field: "referenceNum",
          sort: "asc",
        },
        {
          label: "Officer",
          field: "by",
          sort: "asc",
        },
        {
          label: "Date of Log",
          field: "createdAt",
          sort: "asc",
        },
      ],
      rows: [],
    };

    // Populate rows with order history
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        order.history.forEach((historyLog) => {
          // Check if the order status matches the selected filter
          if (filter === "All" || historyLog.orderStatus === filter) {
            let statusColor;
            switch (historyLog.orderStatus) {
              case "Pending":
                statusColor = "orange";
                break;
              case "For Pickup":
                statusColor = "orange";
                break;
              case "Sold":
                statusColor = "green";
                break;
              case "Paid":
                statusColor = "green";
                break;
              case "Denied":
                statusColor = "red";
                break;
              case "On Process":
                statusColor = "red";
                break;
              default:
                statusColor = "";
                break;
            }

            // Generate a bullet list of items with quantities
            const itemsList = (
              <ul>
                {historyLog.orderItems.map((item) => (
                  <li key={item._id}>
                    {item.name} = {item.quantity}
                  </li>
                ))}
              </ul>
            );

            data.rows.push({
              customer: historyLog.customer,
              numofItems: itemsList, // Display items and quantities in bullet form
              totalPrice: `₱${historyLog.totalPrice}`,
              orderStatus: (
                <span style={{ color: statusColor }}>
                  {historyLog.orderStatus}
                </span>
              ),
              paymentMethod: historyLog.paymentMeth,
              // referenceNum: historyLog.reference_num,
              referenceNum: `#${historyLog.reference_num}`,
              by: historyLog.by,
              createdAt: new Date(order.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            });
          }
        });
      });
    }

    // Reverse the order of rows to display latest orders first
    data.rows.reverse();

    return data;
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <Fragment>
      <MetaData title={"Order Logs"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Order Logs</h1>
            <div>
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                value={filter}
                className="form-control"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="For Pickup">For Pickup</option>
                <option value="Sold">Sold</option>
                <option value="Denied">Denied</option>
                <option value="On Process">On Process</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
