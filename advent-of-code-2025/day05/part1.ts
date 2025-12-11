import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));


function isIdValid(ranges: [number, number][], id: number) {
  for (let [from, to] of ranges) {
    if (id >= from && id <= to) return true;
  }
}

// Day 05 part 1, example output ->
const part1 = (
  ranges?: [number, number][],
  ids?: number[]
): number => {
  let sum = 0
  if (!ranges || !ids) return 0

  ids.forEach((id) => (isIdValid(ranges, +id)) && sum++)
  return sum
}

const inputFile = path.resolve(__dirname, 'sample-input.txt');
const [ranges, ids] = (
  (await fs.readFile(inputFile, 'utf8'))
    .split('\n\n')
    .map((el, index) => {
      const lines = el.split('\n')

      if (index % 2 !== 0) return lines.map(Number)
      return lines.map(range => range.split('-').map(Number))
    })
) as [[number, number][], number[]]

console.log(part1(ranges as [number, number][], ids as number[]));
