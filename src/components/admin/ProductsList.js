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
  getAdminProducts,
  deleteProduct,
  clearErrors,
  deactivateProduct,
  reactivateProduct,
} from "../../actions/productActions";
import {
  DELETE_PRODUCT_RESET,
  DEACTIVATE_PRODUCT_RESET,
  REACTIVATE_PRODUCT_RESET,
} from "../../constants/productConstants";

const ProductsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // Local state variables to manage deactivation and reactivation
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [reactivateLoading, setReactivateLoading] = useState(false);

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const { isDeactivated } = useSelector((state) => state.product) || {};
  const { isReactivated } = useSelector((state) => state.product) || {};

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    if (isDeactivated) {
      setDeactivateLoading(false);
      dispatch({ type: DEACTIVATE_PRODUCT_RESET });
    }
    if (isReactivated) {
      setReactivateLoading(false);
      dispatch({ type: REACTIVATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    navigate,
    isDeleted,
    deleteError,
    isDeactivated,
    isReactivated,
  ]);

  const toggleProductActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      setReactivateLoading(true);
      await dispatch(reactivateProduct(id));
      successMsg("Product Reactivated Successfully");
    } else {
      setDeactivateLoading(true);
      await dispatch(deactivateProduct(id));
      successMsg("Product Deactivated Successfully");
    }
    dispatch(getAdminProducts()); // Reload the product list
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
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Remaining Stocks",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        name: product.name,
        price: `₱${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            {product.status === "active" && (
              <Link
                to={`/admin/product/${product._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
            )}
            <button
              className={`btn ${
                product.status === "inactive" ? "btn-success" : "btn-danger"
              } py-1 px-2 ml-2`}
              onClick={() =>
                toggleProductActivation(
                  product._id,
                  product.status === "inactive"
                )
              }
            >
              <i
                className={`fa ${
                  product.status === "inactive"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                }`}
              ></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>
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
