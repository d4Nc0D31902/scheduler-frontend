import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const renderUserRoleSpecificInfo = () => {
    if (user.role === "professor") {
      return (
        <Fragment>
          <h5 style={{ fontFamily: "calibri" }}>DEPARTMENT:</h5>
          <p style={{ fontSize: "18px" }}>{user.department}</p>
          <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />
        </Fragment>
      );
    } else if (user.role === "admin") {
      return null; // Hide all fields for admin
    } else {
      return (
        <Fragment>
          <h5 style={{ fontFamily: "calibri" }}>DEPARTMENT:</h5>
          <p style={{ fontSize: "18px" }}>{user.department}</p>
          <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />

          <h5 style={{ fontFamily: "calibri" }}>COURSE:</h5>
          <p style={{ fontSize: "18px" }}>{user.course}</p>
          <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />

          <h5 style={{ fontFamily: "calibri" }}>YEAR:</h5>
          <p style={{ fontSize: "18px" }}>{user.year}</p>
          <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />
        </Fragment>
      );
    }
  };

  const renderAvailabilityDot = () => {
    const dotStyle = {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "5px",
    };

    if (user.availability === "available") {
      return <span style={{ ...dotStyle, backgroundColor: "green" }}></span>;
    } else {
      return <span style={{ ...dotStyle, backgroundColor: "red" }}></span>;
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
          <div className="profilePic" style={{ marginTop: "50px" }}>
            <div className="row" style={{ marginTop: "50px" }}>
              <div className="col-lg-3 col-md-2 mb-4">
                <div className="card-body text-center">
                  <img
                    className=" img-fluid"
                    style={{
                      width: "100%",
                      height: "250px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      color: "black",
                    }}
                    src={user.avatar.url}
                    alt={user.name}
                  />
                  <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />
                  <Link
                    to="/me/update"
                    id="edit_profile"
                    className="btn btn-primary btn-block"
                  >
                    EDIT PROFILE
                  </Link>
                  <Link
                    to="/password/update"
                    className="btn btn-primary btn-block"
                  >
                    CHANGE PASSWORD
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-10 col-sm-12 mb-4">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>
                        NAME OF THE USER:
                      </h5>
                      <p style={{ fontSize: "18px" }}>{user.name}</p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />
                    </div>
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>EMAIL ADDRESS:</h5>
                      <p style={{ fontSize: "18px" }}>{user.email}</p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />
                    </div>
                  </div>

                  {renderUserRoleSpecificInfo()}

                  {user.role !== "user" && user.role !== "officer" && (
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>AVAILABILITY:</h5>
                      {renderAvailabilityDot()}
                      <p style={{ fontSize: "18px" }}>{user.availability}</p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />
                    </div>
                  )}

                  {/* <div className="col-lg-12">
                    <h5 style={{ fontFamily: "calibri" }}>ROLE:</h5>
                    <p style={{ fontSize: "18px" }}>{user.role}</p>
                    <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />
                  </div> */}

                  <div className="col-lg-12">
                    <h5 style={{ fontFamily: "calibri" }}>JOINED ON:</h5>
                    <p style={{ fontSize: "18px" }}>
                      {String(user.createdAt).substring(0, 10)}
                    </p>
                    <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
