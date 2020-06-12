import React from "react";
import styled from "styled-components";
import ClassClusterSquare from "../ClassClusters";

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
  width: number;
}

const TooltipSquare: React.FC<TooltipSquareProps> = (
  props: TooltipSquareProps
) => {
  const { fileData, width } = props;

  return (
    <ToolTipSquare width={width}>
      {fileData.classes &&
        fileData.classes.map((classData, index) => {
          return <ClassClusterSquare key={index} classData={classData} />;
        })}
    </ToolTipSquare>
  );
};

export default TooltipSquare;
