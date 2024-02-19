import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MetaData from "./layout/MetaData";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  let { keyword } = useParams();

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/categories`
        );
        const allCategory = { _id: "", name: "All" }; // Manually include the "All" category
        const filteredCategories = response.data.categories.filter(
          (category) => category.status === "active"
        );
        setCategories([allCategory, ...filteredCategories]); // Add "All" category to the beginning of the array
      } catch (error) {
        notify("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    if (error) {
      notify(error);
    }

    fetchCategories();
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, currentPage, keyword, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handleCategoryClick = (clickedCategory) => {
    setCategory((prevCategory) =>
      prevCategory === clickedCategory ? "" : clickedCategory
    );
  };

  let count = productsCount;

  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Schedule Now!"} />
          {/* <div className="text-center" style={{ marginTop: "50px" }}><h6
            className="card-title"
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              marginBottom: "10px",
              margin: "20px",
              backgroundColor: "maroon",
              color: "white",
              padding: "20px",
            }}
          >
            <img
              src="/images/tupt_logo.png"
              style={{
                width: "100px",
                height: "100px",
                marginRight: "25px",
              }}
              alt="Logo"
            />
            TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES TAGUIG CITY
            <p style={{ fontSize: "12px", marginTop: "14px" }}>
              The Technological University of the Philippines shall be premier
              state university with recognized excellence in engineering and
              technology education at per with the leading university in the ASEAN
              region.
            </p>
            <h4
              className="my-4 text-center"
              style={{ textDecoration: "underline" }}
            >
              MERCHANDISE
            </h4>
          </h6></div> */}

          <section id="products" className="container ">
            <div className="row">
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-4">
                  <div className="merch-card p-4">
                    <h4 className="merch-title mb-3">MERCHANDISE CATEGORIES</h4>
                    <ul className="merch-list pl-0">
                      {categories.map((categoryItem) => (
                        <li
                          key={categoryItem._id}
                          className="merch-item"
                          onClick={() => handleCategoryClick(categoryItem.name)}
                        >
                          {categoryItem.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="merch-logo d-flex justify-content-center align-items-center mt-4">
                    <img
                      src="/images/tupt_logo.png"
                      className="img-fluid"
                      style={{ width: "150px", height: "150px" }}
                      alt="Logo"
                    />
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-9">
                <div className="row">
                  {products

                    .map((product) => (
                      <Product key={product._id} product={product} col={2} />
                    ))}
                </div>
                {resPerPage <= count && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </div>

            </div>

          </section>

        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
