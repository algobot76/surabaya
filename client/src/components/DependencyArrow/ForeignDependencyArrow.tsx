import React from "react";
import "./DependencyArrow.css";
import RightBoat from "../../assets/icons/boat right.png";
import LeftBoat from "../../assets/icons/boat left.png";

import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
const ForeignDependencyArrow = ({ link: { source, target } }) => {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute" }}>
      <image href={Island1} width="100px">
        <animateMotion
          path={`M${source.x},${source.y} Q0,0 ${target.x},${target.y}`}
        />
      </image>
      <image href={Island2} width="100px">
        <animateMotion
          path={`M${target.x},${target.y} Q0,0 ${target.x},${target.y}`}
        />
      </image>

      <path
        className="importLine"
        d={`M${source.x},${source.y} Q0,0 ${target.x},${target.y}`}
      />
      <image href={RightBoat} width="50px" x="-25px" y="-50px">
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          path={`M${source.x},${source.y} Q0,0 ${target.x},${target.y}`}
        />
      </image>
    </svg>
  );
};
export default ForeignDependencyArrow;
