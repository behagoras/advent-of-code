// Low 4365
// 640
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const getRanges = (ranges: string) => ranges
  .split(',')
  .map((range: string) => range.split('-')
    .map((el: string | number) => +el))

const getNumbersFromRangeInclusive = (range: number[]): number[] =>
  new Array(Math.max(...range) - Math.min(...range) + 1)
    .fill(null)
    .map((_, index) => Math.min(...range) + index)

const isElementPatternRepeatingExactly = (element: number): boolean => {
  // for example 111, 1212121212, 123123123123, 22332233
  // false for 223322
  const stringifiedElement = element.toString()
  const pattern = /(\d)\1{2,}/g
  return pattern.test(stringifiedElement)
}

const inputFile = path.resolve(__dirname, 'input.txt')
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) console.error('Error reading file:', err);
  const ranges = getRanges(data)
  const result = ranges
    .flatMap((range: number[]) => getNumbersFromRangeInclusive(range))
    .filter((el: number) => isElementPatternRepeatingExactly(el))
    .reduce((acc: number, el: number) => acc + el, 0)

  console.log({ result })
});
