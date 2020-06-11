import React from "react";
import styles from "../../App.module.css";
import { JavaProject } from "../../JavaProjectTypes";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const RightSide = ({ javaProject }: { javaProject?: JavaProject }) => {
  const islands: any = []; //placeholder
  const links: any = {}; //placeholder

  return (
    <TransformWrapper defaultScale={1}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools" style={{ position: "absolute", zIndex: 10 }}>
            <button className={styles.zoomBtn} onClick={zoomIn}>
              +
            </button>
            <button className={styles.zoomBtn} onClick={zoomOut}>
              -
            </button>
            <button className={styles.zoomBtn} onClick={resetTransform}>
              x
            </button>
          </div>
          <TransformComponent>
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
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};
export default RightSide;
