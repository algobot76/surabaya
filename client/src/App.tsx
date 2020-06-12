import React, { useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import { RecoilRoot } from "recoil";
import RightSide from "./components/RightSide";
import { JavaArchipelago } from "./lib/JavaArchipelago";
import { Background } from "./components/Background";
import { legendWidth } from "./util/constants";

function App() {
  const [data, setData] = useState<JavaArchipelago>(null);
  let width = "100vw";
  let height = "100vh";
  if (data) {
    width = `${data.width + legendWidth}px`;
    height = `${data.height}px`;
  }

  return (
    <RecoilRoot>
      <Background width={width} height={height} />
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
