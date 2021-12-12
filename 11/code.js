import dayElevenData from './data.js';
import dayElevenTestData from './testData.js';

const dataArray = dayElevenData.split('\n').map((row) => row.split("").map((number) => parseInt(number, 10)));
const testDataArray = dayElevenTestData.split('\n').map((row) => row.split("").map((number) => parseInt(number, 10)));
let data
let height, width;
let iterationFlashes = [];

const resetToZero = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if(data[y][x] > 9) {
        data[y][x] = 0
      }
    }
  }
}

const incrimentAll = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        data[y][x] = data[y][x] + 1
      if (data[y][x] > 9) {
        flash(y, x);
      }
    }
  }
  resetToZero()
}

const incrimentOne = (y, x) => {
  data[y][x] = data[y][x] + 1;
  if (data[y][x] > 9) {
    return 1
  }
  return 0

}

const flash = (y, x) => {
  if (iterationFlashes.includes(`${y},${x}`)) {
    return;
  }
  iterationFlashes.push(`${y},${x}`)
  // Above
  if (y > 0) {
    if (x > 0) {
      if (incrimentOne(y - 1, x - 1)) flash(y - 1, x - 1)
    }
    if (incrimentOne(y - 1, x)) flash(y - 1, x)
    if (x < width - 1) {
      if (incrimentOne(y - 1, x + 1)) flash(y - 1, x + 1)
    }
  }

  // Level
  if (x > 0) {
    if (incrimentOne(y, x - 1)) flash(y, x - 1)
  }
  if (x < width - 1) {
    if (incrimentOne(y, x + 1)) flash(y, x + 1)
  }

  // Below
  if (y < height - 1) {
    if (x > 0) {
      if (incrimentOne(y + 1, x - 1)) flash(y + 1, x - 1)
    }
    if (incrimentOne(y + 1, x)) flash(y + 1, x)
    if (x < width - 1) {
      if (incrimentOne(y + 1, x + 1)) flash(y + 1, x + 1)
    }
  }
}

const iterateEnergy = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y][x] >= 9) {
        flash(y, x);
      }
    }
  }
  incrimentAll();
}

const challengeOne = (useTestData) => {
  let total = 0;
  const iterations = 100;
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  height = data.length;
  width = data[0].length;
  for (let i = 0; i < iterations; i++) {
    iterationFlashes = [];
    iterateEnergy(i)
    total += iterationFlashes.length;
  }
  return total
}

const checkSync = () => {
  let syncChecker = [...data].map(i=> {
    return [...new Set(i)].length === 1 ? [...new Set(i)][0] : [...new Set(i)]
  })
  
  let syncChecker2 = [...new Set(syncChecker)];
  return syncChecker2.length === 1;
}

const challengeTwo = (useTestData) => {
  let iteration = 0;
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  height = data.length;
  width = data[0].length;
  let synchronised = false
  while(!synchronised) {
    iterationFlashes = [];
    iteration++;
    iterateEnergy()
    synchronised = checkSync();
  }
  return iteration
}

global.elevenOne = challengeOne; global.elevenTwo = challengeTwo;
export default { challengeOne, challengeTwo }