import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SchedulerModal from "./SchedulerModal";

const Homepage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const images = [
    "/images/gym.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",

    "/images/6.jpg",
    "/images/9.jpg",
  ];

  return (
    <Fragment>
      <header className="header-section py-5">
        <div className="container text-center">
          <h1 className="display-4 text-uppercase font-weight-bold text-dark mb-4">
            Welcome to the Scheduler
          </h1>
          <p className="lead">
            Effortlessly manage your sports and activities with our
            user-friendly scheduler. Stay organized, stay active!
          </p>
          <div className="mt-5 text-center">
            <SchedulerModal />
          </div>
        </div>
      </header>
      <div className="locations" style={{ margin: "5px" }}>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0">
              <img
                src="/images/gym.jpg"
                alt="Outdoor Court"
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">GYMNASIUM </h5>
                <p>
                  {" "}
                  The university gym is a bustling hub for sports enthusiasts.
                  From basketball courts to soccer fields, it offers
                  state-of-the-art facilities for diverse activities. With
                  modern equipment and a sense of community, it's not just a
                  workout space but a place to connect, compete, and prioritize
                  holistic wellness.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0">
              <img
                src="/images/7.jpg"
                alt="Outdoor Court"
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">OUTDOOR COURT</h5>
                <p className="card-text">
                  The university outer court serves as an open space for various
                  outdoor sports and activities. Whether it's casual games of
                  basketball or impromptu soccer matches, this area provides
                  students with a dynamic environment to engage in physical
                  activities, fostering a sense of community and promoting an
                  active lifestyle.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0">
              <img
                src="/images/9.jpg"
                alt="Outdoor Court"
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">MULTIPURPOSE HALL</h5>
                <p style={{ fontSize: "13px" }}>
                  {" "}
                  The university's multipurpose hall is a versatile space
                  designed to accommodate a variety of activities. From sports
                  events and fitness classes to cultural performances and
                  academic gatherings, this hall serves as a central hub for
                  diverse campus activities. Equipped with flexible seating
                  arrangements and modern amenities, it provides a dynamic and
                  inclusive environment for the university community to come
                  together for a wide range of purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="about"
        style={{ backgroundColor: "white", marginTop: "100px", color: "black" }}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4 animation-effect-top">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="slider-image">
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="col-lg-6 col-md-6 mb-4 animation-effect-top">
            <div
              className="card-body"
              style={{
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                marginBottom: "20px",
              }}
            >
              <h3
                className="card-title"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="/images/tupt_logo.png"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "15px",
                    verticalAlign: "middle",
                  }}
                  alt="Logo"
                />
                ABOUT THE SCHEDULER
              </h3>
              <p
                className="card-text"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  textAlign: "justify",
                  margin: "0 auto",
                  maxWidth: "700px",
                }}
              >
                The Gym Scheduler facilitates effortless coordination and
                management of various sports and activities within the gym
                facility. Offering a user-friendly interface, it empowers
                members to easily schedule and access basketball, badminton, and
                other sports sessions. With real-time updates, users stay
                informed about court availability, ensuring a smooth and
                efficient utilization of gym resources. The platform enhances
                the overall experience by providing a centralized hub for
                scheduling, fostering a sense of community engagement among
                sports enthusiasts. Whether planning a basketball match or a
                badminton game, the Gym Scheduler optimizes organization and
                accessibility, promoting an inclusive and enjoyable environment
                for all gym members.
              </p>
            </div>
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ backgroundColor: "maroon" }}
      >
        <path
          fill=" #FFFFFF"
          fill-opacity="1"
          d="M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,181.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <div
        className="how-to-use-scheduler"
        style={{
          padding: "100px",
          textAlign: "center",
          color: "white",
          backgroundColor: "maroon",
          textAlign: "justify",
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            marginBottom: "50px",
            fontWeight: "bold",
            fontFamily: "Arial Black",
            fontSize: "3rem", // Adjust font size as needed
            color: "white", // Text color
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)", // Dark shadow
            WebkitTextStroke: "1px black", // Text stroke for 3D effect
            WebkitTextFillColor: "white", // Fallback for browsers that don't support text-stroke
            textStrokePosition: "0.3em", // Adjust to move the stroke to the left
            letterSpacing: "2px", // Optional: Adjust letter spacing for better visibility
          }}
          className="text-center "
        >
          HAVE FUN USING THE SCHEDULER
        </h2>
        <div className="row ">
          <div className="col-lg-4 col-md-4 mb-4 col-sm-12">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/ui.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Friendly Interface
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  A friendly user interface (UI) prioritizes ease of use with
                  intuitive navigation and clear visuals. It ensures a positive
                  experience for users of all levels, making digital
                  interactions seamless and enjoyable.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4 col-sm-12">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/annouce.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Annoucements
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Stay informed with our latest announcements, event updates,
                  and important information. Whether it's news about upcoming
                  features or changes, you'll find it all here.
                </p>
                <Link to="/announcements">
                  <button
                    className="button-request"
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    See Announcements
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/register.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Friendly Interface
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                  }}
                >
                  To access the full suite of scheduler features, log in with
                  your existing account or register for a new account. Enjoy a
                  personalized experience and make scheduling easier than ever
                  before.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/sched.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Make a funtime Schedule
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                  }}
                >
                  Create a comprehensive and enjoyable schedule tailored to your
                  preferences and daily commitments. Our intuitive scheduler
                  makes it easy to plan your day, week, or month in advance.
                </p>
                <Link to="/calendar">
                  <button
                    className="button-request"
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    REQUEST SCHEDULE
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/cart.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Purchase merchandise
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                  }}
                >
                  Explore our online store to discover a wide range of
                  merchandise, from apparel to accessories. Purchase your
                  favorite items and showcase your support for our teams
                  TUP-GRAY HAWKS.
                </p>
                <Link to="/store" style={{ textDecoration: "none" }}>
                  <button
                    className="button-request"
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    SEE MERCHANDISE
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/sports.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                    boxShadow: "0 4px 6px rgba(4, 2, 2, 8)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Borrow Equipment
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    textAlign: "justify",
                    color: "#666",
                  }}
                >
                  Explore our equipment borrowing service, designed to provide
                  you with the tools you need for your activities. From
                  basketball to chess boards, we have a diverse range of
                  equipment available for your convenience.
                </p>
                <Link to="/equipmentz">
                  <button
                    className="button-request"
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    SEE AVAILABLE ITEMS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="AboutMaam"
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#333",
            marginBottom: "30px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderBottom: "3px solid #333",
            paddingBottom: "10px",
          }}
        >
          MEET OUR COORDINATORS
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "16px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Meet the dedicated individuals who work tirelessly behind the scenes
          to ensure the smooth operation and success of our organization. Each
          coordinator brings a unique set of skills and experiences to their
          role, contributing to our collective achievements. Get to know them
          and discover the faces behind the success of our team.
        </p>
        <br></br>
        <div className="head-admin">
          <div
            className="card shadow"
            style={{ borderRadius: "10px", overflow: "hidden", border: "none" }}
          >
            <div className="card-body text-center">
              <img
                src="/images/imelda.jpg"
                alt="Head Admin"
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  marginBottom: "20px",
                  border: "solid",
                }}
              />
              <h5
                className="card-title"
                style={{
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                Admin. Officer IV-Sports & Welfare Development
              </h5>
              <p
                style={{
                  color: "#666",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  margin: "5px 0",
                }}
              >
                Mrs. Imelda V. Laya
              </p>
            </div>
          </div>
        </div>
        <h4
          style={{
            color: "#333",
            marginBottom: "50px",
            marginTop: "50px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderBottom: "3px solid #333",
            paddingBottom: "10px",
          }}
        >
          EXECUTIVE OFFICERS
        </h4>

        <div className="row officers ">
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
                color: "black",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/100.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4  ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center  h-100">
                <img
                  src="/images/111.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",

                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/12.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/13.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/14.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/15.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/16.jpg"
                  alt="Officer"
                  style={{
                    width: "80%",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <h4
          style={{
            color: "#333",
            marginBottom: "50px",
            marginTop: "50px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            borderBottom: "3px solid #333",
            paddingBottom: "10px",
          }}
        >
          MEET THE DEVELOPERS
        </h4>
        <div className="row officers ">
          <div className="col-lg-4 col-md-6 mb-4 ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/dan.jpg"
                  alt="Officer"
                  style={{
                    width: "225px",
                    height: "225px",
                    marginBottom: "20px",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    marginBottom: "0",
                  }}
                >
                  Daniel Angelo Rodriguez
                </h5>
                <p
                  style={{
                    color: "#666",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    margin: "5px 0",
                  }}
                >
                  Web Developer
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4  ">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center  h-100">
                <img
                  src="/images/ner.jpg"
                  alt="Officer"
                  style={{
                    width: "225px",
                    height: "225px",

                    marginBottom: "20px",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    marginBottom: "0",
                  }}
                >
                  {" "}
                  John Neri Escobella
                </h5>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card shadow h-100"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "none",
              }}
            >
              <div className="card-body text-center h-100">
                <img
                  src="/images/jem.jpg"
                  alt="Officer"
                  style={{
                    width: "225px",
                    height: "225px",
                    marginBottom: "20px",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    marginBottom: "0",
                  }}
                >
                  Jeremy Cabudbud
                </h5>
                <p>Mobile Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="card shadow h-100"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "none",
            }}
          >
            <div className="card-body text-center h-100">
              <img
                src="/images/mara.png"
                alt="Officer"
                style={{
                  width: "225px",
                  height: "225px",
                  marginBottom: "20px",
                }}
              />
              <h5
                className="card-title"
                style={{
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  marginBottom: "0",
                }}
              >
                Maracris Lappay
              </h5>
              <p
                style={{
                  color: "#666",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  margin: "5px 0",
                }}
              >
                Full Name
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <h4
        style={{
          color: "#333",
          marginBottom: "50px",
          marginTop: "50px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "2.5rem",
          textTransform: "uppercase",
          letterSpacing: "2px",
          borderBottom: "3px solid #333",
          paddingBottom: "10px",
        }}
      >
        LOCATION GUIDE
      </h4>

      <div className="col-lg-12 col-md-4 text-center ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1714364151307!6m8!1m7!1s5OA2JFJJk6xoBImgXtuklQ!2m2!1d14.50831393812132!2d121.0350815452465!3f269.3387188907917!4f0!5f0.7820865974627469"
          width="600"
          height="450"
          style={{ border: "0", margin: "20px" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.4117213714807!2d121.03471167479934!3d14.508351399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf00664007db%3A0x7785013f15f7f45e!2sTechnological%20University%20of%20the%20Philippines%20-%20Taguig%20Campus!5e0!3m2!1sen!2sph!4v1714364398567!5m2!1sen!2sph"
          width="600"
          height="450"
          style={{ border: "0", margin: "20px" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div
        className="col-lg-12 col-md-4  "
        style={{ display: "flex", marginLeft: "80px" }}
      >
        <div className="text-center" style={{ margin: "20px" }}>
          <img
            src="/images/gif.gif"
            alt="Officer"
            title=" Gymnasium"
            style={{
              width: "400px",
              height: "400px",
              marginBottom: "20px",
              transition: "transform 0.3s ease", // Add transition for smooth scaling
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")} // Scale up on hover
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")} // Scale back to normal on hover out
          />
          <p
            style={{
              fontSize: "18px", // Adjust the font size
              fontWeight: "bold", // Make the text bold
              lineHeight: "1.5", // Increase the line height for better spacing
              color: "#333", // Set the text color to a dark shade
              marginBottom: "20px", // Add space below the paragraph
            }}
          >
            GYMNASIUM LOCATION GUIDE
          </p>
        </div>
        <div className="text-center" style={{ margin: "20px" }}>
          <img
            src="/images/giff.gif"
            alt="Officer"
            title="outer court"
            style={{
              width: "400px",
              height: "400px",
              marginBottom: "20px",
              transition: "transform 0.3s ease", // Add transition for smooth scaling
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")} // Scale up on hover
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")} // Scale back to normal on hover out
          />
          <p
            style={{
              fontSize: "18px", // Adjust the font size
              fontWeight: "bold", // Make the text bold
              lineHeight: "1.5", // Increase the line height for better spacing
              color: "#333", // Set the text color to a dark shade
              marginBottom: "20px", // Add space below the paragraph
            }}
          >
            Outer Court LOCATION GUIDE
          </p>
        </div>
        <div className="text-center" style={{ margin: "20px" }}>
          <img
            src="/images/gifff.gif"
            alt="Officer"
            title="Multipurpose Hall"
            style={{
              width: "400px",
              height: "400px",
              marginBottom: "20px",
              transition: "transform 0.3s ease", // Add transition for smooth scaling
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")} // Scale up on hover
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")} // Scale back to normal on hover out
          />

          <p
            style={{
              fontSize: "18px", // Adjust the font size
              fontWeight: "bold", // Make the text bold
              lineHeight: "1.5", // Increase the line height for better spacing
              color: "#333", // Set the text color to a dark shade
              marginBottom: "20px", // Add space below the paragraph
            }}
          >
            Multipurpose Hall LOCATION GUIDE
          </p>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Homepage;
