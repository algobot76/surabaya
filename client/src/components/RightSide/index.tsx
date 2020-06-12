import React from "react";
import styles from "../../App.module.css";
import { JavaProject } from "../../JavaProjectTypes";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import { legendWidth } from "../../util/constants";
import PinchToZoom from "react-pinch-and-zoom";
import { MapInteractionCSS } from "react-map-interaction";

const PinchToZoomCompat = PinchToZoom as any;

const RightSide = ({ javaProject }: { javaProject?: JavaArchipelago }) => {
  const islands = javaProject.islands;
  const links = javaProject.links;
  const width = Math.max(window.innerWidth - 300, javaProject.width);
  const height = Math.max(window.innerHeight, javaProject.height);
  console.log(width, height);

  return (
    <div
      className={styles.rightSide}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <MapInteractionCSS>
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
