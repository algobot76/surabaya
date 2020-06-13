import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledIslandGlow = styled.div<{
  halfWidth: number;
  color: string;
}>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 50px ${(props) => props.halfWidth}px ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.halfWidth}px;
  left: ${(props) => props.halfWidth}px;
`;

interface IslandGlowProps {
  width: number;
  thisIslandPackage: string;
  currentPackage?: string;
  packageColors?: any;
}

const IslandGlow: React.FC<IslandGlowProps> = (props: IslandGlowProps) => {
  const { width, thisIslandPackage, currentPackage, packageColors } = props;
  const halfWidth = width / 2;
  const isHighlightedIsland = thisIslandPackage === currentPackage;
  const glowColor = packageColors?.[thisIslandPackage];

  return (
    <>
      {isHighlightedIsland && (
        <StyledIslandGlow halfWidth={halfWidth} color={glowColor} />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentPackage: state.currentPackage,
    packageColors: state.packageColors,
  };
};

export default connect(mapStateToProps)(IslandGlow);
