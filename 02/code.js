import dayTwoData from './data.js';

const dataArray = dayTwoData.split('\n');

export const challengeOne = () => {
  let depth = 0;
  let distance = 0;
  for (let item of dataArray) {
    const [direction, count] = item.split(" ");
    switch (direction) {
      case 'forward':
        distance += parseInt(count, 10);
        break;
      case 'down':
        depth += parseInt(count, 10);
        break;
      case 'up':
        depth -= parseInt(count, 10);
        break;
    }
  }
  return distance*depth
}

export const challengeTwo = () => {
  let depth = 0;
  let aim = 0;
  let distance = 0;
  for (let item of dataArray) {
    const [direction, count] = item.split(" ");
    switch (direction) {
      case 'forward':
        distance += parseInt(count, 10);
        depth += (aim*parseInt(count, 10));
        break;
      case 'down':
        aim += parseInt(count, 10);
        break;
      case 'up':
        aim -= parseInt(count, 10);
        break;
    }
  }
  return distance*depth
}