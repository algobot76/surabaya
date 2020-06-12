import React from "react";
import "./DependencyArrow.css";
import RightBoat from "../../assets/icons/boat right.png";
import LeftBoat from "../../assets/icons/boat left.png";

import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
const DomesticDependencyArrow = ({ link: { source, target } }) => {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute" }}>
      <path
        className="importLine"
        d={`M${source.topLeftCorner.x},${source.topLeftCorner.y} Q0,0 ${target.topLeftCorner.x},${target.topLeftCorner.y}`}
      />
      <image href={RightBoat} width="50px" x="-25px" y="-50px">
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          path={`M${source.topLeftCorner.x},${source.topLeftCorner.y} Q0,0 ${target.topLeftCorner.x},${target.topLeftCorner.y}`}
        />
      </image>
    </svg>
  );
};
export default DomesticDependencyArrow;
