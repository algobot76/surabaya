import React from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <Legend />
        <ImportPanel />
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
}

export default App;
