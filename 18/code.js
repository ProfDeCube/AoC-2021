import dayEighteenData from './data.js';
import dayEighteenTestData from './testData.js';
import { sumOfArithmeticProgression } from '../common/utils.js'

const targetsRegex = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/

const formatData = (dataToFormat) => {
  let formattedData = dataToFormat.split('\n')
  return formattedData.map((datum) => JSON.parse(datum))
}

const dataArray = formatData(dayEighteenData);
const testDataArray = formatData(dayEighteenTestData);
let data;

//const nestedNumberRegex = /.*?\[.*?\[.*?\[.*\[/;

const split = (number) => {
  const first = Math.floor(number / 2)
  return JSON.stringify([first, number - first]);
}
const splitRegex = /^(.*?)(\d{2,})(.*)$/
const splitAll = (string) => {
  let newString = string;
  let match = newString.match(splitRegex);
  if (match === null) return newString
  const splitMatch = split(match[2])
  newString = match[1] + splitMatch + match[3]
  return newString
}
const previousNumberRegex = /^(.*)(\b\d+\b)(.*?)$/;
const nextNumberRegex = /^(.*?)(\b\d+\b)(.*)$/;

const explode = (string, match) => {

  const matchArray = JSON.parse(match[0])
  let newString = string.split('');
  newString.splice(match.index, match[0].length)
  newString = newString.join('');

  let before = newString.substr(0, match.index)
  const beforeMatch = before.match(previousNumberRegex);
  if (beforeMatch) {




    before = beforeMatch[1] + (matchArray[0] + parseInt(beforeMatch[2], 10)) + beforeMatch[3]
  }
  let after = newString.substr(match.index)
  const afterMatch = after.match(nextNumberRegex)
  if (afterMatch) {

    after = afterMatch[1] + (matchArray[1] + parseInt(afterMatch[2], 10)) + afterMatch[3]
  }

  return before + '0' + after
}

const countDepth = (string) => {
  const opens = (string.match(/\[/g) || []).length
  const closes = (string.match(/\]/g) || []).length
  return opens - closes;
}

let r = /(\[\d+,\d+\])/g
const findAllDeepNumbers = (string) => {
  let newString = string;
  let matches = newString.matchAll(r);
  let allFound = matches === null;
  while (!allFound) {
    let foundOne = false;
    for (const match of matches) {
      const prefix = newString.substr(0, match.index)
      const depth = countDepth(prefix)
      if (depth >= 4) {
        foundOne = true;
        newString = explode(newString, match);
        matches = newString.matchAll(r);
        break;
      }
    }
    if (!foundOne) {

      allFound = true

    }
  }
  const oldString = newString;
  newString = splitAll(newString)
  if (oldString === newString) {
    return newString;
  } else return findAllDeepNumbers(newString)
}



const analyseSnailNumber = (snailNumber) => {
  const snailNumberString = JSON.stringify(snailNumber)

  let depth = 0;
  let index = 0;
  let startLogging = false
  let loggedString = ''
  for (const char of snailNumberString) {
    if (!startLogging) index++
    if (char === '[') depth++
    if (char === ']') depth--
    if (depth > 4) startLogging = true
    if (depth < 4 && startLogging) {
      startLogging = false
      break;
    }
    if (startLogging) loggedString += char
  }

}

const analyseSnailNumberArray = (snailNumber, depth = 0) => {
  if (snailNumber instanceof Array) {
    if (depth > 3) {

      return snailNumber;
    }
    for (const item of snailNumber) {

      analyseSnailNumberArray(item, depth + 1)
    }
  }
}

const lowArrayRegex = /^(.*?)(\[\d+,\d+\])(.*)$/;
const calculateMagnitude = (string) => {
  let newString = string;
  let match = newString.match(lowArrayRegex);
  while (match) {
    const array = JSON.parse(match[2])
    const magnitude = 3 * array[0] + 2 * array[1]
    newString = match[1] + magnitude + match[3]

    if (typeof newString === 'number') return newString
    match = newString.match(lowArrayRegex);
  }
  return newString
}

const addSnails = (a, b) => {
  //analyseSnailNumberArray([a, b]);
  return [a, b];
}

const challengeOne = (useTestData) => {
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  let currentSum = data.shift();
  for (const number of data) {
    currentSum = addSnails(currentSum, number);
    currentSum = JSON.parse(findAllDeepNumbers(JSON.stringify(currentSum)))
  }
  const totalMagnitude = calculateMagnitude(JSON.stringify(currentSum));
  return totalMagnitude;
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  let highestMagnitude = 0;
  for (const index1 in data) {
    for (const index2 in data) {

      if (index1 !== index2) {
        const line1 = data[index1]
        const line2 = data[index2]

        let currentSum = addSnails(line1, line2);
        currentSum = JSON.parse(findAllDeepNumbers(JSON.stringify(currentSum)))
        const magnitude = calculateMagnitude(JSON.stringify(currentSum));
        highestMagnitude = Math.max(highestMagnitude, magnitude)
      }
    }
  }


  return highestMagnitude
}

global.eighteenOne = challengeOne; global.eighteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }