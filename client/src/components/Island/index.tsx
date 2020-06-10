import React, { useState } from "react";
import styled from "styled-components";
import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
import Island3 from "../../assets/islands/island3.png";
import Island4 from "../../assets/islands/island4.png";
import Island5 from "../../assets/islands/island5.png";
import TooltipSquare from "../TooltipSquare";
import { iconWidth } from "../../util/constants";

const islandArray = [Island1, Island2, Island3, Island4, Island5];

const IslandContainer = styled.div<{ minWidth }>`
  width: ${(props) => `${props.minWidth}px`};
  height: ${(props) => `${props.minWidth}px`};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IslandImage = styled.img<{ maxWidth }>`
  max-width: ${(props) => `${props.maxWidth}px`};
  max-height: ${(props) => `${props.maxWidth}px`};
  position: absolute;
  top: 0;
  left: 0;
`;

function getRandomIslandImage() {
  const numberOfIslandImages = islandArray.length;
  const randomIslandIndex = Math.floor(Math.random() * numberOfIslandImages);
  return islandArray[randomIslandIndex];
}

function getTotalNumberOfLinesInFile(fileAnalysis: any): number {
  let numberOfLines = 0;
  fileAnalysis.classes.forEach((c) => {
    numberOfLines = numberOfLines + c["line_count"];
  });
  return numberOfLines;
}

function getIslandWidth(numberOfLines: number, minIslandWidth: number): number {
  // TODO max island width based on lines arbitrarily set to 400px
  const widthByLines = numberOfLines > 400 ? 400 : numberOfLines;

  // TODO 1px = 1 line is arbitrary, adjust as desired.
  return minIslandWidth > numberOfLines ? minIslandWidth : widthByLines;
}

// TODO replace any with data type object
const Island: React.FC = (props: any) => {
  const { fileAnalysis } = props;
  const [width, setWidth] = useState(0);
  const minIslandWidth = width + iconWidth;

  const islandImage = getRandomIslandImage();

  let numberOfLines = getTotalNumberOfLinesInFile(fileAnalysis);

  const fileSizeAdjustedWidth = getIslandWidth(numberOfLines, minIslandWidth);

  const onSize = (size) => {
    setWidth(size.width);
  };

  return (
    <IslandContainer minWidth={fileSizeAdjustedWidth}>
      <IslandImage src={islandImage} maxWidth={fileSizeAdjustedWidth} />
      <TooltipSquare onSize={onSize} fileData={fileAnalysis} />
    </IslandContainer>
  );
};

export default Island;
