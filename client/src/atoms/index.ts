import { memoize, atom } from "recoil";

export const islandByID = memoize((id) =>
  atom({
    key: `id`,
    default: {
      hovered: false,
    },
  })
);
