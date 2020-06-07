import React, { ReactNodeArray } from "react";
import styled from "styled-components";

const ToolTipSquare = styled.div<{ width }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  z-index: 9;
  display: flex;
  flex-wrap: wrap;
`;

interface TooltipSquareProps {
  width: number;
  children: ReactNodeArray;
}

const TooltipSquare: React.FC<TooltipSquareProps> = (
  props: TooltipSquareProps
) => {
  const width = props.width;
  const toolTipArray = props.children;

  return <ToolTipSquare width={width}>{toolTipArray}</ToolTipSquare>;
};

export default TooltipSquare;
