import React, { Fragment, useState } from "react";
import styles from "./App.module.css";
import Legend from "./components/Legend";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import IslandMap from "./components/IslandMap";
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

      <div>
        <TransformWrapper defaultScale={1}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div
                className="tools"
                style={{ position: "absolute", zIndex: "10" }}
              >
                <button className={styles.zoomBtn} onClick={zoomIn}>
                  +
                </button>
                <button className={styles.zoomBtn} onClick={zoomOut}>
                  -
                </button>
                <button className={styles.zoomBtn} onClick={resetTransform}>
                  x
                </button>
              </div>
              <TransformComponent style={{ width: "100%", height: "100%" }}>
                <div className={styles.rightSide}>
                  <Island fileAnalysis={mockFile} />
                  <Island fileAnalysis={mockFile} />
                  <Island fileAnalysis={mockFile} />
                  <IslandMap></IslandMap>
                  {data.packages &&
                    Object.entries(data.packages).map((entry, index) => {
                      const [packageName, packageContent] = entry;
                      return <Package key={index} content={packageContent} />;
                    })}
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}

export default App;
