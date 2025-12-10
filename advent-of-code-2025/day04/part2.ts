import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const rollsChar = "@"

function removeCoordinates(grid: string[], coordinatesToRemove: [number, number][]): string[] {
  const setCharAt = (str: string, index: number, char: string): string =>
    index < 0 || index >= str.length
      ? str
      : str.substring(0, index) + char + str.substring(index + 1)

  let newGrid = [...grid]
  for (let [x, y] of coordinatesToRemove) newGrid[y] = setCharAt(newGrid[y]!, x, ".")

  return newGrid
}

function getCounts(grid: string[]): [
  [number, number][],
  number
] {
  const countNeighbors = (
    grid: string[],
    [x, y]: [number, number],
  ): [count: number, shouldRemove: boolean] {
    let repeated = 0
    const coordinates = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      // [x, y],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ]

    for (let [x, y] of coordinates) {
      if (repeated >= 4) break

      const currentElement = grid?.[y!]?.[x!] ?? '.'
      if (currentElement === rollsChar) repeated++
    }

    const shouldRemove = repeated < 4 && grid?.[y]?.[x] !== undefined
    const count = shouldRemove ? 1 : 0

    return [count, shouldRemove]
  }

  const width = grid[0]!.length
  let count = 0
  let coordinatesToRemove: [number, number][] = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y]![x] !== rollsChar) continue

      const [neighborCount, shouldRemove] = countNeighbors(grid, [x, y])

      if (shouldRemove) coordinatesToRemove.push([x, y])

      count += neighborCount
    }
  }
  return [coordinatesToRemove, count]
}

function part2(grid: string[]): number {
  let count = 0
  let currentGrid = grid

  let coordinatesToRemove: [number, number][] = []
  do {
    const countsResult = getCounts(currentGrid)

    coordinatesToRemove = countsResult[0]
    count +=  countsResult[1]

    currentGrid = removeCoordinates(currentGrid, coordinatesToRemove)
  } while (coordinatesToRemove.length)

  return count
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean);

console.log(part2(data));
