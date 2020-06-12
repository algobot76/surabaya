import React from "react";
import styles from "../../App.module.css";
import { JavaProject } from "../../JavaProjectTypes";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import { legendWidth } from "../../util/constants";

const RightSide = ({ javaProject }: { javaProject?: JavaArchipelago }) => {
  const islands = javaProject.islands;
  const links = javaProject.links;

  return (
    <div
      className={styles.rightSide}
      style={{
        height: `${javaProject.height}px`,
        width: `${javaProject.width}px`,
      }}
    >
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
  );
};
export default RightSide;
