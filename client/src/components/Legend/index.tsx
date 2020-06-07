import React from "react";
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
        <img className="legend-img" src={RightBoat} alt="boat" />
        <p className="legend-text">Import statement</p>
      </div>

      <div className="legend-row">
        <img className="legend-img" src={Volcano} alt="volcano" />
        <p className="legend-text">Constructor</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Factory} alt="factory" />
        <p className="legend-text">Method</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Deciduous} alt="tree" />
        <p className="legend-text">Boolean</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Pond} alt="pond" />
        <p className="legend-text">Int</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Evergreen} alt="evergreen" />
        <p className="legend-text">String</p>
      </div>
      <div className="legend-row">
        <img className="legend-img" src={Rock} alt="rock" />
        <p className="legend-text">Other</p>
      </div>
    </div>
  );
};
export default Legend;
