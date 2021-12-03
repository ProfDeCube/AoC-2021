import dayOneData from './dayOneData';

dataArray = dayOneData.split('\n')
  .map((numberString) => parseInt(numberString, 10))

const challengeOne = () => {
  let lastNum,c;
  for (i = 0; i < inputArray.length; i++) {
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

challengeOne();

const challengeTwo = () => {
  let lastNum, c;
  for (i = 0; i < inputArray.length - 2; i++) {
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

challengeTwo();