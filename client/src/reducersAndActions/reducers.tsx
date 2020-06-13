import { CHANGE_CURRENT_PACKAGE, ASSIGN_PACKAGE_COLOR } from "./constants";

const allReducers = (state = {}, action: any) => {
  switch (action.type) {
    case CHANGE_CURRENT_PACKAGE:
      return {
        ...state,
        currentPackage: action.currentPackage,
      };
    case ASSIGN_PACKAGE_COLOR:
      return {
        ...state,
        packageColors: action.packageColors,
      };
    default:
      return { ...state };
  }
};

export default allReducers;
