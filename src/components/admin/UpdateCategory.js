import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateCategory, // Updated import
  getCategoryDetails, // Updated import
  clearErrors,
} from "../../actions/categoryActions"; // Updated import
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants"; // Updated import

const UpdateCategory = () => {
  // Updated component name
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { error, category } = useSelector((state) => state.categoryDetails); // Updated state variable names

  // Set default values to prevent "Cannot destructure property 'loading' of 'undefined'" error
  const {
    loading = false,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.category) || {}; // Updated state variable name

  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (!category || category._id !== id) {
      dispatch(getCategoryDetails(id)); // Updated action
    } else {
      setName(category.name);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/categories"); // Updated path
      successMsg("Category updated successfully"); // Updated success message
      dispatch({ type: UPDATE_CATEGORY_RESET }); // Updated reset action type
    }
  }, [dispatch, error, isUpdated, navigate, updateError, category, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedCategory = {
      // Updated variable name
      name,
    };
    dispatch(updateCategory(category._id, updatedCategory)); // Updated action
  };

  return (
    <Fragment>
      <MetaData title={"Update Category"} /> {/* Updated title */}
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
              </h3>
              <h1 className="mb-4 text-center" style={{ backgroundColor: "maroon", padding: "20px", borderRadius: "20px", color: "white" }}>Update Category</h1> {/* Updated heading */}
              <div className="form-group">
                <label htmlFor="name_field">Category Name:</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                id="update_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCategory; // Updated export
