import React from "react";
import styles from "./App.module.css";
import Island from "./components/Island";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import mockFile from "./mockFile.json";

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <Legend />
        <ImportPanel />
      </div>

      <div className={styles.rightSide}>
        <Island fileAnalysis={mockFile} />
        <Island fileAnalysis={mockFile} />
        <Island fileAnalysis={mockFile} />
      </div>
    </div>
  );
}

export default App;
