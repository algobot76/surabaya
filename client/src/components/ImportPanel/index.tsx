import React, { useState } from "react";
import styled from "styled-components";

// note these dimensions are based on the Legend component
// TODO: fix the dimensions of this and the Legend so they are more independent
const Panel = styled.div`
  width: calc(25vh + 30px);
  height: 45vh;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 55vh;
  border-top: 2px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: lightgrey;
  height: 35px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  border-radius: 7px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const ImportPanel = () => {
  const [file, setFile] = useState(null);

  function importFolder() {
    // using button instead of input because the input button is ugly :P
    const fakeInput = document.createElement("input");
    fakeInput.accept = "application/zip";
    fakeInput.type = "file";

    fakeInput.onchange = (e: any) => {
      const zip = e.target.files[0];
      setFile(zip);
    };
    fakeInput.click();
  }

  function startProgram() {
    // post to backend to start program, can grab the zip file from 'file' in state
    console.log(file);
  }

  return (
    <Panel>
      <Button onClick={() => importFolder()}>Import source directory</Button>
      <Button onClick={() => startProgram()}>Start</Button>
    </Panel>
  );
};
export default ImportPanel;
