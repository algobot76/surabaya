import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledPackageNameBanner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 40px;
  width: calc(100% - 300px);
  line-height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  text-align: center;
  align-items: center;
  font-weight: bold;
`;

const PackageText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

interface PackageNameBannerProps {
  currentPackage?: string;
  packageColors?: any;
}

const PackageNameBanner: React.FC<PackageNameBannerProps> = (
  props: PackageNameBannerProps
) => {
  const { currentPackage, packageColors } = props;
  const textColor = packageColors?.[currentPackage];

  return (
    <>
      {currentPackage ? (
        <StyledPackageNameBanner>
          Current package:{" "}
          <PackageText color={textColor}>{currentPackage}</PackageText>
        </StyledPackageNameBanner>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentPackage: state.currentPackage,
    packageColors: state.packageColors,
  };
};

export default connect(mapStateToProps)(PackageNameBanner);
