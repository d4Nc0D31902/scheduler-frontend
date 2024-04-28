import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showReview, hideReview } from "../../actions/productActions";

const ListReviews = ({ reviews }) => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === "admin";
  const dispatch = useDispatch();

  const handleShowReview = (reviewId) => {
    dispatch(showReview(reviewId));
  };

  const handleHideReview = (reviewId) => {
    dispatch(hideReview(reviewId));
  };

  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review) => {
          // Check if the review should be displayed
          const shouldDisplayReview = isAdmin || review.status === "show";

          // If shouldDisplayReview is false, return null to skip rendering this review
          if (!shouldDisplayReview) {
            return null;
          }

          // Render the review
          return (
            <div key={review._id} className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="review_user">by {review.name}</p>
              <p className="review_date">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="review_comment">{review.comment}</p>
              {isAdmin && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    review.status === "show"
                      ? handleHideReview(review._id)
                      : handleShowReview(review._id)
                  }
                >
                  {review.status === "show" ? "Hide" : "Show"}
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ListReviews;
