import React, { useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";

function App() {
  const [data, setData] = useState({});

  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <Legend />
        <ImportPanel setData={setData} />
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
}

export default App;
