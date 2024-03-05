import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from "../admin/Sidebar";
import {
  updateEquipment,
  getEquipmentDetails,
  clearErrors,
} from "../../actions/equipmentActions";
import { UPDATE_EQUIPMENT_RESET } from "../../constants/equipmentConstants";

const UpdateEquipment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [sports, setSports] = useState([]);

  const dispatch = useDispatch();
  const { error, equipment } = useSelector((state) => state.equipmentDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.equipment) || {};
  let { id } = useParams();
  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
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
    if (!equipment || equipment._id !== id) {
      dispatch(getEquipmentDetails(id));
    } else {
      setName(equipment.name);
      setDescription(equipment.description);
      setSport(equipment.sport);
      setStock(equipment.stock);
      setOldImages(equipment.images);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated && !isFormSubmitted) {
      setIsFormSubmitted(true);
      dispatch({ type: UPDATE_EQUIPMENT_RESET });
    }
  }, [dispatch, error, isUpdated, equipment, id, isFormSubmitted, updateError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("sport", sport);
      formData.set("stock", stock);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await dispatch(updateEquipment(equipment._id, formData));

      successMsg("Equipment updated successfully");
      dispatch({ type: UPDATE_EQUIPMENT_RESET });

      setTimeout(() => {
        navigate("/admin/equipments");
      }, 1000);
    } catch (error) {
      errMsg("Error updating equipment");
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
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
      <MetaData title={"Update Equipment"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
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
                    Update Equipment
                  </h1>
                  <div className="form-group">
                    <label htmlFor="name_field">Equipment:</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description_field">Description:</label>
                    <textarea
                      className="form-control"
                      id="description_field"
                      rows="8"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sport_field">Sport Category:</label>
                    <select
                      id="sport_field"
                      className="form-control"
                      value={sport}
                      onChange={(e) => setSport(e.target.value)}
                    >
                      {sports.map(
                        (sport) =>
                          sport.status === "active" && (
                            <option key={sport._id} value={sport.name}>
                              {sport.name}
                            </option>
                          )
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock_field">Remaining Stocks:</label>
                    <div className="input-group">
                      <input
                        type="number"
                        id="stock_field"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label> Upload Images</label>
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

                    {oldImages &&
                      oldImages.map((img) => (
                        <img
                          key={img.public_id}
                          src={img.url}
                          alt={img.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

                    {imagesPreview.map((img, index) => (
                      <img
                        src={img}
                        key={index}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
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
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateEquipment;