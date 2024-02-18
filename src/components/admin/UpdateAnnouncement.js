import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateAnnouncement,
  getAnnouncementDetails,
  clearErrors,
} from "../../actions/announcementActions";
import { UPDATE_ANNOUNCEMENT_RESET } from "../../constants/announcementConstants";

const UpdateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { error, announcement } = useSelector(
    (state) => state.announcementDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.announcement) || {};
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
    if (!announcement || announcement._id !== id) {
      dispatch(getAnnouncementDetails(id));
    } else {
      setTitle(announcement.title);
      setBody(announcement.body);
      setOldImages(announcement.images);
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
      dispatch({ type: UPDATE_ANNOUNCEMENT_RESET });
    }
  }, [
    dispatch,
    error,
    isUpdated,
    announcement,
    id,
    isFormSubmitted,
    updateError,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("body", body);
      images.forEach((image) => {
        formData.append("images", image);
      });

      await dispatch(updateAnnouncement(announcement._id, formData));

      // Handle success here directly in the submitHandler
      successMsg("Announcement updated successfully");
      dispatch({ type: UPDATE_ANNOUNCEMENT_RESET });

      // Navigate and reload after a short delay to ensure the toast is visible
      setTimeout(() => {
        navigate("/announcements");
        reloadPage();
      }, 1000);
    } catch (error) {
      errMsg("Error updating announcement");
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
      <MetaData title={"Update Announcement"} />
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
                  <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                    <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                    TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                  </h3>

                  <h1 className="mb-4 text-center" style={{ backgroundColor: "maroon", padding: "20px", borderRadius: "20px", color: "white" }}>Update Announcement</h1>
                  <div className="form-group">
                    <label htmlFor="title_field">Title:</label>
                    <input
                      type="text"
                      id="title_field"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="body_field">Caption:</label>
                    <textarea
                      className="form-control"
                      id="body_field"
                      rows="8"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
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

export default UpdateAnnouncement;
