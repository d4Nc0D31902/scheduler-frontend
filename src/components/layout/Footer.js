import React, { Fragment } from "react";
import Wave from "react-wavify";

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
        <p className="text-center mt-1" style={{ padding: "30px 60px" }}>
          TUP SCHEDULER - 2023-2024, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
