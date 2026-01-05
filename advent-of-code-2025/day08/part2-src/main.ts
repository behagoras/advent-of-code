import { findFirstCompleteJunctionIndex, getSortedJunctionPairs } from "./utils";

export function part2(junctionBoxes: string[]) {
  const sortedJunctionPairs = getSortedJunctionPairs(junctionBoxes)

  return findFirstCompleteJunctionIndex(junctionBoxes, sortedJunctionPairs)

}
