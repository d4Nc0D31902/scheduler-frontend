import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors } from "../../actions/productActions";

const ProductsList = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Sold":
        return "green";
      case "Restocked":
        return "green";
      default:
        return "black";
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Product",
          field: "name",
          sort: "asc",
        },
        {
          label: "Quantity",
          field: "quantity",
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

    if (products && products.length > 0) {
      products.forEach((product) => {
        product.stockHistory
          .filter(
            (historyEntry) =>
              (selectedStatus === "" ||
                historyEntry.status === selectedStatus) &&
              (historyEntry.status === "Restocked" ||
                historyEntry.status === "Sold")
          )
          .forEach((historyEntry) => {
            data.rows.push({
              name: historyEntry.name,
              quantity: historyEntry.quantity,
              status: (
                <span style={{ color: getStatusColor(historyEntry.status) }}>
                  {historyEntry.status}
                </span>
              ),
              by: historyEntry.by,
              createdAt: new Date(historyEntry.createdAt).toLocaleString(
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
            });
          });
      });
    } else {
      console.log("Products data is empty or undefined.");
    }

    // Sort the rows by createdAt from latest to oldest
    data.rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Product Stock History"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          {/* <Fragment>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">All</option>
                <option value="Sold">Sold</option>
                <option value="Restocked">Restocked</option>
              </select>
            </div>
            <h1 className="my-5">Product Stock History</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment> */}
          <Fragment>
            <h1 className="my-5">Product Stock History</h1>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">All</option>
                <option value="Restocked">Restocked</option>
                <option value="Sold">Sold</option>
                {/* <option value="Pending">Pending</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option> */}
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
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

export default ProductsList;
