// More than 3113
// More than 6494
// Not 6991
// Not 6513
// Not 4249
// 6496
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const inputFile = path.resolve(__dirname, 'input.txt')
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const result = guessPassword(data)
  console.log({ result })
});

function countZerosBetween(dial: number, newDial: number) {
  if (newDial === dial) return 0;
  if (newDial > dial) return Math.floor(newDial / 100) - Math.floor(dial / 100);
  return Math.floor((dial - 1) / 100) - Math.floor((newDial - 1) / 100);
}

function guessPassword(data: string) {
  let result = 0
  let dial = 50
  for (const step of data.split('\n')) {
    const direction = step.startsWith('L') ? -1 : 1
    const movement = +step.substring(1,) * direction
    const newDial = (dial + movement)

    const difference = countZerosBetween(dial, newDial)
    dial = newDial
    result += difference
  }
  return result
}
