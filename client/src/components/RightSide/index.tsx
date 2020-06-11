import React from "react";
import styles from "../../App.module.css";
import { JavaProject } from "../../JavaProjectTypes";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";

const RightSide = ({ javaProject }: { javaProject?: JavaProject }) => {
  const islands: any = []; //placeholder
  const links: any = {}; //placeholder
  return (
    <div className={styles.rightSide}>
      {islands.map((island, index) => {
        return <Island fileAnalysis={island} key={index} />;
      })}
      {links.domesticDependencies.map((link, index) => {
        return <DomesticDependencyArrow link={link} />;
      })}
      {links.foreignDependencies.map((link, index) => {
        return <ForeignDependencyArrow link={link} />;
      })}
    </div>
  );
};
export default RightSide;
