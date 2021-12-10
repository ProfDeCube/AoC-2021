import dayOneData from './data.js';

const inputArray = dayOneData.split('\n')
  .map((numberString) => parseInt(numberString, 10))

export const challengeOne = () => {
  let lastNum,c;
  for (let i = 0; i < inputArray.length; i++) {
      if (!i) {
          c = 0;
          lastNum = inputArray[i]
          continue;
      } else {
          if (inputArray[i] >= lastNum) {
              c++;
          }
          lastNum = inputArray[i];
      }
      
  }
  return c;
}

export const challengeTwo = () => {
  let lastNum;
  let c = 0;
  for (let i = 0; i < inputArray.length - 2; i++) {
    let threeSum = inputArray[i] + inputArray[i + 1] + inputArray[i + 2]
    if (!i) {
      lastNum = threeSum
      continue;
    } else {
      if (threeSum > lastNum) {
        c++;
      }
      lastNum = threeSum;
    }

  }
  return c;
}

global.oneOne = challengeOne; global.oneTwo = challengeTwo;
export default {challengeOne, challengeTwo}