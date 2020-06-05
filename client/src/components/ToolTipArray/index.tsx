import React from "react";
import IconToolTip from "../IconTooltip";
import styled from "styled-components";

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

const ArrayContainer = styled.div``;

const ToolTipArray: React.FC = () => {
  const methods = mockClass["methods"];
  const constructors = mockClass["constructors"];
  const fields = mockClass["fields"];
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
      <IconToolTip key={`method_${index}`} type={"method"} data={m} />
    )) || [];
  const constructorToolTips =
    constructors?.map((c, index) => (
      <IconToolTip key={`constructor_${index}`} type={"constructor"} data={c} />
    )) || [];
  const stringToolTips =
    strings?.map((s, index) => (
      <IconToolTip key={`string_${index}`} type={"string"} data={s} />
    )) || [];
  const stringMultiplesToolTips =
    stringMultiples?.map((sm, index) => (
      <IconToolTip
        key={`stringMultiple_${index}`}
        type={"stringMultiple"}
        data={sm}
      />
    )) || [];
  const booleanToolTipsToolTips =
    booleans?.map((b, index) => (
      <IconToolTip key={`boolean_${index}`} type={"boolean"} data={b} />
    )) || [];
  const booleanMultiplesToolTips =
    booleanMultiples?.map((bm, index) => (
      <IconToolTip
        key={`booleanMultiple_${index}`}
        type={"booleanMultiple"}
        data={bm}
      />
    )) || [];
  const intToolTipsToolTips =
    ints?.map((i, index) => (
      <IconToolTip key={`int_${index}`} type={"int"} data={i} />
    )) || [];
  const intMultiplesToolTips =
    intMultiples?.map((im, index) => (
      <IconToolTip
        key={`intMultiple_${index}`}
        type={"intMultiple"}
        data={im}
      />
    )) || [];
  const otherToolTipsToolTips =
    other?.map((o, index) => (
      <IconToolTip key={`other_${index}`} type={"other"} data={o} />
    )) || [];
  const otherMultiplesToolTips =
    otherMultiples?.map((om, index) => (
      <IconToolTip
        key={`otherMultiple_${index}`}
        type={"otherMultiple"}
        data={om}
      />
    )) || [];

  const toolTipArray = [
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

  const numberOfIcons = toolTipArray?.length; // TODO use this to arrange the icons into a square knowing each icon is 30px

  return <>{toolTipArray}</>;
};

export default ToolTipArray;
