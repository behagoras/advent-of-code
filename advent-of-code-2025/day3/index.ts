// Too low 158840668273292
// Too low 158840668273292
import fs from 'node:fs/promises';

import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function trimToTwelveDigits(digits: (number)[]): number[] {
  let min = Math.min(...digits.filter(el => el !== null));

  while (digits.length > 12) {
    const minIndex = digits.indexOf(min);
    digits.splice(minIndex, 1);
    if(minIndex === 0) min++;
  }

  return digits;
}

const findBestStartPosition = (digits: number[]): number => {
  let left = 0, right = digits.length, currentIndex = 0;

  while ((right - left) > 12 && currentIndex < digits.length) {
    if (digits[currentIndex]! > digits[left]!) {
      left = currentIndex;
    }
    else right--
    currentIndex++;
  }

  return left;
}

function calculateBankJoltage(bank: string): number {
  if (!bank) return 0

  const digits = bank.split('').map(Number);
  const startIndex = findBestStartPosition(digits);
  const candidateDigits = digits.slice(startIndex);
  const selectedDigits = trimToTwelveDigits(candidateDigits).join('');

  return Number(selectedDigits);
}

function calculateTotalJoltagePart2  (banks: string[]): number {
  return banks
    .map(calculateBankJoltage)
    .reduce((sum, joltage) => sum + joltage, 0);
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n');
console.log(calculateTotalJoltagePart2(data));
// console.log('removeMin(data)', removeMin('811111111111119'))
