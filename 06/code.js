import daySixData from './data.js';

let dataArray = daySixData.split(',');
dataArray = dataArray.map(item => parseInt(item, 10));

const decrimentCounts = (counts) => {
  return {
    0: counts[1],
    1: counts[2],
    2: counts[3],
    3: counts[4],
    4: counts[5],
    5: counts[6],
    6: counts[7] + counts[0],
    7: counts[8],
    8: counts[0],
  };
}

const doIterate = (days) => {
  let counts = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }
  for(let item of dataArray) {
    counts[item] = counts[item] + 1;
  }
  for(let i = 0; i < days; i++) {
    counts = decrimentCounts(counts);
  }
  let total = 0;
  Object.values(counts).forEach(item => total += item);
  return total
}


export const challengeOne = () => {
  const days = 80;
  return doIterate(days);
}

export const challengeTwo = () => {
  const days = 256;
  return doIterate(days);
}