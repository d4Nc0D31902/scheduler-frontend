import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  newAnnouncement,
  clearErrors,
} from "../../actions/announcementActions";
import { NEW_ANNOUNCEMENT_RESET } from "../../constants/announcementConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const NewAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAnnouncement
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      toast.error("Failed to post announcement. Please try again.");
    }

    if (success) {
      toast.success("Announcement Posted Successfully!");

      // Reset form fields and errors
      setTitle("");
      setBody("");
      setImages([]);
      setImagesPreview([]);
      setErrors({});

      // Redirect to announcements page or perform any other necessary action
      navigate("/announcements");

      // Reset the success state in the Redux store
      dispatch({ type: NEW_ANNOUNCEMENT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim() || images.length === 0) {
      setErrors({
        title: !title.trim() ? "Title is required" : "",
        body: !body.trim() ? "Caption is required" : "",
        images: images.length === 0 ? "Please select at least one image" : "",
      });
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("body", body);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newAnnouncement(formData));
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
      <MetaData title={"New Announcement"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
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
                className="mb-4 text-center "
                style={{
                  backgroundColor: "maroon",
                  padding: "20px",
                  borderRadius: "20px",
                  color: "white",
                }}
              >
                New Announcement
              </h1>

              <div className="form-group">
                <label htmlFor="title_field">Title:</label>
                <input
                  placeholder="Put title here."
                  type="text"
                  id="title_field"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="body_field">Caption:</label>
                <textarea
                  placeholder="Add caption here"
                  className={`form-control ${errors.body ? "is-invalid" : ""}`}
                  id="body_field"
                  rows="8"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                {errors.body && (
                  <div className="invalid-feedback">{errors.body}</div>
                )}
              </div>

              <div className="form-group">
                <label>Upload Images:</label>
                <div className="custom-file">
                  <input
                    type="file"
                    name="images"
                    className={`custom-file-input ${
                      errors.images ? "is-invalid" : ""
                    }`}
                    id="customFile"
                    onChange={onChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {errors.images && (
                  <div className="invalid-feedback">{errors.images}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                POST
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewAnnouncement;
