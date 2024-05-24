import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allBorrows, clearErrors } from "../../actions/borrowActions";
import axios from "axios";

const BorrowList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, borrows } = useSelector((state) => state.allBorrows);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    console.log("Fetching borrows...");
    dispatch(allBorrows());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    console.log("Borrows updated:", borrows);
  }, [borrows]);

  console.log("Loading:", loading);
  console.log("Error:", error);

  const filteredBorrows = () => {
    if (selectedStatus === "All") {
      return borrows.borrowings;
    }
    return borrows.borrowings.filter(
      (borrow) => borrow.status === selectedStatus
    );
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
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (borrows && borrows.borrowings && borrows.borrowings.length > 0) {
      filteredBorrows().forEach((borrow) => {
        const borrowDate = borrow.borrowingInfo
          ? borrow.borrowingInfo.date_borrow
          : null;
        data.rows.push({
          numofItems: borrow.borrowItems.length,
          borrowDate: borrowDate
            ? new Date(borrowDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          user: borrow.user, // Include user's name in the data
          status: (
            <span style={{ color: getStatusColor(borrow.status) }}>
              {borrow.status}
            </span>
          ),
          actions: (
            <Fragment>
              <Link
                to={`/admin/borrow/${borrow._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Borrowings"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Borrow Requests</h1>
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
