import { getEuclidesDistance, convertToCoordinates } from "./utils"

function getArrayOfDistances(input: string[]): { coordinate1: string, coordinate2: string, euclides: number }[] {
  const arrayOfDistances: { coordinate1: string, coordinate2: string, euclides: number }[] = []
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
  return [...arrayOfDistances]
    .sort((a, b) => a.euclides - b.euclides)
    .filter(el => el.euclides > 0)
}

function getBoxes(arrayOfDistances: { coordinate1: string, coordinate2: string, euclides: number }[]) {
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
  console.log({ cache })
  return boxes
}

export function part1(input: string[]) {
  console.log({ input })
  const arrayOfDistances = getArrayOfDistances(input)
  const boxes = getBoxes(arrayOfDistances)

  console.log(
    Object.entries(boxes)
      .map(([key, value]) => ({ key, value: [...value].length }))
      .sort((a, b) => b.value - a.value)
    // .filter((_, index) => index < 3)
    // .reduce((acc, el) => (acc * el.value+1), 1)
  )
}
