export type Coordinate = [
  number, number, number
]

export function getEuclidesDistance(coordinate1: Coordinate, coordinate2: Coordinate) {
  const [x1, y1, z1] = coordinate1
  const [x2, y2, z2] = coordinate2
  const d = Math.hypot(x2 - x1, y2 - y1, z2 - z1)
  return d
}

export function convertToCoordinates(coordinate: string): Coordinate {
  return coordinate.split(',').map(Number) as Coordinate
}
