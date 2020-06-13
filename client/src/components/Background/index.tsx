import React from "react";
import "./Background.css";

type Props = {
  width: string;
  height: string;
};

export function Background(props: Props) {
  return (
    <>
      <div
        className="background"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          height: props.height,
          width: props.width,
        }}
      >
        <div
          className="water"
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            height: props.height,
            width: props.width,
          }}
        ></div>
      </div>
      <svg height="0px">
        <filter
          id="turbulence"
          x="0"
          y="0"
          width={props.width}
          height={props.height}
        >
          <feTurbulence
            id="sea-filter"
            numOctaves="3"
            seed="2"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </>
  );
}
