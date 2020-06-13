import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
import Island3 from "../../assets/islands/island3.png";
import Island4 from "../../assets/islands/island4.png";
import Island5 from "../../assets/islands/island5.png";
import TooltipSquare from "../TooltipSquare";
import { fileNameSpace, iconWidth } from "../../util/constants";
import FileName from "../FileName";
import { JavaIsland } from "../../lib/JavaArchipelago";
import { JavaAccessModifier } from "../../JavaProjectTypes";
import { connect } from "react-redux";
import { setCurrentPackageAction } from "../../reducersAndActions/actions";
import IslandGlow from "../IslandGlow";

const islandArray = [Island1, Island2, Island3, Island4, Island5];

const IslandContainer = styled.div<{ minWidth }>`
  width: ${(props) => `${props.minWidth}px`};
  height: ${(props) => `${props.minWidth}px`};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IslandImage = styled.img<{ maxWidth; isHighlighted }>`
  max-width: ${(props) => `${props.maxWidth}px`};
  max-height: ${(props) => `${props.maxWidth}px`};
  position: absolute;
  top: 0;
  left: 0;
`;

const IslandWithFileName = styled.div<{ width; x; y }>`
  position: absolute;
  width: ${(props) => props.width}px;
  height: auto;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
  margin-bottom: ${fileNameSpace}px;
  cursor: pointer;
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

function onMouseHover(props: any, thisIslandPackage: string) {
  props.setCurrentPackageAction(thisIslandPackage);
}

function onMouseLeave(props: any) {
  props.setCurrentPackageAction(null);
}

type Props = {
  fileAnalysis: JavaIsland;
  thisIslandPackage: string;
};

const Island: React.FC<Props> = (props: Props) => {
  const { fileAnalysis, thisIslandPackage } = props;
  const [width, setWidth] = useState(0);
  const minIslandWidth = width + iconWidth;

  const islandImage = useMemo(getRandomIslandImage, []);

  let numberOfLines = getTotalNumberOfLinesInFile(fileAnalysis);

  const fileSizeAdjustedWidth = getIslandWidth(numberOfLines, minIslandWidth);

  const onSize = (size) => {
    setWidth(size.width);
  };

  const fileName = fileAnalysis.classes.filter(
    (c) => c.access_modifier === JavaAccessModifier.Public
  )[0].name;

  return (
    <IslandWithFileName
      width={fileSizeAdjustedWidth}
      x={fileAnalysis.topLeftCorner.x}
      y={fileAnalysis.topLeftCorner.y}
      onMouseEnter={() => onMouseHover(props, thisIslandPackage)}
      onMouseLeave={() => onMouseLeave(props)}
    >
      <IslandGlow
        thisIslandPackage={thisIslandPackage}
        width={fileSizeAdjustedWidth}
      />
      <IslandContainer minWidth={fileSizeAdjustedWidth}>
        <IslandImage src={islandImage} maxWidth={fileSizeAdjustedWidth} />
        <TooltipSquare onSize={onSize} fileData={fileAnalysis} />
      </IslandContainer>
      <FileName
        fileName={fileName || "File_name_n/a"}
        islandWidth={fileSizeAdjustedWidth}
      />
    </IslandWithFileName>
  );
};

export default connect(null, { setCurrentPackageAction })(Island);
