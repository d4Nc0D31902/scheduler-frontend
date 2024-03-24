import React, { Fragment } from "react";
import Wave from "react-wavify";
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Room, Email, Language } from '@mui/icons-material';
const Footer = () => {
  return (
    <Fragment>
      <Wave
        fill="url(#gradient)"
        paused={false}
        options={{
          height: 5,
          amplitude: 30,
          speed: 0.15,
          points: 3,
          backgroundColor: "black",
        }}
        className="wave-background"
        style={{ marginTop: "250px" }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor="maroon" />
            <stop offset="90%" stopColor="black" />
          </linearGradient>
        </defs>
      </Wave>
      <footer
        className="py-1"
        style={{ backgroundColor: "black", marginTop: "-5px" }}
      >
        <div className="row">
          <div className="col-lg-3" style={{ borderRight: "1px solid white", fontWeight: "bold" }}>
            <p className="text-center mt-1" style={{ padding: "10px 0px", borderRadius: "0px", fontWeight: "bold" }}>
              CONTACT US

            </p>
            <p className="text-center mt-1" style={{ padding: "10px 0px", borderRadius: "0px" }}>
              <PhoneIcon style={{ marginRight: '5px' }} /> 123-456-7890

            </p>
            <p className="text-center mt-1" style={{ padding: "10px 0px", borderRadius: "0px" }}>
              <Email style={{ marginRight: '5px' }} />
              admin@tup.edu.ph
            </p>
            <p className="mt-1" style={{ padding: "10px 0px", borderRadius: "0px", textAlign: "justify" }}>

              <Room style={{ marginRight: '5px' }} /> Technological University of the Philippines - Taguig Campus
              General Santos Avenue
              Taguig City, Metro Manila
              Philippines
            </p>
          </div>
          <div className="col-lg-6" style={{ borderRight: "1px solid white", fontWeight: "bold" }}>
            <p className="text-center mt-1" style={{ padding: "10px 0px" }}>
              <Language style={{ marginRight: '5px' }} />
              WEBSITE: www.tupSchedules.com
              <br />
              <br />
              <br />
              <br />

              Manage your schedules efficiently with TUP Scheduler, the ultimate scheduling tool for students and faculty.
            </p>
          </div>
          <div className="col-lg-3" style={{ borderRight: "1px solid white", }}>
            <p className="text-center mt-1" style={{ padding: "10px 0px", fontWeight: "bold" }}>
              FOLLOW US
              <div>
                <p className="text-center mt-1" style={{ padding: "10px 0px", fontWeight: "bold" }}>
                  <br />
                  <FacebookIcon style={{ margin: '0px 5px' }} /> FACEBOOK
                  <br />
                  <InstagramIcon style={{ margin: '0px 5px' }} /> INSTAGRAM
                  <br />
                  <TwitterIcon style={{ margin: '0px 5px' }} /> TWITTER
                </p>
              </div>
            </p>
          </div>


        </div>

        <p className="text-center mt-1" style={{ padding: "10px 0px" }}>
          TUP SCHEDULER - 2023-2024, &copy; All Rights Reserved
        </p>

      </footer>
    </Fragment>
  );
};

export default Footer;
