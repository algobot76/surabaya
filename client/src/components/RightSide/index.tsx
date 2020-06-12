import React from "react";
import styles from "../../App.module.css";
import Island from "../Island";
import DomesticDependencyArrow from "../DependencyArrow/DomesticDependencyArrow";
import ForeignDependencyArrow from "../DependencyArrow/ForeignDependencyArrow";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import styled from "styled-components";

const MapContainer = styled.div`
  height: calc(100vh - 23px);
  width: calc(100vw - 300px);
  position: relative;
  overflow: auto;
`;

const RightSide = ({ javaProject }: { javaProject?: JavaArchipelago }) => {
  const islands = javaProject.islands;
  const links = javaProject.links;

  return (
    <div
      className={styles.rightSide}
      style={{
        display: "block",
        position: "absolute",
        left: "300px",
        overflow: "auto",
      }}
    >
      <MapContainer>
        {islands.map((island, index) => {
          return <Island fileAnalysis={island} key={index} />;
        })}
        {links.domesticDependencies.map((link, index) => {
          return (
            <DomesticDependencyArrow
              link={link}
              width={javaProject.width + 150}
              height={javaProject.height + 150}
              key={index}
            />
          );
        })}
        {links.foreignDependencies.map((link, index) => {
          return (
            <ForeignDependencyArrow
              link={link}
              width={javaProject.width + 150}
              height={javaProject.height + 150}
              key={index}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};
export default RightSide;
