import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories,
  clearErrors,
  deleteCategory,
  deactivateCategory,
  reactivateCategory,
} from "../../actions/categoryActions";
import {
  DELETE_CATEGORY_RESET,
  DEACTIVATE_CATEGORY_RESET,
  REACTIVATE_CATEGORY_RESET,
} from "../../constants/categoryConstants";

const CategoriesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, categories } = useSelector(
    (state) => state.allCategories
  );
  const { isDeleted, isDeactivated, isReactivated } =
    useSelector((state) => state.category) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allCategories());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Category deleted successfully");
      navigate("/admin/categories");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    if (isDeactivated) {
      successMsg("Category deactivated successfully");
      dispatch({ type: DEACTIVATE_CATEGORY_RESET });
    }
    if (isReactivated) {
      successMsg("Category reactivated successfully");
      dispatch({ type: REACTIVATE_CATEGORY_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, isDeactivated, isReactivated]);

  const toggleCategoryActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateCategory(id));
      successMsg("Category Reactivated Successfully");
      console.log("Category reactivated:", id);
    } else {
      await dispatch(deactivateCategory(id));
      successMsg("Category Deactivated Successfully");
      console.log("Category deactivated:", id);
    }
    dispatch(allCategories());
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const setCategories = () => {
    const data = {
      columns: [
        {
          label: "Category",
          field: "name",
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

    if (categories) {
      categories.forEach((category) => {
        data.rows.push({
          name: category.name,
          actions: (
            <Fragment>
              {category.status === "active" && (
                <Link
                  to={`/admin/category/${category._id}`}
                  className="btn btn-primary py-1 px-2"
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              )}
              <button
                className={`btn ${
                  category.status === "inactive" ? "btn-success" : "btn-danger"
                } py-1 px-2 ml-2`}
                onClick={() =>
                  toggleCategoryActivation(
                    category._id,
                    category.status === "inactive"
                  )
                }
              >
                <i
                  className={`fa ${
                    category.status === "inactive"
                      ? "fa-check-circle"
                      : "fa-times-circle"
                  }`}
                ></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Categories"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Categories</h1>
              <Link to="/admin/category" className="btn btn-primary">
                Add New Category
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategories()}
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

export default CategoriesList;
