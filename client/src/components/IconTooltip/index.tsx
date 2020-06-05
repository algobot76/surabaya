import React from "react";
import RightBoat from "../../assets/icons/boat right.png";
import Volcano from "../../assets/icons/volcano.png";
import Factory from "../../assets/icons/factory.png";
import Deciduous from "../../assets/icons/deciduous.png";
import DeciduousMultiple from "../../assets/icons/deciduousMultiples.png";
import Evergreen from "../../assets/icons/evergreen.png";
import EvergreenMultiple from "../../assets/icons/evergreenMultiples.png";
import Pond from "../../assets/icons/pond.png";
import PondMultiple from "../../assets/icons/pondMultiples.png";
import Rock from "../../assets/icons/rock.png";
import RockMultiple from "../../assets/icons/rockMultiples.png";
import styles from "./styles.module.css";
import styled from "styled-components";

interface IconToolTipProps {
  type:
    | "string"
    | "stringMultiple"
    | "boolean"
    | "booleanMultiple"
    | "int"
    | "intMultiple"
    | "other"
    | "otherMultiple"
    | "import"
    | "method"
    | "constructor";
  data: any;
}

function getIcon(type: string): any {
  switch (type) {
    case "import":
      return RightBoat;
    case "constructor":
      return Volcano;
    case "method":
      return Factory;
    case "boolean":
      return Deciduous;
    case "booleanMultiple":
      return DeciduousMultiple;
    case "int":
      return Pond;
    case "intMultiple":
      return PondMultiple;
    case "string":
      return Evergreen;
    case "stringMultiple":
      return EvergreenMultiple;
    case "other":
      return Rock;
    case "otherMultiple":
      return RockMultiple;
    default:
      return null;
  }
}

const MarginDiv = styled.div`
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 12px;
`;

function getToolTipText(props: IconToolTipProps) {
  const { data } = props;
  switch (props.type) {
    case "import":
      return <MarginDiv>Imports: 'ADD IMPORT DATA HERE'</MarginDiv>;
    case "constructor":
    case "method":
      const parameterString =
        data.parameters &&
        Object.keys(data.parameters)
          ?.map((p) => `${p}: ${data.parameters[p]}`)
          ?.join(", ");
      return (
        <div>
          <MarginDiv>Name: {data.name}</MarginDiv>
          <MarginDiv>Access modifier: {data.accessModifier}</MarginDiv>
          <MarginDiv>Parameters: {parameterString || "none"}</MarginDiv>
          <MarginDiv>Return type: {data.returnType}</MarginDiv>
        </div>
      );
    case "boolean":
    case "booleanMultiple":
    case "int":
    case "intMultiple":
    case "string":
    case "stringMultiple":
    case "other":
    case "otherMultiple":
      return (
        <div>
          <MarginDiv>Name: {data.name}</MarginDiv>
          <MarginDiv>Type: {data.type}</MarginDiv>
          <MarginDiv>Access modifier: {data.accessModifier}</MarginDiv>
        </div>
      );
    default:
      return null;
  }
}

// IMPORTANT!! iconWidth is a constant because it is also used in ToolTipSquare for calculating the ArrayContainer width
export const iconWidth = 30;

const SizedIconContainer = styled.div`
  width: ${iconWidth}px;
  height: ${iconWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SizedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const IconToolTip: React.FC<IconToolTipProps> = (props: IconToolTipProps) => {
  const icon = getIcon(props.type);
  const toolTipText = getToolTipText(props);
  return (
    <div className={styles.tooltip}>
      <SizedIconContainer>
        <SizedImage src={icon} />
      </SizedIconContainer>
      <span className={styles.tooltiptext}>{toolTipText}</span>
    </div>
  );
};

export default IconToolTip;
