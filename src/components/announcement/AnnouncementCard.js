import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../Announcement.css";

const AnnouncementCard = ({ announcement, onDelete }) => {
  const { _id, title, createdAt, body, images } = announcement;

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === "admin";
  const isOfficer = user && user.role === "officer";

  const deleteAnnouncementHandler = async () => {
    try {
      await onDelete(_id);
      toast.success("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <Fragment>
    
      
    <div className="announcement-card">
     
      <div className="announcement-details">
        {images.length > 0 && (
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${title}'s Image ${index + 1}`}
                className="resized-image"
                style={{}}
              />
            ))}
          </div>
        )}
        {user && (
          <div className="user-info">
            <div className="profile-section">
              {announcement.user &&
                announcement.user.avatar &&
                announcement.user.avatar.url && (
                  <img
                    src={announcement.user.avatar.url}
                    alt={`${announcement.user.name}'s Profile`}
                    className="profile-image"
                  />
                )}
              <div>
                <p className="user-name">
                  {announcement.user && announcement.user.name}
                </p>
              </div>
            </div>
          </div>
        )}
        <h3>{title}</h3>
        <p>
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p>{body}</p>
          <div className="announcement-buttons">
            {(isAdmin || isOfficer) && (
              <>
                <Link
                  to={`/admin/announcement/${_id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={deleteAnnouncementHandler}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
      </div>
      
    </div>
     
    </Fragment>
  );
};

export default AnnouncementCard;
