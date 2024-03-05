import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  if (product.status === "inactive") {
    return null;
  }

  return (
    <div className="col-sm-12 col-md-4 col-lg-4 " style={{ marginTop: "45px" }}>
      <div className="card h-100 border-0 " style={{ boxShadow: "maroon" }}>
        <Link to={`/product/${product._id}`}>
          <img
            className="card-img-top"
            src={
              product.images && product.images.length > 0
                ? product.images[0].url
                : "placeholder.jpg"
            }
            alt={product.name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title mb-2">
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </h5>
          <div className="d-flex justify-content-between align-items-center">
            <div className="ratings">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-muted ms-1">
                ({product.numOfReviews} reviews)
              </span>
            </div>
            <h6 className="mb-0">₱{product.price}</h6>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="btn btn-primary mt-3 btn-sm d-block w-100"
            style={{ backgroundColor: "maroon" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
