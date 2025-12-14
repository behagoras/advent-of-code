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

const getNumbersFromRangeInclusive = (range: any) =>
  new Array(Math.max(...range) - Math.min(...range) + 1)
    .fill(null)
    .map((_, index) => Math.min(...range) + index)

const isElementDuplicated = (element: { toString: () => any }) => {
  const stringifiedElement = element.toString()
  if (stringifiedElement.length % 2 != 0) return false
  const middle = stringifiedElement.length / 2
  return stringifiedElement.substring(0, middle) === stringifiedElement.substring(middle)
}

const isElementPatternRepeatingExactly = (element: { toString: () => any }) => {
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
    .flatMap((range: any) => getNumbersFromRangeInclusive(range))
    .filter((el: any) => isElementPatternRepeatingExactly(el))
    .reduce((acc: any, el: any) => acc + el, 0)

  console.log({ result })
});