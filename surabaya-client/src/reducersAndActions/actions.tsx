import { ASSIGN_PACKAGE_COLOR, CHANGE_CURRENT_PACKAGE } from "./constants";

export const setCurrentPackageAction = (currentPackage: string) => {
  return {
    type: CHANGE_CURRENT_PACKAGE,
    currentPackage: currentPackage,
  };
};

export const setPackageColorAction = (packageColorObj: any) => {
  return {
    type: ASSIGN_PACKAGE_COLOR,
    packageColors: packageColorObj,
  };
};
