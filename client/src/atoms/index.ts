import { atomFamily } from "recoil";

export const islandFamily = atomFamily({
  key: "islandFamily",
  default: {
    hovered: false,
  },
});
