import React, { useState } from "react";
import styles from "../../App.module.css";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import { MapInteractionCSS } from "react-map-interaction";

const RightSide = ({ javaProject }: { javaProject?: JavaArchipelago }) => {
  const islands = javaProject.islands;
  const links = javaProject.links;
  const width = Math.max(window.innerWidth - 300, javaProject.width);
  const height = Math.max(window.innerHeight, javaProject.height);
  const initialScale = Math.min(
    1,
    Math.min(
      (window.innerWidth - 300) / javaProject.width,
      window.innerHeight / javaProject.height
    )
  );
  const initialZoomValue = {
    scale: initialScale,
    translation: { x: 0, y: 0 },
  };
  const [zoomValue, setZoomValue] = useState(initialZoomValue);

  return (
    <div
      className={styles.rightSide}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <MapInteractionCSS value={zoomValue} onChange={setZoomValue}>
        <div>
          {islands.map((island, index) => {
            return <Island fileAnalysis={island} key={index} />;
          })}
          {links.domesticDependencies.map((link, index) => {
            return (
              <DomesticDependencyArrow
                link={link}
                width={javaProject.width}
                height={javaProject.height}
              />
            );
          })}
          {links.foreignDependencies.map((link, index) => {
            return (
              <ForeignDependencyArrow
                link={link}
                width={javaProject.width}
                height={javaProject.height}
              />
            );
          })}
        </div>
      </MapInteractionCSS>
    </div>
  );
};
export default RightSide;
