import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Homepage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Fragment>
      <div className="wave" style={{ backgroundColor: "maroon" }}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(233, 22, 22)" fill-opacity="1" d="M0,160L40,138.7C80,117,160,75,240,58.7C320,43,400,53,480,80C560,107,640,149,720,160C800,171,880,149,960,133.3C1040,117,1120,107,1200,122.7C1280,139,1360,181,1400,202.7L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill=" #FFFFFF" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,181.3C840,192,960,256,1080,272C1200,288,1320,256,1380,240L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg> */}
      </div>

      <div
        className="about"
        style={{ backgroundColor: "white", marginTop: "100px", color: "black" }}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4 animation-effect-top">
            <Slider {...settings}>
              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/gym.jpg"
                  alt="Slide 1"
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "10px",
                    boxShadow: "3px 3px 3px red",
                  }}
                />
              </div>

              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/2.jpg"
                  alt="Slide 2"
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "10px",
                    boxShadow: "3px 3px 3px red",
                  }}
                />
              </div>

              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/3.jpg"
                  alt="Slide 2"
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "10px",
                    boxShadow: "3px 3px 3px red",
                  }}
                />
              </div>
              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/4.jpg"
                  alt="Slide 2"
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "10px",
                    boxShadow: "3px 3px 3px red",
                  }}
                />
              </div>
              <div
                className="card-body"
                style={{ textAlign: "center", borderRadius: "50%" }}
              >
                <img
                  src="/images/5.jpg"
                  alt="Slide 2"
                  style={{
                    width: "100%",
                    height: "400px",
                    margin: "10px",
                    boxShadow: "3px 3px 3px red",
                  }}
                />
              </div>
            </Slider>
          </div>

          <div className="col-lg-6 col-md-6 mb-4 animation-effect-top">
            <div className="card-body" style={{ textAlign: "center" }}>
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
                ABOUT THE SCHEDULER
              </h3>
              <p
                className="card-text"
                style={{
                  textAlign: "center",
                  fontSize: "17px",
                  alignItems: "center",
                  textAlign: "justify",
                  marginRight: "10px",
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
        className="Designs"
        style={{ backgroundColor: "maroon", padding: "10px 0px" }}
      >
        <p
          style={{
            color: "white",
            fontSize: "80px",
            textAlign: "center",
            fontFamily: "calibri",
          }}
        >
          LOCATIONS
        </p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="maroon"
          fill-opacity="1"
          d="M0,32L6.5,64C13,96,26,160,39,170.7C51.9,181,65,139,78,154.7C90.8,171,104,245,117,245.3C129.7,245,143,171,156,133.3C168.6,96,182,96,195,85.3C207.6,75,221,53,234,69.3C246.5,85,259,139,272,149.3C285.4,160,298,128,311,128C324.3,128,337,160,350,149.3C363.2,139,376,85,389,90.7C402.2,96,415,160,428,186.7C441.1,213,454,203,467,181.3C480,160,493,128,506,112C518.9,96,532,96,545,96C557.8,96,571,96,584,96C596.8,96,610,96,623,117.3C635.7,139,649,181,662,181.3C674.6,181,688,139,701,128C713.5,117,726,139,739,133.3C752.4,128,765,96,778,96C791.4,96,804,128,817,128C830.3,128,843,96,856,106.7C869.2,117,882,171,895,202.7C908.1,235,921,245,934,250.7C947,256,960,256,973,250.7C985.9,245,999,235,1012,224C1024.9,213,1038,203,1051,176C1063.8,149,1077,107,1090,117.3C1102.7,128,1116,192,1129,186.7C1141.6,181,1155,107,1168,117.3C1180.5,128,1194,224,1206,256C1219.5,288,1232,256,1245,250.7C1258.4,245,1271,267,1284,277.3C1297.3,288,1310,288,1323,266.7C1336.2,245,1349,203,1362,192C1375.1,181,1388,203,1401,186.7C1414.1,171,1427,117,1434,90.7L1440,64L1440,0L1433.5,0C1427,0,1414,0,1401,0C1388.1,0,1375,0,1362,0C1349.2,0,1336,0,1323,0C1310.3,0,1297,0,1284,0C1271.4,0,1258,0,1245,0C1232.4,0,1219,0,1206,0C1193.5,0,1181,0,1168,0C1154.6,0,1142,0,1129,0C1115.7,0,1103,0,1090,0C1076.8,0,1064,0,1051,0C1037.8,0,1025,0,1012,0C998.9,0,986,0,973,0C960,0,947,0,934,0C921.1,0,908,0,895,0C882.2,0,869,0,856,0C843.2,0,830,0,817,0C804.3,0,791,0,778,0C765.4,0,752,0,739,0C726.5,0,714,0,701,0C687.6,0,675,0,662,0C648.6,0,636,0,623,0C609.7,0,597,0,584,0C570.8,0,558,0,545,0C531.9,0,519,0,506,0C493,0,480,0,467,0C454.1,0,441,0,428,0C415.1,0,402,0,389,0C376.2,0,363,0,350,0C337.3,0,324,0,311,0C298.4,0,285,0,272,0C259.5,0,246,0,234,0C220.5,0,208,0,195,0C181.6,0,169,0,156,0C142.7,0,130,0,117,0C103.8,0,91,0,78,0C64.9,0,52,0,39,0C25.9,0,13,0,6,0L0,0Z"
        ></path>
      </svg>

      <div className="locations">
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/gym.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">GYM </h5>
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
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/gym.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">OUTDOOR COURT</h5>
                <p style={{ fontSize: "15px" }}>
                  {" "}
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
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src="/images/gym.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
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
          }}
        >
          HAVE FUN USING THE SCHEDULER
        </h2>
        <div className="row">
          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/register.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Login or Register</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "14px", textAlign: "justify" }}
                >
                  To access the full suite of scheduler features, log in with
                  your existing account or register for a new account. Enjoy a
                  personalized experience and make scheduling easier than ever
                  before.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/annouce.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "120px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Annoucements</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "14px", textAlign: "justify" }}
                >
                  Stay informed with our latest announcements, event updates,
                  and important information. Whether it's news about upcoming
                  features or changes, you'll find it all here.
                </p>
                <Link to="/announcements">
                  <button
                    className="button-request"
                    style={{ padding: "5px 10px" }}
                  >
                    {" "}
                    See Announcements
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/ui.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">friendly interface</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "14px", textAlign: "justify" }}
                >
                  A friendly user interface (UI) prioritizes ease of use with
                  intuitive navigation and clear visuals. It ensures a positive
                  experience for users of all levels, making digital
                  interactions seamless and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/sched.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Make a funtime Schedule</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "14px", textAlign: "justify" }}
                >
                  Create a comprehensive and enjoyable schedule tailored to your
                  preferences and daily commitments. Our intuitive scheduler
                  makes it easy to plan your day, week, or month in advance.
                </p>
                <Link to="/calendar">
                  <button
                    className="button-request"
                    style={{ padding: "5px 10px" }}
                  >
                    Request Schedule
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/cart.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Purchase merchandise</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "14px", textAlign: "justify" }}
                >
                  Explore our online store to discover a wide range of
                  merchandise, from apparel to accessories. Purchase your
                  favorite items and showcase your support for our teams
                  TUP-GRAY HAWKS.
                </p>
                <Link to="/store" style={{ textDecoration: "none" }}>
                  <button
                    className="button-request"
                    style={{ padding: "5px 10px" }}
                  >
                    Buy Merch
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/sports.png"
                  alt="Schedule Icon"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Borrow Equipment</h5>
                <p
                  className="card-text"
                  style={{ fontSize: "13px", textAlign: "justify" }}
                >
                  Explore our equipment borrowing service, designed to provide
                  you with the tools you need for your activities. From
                  basketball to chess boards, we have a diverse range of
                  equipment available for your convenience.
                </p>
                <Link to="/equipmentz">
                  <button
                    className="button-request"
                    style={{ padding: "5px 10px" }}
                  >
                    {" "}
                    Borrow Equipment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="AboutMaam"
        style={{
          padding: "20px 40px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "250px",
        }}
      >
        <h1 style={{ color: "black", marginBottom: "85px" }}>
          MEET OUR COORDINATORS
        </h1>
        <h4 style={{ color: "black" }}>THE ADMIN</h4>
        <div className="col-lg-3 col-md-6 mb-4">
          <div
            className="card"
            style={{ boxShadow: "1px 2px 8px gray", cursor: "pointer" }}
          >
            <div className="card-body" style={{ textAlign: "center" }}>
              <img
                src="/images/f.png"
                alt="Schedule Icon"
                style={{
                  width: "300px",
                  height: "300px",
                  marginBottom: "10px",
                }}
              />
              <h5 className="card-title">Imelda Laya </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/m.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Admin1</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/m.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Admin2</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card"
              style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}
            >
              <div className="card-body text-center">
                <img
                  src="/images/m.jpg"
                  alt="Schedule Icon"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "10px",
                  }}
                />
                <h5 className="card-title">Admin3</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Homepage;
