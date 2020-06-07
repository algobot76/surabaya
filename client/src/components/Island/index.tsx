import React from "react";
import IconToolTip, { IconType, iconWidth, MarginDiv } from "../IconTooltip";
import styled from "styled-components";

import Island1 from "../../assets/islands/island1.png";
import Island2 from "../../assets/islands/island2.png";
import Island3 from "../../assets/islands/island3.png";
import Island4 from "../../assets/islands/island4.png";
import Island5 from "../../assets/islands/island5.png";
import styles from "./styles.module.css";

const islandArray = [Island1, Island2, Island3, Island4, Island5];

const mockClass = {
  name: "c1",
  type: "Interface",
  accessModifier: "private",
  lineCount: 100,
  imports: ["ex2", "ex3"],
  fields: {
    string: [
      {
        name: "field1",
        type: "String",
        accessModifier: "public",
      },
    ],
    boolean: [
      {
        name: "field1",
        type: "Boolean",
        accessModifier: "public",
      },
    ],
    other: [
      {
        name: "field3",
        type: "Object",
        accessModifier: "private",
      },
    ],
  },
  methods: [
    {
      name: "method1",
      accessModifier: "private",
      parameters: { param1: "String", param2: "int" },
      returnType: "void",
    },
    {
      name: "method1",
      accessModifier: "private",
      parameters: { param1: "String", param2: "int" },
      returnType: "void",
    },
    {
      name: "method1",
      accessModifier: "private",
      parameters: { param1: "String", param2: "int" },
      returnType: "void",
    },
    {
      name: "method1",
      accessModifier: "private",
      parameters: { param1: "String", param2: "int" },
      returnType: "void",
    },
  ],
  constructors: [
    {
      name: "ex1",
      accessModifier: "public",
      parameters: { param1: "String", param2: "int" },
      returnType: null,
    },
  ],
};

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
  const booleanToolTipsToolTips =
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
  const intToolTipsToolTips =
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
  const otherToolTipsToolTips =
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

  return [
    ...methodToolTips,
    ...constructorToolTips,
    ...stringToolTips,
    ...stringMultiplesToolTips,
    ...booleanToolTipsToolTips,
    ...booleanMultiplesToolTips,
    ...intToolTipsToolTips,
    ...intMultiplesToolTips,
    ...otherToolTipsToolTips,
    ...otherMultiplesToolTips,
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
`;

const IslandToolTipContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const ToolTipSquare = styled.div<{ width }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  z-index: 9;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

function getIslandToolTipText(classObject: any) {
  return (
    <>
      <MarginDiv>Name: {classObject.name}</MarginDiv>
      <MarginDiv>Type: {classObject.type}</MarginDiv>
      <MarginDiv>Access modifier: {classObject.accessModifier}</MarginDiv>
      <MarginDiv>Lines: {classObject.lineCount}</MarginDiv>
    </>
  );
}

const Island: React.FC = () => {
  const toolTipArray = getToolTipDataArray(mockClass);
  const numberOfIcons = toolTipArray.length;
  const square = Math.sqrt(numberOfIcons);
  const numberHorizontal = Math.ceil(square);
  const width = numberHorizontal * iconWidth;

  const minimumInnerIslandWidth = width + iconWidth * 2;
  const numberOfIslandImages = islandArray.length;
  const randomIslandIndex = Math.floor(Math.random() * numberOfIslandImages);
  const islandImage = islandArray[randomIslandIndex];

  const islandToolTipText = getIslandToolTipText(mockClass);

  return (
    <IslandContainer minWidth={minimumInnerIslandWidth}>
      <ToolTipSquare width={width}>{toolTipArray}</ToolTipSquare>
      <IslandToolTipContainer className={styles.islandTooltip}>
        <IslandImage src={islandImage} maxWidth={minimumInnerIslandWidth} />
        <span className={styles.islandTooltipText}>{islandToolTipText}</span>
      </IslandToolTipContainer>
    </IslandContainer>
  );
};

export default Island;
