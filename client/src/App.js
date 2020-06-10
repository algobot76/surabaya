import React, { Fragment, useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import ImportPanel from "./components/ImportPanel";
import Island from "./components/Island";

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
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <Legend />
        <ImportPanel setData={setData} />
      </div>
      <div className={styles.rightSide}>
        {data.packages &&
          Object.entries(data.packages).map((entry, index) => {
            const [packageName, packageContent] = entry;
            return <Package key={index} content={packageContent} />;
          })}
      </div>
    </div>
  );
}

export default App;
