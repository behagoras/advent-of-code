import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const rollsChar = "@"

function removeCoordinates(coordinatesToRemove: [number, number][], grid: string[],) {
  const setCharAt = (str: string, index: number, char: string) =>
    index < 0 || index >= str.length
      ? str
      : str.substring(0, index) + char + str.substring(index + 1)

  for (let [x, y] of coordinatesToRemove) grid[y] = setCharAt(grid[y]!, x, ".")

  return grid
}

function countMatchesAndUpdateCoordinates(
  grid: string[],
  [x, y]: [number, number],
  coordinatesToRemove: [number, number][]
) {
  let count = 0, repeated = 0
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

  if (repeated < 4 && grid?.[y]?.[x]) {
    coordinatesToRemove.push([x, y])
    count++
  }

  return count
}

function getCounts(grid: string[]): [[number, number][], number] {
  const width = grid[0]!.length
  let count = 0
  let coordinatesToRemove: [number, number][] = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y]![x] !== rollsChar) continue

      count += countMatchesAndUpdateCoordinates(grid, [x, y], coordinatesToRemove)
    }
  }
  return [coordinatesToRemove, count]
}

// Day 04 part 2, example output ->
function part2(grid: string[]): number {
  let count = 0
  let first = true
  let coordinatesToRemove = [] as [number, number][]

  while (coordinatesToRemove.length || first) {
    first = false

    removeCoordinates(coordinatesToRemove, grid)

    let _count: number
    [coordinatesToRemove, _count] = getCounts(grid)
    count += _count
  }
  return count
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean);

console.log(part2(data));
