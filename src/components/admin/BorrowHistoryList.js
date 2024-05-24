import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allBorrows, clearErrors } from "../../actions/borrowActions";

const BorrowList = () => {
  const dispatch = useDispatch();
  const { loading, error, borrows } = useSelector((state) => state.allBorrows);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allBorrows());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const filteredBorrows = () => {
    if (selectedStatus === "All") {
      return borrows.borrowings;
    }

    return borrows.borrowings
      .filter((borrow) =>
        borrow.history.some(
          (historyLog) => historyLog.status === selectedStatus
        )
      )
      .map((borrow) => ({
        ...borrow,
        history: borrow.history.filter(
          (historyLog) => historyLog.status === selectedStatus
        ),
      }));
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Denied":
        return "red";
      case "On Process":
        return "red";
      case "Borrowed":
        return "orange";
      case "Returned":
        return "green";
      default:
        return "";
    }
  };

  const setBorrows = () => {
    const data = {
      columns: [
        {
          label: "Requester",
          field: "user",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Date of Request",
          field: "borrowDate",
          sort: "asc",
        },
        {
          label: "Date Returned",
          field: "returnDate",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
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

    if (borrows && borrows.borrowings && borrows.borrowings.length > 0) {
      filteredBorrows().forEach((borrow) => {
        borrow.history.forEach((historyLog) => {
          const itemsList = (
            <ul>
              {historyLog.borrowItems.map((item, index) => (
                <li key={index}>
                  {item.name} = {item.quantity}
                </li>
              ))}
            </ul>
          );

          data.rows.push({
            user: borrow.user,
            numofItems: itemsList,
            borrowDate: new Date(historyLog.date_borrow).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            ),
            returnDate: historyLog.date_return
              ? new Date(historyLog.date_return).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",
            status: (
              <span style={{ color: getStatusColor(historyLog.status) }}>
                {historyLog.status}
              </span>
            ),
            by: historyLog.by,
            createdAt: new Date(borrow.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        });
      });
    }

    data.rows.reverse();

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Borrow Logs"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Borrow Logs</h1>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
                <option value="On Process">On Process</option>
                <option value="Pending">Pending</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setBorrows()}
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

export default BorrowList;
