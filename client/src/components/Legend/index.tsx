import React from "react";
import RightBoat from "../../assets/icons/boat right.png";
import Volcano from "../../assets/icons/volcano.png";
import Factory from "../../assets/icons/factory.png";
import Deciduous from "../../assets/icons/deciduous.png";
import DeciduousMultiples from "../../assets/icons/deciduousMultiples.png";
import Evergreen from "../../assets/icons/evergreen.png";
import EvergreenMultiples from "../../assets/icons/evergreenMultiples.png";
import Pond from "../../assets/icons/pond.png";
import PondMultiples from "../../assets/icons/pondMultiples.png";
import Rock from "../../assets/icons/rock.png";
import RockMultiples from "../../assets/icons/rock.png";
import StoneFence from "../../assets/fences/stoneFence.png";
import WoodenFence from "../../assets/fences/woodenFence.png";
import styles from "./Legend.module.css";
import ColoredFlag, { FlagType } from "../ColoredFlag";
import Airplane from "../../assets/icons/airplane.png";
import RedDottedLine from "../../assets/icons/red dotted line.svg";
import WhiteDottedLine from "../../assets/icons/white dotted line.svg";
import GreenDottedLine from "../../assets/icons/green dotted line.svg";
import Checkbox from "./Checkbox";

const Legend = ({ arrowVisibility, codeVisibility }) => {
  const [codeOpened, setCodeOpened] = codeVisibility;
  return (
    <div className={styles.legend}>
      <h3 className={styles.heading}>Legend</h3>
      <div className={styles.legendContent}>
        <div className={styles.legendLeftContainer}>
          <div className={styles.legendRow}>
            <div>
              <img className={styles.legendImg} src={RightBoat} alt="" />
              <img
                style={{ marginTop: "-10px" }}
                className={styles.legendImg}
                src={WhiteDottedLine}
                alt=""
              />
            </div>
            <p className={styles.legendText}>Dependencies within package</p>
          </div>

          <div className={styles.legendRow}>
            <div>
              <img
                className={styles.legendImg}
                style={{ width: "50px" }}
                src={Airplane}
                alt=""
              />
              <img
                className={styles.legendImg}
                style={{ marginTop: "-10px" }}
                src={RedDottedLine}
                alt=""
              />
            </div>
            <p className={styles.legendText}>Dependencies outside package</p>
          </div>
          <div className={styles.legendRow}>
            <div>
              <img className={styles.legendImg} src={GreenDottedLine} alt="" />
            </div>
            <p className={styles.legendText}>Inheritance</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Volcano} alt="" />
            <p className={styles.legendText}>Constructor</p>
          </div>

          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={WoodenFence} alt="" />
            <p className={styles.legendText}>Protected</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={StoneFence} alt="" />
            <p className={styles.legendText}>Private</p>
          </div>
          <div className={styles.legendRow}>
            <div className={styles.legendImg}>
              <ColoredFlag flagType={FlagType.ConcreteClass} />
            </div>
            <p className={styles.legendText}>Concrete Class Info</p>
          </div>
          <div className={styles.legendRow}>
            <div className={styles.legendImg}>
              <ColoredFlag flagType={FlagType.AbstractClass} />
            </div>
            <p className={styles.legendText}>Abstract Class Info</p>
          </div>
          <div className={styles.legendRow}>
            <div className={styles.legendImg}>
              <ColoredFlag flagType={FlagType.Interface} />
            </div>
            <p className={styles.legendText}>Interface Info</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Volcano} alt="" />
            <p className={styles.legendText}>Constructor</p>
          </div>
        </div>
        <div className={styles.legendRightContainer}>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Factory} alt="" />
            <p className={styles.legendText}>Method</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Deciduous} alt="" />
            <p className={styles.legendText}>Primitive boolean</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={DeciduousMultiples} alt="" />
            <p className={styles.legendText}>Primitive boolean Collection</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Pond} alt="" />
            <p className={styles.legendText}>Primitive Numeric</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={PondMultiples} alt="" />
            <p className={styles.legendText}>Primitive Numeric Collection</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Evergreen} alt="" />
            <p className={styles.legendText}>String</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={EvergreenMultiples} alt="" />
            <p className={styles.legendText}>String Collection</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={Rock} alt="" />
            <p className={styles.legendText}>Other</p>
          </div>
          <div className={styles.legendRow}>
            <img className={styles.legendImg} src={RockMultiples} alt="" />
            <p className={styles.legendText}>Other Collection</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        Show:
        <Checkbox arrowVisibility={arrowVisibility} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label className={styles.legendText}>Open Code Display:</label>
        <input
          type="checkbox"
          checked={codeOpened}
          onChange={() =>
            setCodeOpened((prevState) => {
              return !prevState;
            })
          }
        />
      </div>
    </div>
  );
};
export default Legend;
