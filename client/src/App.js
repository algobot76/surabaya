import React, { Fragment, useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import IslandMap from "./components/IslandMap";
import ImportPanel from "./components/ImportPanel";
import Island from "./components/Island";
import { RecoilRoot } from "recoil";
import RightSide from "./components/RightSide";

const Package = (props) => {
  const { content } = props;
  return (
    <Fragment>
      {content.files.map((file, index) => (
        <Island key={index} fileAnalysis={file} />
      ))}
    </Fragment>
  );
};

function App() {
  const [data, setData] = useState(null);

  return (
    <RecoilRoot>
      <div className={styles.App}>
        <div className={styles.leftSide}>
          <Legend />
          <ImportPanel setData={setData} />
        </div>
        <RightSide javaProject={data}></RightSide>
      </div>
    </RecoilRoot>
  );
}

export default App;
