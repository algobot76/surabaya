import React, { ReactNodeArray } from "react";
import styled from "styled-components";
import { iconWidth } from "../IconTooltip";

export const marginSize = 7;

const ClassCluster = styled.div<{ width }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  display: flex;
  flex-wrap: wrap;
  margin: ${marginSize}px;
`;

interface ClassClusterSquareProps {
  children: ReactNodeArray;
}

const ClassClusterSquare: React.FC<ClassClusterSquareProps> = (
  props: ClassClusterSquareProps
) => {
  const toolTipArray = props.children;
  const numberOfIcons = toolTipArray.length;
  let i = 1;
  while (i * i < numberOfIcons) {
    i++;
  }
  const width = i * iconWidth;

  return <ClassCluster width={width}>{toolTipArray}</ClassCluster>;
};

export default ClassClusterSquare;
