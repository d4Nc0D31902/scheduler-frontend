import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/categories`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      message("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!price.trim()) {
      errors.price = "Price is required";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!category.trim()) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!stock.trim()) {
      errors.stock = "Stock is required";
      isValid = false;
    }

    if (!seller.trim()) {
      errors.seller = "Seller name is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h3
                  className="card-title"
                  style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    marginBottom: "10px",
                    margin: "20px",
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
                  TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                </h3>
                <h1
                  className="mb-4 text-center"
                  style={{
                    backgroundColor: "maroon",
                    padding: "20px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  New Product
                </h1>

                <div className="form-group">
                  <label htmlFor="name_field">Product:</label>
                  <input
                    placeholder="Put the name of the merch"
                    type="text"
                    id="name_field"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price:</label>
                  <input
                    placeholder="Enter the price"
                    type="text"
                    id="price_field"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description:</label>
                  <textarea
                    placeholder="Describe the merch here"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category:</label>
                  <select
                    id="category_field"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Remaining Stocks:</label>
                  <input
                    placeholder="Enter remaining stocks"
                    type="number"
                    id="stock_field"
                    className={`form-control ${
                      errors.stock ? "is-invalid" : ""
                    }`}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  {errors.stock && (
                    <div className="invalid-feedback">{errors.stock}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name:</label>
                  <input
                    placeholder="TUP-T GrayHawks"
                    type="text"
                    id="seller_field"
                    className={`form-control ${
                      errors.seller ? "is-invalid" : ""
                    }`}
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                  {errors.seller && (
                    <div className="invalid-feedback">{errors.seller}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Upload Images</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
