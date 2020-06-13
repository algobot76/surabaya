import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/xq-light.css";
import "codemirror/mode/clike/clike";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./CodeDisplay.css";
import { code } from "../../atoms";
import { useRecoilValue } from "recoil";

const CodeDisplay = () => {
  const _code = useRecoilValue(code);
  return (
    <div className="code-display">
      <CodeMirror
        onBeforeChange={() => {}}
        value={_code}
        options={{
          mode: "text/x-java",
          theme: "xq-light",
          lineNumbers: true,
        }}
      />
    </div>
  );
};
export default CodeDisplay;
