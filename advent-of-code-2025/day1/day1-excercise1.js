const fs = require('node:fs');

fs.readFile('day1/input.txt', 'utf8', (err, data) => {
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