import React from "react";
import styled from "styled-components";
import { getNumColumnsForSquare } from "../../util/helpers";
import { iconWidth, marginSize } from "../../util/constants";
import WoodenFence from "../../assets/Fences/woodenFence.png";
import StoneFence from "../../assets/Fences/stoneFence.png";
import IconToolTip, { IconType } from "../IconTooltip";

enum AccessModifiers {
  Public = "public",
  Private = "private",
  Protected = "protected",
}

const ClassCluster = styled.div<{ width; accessModifier: AccessModifiers }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => {
    switch (props.accessModifier) {
      case AccessModifiers.Private:
      case AccessModifiers.Protected:
        return "0px";
      default:
        return `${marginSize}px`;
    }
  }};
  border: ${(props) =>
    props.accessModifier === AccessModifiers.Public
      ? "none"
      : `${marginSize}px solid transparent`};
  border-image-source: ${(props) => {
    switch (props.accessModifier) {
      case AccessModifiers.Private:
        return `url(${StoneFence})`;
      case AccessModifiers.Protected:
        return `url(${WoodenFence})`;
      default:
        return "";
    }
  }};
  border-image-slice: 100;
  border-image-repeat: stretch;
`;

interface ClassClusterSquareProps {
  classData: any;
}

function getToolTipsForClass(classData: any) {
  const methods = classData["methods"];
  const constructors = classData["constructors"];
  const fields = classData["fields"];
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
        name: classData.name,
        type: classData.type,
        accessModifier: classData["access_modifier"],
        lineCount: classData["line_count"],
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

const ClassClusterSquare: React.FC<ClassClusterSquareProps> = (
  props: ClassClusterSquareProps
) => {
  const { classData } = props;
  const toolTipArray = getToolTipsForClass(classData);
  const numberOfIcons = toolTipArray.length;
  const columns = getNumColumnsForSquare(numberOfIcons);
  const width = columns * iconWidth;
  console.log("classCluster width: ", width);

  return (
    <ClassCluster width={width} accessModifier={classData["access_modifier"]}>
      {toolTipArray}
    </ClassCluster>
  );
};

export default ClassClusterSquare;
