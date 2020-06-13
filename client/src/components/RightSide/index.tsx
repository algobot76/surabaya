import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
import InheritanceArrow from "../DependencyArrow/InheritanceArrow";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import { MapInteractionCSS } from "react-map-interaction";
import { Visibility } from "../../App";
import { connect } from "react-redux";
import PackageNameBanner from "../PackageNameBanner";
import { setPackageColorAction } from "../../reducersAndActions/actions";
import { randomColorArray } from "../../util/constants";

interface RightSideProps {
  javaProject?: JavaArchipelago;
  arrowVisibility: any;
}

function setPackageColors(props: any, packagesWithColors: any) {
  props.setPackageColorAction(packagesWithColors);
}

const RightSide: React.FC<RightSideProps> = (props: RightSideProps) => {
  const { javaProject, arrowVisibility } = props;
  const [visibility]: [Visibility] = arrowVisibility;
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

  useEffect(() => {
    const packagesNames = Object.keys(javaProject.project.packages);
    let packagesWithColors = {};
    packagesNames.forEach((p, index) => {
      const randomColorArrayLength = randomColorArray.length;
      const moduloIndex = index % randomColorArrayLength;
      packagesWithColors[p] = randomColorArray[moduloIndex];
      setPackageColors(props, packagesWithColors);
    });
  }, []);

  return (
    <div
      className={styles.rightSide}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <PackageNameBanner width={width} />
      <MapInteractionCSS value={zoomValue} onChange={setZoomValue}>
        <div>
          {islands.map((island, index) => {
            return (
              <Island
                fileAnalysis={island}
                key={index}
                thisIslandPackage={island.package.name}
              />
            );
          })}
          {visibility.showDomesticDependencies &&
            links.domesticDependencies.map((link, index) => {
              return (
                <DomesticDependencyArrow
                  link={link}
                  width={javaProject.width}
                  height={javaProject.height}
                  key={index}
                />
              );
            })}
          {visibility.showForeignDependencies &&
            links.foreignDependencies.map((link, index) => {
              return (
                <ForeignDependencyArrow
                  link={link}
                  width={javaProject.width}
                  height={javaProject.height}
                  key={index}
                />
              );
            })}
          {visibility.showInheritance &&
            links.domesticInheritances.map((link, index) => {
              return (
                <InheritanceArrow
                  link={link}
                  width={javaProject.width}
                  height={javaProject.height}
                  key={index}
                />
              );
            })}
          {visibility.showInheritance &&
            links.foreignInheritances.map((link, index) => {
              return (
                <InheritanceArrow
                  link={link}
                  width={javaProject.width}
                  height={javaProject.height}
                  key={index}
                />
              );
            })}
        </div>
      </MapInteractionCSS>
    </div>
  );
};

export default connect(null, { setPackageColorAction })(RightSide);
