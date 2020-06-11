import React from "react";
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
  align-content: center;
`;

interface TooltipSquareProps {
  fileData: any;
}

function getNumberOfIcons(classData): number {
  let numberOfIcons = 0;

  classData["methods"]?.forEach(() => numberOfIcons++);
  classData["constructors"]?.forEach(() => numberOfIcons++);
  classData["fields"]?.forEach(() => numberOfIcons++);

  return numberOfIcons + 1;
}

const TooltipSquare: React.FC<TooltipSquareProps> = (
  props: TooltipSquareProps
) => {
  const { fileData } = props;

  const clusterNum = fileData.classes.length;
  let totalClusterWidth = 0;
  fileData.classes.forEach((c) => {
    const numberOfIcons = getNumberOfIcons(c);
    const numberHorizontal = getNumColumnsForSquare(numberOfIcons);
    const clusterWidth = numberHorizontal * iconWidth + marginSize * 2;
    totalClusterWidth = totalClusterWidth + clusterWidth;
  });
  const avgClusterWidth = totalClusterWidth / clusterNum;
  const numberOfClusters = fileData.classes.length;
  const columns = getNumColumnsForSquare(numberOfClusters);
  const width = avgClusterWidth * columns * 1.2;

  return (
    <ToolTipSquare width={width}>
      {fileData.classes &&
        fileData.classes.map((classData, index) => {
          return <ClassClusterSquare key={index} classData={classData} />;
        })}
    </ToolTipSquare>
  );
};

export default sizeMe()(TooltipSquare);
