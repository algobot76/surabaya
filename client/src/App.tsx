import React, { useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import { RecoilRoot } from "recoil";
import RightSide from "./components/RightSide";
import { JavaArchipelago } from "./lib/JavaArchipelago";

function App() {
  const [data, setData] = useState<JavaArchipelago>(null);

  return (
    <RecoilRoot>
      <div className={styles.App}>
        <div className={styles.leftSide}>
          <Legend />
          <ImportPanel setData={setData} />
        </div>
        {data && <RightSide javaProject={data}></RightSide>}
      </div>
    </RecoilRoot>
  );
}

export default App;
