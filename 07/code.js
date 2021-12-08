import daySevenData from './data.js';

let dataArray = daySevenData.split(',');
dataArray = dataArray.map(item => parseInt(item, 10));

const fuelForFullMove = (n) => {
  return n * (n + 1) / 2;
}


export const challengeOne = () => {
  const max = Math.max(...dataArray);
  const min = Math.min(...dataArray);
  let bestTotal = false;
  let bestPosition = 0;
  for (let i = min; i < max; i++) {
    let total = 0;
    for(const item of dataArray) {
      total += Math.abs(item - i);
    }
    if(!bestTotal || total < bestTotal) {
      bestTotal = total;
      bestPosition = i;
    }
  }
  return bestTotal;
}

export const challengeTwo = () => {
  const max = Math.max(...dataArray);
  const min = Math.min(...dataArray);
  let bestTotal = false;
  let bestPosition = 0;
  for (let i = min; i < max; i++) {
    let total = 0;
    for(const item of dataArray) {
      total += fuelForFullMove(Math.abs(item - i));
    }
    if(!bestTotal || total < bestTotal) {
      bestTotal = total;
      bestPosition = i;
    }
  }
  return bestTotal;
}