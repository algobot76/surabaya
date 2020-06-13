import React, { SetStateAction } from "react";
import styles from "./Legend.module.css";
import { Visibility } from "../../App";

const Checkbox = ({ arrowVisibility }) => {
  const [visibility, setVisibility]: [
    Visibility,
    React.Dispatch<SetStateAction<Visibility>>
  ] = arrowVisibility;
  return (
    <form>
      <input
        type="checkbox"
        checked={visibility.showDomesticDependencies}
        onChange={() =>
          setVisibility((previousVis) => ({
            ...previousVis,
            showDomesticDependencies: !previousVis.showDomesticDependencies,
          }))
        }
      />
      <label className={styles.legendText}> Dependencies within package</label>
      <br></br>
      <input
        type="checkbox"
        checked={visibility.showForeignDependencies}
        onChange={() =>
          setVisibility((previousVis) => ({
            ...previousVis,
            showForeignDependencies: !previousVis.showForeignDependencies,
          }))
        }
      />
      <label className={styles.legendText}> Dependencies outside package</label>
      <br></br>
      <input
        type="checkbox"
        checked={visibility.showInheritance}
        onChange={() =>
          setVisibility((previousVis) => ({
            ...previousVis,
            showInheritance: !previousVis.showInheritance,
          }))
        }
      />
      <label className={styles.legendText}> Inheritance</label>
      <br></br>
    </form>
  );
};
export default Checkbox;
