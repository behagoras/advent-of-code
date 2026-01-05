import { connectJunctionBoxes, countCircuitSizes, getSortedJunctionPairs } from "./utils";

export function part1(junctionBoxes: string[]) {
  const sortedJunctionPairs = getSortedJunctionPairs(junctionBoxes)
  const connections = connectJunctionBoxes(sortedJunctionPairs)
  const circuitSizesMap = countCircuitSizes(junctionBoxes, connections)

  // Return the product of the three largest circuit sizes
  return [...circuitSizesMap.values()]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, size) => acc * size, 1)
}
