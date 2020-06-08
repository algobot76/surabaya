import React, { useState } from "react";
import IconToolTip, { IconType } from "../IconTooltip";
import styled from "styled-components";
import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
import Island3 from "../../assets/islands/island3.png";
import Island4 from "../../assets/islands/island4.png";
import Island5 from "../../assets/islands/island5.png";
import TooltipSquare from "../TooltipSquare";
import { iconWidth } from "../../util/constants";

const islandArray = [Island1, Island2, Island3, Island4, Island5];

function getToolTipDataArray(classObject: any) {
  const methods = classObject["methods"];
  const constructors = classObject["constructors"];
  const fields = classObject["fields"];
  const strings = fields?.["string"];
  const stringMultiples = fields?.["stringMultiples"];
  const booleans = fields?.["boolean"];
  const booleanMultiples = fields?.["booleanMultiples"];
  const ints = fields?.["int"];
  const intMultiples = fields?.["intMultiples"];
  const other = fields?.["other"];
  const otherMultiples = fields?.["otherMultiples"];

  const methodToolTips =
    methods?.map((m, index) => (
      <IconToolTip key={`method_${index}`} type={IconType.Method} data={m} />
    )) || [];
  const constructorToolTips =
    constructors?.map((c, index) => (
      <IconToolTip
        key={`constructor_${index}`}
        type={IconType.Constructor}
        data={c}
      />
    )) || [];
  const stringToolTips =
    strings?.map((s, index) => (
      <IconToolTip key={`string_${index}`} type={IconType.String} data={s} />
    )) || [];
  const stringMultiplesToolTips =
    stringMultiples?.map((sm, index) => (
      <IconToolTip
        key={`stringMultiple_${index}`}
        type={IconType.StringMultiple}
        data={sm}
      />
    )) || [];
  const booleanToolTips =
    booleans?.map((b, index) => (
      <IconToolTip key={`boolean_${index}`} type={IconType.Boolean} data={b} />
    )) || [];
  const booleanMultiplesToolTips =
    booleanMultiples?.map((bm, index) => (
      <IconToolTip
        key={`booleanMultiple_${index}`}
        type={IconType.BooleanMultiple}
        data={bm}
      />
    )) || [];
  const intToolTips =
    ints?.map((i, index) => (
      <IconToolTip key={`int_${index}`} type={IconType.Int} data={i} />
    )) || [];
  const intMultiplesToolTips =
    intMultiples?.map((im, index) => (
      <IconToolTip
        key={`intMultiple_${index}`}
        type={IconType.IntMultiple}
        data={im}
      />
    )) || [];
  const otherToolTips =
    other?.map((o, index) => (
      <IconToolTip key={`other_${index}`} type={IconType.Other} data={o} />
    )) || [];
  const otherMultiplesToolTips =
    otherMultiples?.map((om, index) => (
      <IconToolTip
        key={`otherMultiple_${index}`}
        type={IconType.OtherMultiple}
        data={om}
      />
    )) || [];
  const flagToolTip = (
    <IconToolTip
      key={"flag"}
      type={IconType.Flag}
      data={{
        name: classObject.name,
        type: classObject.type,
        accessModifier: classObject["access_modifier"],
        lineCount: classObject["line_count"],
      }}
    />
  );

  return [
    ...methodToolTips,
    ...constructorToolTips,
    ...stringToolTips,
    ...stringMultiplesToolTips,
    ...booleanToolTips,
    ...booleanMultiplesToolTips,
    ...intToolTips,
    ...intMultiplesToolTips,
    ...otherToolTips,
    ...otherMultiplesToolTips,
    flagToolTip,
  ];
}

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
  const toolTipClassArrays = fileAnalysis.classes.map((c) =>
    getToolTipDataArray(c)
  );
  const [width, setWidth] = useState(0);
  const minIslandWidth = width + iconWidth;

  const islandImage = getRandomIslandImage();

  let numberOfLines = getTotalNumberOfLinesInFile(fileAnalysis);

  const fileSizeAdjustedWidth = getIslandWidth(numberOfLines, minIslandWidth);

  const onSize = (size) => {
    console.log("TooltipSquare has a width of", size.width);
    setWidth(size.width);
  };

  return (
    <IslandContainer minWidth={fileSizeAdjustedWidth}>
      <IslandImage src={islandImage} maxWidth={fileSizeAdjustedWidth} />
      <TooltipSquare onSize={onSize}>{toolTipClassArrays}</TooltipSquare>
    </IslandContainer>
  );
};

export default Island;
