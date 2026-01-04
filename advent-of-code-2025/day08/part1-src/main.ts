import { getEuclidesDistance, convertToCoordinates } from "./utils"

function findRoot(coord: string, parent: Map<string, string>): string {
  let current = coord
  while (parent.get(current) && parent.get(current) !== current) {
    current = parent.get(current)!
  }
  return current
}

function part1Solution(input: string[]) {
  const arrayOfDistances: { coordinate1: string, coordinate2: string, euclides: number }[] = []
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const coordinate1 = input[i]
      const coordinate2 = input[j]
      if (coordinate1 && coordinate2) {
        const [x1, y1, z1] = coordinate1.split(',').map(Number)
        const [x2, y2, z2] = coordinate2.split(',').map(Number)
        const euclides = Math.hypot(x2 - x1, y2 - y1, z2 - z1)
        arrayOfDistances.push({ coordinate1, coordinate2, euclides })
      }
    }
  }
  arrayOfDistances.sort((a, b) => a.euclides - b.euclides)

  const parent = new Map<string, string>()

  const connectionLimit = input.length < 100 ? 10 : 1000
  for (let i = 0; i < connectionLimit; i++) {
    const { coordinate1: coord1, coordinate2: coord2 } = arrayOfDistances[i]

    // find root of x and y
    const x = findRoot(coord1, parent)
    const y = findRoot(coord2, parent)

    // union
    if (x !== y) parent.set(x, y)
  }

  // count sizes
  const sizes = new Map<string, number>()
  for (const coord of input) {
    const root = findRoot(coord, parent)
    sizes.set(root, (sizes.get(root) || 0) + 1)
  }

  const sorted = [...sizes.values()].sort((a, b) => b - a)
  return sorted[0] * sorted[1] * sorted[2]
}

export function part1(input: string[]) {
  console.log({ input })
  let arrayOfDistances: { coordinate1: string, coordinate2: string, euclides: number }[] = []
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
      const coordinate1 = input[i]
      const coordinate2 = input[j]
      if (coordinate1 && coordinate2) {
        const coord1 = convertToCoordinates(coordinate1)
        const coord2 = convertToCoordinates(coordinate2)
        const euclides = getEuclidesDistance(coord1, coord2)
        arrayOfDistances.push({
          coordinate1,
          coordinate2,
          euclides
        })
      }
    }
  }
  arrayOfDistances = [...arrayOfDistances]
    .sort((a, b) => a.euclides - b.euclides).filter(el => el.euclides > 0)
  const boxes = {} as Record<string, Set<string>>
  const cache = new Set<string>()
  for (const { coordinate1, coordinate2 } of arrayOfDistances) {
    if (cache.has(coordinate2)) continue

    if (boxes[coordinate1]) {
      boxes[coordinate1]!.add(coordinate2)
      cache.add(coordinate2)
      cache.add(coordinate1)
    }

    boxes[coordinate1] = boxes[coordinate1] ? new Set([...boxes[coordinate1], coordinate2]) : new Set([coordinate2])
    cache.add(coordinate1)
    cache.add(coordinate2)

  }
  console.log(
    Object.entries(boxes)
      .map(([key, value]) => ({ key, value: [...value].length }))
      .sort((a, b) => b.value - a.value)
    // .filter((_, index) => index < 3)
    // .reduce((acc, el) => (acc * el.value+1), 1)

  )
  console.log({ cache })
  return part1Solution(input)
}
