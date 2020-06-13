import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { JavaArchipelago } from "../../lib/JavaArchipelago";
import {API_BASE_URL} from "../../util/constants";

// note these dimensions are based on the Legend component
// TODO: fix the dimensions of this and the Legend so they are more independent
const Panel = styled.div`
  width: 300px;
  height: calc(25vh - 4px); // 4px is approx height of scrollbar on chrome
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 75vh;
  border-top: 2px solid white;
  border-right: 2px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadButton = styled.input`
  background-color: lightgrey;
  height: 35px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  border-radius: 7px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const AnalyzeButton = styled.button`
  background-color: lightgrey;
  height: 35px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  border-radius: 7px;
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
  font-size: 12px;
`;

interface ImportPanelProps {
  setData: Function;
}

const ImportPanel: React.FC<ImportPanelProps> = (props) => {
  const [file, setFile] = useState<File | null>();
  const { setData } = props;

  function handleFormSubmit(e) {
    e.preventDefault();
    const url = `${API_BASE_URL}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then(() => alert("You have successfully uploaded the file!"))
      .catch((err) => alert(err));
  }

  function getAnalysis() {
    const url = `${API_BASE_URL}/analysis`;
    axios
      .get(url)
      .then((res) => {
        const javaArchipelago = new JavaArchipelago(res.data);
        alert("Success.");
        setData(javaArchipelago);
      })
      .catch((err) => alert(err));
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
        <UploadButton type="submit" value="Upload" />
        <AnalyzeButton type="button" onClick={getAnalysis}>
          Analyze
        </AnalyzeButton>
      </StyledForm>
    </Panel>
  );
};
export default ImportPanel;
