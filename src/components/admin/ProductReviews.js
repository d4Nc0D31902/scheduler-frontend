import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import Toast from "../layout/Toast";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      Toast("error fetching reviews", "error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      Toast(deleteError, "error");
      dispatch(clearErrors());
    }

    dispatch(getProductReviews()); // Fetch all reviews without specifying a product ID

    if (isDeleted) {
      Toast("Review deleted successfully", "success");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    Swal.fire({
      title: "Delete User",
      icon: "info",
      text: "Do you want to delete this user",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(id)); // Remove productId parameter
      }
    });
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Product",
          field: "product",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        product: review.product, // Add product name
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Reviews</h1>
            {reviews ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <Loader />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
