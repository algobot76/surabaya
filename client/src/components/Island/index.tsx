import React, { useMemo } from "react";
import styled from "styled-components";
import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
import Island3 from "../../assets/islands/island3.png";
import Island4 from "../../assets/islands/island4.png";
import Island5 from "../../assets/islands/island5.png";
import TooltipSquare from "../TooltipSquare";
import { getIslandWidth, getTooltipWidth } from "../../util/helpers";
import { legendWidth } from "../../util/constants";

const islandArray = [Island1, Island2, Island3, Island4, Island5];

const IslandContainer = styled.div<{ minWidth; x; y }>`
  width: ${(props) => `${props.minWidth}px`};
  height: ${(props) => `${props.minWidth}px`};
  left: ${(props) => `${props.x + legendWidth}px`};
  top: ${(props) => `${props.y}px`};
  position: absolute;
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

// TODO replace any with data type object
const Island: React.FC = (props: any) => {
  const { fileAnalysis } = props;
  const tooltipWidth = useMemo(() => getTooltipWidth(fileAnalysis), []);

  const islandImage = useMemo(() => getRandomIslandImage(), []);

  const fileSizeAdjustedWidth = useMemo(() => getIslandWidth(fileAnalysis), []);

  return (
    <IslandContainer
      minWidth={fileSizeAdjustedWidth}
      x={fileAnalysis.topLeftCorner.x}
      y={fileAnalysis.topLeftCorner.y}
    >
      <IslandImage src={islandImage} maxWidth={fileSizeAdjustedWidth} />
      <TooltipSquare width={tooltipWidth} fileData={fileAnalysis} />
    </IslandContainer>
  );
};

export default Island;
