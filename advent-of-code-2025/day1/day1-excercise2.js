// More than 3113
// More than 6494
// Not 6991
// Not 6513
// Not 4249
// 6496
const fs = require('node:fs');

fs.readFile('day1/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const result = guessPassword(data)
  console.log({ result })
});

function countZerosBetween(dial, newDial) {
  if (newDial === dial) return 0;
  if (newDial > dial) return Math.floor(newDial / 100) - Math.floor(dial / 100);
  return Math.floor((dial - 1) / 100) - Math.floor((newDial - 1) / 100);
}

function guessPassword(data) {
  let result = 0
  let dial = 50
  for (let step of data.split('\n')) {
    const direction = step.substring(0, 1) == 'L' ? -1 : 1
    const movement = +step.substring(1,) * direction
    const newDial = (dial + movement)

    const difference = countZerosBetween(dial, newDial)
    dial = newDial
    result += difference
  }
  return result
}