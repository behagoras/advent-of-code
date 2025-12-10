import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day 05 part 1, example output ->
const part1 = (
  ranges?: string[],
  ids?: string[]
): number => {
  console.log({ ranges, ids })
  return 1
}

const inputFile = path.resolve(__dirname, 'sample-input.txt');
const [ranges, ids] = (await fs.readFile(inputFile, 'utf8')).split('\n\n').map(el => el.split('\n').filter(Boolean));
console.log(part1(ranges, ids));
