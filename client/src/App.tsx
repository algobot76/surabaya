import React, { useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import { RecoilRoot } from "recoil";
import RightSide from "./components/RightSide";
import { JavaArchipelago } from "./lib/JavaArchipelago";
import { Background } from "./components/Background";
import { legendWidth } from "./util/constants";

const initialVisibility = {
  showDomesticDependencies: false,
  showForeignDependencies: false,
  showInheritance: false,
};
export type Visibility = typeof initialVisibility;

function App() {
  const [data, setData] = useState<JavaArchipelago>(null);
  let width = "100vw";
  let height = "100vh";

  const arrowVisibility = useState<Visibility>(initialVisibility);
  if (data) {
    width = `${data.width + legendWidth + 150}px`;
    height = `${data.height + 150}px`;
  }

  return (
    <RecoilRoot>
      <Background width={width} height={height} />
      <div className={styles.App}>
        <div className={styles.leftSide}>
          <Legend arrowVisibility={arrowVisibility} />
          <ImportPanel setData={setData} />
        </div>
        {data && (
          <RightSide
            javaProject={data}
            arrowVisibility={arrowVisibility}
          ></RightSide>
        )}
      </div>
    </RecoilRoot>
  );
}

export default App;
