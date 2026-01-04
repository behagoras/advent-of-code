import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day 04 part 1, example output ->
const part1 = (grid: string[]) : number => {
  const rollsChar = "@"
  let count = 0
  // const repetitions = 4
  const width = grid[0]!.length
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < width; x++) {
      const current = grid[y]![x]
      // console.log({current})
      if (current !== rollsChar) continue

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

      for (const coordinate of coordinates) {
        const [x2, y2] = coordinate
        if (repeated >= 4) break
        const current = grid?.[y2!]?.[x2!] ?? '.'
        if (current === rollsChar) repeated++
      }

      if (repeated < 4) count++
    }

  }

  return count

  // console.log({ input })
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean);
console.log(JSON.stringify(data, null, 2))
console.log(part1(data));
