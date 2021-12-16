import daySixteenData from './data.js';
import daySixteenTestData from './testData.js';
import { findPathWithCost } from 'modern-dijkstra';

const formatData = (dataToFormat) => dataToFormat.split('\n');

const dataArray = formatData(daySixteenData);
const testDataArray = formatData(daySixteenTestData);
let data;
let versionSum = 0;

const type4Regex = /^(\d{3})(100)((?:1\d{4})*?(?:0\d{4}))/
const length0Regex = /^(\d{3})(000|001|010|011|101|110|111)(0)(\d{15})/
const length1Regex = /^(\d{3})(000|001|010|011|101|110|111)(1)(\d{11})/

const handleType4 = (inputString) => {
  const input = inputString.split('');
  let doThing = true;
  let literalNumber = '';
  while (doThing) {
    const literalBit = input.splice(0, 5);
    if (literalBit[0] === '0') doThing = false;
    literalBit.shift();
    literalNumber += literalBit.join('');
  }
  return parseInt(literalNumber, 2);
}

const challengeOne = (useTestData) => {
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  for (let line of data) {
    const versionBin = line.substr(0, 3);
    versionSum += parseInt(versionBin, 2);
  }
  return versionSum
}

const performOperation = (op, array) => {
  if (op === 0) {
    let total = 0;
    array.forEach((item) => {
      total += item;
    })
    return total;
  }
  if (op === 1) {
    let total = 1;
    array.forEach((item) => {
      total *= item;
    })
    return total;
  }
  if (op === 2) {
    return Math.min(...array);
  }
  if (op === 3) {
    return Math.max(...array);
  }
  if (op === 5) {
    return (array[0] > array[1]) ? 1 : 0;
  }
  if (op === 6) {
    return (array[0] < array[1]) ? 1 : 0;
  }
  if (op === 7) {
    return (array[0] === array[1]) ? 1 : 0;
  }
}


let i = 0;
const challengeTwoParser = (item) => {
  i++
  const type4Match = item.match(type4Regex);
  if (type4Match) {    
    return [handleType4(type4Match[3]), item.length]
  } else {
    const length0Match = item.match(length0Regex);
    const length1Match = item.match(length1Regex);
    if (length0Match) {
      const items = [];
      const operation = parseInt(length0Match[2], 2)
      let totalLength = parseInt(length0Match[4], 2)
      let totlen = item.length;
      while (totalLength) {
        const [a, len] = challengeTwoParser(data[i], totalLength)
        totalLength -= len;
        totlen += len;
        items.push(a)
      }
      const answer = performOperation(operation, items);
      return [answer, totlen]
    }
    if (length1Match) {
      const items = [];
      const operation = parseInt(length1Match[2], 2)
      const count = parseInt(length1Match[4], 2)
      let totlen = item.length;
      for (let j = 0; j < count; j++) {
        const [a, len] = challengeTwoParser(data[i])
        items.push(a)
        totlen += len;
      }
      const answer = performOperation(operation, items)
      return [answer, totlen]
    }
  }
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? [...testDataArray ] : [ ...dataArray ];
  const firstItem = data[i];
  const [finalAnswer] = challengeTwoParser(firstItem);
  return finalAnswer
}

global.sixteenOne = challengeOne; global.sixteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }