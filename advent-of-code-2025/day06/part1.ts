import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Day 06 part 1, example output ->
const part1 = (input: string): number[] => {
  const data = input
    .replaceAll(/"+/g, '"')
    .replaceAll("\n ", "\n")
    .replaceAll("\n ", "\n")
    .split('\n')
    .map(el => el.split(' ').filter(Boolean))

  const operators = data.at(-1)?.filter(Boolean)
  const grid = data.slice(0, -1)

  const result = operators?.map((operator: string, column: number) => {
    let subtotal = operator === '+' ? 0 : 1
    for (const rowElement of grid) {
      const currentNumber = +rowElement[column]

      if (operator == "+") subtotal += currentNumber
      else subtotal *= currentNumber
    }
    return subtotal
  })

  return result!
}

const inputFile = path.resolve(__dirname, 'input.txt');
const data = (await fs.readFile(inputFile, 'utf8'))
console.log(part1(data).reduce((acc, el) => acc += el, 0));
