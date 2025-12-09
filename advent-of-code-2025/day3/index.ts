// Too low 158840668273292

import fs from 'node:fs/promises'; // async
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(
  fileURLToPath(import.meta.url),
);





function getCleanJoltage(slices: (number)[]): number[] {
  let min = Math.min(...slices.filter(el => el !== null))

  while (slices.length > 12) {
    const nextMin = slices.indexOf(min)
    slices.splice(nextMin, 1)
  }
  return slices
}

const findStartingIndex = (bankNumbers: number[]): number => {
  let left = 0, right = bankNumbers.length, currentIndex = 0;

  while ((right - left) > 12 && currentIndex < bankNumbers.length) {
    if (bankNumbers[currentIndex]! > bankNumbers[left]!) {
      left = currentIndex;
    }
    else right--
    currentIndex++;
  }

  return left
}


function getJoltage(bank: string): number {
  if (!bank) return 0

  const bankNumbers = bank.split('').map(Number)
  const left = findStartingIndex(bankNumbers)
  const numbersFromLeft = bankNumbers.slice(left)
  const clean = getCleanJoltage(numbersFromLeft)
    .join('')

  return Number(clean)
}

function part2  (banks: string[]) {
  return banks
    .map(getJoltage)
    .reduce((acc, el) => acc + el, 0)
}
const inputFile = path.resolve(__dirname, 'sample-input.txt')
const data = (await fs.readFile(inputFile, 'utf8')).split('\n');



console.log(part2(data))


// console.log('removeMin(data)', removeMin('811111111111119'))
