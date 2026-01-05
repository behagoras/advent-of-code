import { CONNECTION_LIMIT } from "./constants"
import type { CircuitsMap, Coordinate, JunctionPair } from "./types"

export function getEuclidesDistance(coordinate1: Coordinate, coordinate2: Coordinate) {
  const [x1, y1, z1] = coordinate1
  const [x2, y2, z2] = coordinate2
  const d = Math.hypot(x2 - x1, y2 - y1, z2 - z1)
  return d
}

export const convertToCoordinates = (coordinate: string) =>
  coordinate.split(',').map(Number) as Coordinate

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

export const findCircuitRoot = (parent: CircuitsMap, box: string): string => {
  if (!parent.has(box)) return box
  if (parent.get(box) === box) return box

  parent.set(box, findCircuitRoot(parent, parent.get(box)!))
  return parent.get(box)!
}

export const connectJunctionBoxes = (pairs: JunctionPair[]): CircuitsMap => {
  const parent = new Map()

  for (const { box1, box2 } of pairs.slice(0, CONNECTION_LIMIT)) {
    const root1 = findCircuitRoot(parent, box1)
    const root2 = findCircuitRoot(parent, box2)
    if (root1 !== root2) parent.set(root1, root2)
  }

  return parent
}

export const countCircuitSizes = (junctionBoxes: string[], parent: CircuitsMap) => {
  const circuitSizes = new Map<string, number>()

  for (const box of junctionBoxes) {
    const root = findCircuitRoot(parent, box)
    circuitSizes.set(root, (circuitSizes.get(root) || 0) + 1)
  }
  return circuitSizes
}
