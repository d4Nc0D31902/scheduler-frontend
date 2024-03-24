import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const renderUserRoleSpecificInfo = () => {
    if (user.role === "admin") {
      return (
        <Fragment>
          <h6>Email</h6>
          <p className="text-muted info-item">{user.email}</p>
          <hr className="mt-0 mb-4" />

          <h6>Name</h6>
          <p className="text-muted info-item">{user.name}</p>
          <hr className="mt-0 mb-4" />

          <h6>Department</h6>
          <p className="text-muted info-item">{user.department}</p>
          <hr className="mt-0 mb-4" />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h6>Email</h6>
          <p className="text-muted info-item">{user.email}</p>
          <hr className="mt-0 mb-4" />

          <h6>Name</h6>
          <p className="text-muted info-item">{user.name}</p>
          <hr className="mt-0 mb-4" />

          <h6>Department</h6>
          <p className="text-muted info-item">{user.department}</p>
          <hr className="mt-0 mb-4" />

          <h6>Course</h6>
          <p className="text-muted info-item">{user.course}</p>
          <hr className="mt-0 mb-4" />

          <h6>Year</h6>
          <p className="text-muted info-item">{user.year}</p>
          <hr className="mt-0 mb-4" />
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
          <section className="vh-100 profile-section" style={{ backgroundImage: "url('/images/bgprof.jpg')" }}>
            <style jsx>{`
    .profile-section {
      
      background-size: cover;
      background-position: center;
      padding: 50px;
    }

    .profile-section .card {
      
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

  
  `}</style>
            <div className="container py-5 h-100" >
              <div className="row d-flex justify-content-center align-items-center h-100" >
                <div className="col col-lg-8 mb-0 mb-lg-0">

                  <div className="row g-0">
                    <h6
                      className="card-title"
                      style={{
                        fontFamily: "sans-serif",
                        textAlign: "center",
                        marginBottom: "10px",
                        margin: "5px",
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
                      <p style={{ fontSize: "16px", marginTop: "14px", padding: "20px" }}>
                        The Technological University of the Philippines shall be premier
                        state university and the model of excellence in technology
                        education in the country in a knowledge-based economy of the 21st
                        century.
                      </p>

                    </h6>
                    <div className="col-md-4 gradient-custom text-center text-white"
                      style={{}}>
                      <img src={user.avatar.url} alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                      <h5>{user.name}</h5>
                      <p>{user.role}</p>
                      {user.role !== "admin" && (
                        <Fragment>
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <p className="" style={{ color: "white" }}>  {renderAvailabilityDot()}{user.availability}</p>
                            </div>
                          </div>
                        </Fragment>
                      )}

                      <Link
                        to="/me/update"
                        id="edit_profile"
                        style={{
                          display: "inline-block",
                          width: "85%",
                          textAlign: "center",
                          padding: "5px",
                          marginBottom: "10px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          textDecoration: "none",
                          borderRadius: "5px",
                        }}
                      >
                        EDIT PROFILE
                      </Link>
                      <Link
                        to="/password/update"
                        style={{
                          display: "inline-block",
                          width: "85%",
                          textAlign: "center",
                          padding: "5px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          textDecoration: "none",
                          borderRadius: "5px",
                        }}
                      >
                        CHANGE PASSWORD
                      </Link>

                    </div>
                    <div className="col-md-8" style={{ backgroundColor: "white" }}>
                      <div className="card-body p-4 " >

                        <h6>INFORMATIONS</h6>
                        <hr className="mt-0 mb-2" />

                        <div className="col-12 mb-4">
                          {renderUserRoleSpecificInfo()}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;