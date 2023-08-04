import React from "react";
import { Tilt } from "react-tilt";
import brain from "./brain.png";

const defaultOptions = {
  max: 35,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
};
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={defaultOptions}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <div className="totally-centered">
            <img style={{ paddingTop: "5px" }} src={brain} alt="logo" />
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
