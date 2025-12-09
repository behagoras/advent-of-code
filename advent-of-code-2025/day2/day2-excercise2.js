// High 121336742376161
// 47477053982
const fs = require('node:fs');

const getRanges = (ranges) => ranges
  .split(',')
  .map(range => range.split('-')
  .map(el => +el))

const getNumbersFromRangeInclusive = (range) => 
  new Array(Math.max(...range) - Math.min(...range) + 1)
    .fill(null)
    .map((_, index) => Math.min(...range) + index)

const isElementDuplicated = (element) => {
  const stringifiedElement = element.toString()
  if (stringifiedElement.length % 2 != 0) return false
  const middle = stringifiedElement.length / 2
  return stringifiedElement.substring(0, middle) === stringifiedElement.substring(middle)
}

const isElementPatternRepeatingExactly = (element) => {
  // for example 111, 1212121212, 123123123123, 22332233
  // false for 223322
  const stringifiedElement = element.toString()
  const pattern = /^(\d+)\1+$/
  return pattern.test(stringifiedElement)
}


fs.readFile('day2/input.txt', 'utf8', (err, data) => {
  if (err) console.error('Error reading file:', err);
  const ranges = getRanges(data)
  const result = ranges
    .flatMap(range => getNumbersFromRangeInclusive(range))
    .filter(el => isElementPatternRepeatingExactly(el))
    .reduce((acc, el) => acc + el, 0)

  console.log({ result })
});



const re = /^(\d+)\1+$/;

const tests = [
  "123123", "1212", "343434", "34563456", "11111111", "11",
  "123412345", "12012"
];

for (const s of tests) {
  console.log(s, re.test(s));
}