import React from "react";
import "./DependencyArrow.css";
import Airplane from "../../assets/icons/airplane.png";
const ForeignDependencyArrow = ({ link, width, height }) => {
  const { source, target, curveX, curveY } = link;
  const sX = source.topLeftCorner.x + 20;
  const sY = source.topLeftCorner.y + 20;
  const tX = target.topLeftCorner.x + 20;
  const tY = target.topLeftCorner.y + 20;

  return (
    <svg
      pointerEvents="none"
      width={`${width}px`}
      height={`${height}px`}
      style={{ position: "absolute" }}
    >
      <path
        className="foreignImportLine"
        d={`M${tX},${tY} Q${curveX || 0},${curveY || 0} ${sX},${sY}`}
      />
      <image href={Airplane} width="40px" x="-20px" y="-20px">
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path={`M${sX},${sY} Q${curveX || 0},${curveY || 0} ${tX},${tY}`}
        />
      </image>
    </svg>
  );
};
export default ForeignDependencyArrow;
