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
import ColoredFlag from "../ColoredFlag";
import { iconWidth } from "../../util/constants";

interface IconToolTipProps {
  type: IconType;
  data: any;
}

export enum IconType {
  String,
  StringMultiple,
  Boolean,
  BooleanMultiple,
  Numeric,
  NumericMultiple,
  Other,
  OtherMultiple,
  Import,
  Method,
  Constructor,
  Flag,
}

function getIconImage(type: IconType): string {
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
    case IconType.Numeric:
      return Pond;
    case IconType.NumericMultiple:
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
    case IconType.Flag:
      return (
        <div>
          <MarginDiv>Name: {data.name}</MarginDiv>
          <MarginDiv>Type: {data.type}</MarginDiv>
          <MarginDiv>Access modifier: {data.access_modifier}</MarginDiv>
          <MarginDiv>Lines: {data.lineCount}</MarginDiv>
        </div>
      );
    case IconType.Constructor:
    case IconType.Method:
      const parameterString =
        data.parameters &&
        data.parameters.length > 0 &&
        data.parameters
          .map((p) => {
            return `${p.type} ${p.name}`;
          })
          .join(", ");
      return (
        <div>
          <MarginDiv>Name: {data.name}</MarginDiv>
          <MarginDiv>Access modifier: {data.access_modifier}</MarginDiv>
          <MarginDiv>Parameters: {parameterString || "none"}</MarginDiv>
          {props.type === IconType.Method && (
            <MarginDiv>Return type: {data.return_type}</MarginDiv>
          )}
        </div>
      );
    case IconType.Boolean:
    case IconType.BooleanMultiple:
    case IconType.Numeric:
    case IconType.NumericMultiple:
    case IconType.String:
    case IconType.StringMultiple:
    case IconType.Other:
    case IconType.OtherMultiple:
      return (
        <div>
          <MarginDiv>Name: {data.name}</MarginDiv>
          <MarginDiv>Type: {data.type}</MarginDiv>
          <MarginDiv>Access modifier: {data.access_modifier}</MarginDiv>
        </div>
      );
    default:
      return null;
  }
}

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
  const isFlag = props.type === IconType.Flag;
  const iconImage = !isFlag && getIconImage(props.type);
  const toolTipText = getToolTipText(props);
  return (
    <div className={styles.tooltip}>
      <SizedIconContainer>
        {isFlag ? (
          <ColoredFlag flagType={props.data.type} />
        ) : (
          <SizedImage src={iconImage} />
        )}
      </SizedIconContainer>
      <span className={styles.tooltiptext}>{toolTipText}</span>
    </div>
  );
};

export default IconToolTip;
