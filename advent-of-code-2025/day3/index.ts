import fs from 'node:fs/promises'; // async
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(
  fileURLToPath(import.meta.url),
);

const inputFile = path.resolve(__dirname, 'input.txt')

const data = (await fs.readFile(inputFile, 'utf8')).split('\n');


const getMax =
  (input: string): number => Math.max(
    ...input.split('').map(Number)
  )

function getJoltage(bank: string): number {
  if (!bank) return 0

  const bankString = bank.toString()
  const max1 = getMax(bankString.substring(0, bankString.length - 1))
  const max2 = getMax(bankString.substring(
    bankString.indexOf(max1 + "") + 1)
  )

  if (!Number('' + max1 + max2)) console.log({ bank, joltage: Number('' + max1 + max2) })
  return Number('' + max1 + max2)

}


const part1 = (banks: string[]) => banks
  .map(bank => getJoltage(bank))
  .reduce((acc, el) => acc + el, 0)

console.log(part1(data))
