import React from "react";
import styles from "./App.module.css";
import Island from "./components/Island";
import Legend from "./components/Legend";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <Legend></Legend>
      </div>

      <div className={styles.rightSide}>
        <Island></Island>
        <Island></Island>
        <Island></Island>
      </div>
    </div>
  );
}

export default App;
