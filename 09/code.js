import dayNineData from './data.js';

let dataArray = dayNineData.split('\n');
dataArray = dataArray.map((item) => {
  return item.split('').map((numberString) => parseInt(numberString, 10))

})

const height = dataArray.length;
const width = dataArray[0].length;

export const challengeOne = () => {
  let lowPointsTotal = 0;
  for (let y = 0; y < dataArray.length; y++) {
    for (let x = 0; x < dataArray[y].length; x++) {
      let lowerNeighbors = 0;
      let currentNum = dataArray[y][x];
      if (y > 0 && dataArray[y - 1][x] <= currentNum) lowerNeighbors++;
      if (y < height - 1 && dataArray[y + 1][x] <= currentNum) lowerNeighbors++;
      if (x > 0 && dataArray[y][x - 1] <= currentNum) lowerNeighbors++;
      if (x < width - 1 && dataArray[y][x + 1] <= currentNum) lowerNeighbors++;
      if (!lowerNeighbors) {
        lowPointsTotal += currentNum + 1;
      }
    }
  }
  return lowPointsTotal;
}

const bigThree = [];
const updateBigThree = (newValue) => {
  bigThree.push(newValue);
  bigThree.sort((a, b) => a - b);
  if (bigThree.length > 3) bigThree.splice(0, 1);
}

const visitedSpaces = [];

const addNeighbors = (plateau, y, x) => {
  plateau.push(`${y},${x}`);
  visitedSpaces.push(`${y},${x}`);
  if (y > 0 && dataArray[y - 1][x] != 9 && !plateau.includes(`${y - 1},${x}`)) addNeighbors(plateau, y-1, x);
  if (y < height - 1 && dataArray[y + 1][x] != 9 && !plateau.includes(`${y + 1},${x}`)) addNeighbors(plateau, y+1, x);
  if (x > 0 && dataArray[y][x - 1] != 9 && !plateau.includes(`${y},${x - 1}`)) addNeighbors(plateau, y, x-1);
  if (x < width - 1 && dataArray[y][x + 1] != 9 && !plateau.includes(`${y},${x + 1}`)) addNeighbors(plateau, y, x+1);
}

export const challengeTwo = () => {
  for (let y = 0; y < dataArray.length; y++) {
    for (let x = 0; x < dataArray[y].length; x++) {
      const coords = `${y},${x}`;
      let currentNum = dataArray[y][x];
      if (visitedSpaces.includes(coords) || dataArray[y][x] === 9) continue;
      const plateau = [];
      if (!plateau.includes(coords)) addNeighbors(plateau, y, x);
      updateBigThree(plateau.length)
    }
  }
  return bigThree[0] * bigThree[1] * bigThree[2];
}