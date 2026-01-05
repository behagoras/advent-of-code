import type { Coordinate, JunctionPair } from "./types"

export function getEuclidesDistance(coordinate1: Coordinate, coordinate2: Coordinate) {
  const [x1, y1, z1] = coordinate1
  const [x2, y2, z2] = coordinate2
  const d = Math.hypot(x2 - x1, y2 - y1, z2 - z1)
  return d
}

export const convertToCoordinates = (coordinate: string) =>
  coordinate.split(',').map(Number) as Coordinate

export function findFirstCompleteJunctionIndex(
  coordinateStrings: string[],
  junctions: JunctionPair[]
) {
  const nodesInJunctions = new Set<string>()

  for (const { box1, box2 } of junctions) {
    nodesInJunctions.add(box1)
    nodesInJunctions.add(box2)

    if (nodesInJunctions.size === coordinateStrings.length) {
      const [x1] = convertToCoordinates(box1)
      const [x2] = convertToCoordinates(box2)
      console.log(`🚀 ~ Junction: ${box1} <-> ${box2}`)
      console.log(`🚀 ~ Result: ${x1 * x2}`)
      return x1 * x2
    }
  }

}

export function getSortedJunctionPairs(coordinateStrings: string[]): JunctionPair[] {
  const junctions: JunctionPair[] = []

  for (let i = 0; i < coordinateStrings.length; i++) {
    for (let j = i + 1; j < coordinateStrings.length; j++) {
      const box1 = coordinateStrings[i], box2 = coordinateStrings[j]
      const distance = getEuclidesDistance(
        convertToCoordinates(box1), convertToCoordinates(box2)
      )

      junctions.push({ box1, box2, distance })
    }
  }

  junctions.sort((a, b) => a.distance - b.distance)

  return junctions
}
