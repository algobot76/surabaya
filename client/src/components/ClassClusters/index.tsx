import React from "react";
import styled from "styled-components";
import {
  checkStringTypeIsCollection,
  getNumColumnsForSquare,
} from "../../util/helpers";
import { iconWidth, marginSize } from "../../util/constants";
import WoodenFence from "../../assets/fences/woodenFence.png";
import StoneFence from "../../assets/fences/stoneFence.png";
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

function getFieldIconType(fieldObj): IconType {
  const typeIsCollection = checkStringTypeIsCollection(fieldObj.type);
  if (typeIsCollection) {
    if (/<String>/.test(fieldObj)) {
      return IconType.String;
    } else if (/<boolean>/.test(fieldObj)) {
      // lowercase boolean for primitive
      return IconType.Boolean;
    } else if (
      /<char>|<byte>|<short>|<long>|<float>|<int>|<double>/.test(fieldObj)
    ) {
      return IconType.Numeric;
    } else {
      return IconType.OtherMultiple;
    }
  } else {
    switch (fieldObj.type) {
      case "String":
        return IconType.String;
      case "boolean":
        return IconType.Boolean;
      case "char":
      case "byte":
      case "short":
      case "long":
      case "float":
      case "int":
      case "double":
        return IconType.Numeric;
      default:
        return IconType.Other;
    }
  }
}

function getToolTipsForClass(classData: any) {
  const methods = classData["methods"];
  const constructors = classData["constructors"];
  const fields = classData["fields"];

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
  const fieldToolTips =
    fields?.map((f, index) => {
      const fieldIconType: IconType = getFieldIconType(f);
      return (
        <IconToolTip key={`field_${index}`} type={fieldIconType} data={f} />
      );
    }) || [];
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
    ...fieldToolTips,
    flagToolTip,
  ];
}

const ClassClusterSquare: React.FC<ClassClusterSquareProps> = (
  props: ClassClusterSquareProps
) => {
  const { classData } = props;
  const toolTipArray = getToolTipsForClass(classData);
  const numberOfIcons = toolTipArray.length + 1;
  const columns = getNumColumnsForSquare(numberOfIcons);
  const width = columns * iconWidth;

  return (
    <ClassCluster width={width} accessModifier={classData["access_modifier"]}>
      {toolTipArray}
    </ClassCluster>
  );
};

export default ClassClusterSquare;
