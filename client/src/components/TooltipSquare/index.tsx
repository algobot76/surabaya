import React, { ReactNodeArray } from "react";
import styled from "styled-components";
import sizeMe from "react-sizeme";
import ClassClusterSquare from "../ClassClusters";
import { getNumColumnsForSquare } from "../../util/helpers";
import { iconWidth, marginSize } from "../../util/constants";

const ToolTipSquare = styled.div<{ width }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface TooltipSquareProps {
  children: ReactNodeArray[];
}

const TooltipSquare: React.FC<TooltipSquareProps> = (
  props: TooltipSquareProps
) => {
  const classArray = props.children;

  const clusterNum = classArray.length;
  let totalClusterWidth = 0;
  classArray.forEach((c) => {
    const numberOfIcons = c.length;
    const numberHorizontal = getNumColumnsForSquare(numberOfIcons);
    const clusterWidth = numberHorizontal * iconWidth + marginSize * 2;
    totalClusterWidth = totalClusterWidth + clusterWidth;
  });
  const avgClusterWidth = totalClusterWidth / clusterNum;
  const numberOfClusters = classArray.length;
  const columns = getNumColumnsForSquare(numberOfClusters);
  const width = avgClusterWidth * columns * 1.2;

  return (
    <ToolTipSquare width={width}>
      {classArray &&
        classArray.map((classCluster, index) => {
          return (
            <ClassClusterSquare key={index}>{classCluster}</ClassClusterSquare>
          );
        })}
    </ToolTipSquare>
  );
};

export default sizeMe()(TooltipSquare);
