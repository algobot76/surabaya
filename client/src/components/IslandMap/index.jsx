import React from "react";
import { ComposableMap } from "react-simple-maps";
import ImportLine from "./ImportLine";
import RightBoat from "../../assets/icons/boat right.png";

//from and to are x and y pixel positions
const fromToPairs = [{ from: [12, 289], to: [400, 350] }];

const IslandMap = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {fromToPairs.map((pair) => {
        return <ImportLine from={pair.from} to={pair.to}></ImportLine>;
      })}
    </div>
  );
};
export default IslandMap;
