type X = number
type Y = number
type Z = number
export type Coordinate = [
  X, Y, Z
]

export type BoxMap = Record<string, Set<string>>

export interface JunctionPair {
  box1: string
  box2: string
  distance: number
}

export type CircuitsMap = Map<string, string>
