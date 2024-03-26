import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newEquipment, clearErrors } from "../../actions/equipmentActions";
import { NEW_EQUIPMENT_RESET } from "../../constants/equipmentConstants";

const NewEquipment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [sports, setSports] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.newEquipment
  );
  const navigate = useNavigate();

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/sports`
        );
        setSports(response.data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      message("Equipment Posted");
      setName("");
      setDescription("");
      setSport("");
      setStock(0);
      setImages([]);
      setImagesPreview([]);
      navigate("/admin/equipment");
      dispatch({ type: NEW_EQUIPMENT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Equipment name is required";
      isValid = false;
    }
    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (!sport.trim()) {
      errors.sport = "Sport is required";
      isValid = false;
    }
    if (!stock || stock <= 0) {
      errors.stock = "Stock must be greater than 0";
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
    formData.set("name", name);
    formData.set("description", description);
    formData.set("sport", sport);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newEquipment(formData))
      .then(() => {
        navigate("/admin/equipments");
        message("Equipment created successfully");
      })
      .catch((error) => {
        console.error("Error creating location:", error);
      });
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
      <MetaData title={"New Equipment"} />

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
                  New Equipment
                </h1>

                <div className="form-group">
                  <label htmlFor="name_field">Equipment Name:</label>
                  <input
                    placeholder="Put here the equipment name"
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
                  <label htmlFor="description_field">Description:</label>
                  <textarea
                    placeholder="describe the equipment"
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

                {/* <div className="form-group">
                  <label htmlFor="sport_field">Sport</label>
                  <select
                    id="sport_field"
                    className={`form-control ${
                      errors.sport ? "is-invalid" : ""
                    }`}
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                  >
                    <option value="">Select Sports Category</option>
                    {sports.map((sport) => (
                      <option key={sport._id} value={sport.name}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                  {errors.sport && (
                    <div className="invalid-feedback">{errors.sport}</div>
                  )}
                </div> */}
                <div className="form-group">
                  <label htmlFor="sport_field">Category</label>
                  <select
                    id="sport_field"
                    className={`form-control ${
                      errors.sport ? "is-invalid" : ""
                    }`}
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {sports
                      .filter((sport) => sport.status !== "inactive")
                      .map((sport) => (
                        <option key={sport._id} value={sport.name}>
                          {sport.name}
                        </option>
                      ))}
                  </select>
                  {errors.sport && (
                    <div className="invalid-feedback">{errors.sport}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Remaining Stocks:</label>
                  <div className="input-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setStock((prevStock) =>
                          prevStock > 0 ? prevStock - 1 : 0
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="stock_field"
                      className={`form-control ${
                        errors.stock ? "is-invalid" : ""
                      }`}
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setStock((prevStock) => prevStock + 1)}
                    >
                      +
                    </button>
                  </div>
                  {errors.stock && (
                    <div className="invalid-feedback">{errors.stock}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Upload Images:</label>
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

export default NewEquipment;
