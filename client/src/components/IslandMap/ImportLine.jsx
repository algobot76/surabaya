import React from "react";
import "./ImportLine.css";
import { Line } from "react-simple-maps";
import RightBoat from "../../assets/icons/boat right.png";
import LeftBoat from "../../assets/icons/boat left.png";

import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
// import island3 from "../../assets/islands/island3.png";
// import island4 from "../../assets/islands/island4.png";
// import island5 from "../../assets/islands/island5.png";

const ImportLine = ({ from, to }) => {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute" }}>
      <image href={Island1} width="100px">
        <animateMotion path={`M${from[0]},${from[1]} Q0,0 ${to[0]},${to[1]}`} />
      </image>
      <image href={Island2} width="100px">
        <animateMotion path={`M${to[0]},${to[1]} Q0,0 ${to[0]},${to[1]}`} />
      </image>

      <path
        class="importLine"
        d={`M${from[0]},${from[1]} Q0,0 ${to[0]},${to[1]}`}
      />
      <image href={RightBoat} width="50px" x="-25px" y="-50px">
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          path={`M${from[0]},${from[1]} Q0,0 ${to[0]},${to[1]}`}
        />
      </image>
    </svg>
  );
};

export default ImportLine;
