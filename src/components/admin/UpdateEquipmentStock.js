import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  const [stockToAdd, setStockToAdd] = useState(0);
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

  const reloadPage = () => {
    window.location.reload();
  };

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

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.set("name", name);
  //     formData.set("description", description);
  //     formData.set("sport", sport);
  //     formData.set("stock", stock);
  //     images.forEach((image) => {
  //       formData.append("images", image);
  //     });

  //     await dispatch(updateEquipment(equipment._id, formData));

  //     successMsg("Stock Updated Successfully");
  //     dispatch({ type: UPDATE_EQUIPMENT_RESET });

  //     setTimeout(() => {
  //       navigate("/admin/equipments/stock");
  //       reloadPage();
  //     }, 1000);
  //   } catch (error) {
  //     errMsg("Error Updating Stock");
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("sport", sport);

      // Validate if stockToAdd is a positive number
      if (parseInt(stockToAdd) < 0) {
        errMsg("Please enter a positive number for adding stock");
        return;
      }

      const newStock = parseInt(stock) + parseInt(stockToAdd);
      formData.set("stock", newStock);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await dispatch(updateEquipment(equipment._id, formData));

      successMsg("Stock Updated Successfully");
      dispatch({ type: UPDATE_EQUIPMENT_RESET });

      setTimeout(() => {
        navigate("/admin/equipments/stock");
        reloadPage();
      }, 1000);
    } catch (error) {
      errMsg("Error Updating Stock");
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
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 m-auto">
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
                    Add or Remove Equipment Stock
                  </h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Equipment:</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled
                    />
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="stock_field">Remaining Stocks:</label>
                    <div className="input-group">
                      <input
                        type="number"
                        id="stock_field"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="add_stock_field">Add to Stock:</label>
                    <div className="input-group">
                      <input
                        type="number"
                        id="add_stock_field"
                        className="form-control"
                        value={stockToAdd}
                        onChange={(e) => setStockToAdd(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <label>Images</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                        disabled
                      />
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
                  </div> */}

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
