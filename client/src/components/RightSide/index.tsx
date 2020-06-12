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
        height: `${javaProject.height + 150}px`,
        width: `${javaProject.width + 150}px`,
      }}
    >
      {islands.map((island, index) => {
        return <Island fileAnalysis={island} key={index} />;
      })}
      {links.domesticDependencies.map((link, index) => {
        return (
          <DomesticDependencyArrow
            link={link}
            width={javaProject.width + 150}
            height={javaProject.height + 150}
          />
        );
      })}
      {links.foreignDependencies.map((link, index) => {
        return (
          <ForeignDependencyArrow
            link={link}
            width={javaProject.width + 150}
            height={javaProject.height + 150}
          />
        );
      })}
    </div>
  );
};
export default RightSide;
