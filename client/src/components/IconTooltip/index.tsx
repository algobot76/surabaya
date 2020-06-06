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
  type: IconType;
  data: any;
}

export enum IconType {
  String,
  StringMultiple,
  Boolean,
  BooleanMultiple,
  Int,
  IntMultiple,
  Other,
  OtherMultiple,
  Import,
  Method,
  Constructor,
}

function getIcon(type: IconType): string {
  switch (type) {
    case IconType.Import:
      return RightBoat;
    case IconType.Constructor:
      return Volcano;
    case IconType.Method:
      return Factory;
    case IconType.Boolean:
      return Deciduous;
    case IconType.BooleanMultiple:
      return DeciduousMultiple;
    case IconType.Int:
      return Pond;
    case IconType.IntMultiple:
      return PondMultiple;
    case IconType.String:
      return Evergreen;
    case IconType.StringMultiple:
      return EvergreenMultiple;
    case IconType.Other:
      return Rock;
    case IconType.OtherMultiple:
      return RockMultiple;
    default:
      return "";
  }
}

export const MarginDiv = styled.div`
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 12px;
`;

function getToolTipText(props: IconToolTipProps) {
  const { data } = props;
  switch (props.type) {
    case IconType.Import: // data for imports takes in the *entire class object*
      return <MarginDiv>Imports: {data.imports.join(", ")}</MarginDiv>;
    case IconType.Constructor:
    case IconType.Method:
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
          {props.type === IconType.Method && (
            <MarginDiv>Return type: {data.returnType}</MarginDiv>
          )}
        </div>
      );
    case IconType.Boolean:
    case IconType.BooleanMultiple:
    case IconType.Int:
    case IconType.IntMultiple:
    case IconType.String:
    case IconType.StringMultiple:
    case IconType.Other:
    case IconType.OtherMultiple:
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
