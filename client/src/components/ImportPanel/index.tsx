import React, { useState } from "react";
import axios from "axios";
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

const InputButton = styled.input`
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

const StyledForm = styled.form`
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const ImportPanel = () => {
  const [file, setFile] = useState<File | null>();

  function handleFormSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:8080/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).catch((err) => console.log(err));
  }

  return (
    <Panel>
      <StyledForm onSubmit={(e) => handleFormSubmit(e)}>
        <StyledLabel htmlFor="fileInput">Upload Zip File</StyledLabel>
        <input
          id="fileInput"
          type="file"
          name="file"
          accept="application/zip"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputButton type="submit" value="Start" />
      </StyledForm>
    </Panel>
  );
};
export default ImportPanel;
