import React, { ReactNodeArray } from "react";
import styled from "styled-components";
import sizeMe from "react-sizeme";
import { iconWidth } from "../IconTooltip";
import ClassClusterSquare, { marginSize } from "../ClassClusters";

const ToolTipSquare = styled.div<{ width }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
    const square = Math.sqrt(numberOfIcons);
    const numberHorizontal = Math.ceil(square);
    const clusterWidth = numberHorizontal * iconWidth + marginSize * 2;
    totalClusterWidth = totalClusterWidth + clusterWidth;
  });
  const avgClusterWidth = totalClusterWidth / clusterNum;
  const numberOfClusters = classArray.length;
  let columns = 1;
  while (columns * columns < numberOfClusters) {
    columns++;
  }
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
