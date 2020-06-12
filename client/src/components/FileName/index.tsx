import React from "react";
import styled, { keyframes } from "styled-components";

interface FileNameProps {
  fileName: string;
}

const waveAnimation = keyframes`
    20% {
        transform: translateY(-1px);
    }
    60% {
        transform: translateY(1px);
    }
`;

/* wave animation adapted from https://www.youtube.com/watch?v=m1ZKHPbnyjo*/
const StyledLetter = styled.span<{ delay }>`
  position: relative;
  display: inline-block;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 2px 2px 4px grey;
  animation: ${waveAnimation} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const WaveContainer = styled.div`
  position: relative;
  -webkit-box-reflect: below 0 linear-gradient(transparent, rgba(0, 0, 0, 0.5));
`;

const FileName: React.FC<FileNameProps> = (props: FileNameProps) => {
  const { fileName } = props;
  const letterArray = fileName?.split("");
  const spanArray = letterArray?.map((letter, index) => {
    return (
      <StyledLetter key={index} delay={index * 0.1}>
        {letter}
      </StyledLetter>
    );
  });

  return <>{fileName ? <WaveContainer>{spanArray}</WaveContainer> : null}</>;
};

export default FileName;
