import React from "react";
import "./DependencyArrow.css";

const InheritanceArrow = ({ link, width, height }) => {
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
        className="inheritanceImportLine"
        d={`M${tX},${tY} Q${curveX || 0},${curveY || 0} ${sX},${sY}`}
      />
      <animateMotion
        dur="5s"
        repeatCount="indefinite"
        path={`M${sX},${sY} Q${curveX || 0},${curveY || 0} ${tX},${tY}`}
      />
    </svg>
  );
};
export default InheritanceArrow;
