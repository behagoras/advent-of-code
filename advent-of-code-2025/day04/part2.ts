import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const setCharAt = (str: string, index: number, char: string) =>
  index < 0 || index >= str.length
    ? str
    : str.substring(0, index) + char + str.substring(index + 1)

function removeCoordinates(coordinatesToRemove: [number, number][], grid: string[]) {
  for (let [x, y] of coordinatesToRemove) grid[y] = setCharAt(grid[y]!, x, ".")

  return grid
}

function getCounts(grid: string[]): [[number, number][], number] {
  const rollsChar = "@"
  const width = grid[0]!.length
  let count = 0
  let coordinatesToRemove: [number, number][] = []
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < width; col++) {
      const current = grid[row]![col]
      // console.log({current})
      if (current !== rollsChar) continue

      let repeated = 0
      const coordinates = [
        [col - 1, row - 1],
        [col - 1, row],
        [col - 1, row + 1],
        [col, row - 1],
        // [x, y],
        [col, row + 1],
        [col + 1, row - 1],
        [col + 1, row],
        [col + 1, row + 1],
      ]

      for (let [x, y] of coordinates) {
        if (repeated >= 4) break

        const currentElement = grid?.[y!]?.[x!] ?? '.'
        if (currentElement === rollsChar) repeated++
      }

      if (repeated < 4 && grid?.[row]?.[col]) {
        coordinatesToRemove.push([col, row])
        count++
      }
    }
  }
  return [coordinatesToRemove, count]
}

// Day 04 part 2, example output ->
const part2 = (grid: string[]): number => {
  let count = 0,
    first = true,
    coordinatesToRemove: [number, number][] = [];

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
// console.log(JSON.stringify(data, null, 2))
console.log(part2(data));
