import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function greedyBankJoltageCalculation(_bank: string): number[] {
  const bank = _bank.split('').map(Number)
  const positions: number[] = []
  for (let i = 0; i < 12; i++) {
    // Calculate start && end
    const start = positions.length ? (positions.at(-1)! + 1) : 0
    let end: number | undefined = ((11 - i) * -1)
    if (!end) end = undefined

    // Get index to push
    const slice = bank.slice(start, end)
    const max = Math.max(...slice)
    const index = slice.indexOf(max) + start

    // Push index
    positions.push(index)
  }

  return positions.map(position => bank[position]!)
}

const part2 = (banks: string[]): number => banks
  .filter(Boolean)
  .map(greedyBankJoltageCalculation)
  .map(el => +el.join(''))
  .reduce((sum, joltage) => sum + joltage, 0);

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n');
console.log(part2(data));
// Result -> 168794698570517
