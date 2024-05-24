import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { myBorrows, clearErrors } from "../../actions/borrowActions";

const MyBorrow = () => {
  const dispatch = useDispatch();
  const { loading, error, borrowings } = useSelector(
    (state) => state.myBorrows
  );
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    dispatch(myBorrows());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const filteredBorrowings = () => {
    if (selectedStatus === "All") {
      return borrowings;
    }
    return borrowings.filter((borrow) => borrow.status === selectedStatus);
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

  const setBorrowings = () => {
    const data = {
      columns: [
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Borrow Date",
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
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (filteredBorrowings().length > 0) {
      filteredBorrowings().forEach((borrow) => {
        data.rows.push({
          numofItems: borrow.borrowItems.length,
          borrowDate: new Date(borrow.borrowingInfo.date_borrow).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          user: borrow.user,
          status: (
            <span style={{ color: getStatusColor(borrow.status) }}>
              {borrow.status}
            </span>
          ),
          actions: (
            <Fragment>
              <Link
                to={`/borrow/${borrow._id}`}
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
      <MetaData title={"My Borrowings"} />
      <h1 className="my-5">My Borrowings</h1>
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
          <option value="Pending">Pending</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Returned">Returned</option>
          <option value="On Process">On Process</option>
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setBorrowings()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default MyBorrow;
