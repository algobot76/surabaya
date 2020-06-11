import React, { Fragment, useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import Island from "./components/Island";
import RecoilRoot from "recoil";

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
  const [data, setData] = useState({});

  return (
    <RecoilRoot>
      <div className={styles.App}>
        <div className={styles.leftSide}>
          <Legend />
          <ImportPanel setData={setData} />
        </div>
        <RightSide></RightSide>
      </div>
    </RecoilRoot>
  );
}

export default App;
