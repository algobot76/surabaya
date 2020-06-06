import React from "react";
import styles from "./App.module.css";
import Island from "./components/Island";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.leftSide} />
      <div className={styles.rightSide}>
        <Island></Island>
      </div>
    </div>
  );
}

export default App;
