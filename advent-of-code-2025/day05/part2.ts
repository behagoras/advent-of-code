import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function mergeRanges(ranges: [number, number][]): [number, number][] {

  ranges = ranges
    .toSorted((a, b) => b[1] - a[1])
    .toSorted((a, b) => a[0] - b[0])

  const newRanges: [number, number][] = [];
  let [currentStart, currentEnd] = ranges[0]!;
  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i]!;

    if (start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      newRanges.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  newRanges.push([currentStart, currentEnd]);
  return newRanges;
}

// Day 05 part 1, example output ->
const part2 = (
  ranges?: [number, number][],
  _ids?: number[]
): number =>
  mergeRanges(ranges!).reduce((acc, [start, end]) => acc + (end - start + 1), 0)

const inputFile = path.resolve(__dirname, 'input.txt');
const [ranges, ids] = (
  (await fs.readFile(inputFile, 'utf8'))
    .split('\n\n')
    .map((el, index) => {
      const lines = el.split('\n')

      if (index % 2 !== 0) return lines.map(Number)
      return lines.map(range => range.split('-').map(Number))
    })
) as [[number, number][], number[]]

console.log(part2(ranges as [number, number][], ids as number[]));
