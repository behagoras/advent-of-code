import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let splits = 0

function fillBeam(lines: string[][], startRow: number, col: number) {
  let row = startRow + 1;
  while (lines?.[row]?.[col] === '.' && row < lines.length) {
    lines[row][col] = '|'
    row++
  }
  if (lines[row]?.[col] === '^') splitBeam(lines, row, col)
}

function splitBeam(lines: string[][], beamRow: number, beamCol: number) {
  splits++
  fillBeam(lines, beamRow - 1, beamCol - 1)
  fillBeam(lines, beamRow - 1, beamCol + 1)
}

// Day 07 part 1, example output ->
const part1 = (l: string[]) => {
  const lines = l.map(el => el.split(''))
  const col = lines[0].findIndex(el => el == 'S')
  fillBeam(lines, 0, col)
  // console.log(JSON.stringify(lines.map(el => el.join('')), null, 2))
  return splits
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean)
console.log(part1(data));
