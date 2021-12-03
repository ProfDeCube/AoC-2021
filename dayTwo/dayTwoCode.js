import dayOneData from './dayTwoData';

const dataArray = dayOneData.split('\n');

const challengeOne = () => {
  let depth = 0;
  let distance = 0;
  for (item of dataArray) {
    [direction, count] = item.split(" ");
    switch (direction) {
      case 'forward':
        distanch += parseInt(count, 10);
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

challengeOne();

const challengeTwo = () => {
  let depth = 0;
  let aim = 0;
  let distance = 0;
  for (item of dataArray) {
    [direction, count] = item.split(" ");
    switch (direction) {
      case 'forward':
        distanch += parseInt(count, 10);
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

challengeTwo();