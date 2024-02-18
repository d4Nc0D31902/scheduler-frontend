import React from "react";
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
      // Reload the site after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    }
  };

  return (
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
                {/* <p className="user-name">
                  {announcement.user && announcement.user.name}
                </p> */}
                {/* {announcement.user && announcement.user.role && <p className="user-role">{announcement.user.role}</p>} */}
              </div>
            </div>
          </div>
        )}
        <h3>{title} </h3>
        <p className="user-name">
          {announcement.user && announcement.user.name}
        </p>
        <p>
          {new Date(createdAt).toLocaleDateString("en-US", {
            // weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* <p>Date: {new Date(createdAt).toLocaleDateString()}</p> */}
        <p>{body}</p>

        {/* {images.length > 0 && (
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${title}'s Image ${index + 1}`}
                className="resized-image"
              />
            ))}
          </div>
        )} */}
      </div>

      <div className="announcement-buttons">
        {isAdmin ||
          (user && user.role === "officer" && (
            <>
              <Link
                to={`/admin/announcement/${announcement._id}`}
                className="btn btn-primary py-1 px-2"
              >
                Edit
              </Link>
              <button
                onClick={deleteAnnouncementHandler}
                className="btn btn-danger py-1 px-2 ml-2"
              >
                Delete
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default AnnouncementCard;
