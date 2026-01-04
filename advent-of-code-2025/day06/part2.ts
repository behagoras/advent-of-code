import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day 06 part 1, example output ->
const part2 = (input: string): number => {
  const lines = input.split('\n')
  const width = lines[0].length

  let operator: "+" | "*" = "+"
  let sum = 0
  let currentSum = 0
  for (let col = 0; col < width; col++) {
    let valueAsString = ""
    for (const row of lines) valueAsString += row[col]

    if (valueAsString.endsWith("*") || valueAsString.endsWith("+")) {
      operator = valueAsString.slice(-1) as "*"
      // Remove operator from the stringified value to operate
      valueAsString = valueAsString.slice(0, -1)

      // backup currentSum
      sum += currentSum

      // Reset currentSum for the next iteration
      if (operator === "*") currentSum = 1
      else currentSum = 0
    }

    // Check each iteration
    // console.log({ sum, currentSum, s: valueAsString, operator })
    const currentValue = +valueAsString
    if (currentValue) {
      if (operator === "+") currentSum += currentValue
      else currentSum *= currentValue
    }
  }

  // the last iteration needs to be handled because there is no extra operator at the end of the line (last number)
  sum += currentSum

  return sum
}

const inputFile = path.resolve(__dirname, 'sample-input.txt');
const data = (await fs.readFile(inputFile, 'utf8'))
console.log(part2(data))
// .reduce((acc, el) => acc += el, 0));
