import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageURL && (
          <img
            id="inputimage"
            src={imageURL}
            alt=" "
            width="500px"
            height="auto"
          />
        )}
        {box && (
          <div
            className="bounding-box"
            style={{
              top: `${box.topRow}px`,
              right: `${box.rightCol}px`,
              bottom: `${box.bottomRow}px`,
              left: `${box.leftCol}px`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
