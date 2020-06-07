import React from "react";
import styled from "styled-components";
import { iconWidth } from "../../util/constants";

const FlagRectangle = styled.div<{ type: string }>`
  height: 50%;
  width: 100%;
  border: 1px solid black;
  background-image: ${(props) => {
    switch (props.type) {
      case "Class":
        return "linear-gradient(to right, #2b98bd, #34bdeb)"; // blue
      case "Abstract_Class":
        return "linear-gradient(to right, #b8a830, #f7e240)"; // yellow
      case "Interface":
        return "linear-gradient(to right, #833ead, #c76eff)"; // purple
      default:
        return "grey";
    }
  }};
`;

const Flag = styled.div`
  height: ${iconWidth * 0.8}px;
  width: ${iconWidth * 0.8}px;
  border-left: 2px solid black;
`;

interface FlagProps {
  flagType: string;
}

const ColoredFlag: React.FC<FlagProps> = (props: FlagProps) => {
  return (
    <Flag>
      <FlagRectangle type={props.flagType} />
    </Flag>
  );
};

export default ColoredFlag;
