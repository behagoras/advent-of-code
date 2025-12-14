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
  let result = 0
  let dial = 50

  for (let step of data.split('\n')) {
    const direction = step.substring(0, 1) == 'L' ? -1 : 1
    const movement = +step.substring(1,) * direction
    dial = (dial + movement)
    if (Math.abs(dial) % 100 == 0) result++
    console.log({ step, direction, movement, dial, result })
  }

});