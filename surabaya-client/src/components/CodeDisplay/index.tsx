import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ttcn.css";
import "codemirror/mode/clike/clike";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./CodeDisplay.css";
import { code as codeAtom } from "../../atoms";
import { useRecoilValue } from "recoil";

const CodeDisplay = () => {
  const code = useRecoilValue(codeAtom);
  return (
    <div className="code-display">
      <CodeMirror
        onBeforeChange={() => {}}
        value={code}
        options={{
          mode: "text/x-java",
          theme: "ttcn",
          lineNumbers: true,
        }}
      />
    </div>
  );
};
export default CodeDisplay;
