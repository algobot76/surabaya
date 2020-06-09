import React, { ReactNodeArray } from "react";
import styled from "styled-components";
import { getNumColumnsForSquare } from "../../util/helpers";
import { iconWidth, marginSize } from "../../util/constants";
import WoodenFence from "../../assets/Fences/woodenFence.png";
import StoneFence from "../../assets/Fences/stoneFence.png";

const ClassCluster = styled.div<{ width; accessModifier: AccessModifiers }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => {
    switch (props.accessModifier) {
      case AccessModifiers.Private:
      case AccessModifiers.Protected:
        return "0px";
      default:
        return `${marginSize}px`;
    }
  }};
  border: ${(props) =>
    props.accessModifier === AccessModifiers.Public
      ? "none"
      : `${marginSize}px solid transparent`};
  border-image-source: ${(props) => {
    switch (props.accessModifier) {
      case AccessModifiers.Private:
        return `url(${StoneFence})`;
      case AccessModifiers.Protected:
        return `url(${WoodenFence})`;
      default:
        return "";
    }
  }};
  border-image-slice: 100;
  border-image-repeat: stretch;
`;

interface ClassClusterSquareProps {
  children: ReactNodeArray;
}

enum AccessModifiers {
  Public = "public",
  Private = "private",
  Protected = "Protected",
}

const ClassClusterSquare: React.FC<ClassClusterSquareProps> = (
  props: ClassClusterSquareProps
) => {
  const toolTipArray = props.children;
  const numberOfIcons = toolTipArray.length;
  const columns = getNumColumnsForSquare(numberOfIcons);
  const width = columns * iconWidth;

  return (
    <ClassCluster width={width} accessModifier={AccessModifiers.Private}>
      {toolTipArray}
    </ClassCluster>
  );
};

export default ClassClusterSquare;
