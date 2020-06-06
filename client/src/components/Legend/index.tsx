import React from "react";
import LegendBg from "../../assets/background/legendbg.svg";
import RightBoat from "../../assets/icons/boat right.png";
import Volcano from "../../assets/icons/volcano.png";
import Factory from "../../assets/icons/factory.png";
import Deciduous from "../../assets/icons/deciduous.png";
import Evergreen from "../../assets/icons/evergreen.png";
import Pond from "../../assets/icons/pond.png";
import Rock from "../../assets/icons/rock.png";
import "./Legend.css";

const Legend = () => {
  return (
    <div className="legend">
      <h2>Legend</h2>
      <div className="legend-row">
        <img className="legend-img" src={RightBoat} />
        <p className="legend-text">Import statement</p>
      </div>

      <div className="legend-row">
        <img className="legend-img" src={Volcano} />
        <p className="legend-text">Constructor</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Factory} />
        <p className="legend-text">Method</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Deciduous} />
        <p className="legend-text">Boolean</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Pond} />
        <p className="legend-text">Int</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Evergreen} />
        <p className="legend-text">String</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Rock} />
        <p className="legend-text">Other</p>
      </div>
    </div>
  );
};
export default Legend;
