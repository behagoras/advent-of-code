import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const memo = new Map<string, number>();


function countTimelinesFrom(lines: string[], startRow: number, col: number): number {
  const key = `${startRow},${col}`;
  if (memo.has(key)) return memo.get(key)!

  let row = startRow;
  while (lines?.[row]?.[col] !== '^' && row < lines.length) {
    // lines[row][col] = '|'   // <-- remove mutation
    row++
  }

  // Split timeline
  const result = (row < lines.length)
    // | Left timeline recursive |              | Right timeline recursive. |
    ? countTimelinesFrom(lines, row, col - 1) + countTimelinesFrom(lines, row, col + 1)
    : 1 // Return only this timeline

  memo.set(key, result);
  return result;
}

const part2 = (lines: string[]) => {
  const initialRayX = lines[0].split('').findIndex(el => el == 'S')
  const initialRayY = 0
  return countTimelinesFrom(lines, initialRayY, initialRayX)
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8'))
  .split('\n')
  .filter(Boolean)

console.log(part2(data)); // Result 12472142047197