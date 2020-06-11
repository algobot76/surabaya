import React, { ReactNodeArray } from "react";
import styled from "styled-components";
import { getNumColumnsForSquare } from "../../util/helpers";
import { iconWidth, marginSize } from "../../util/constants";

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
  const columns = getNumColumnsForSquare(numberOfIcons);
  const width = columns * iconWidth;

  return <ClassCluster width={width}>{toolTipArray}</ClassCluster>;
};

export default ClassClusterSquare;
