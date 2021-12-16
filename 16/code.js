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

const extractPayloadOnce = (line, count = false) => {
  const type4Match = line.match(type4Regex);
  if (type4Match) {
    versionSum += parseInt(type4Match[1], 2);
    let arr = handleType4(type4Match[3])
    return [arr, line.replace(type4Match[0], '')];
  } else {
    const length1Match = line.match(length1Regex);
    const length0Match = line.match(length0Regex);
    if (length1Match) {

      versionSum += parseInt(length1Match[1], 2);
      const type = parseInt(length1Match[2], 2);
      const subPacketsCount = parseInt(length1Match[4], 2);
      const arr = [];
      let payloadString = length1Match[5]
      for (let i = 0; i < subPacketsCount; i++) {
        const [arrPart, remainderString] = extractPayloadOnce(payloadString, subPacketsCount);
        arr.push(arrPart)
        payloadString = remainderString
      }
      let j = {}
      j[type] = arr
      return [j, payloadString]
    } else if (length0Match) {
      versionSum += parseInt(length0Match[1], 2);
      const subPacketsLength = parseInt(length0Match[4], 2);
      const type = parseInt(length0Match[2], 2);
      const currentPackets = length0Match[5].substr(0, subPacketsLength)
      const [a] = extractPayload(currentPackets);
      let j = {}
      if (a instanceof Array) j[type] = [...a]
      else j[type] = [a]
      return [j, length0Match[0].replace(length0Match[1] + length0Match[2] + length0Match[3] + length0Match[4] + currentPackets, '')]
    } else {
      return [[]]
    }
  }
}

const extractPayload = (line, count = false) => {
  const type4Match = line.match(type4Regex);
  if (type4Match) {
    versionSum += parseInt(type4Match[1], 2);
    const [moreArray] = extractPayload(line.replace(type4Match[0], ''))
    const j = {};
    let arr = [handleType4(type4Match[3])]
    if (moreArray instanceof Array) arr.push(...moreArray)
    else arr.push(moreArray)
    j['4'] = arr
    return arr;
  } else {
    const length1Match = line.match(length1Regex);
    const length0Match = line.match(length0Regex);
    if (length1Match) {

      versionSum += parseInt(length1Match[1], 2);
      const type = parseInt(length1Match[2], 2);
      const subPacketsCount = parseInt(length1Match[4], 2);
      const arr = [];
      let payloadString = length1Match[5]
      for (let i = 0; i < subPacketsCount; i++) {
        const [arrPart, remainderString] = extractPayloadOnce(payloadString, subPacketsCount);
        arr.push(arrPart)
        payloadString = remainderString
      }
      //const [extra] = extractPayload(payloadString)
      let j = {}
      let a = arr
      //if(JSON.stringify(extra) !== '[]') a.push(extra)
      j[type] = a
      return [j, payloadString]
    } else if (length0Match) {
      versionSum += parseInt(length0Match[1], 2);
      const subPacketsLength = parseInt(length0Match[4], 2);
      const type = parseInt(length0Match[2], 2);
      let currentPackets = length0Match[5].substr(0, subPacketsLength)
      let lengthHit = false
      let currnetLength = 0;
      const arr = [];
      let a, extra
      // while(!lengthHit) {
      [a, extra] = extractPayload(currentPackets);
      // arr.push(a)
      // currnetLength +=  currentPackets.length - extra.length
      // if(currentLength > s)
      console.log('length extra', extra)
      // currentPackets = extra;

      // }
      let j = {}
      if (a instanceof Array) j[type] = [...a]
      else j[type] = [a]
      let b, extrab
      if (extra.length) {
        [b, extrab] = extractPayload(extra);
        extra = extrab
        if (b instanceof Array) j[type] = [...b]
        else j[type].push(b)
      }

      // if(JSON.stringify(b) !== '[]') j[type].push(b)
      return [j, extra]
    } else {
      return [[]]
    }
  }
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
let totalLength;
const output = {}
const challengeTwoParser = (item) => {
  i++
  const type4Match = item.match(type4Regex);
  if (type4Match) {
    //totalLength -= item.length;
    
    console.log(1, item, handleType4(type4Match[3]))
    return [handleType4(type4Match[3]), item.length]
  } else {
    const length0Match = item.match(length0Regex);
    const length1Match = item.match(length1Regex);
    if (length0Match) {
      const items = [];
      // Length 0 is total length
      const operation = parseInt(length0Match[2], 2)
      let totalLength = parseInt(length0Match[4], 2)
      console.log(totalLength)
      let totlen = item.length;
      while (totalLength) {
        const [a, len] = challengeTwoParser(data[i], totalLength)
        console.log('totalLength', totalLength)
        console.log('len', len)
        totalLength -= len;
        console.log('totalLength', totalLength)
        totlen += len;
        items.push(a)
      }
      console.log(2, item, totlen)
      const answer = performOperation(operation, items);
      console.log(operation, items, answer)
      return [answer, totlen]
    }
    if (length1Match) {
      const items = [];
      // Length 1 is total count
      const operation = parseInt(length1Match[2], 2)
      const count = parseInt(length1Match[4], 2)
      let totlen = item.length;
      for (let j = 0; j < count; j++) {
        const [a, len] = challengeTwoParser(data[i])
        items.push(a)
        totlen += len;
      }
      console.log(3, item, totlen)
      const answer = performOperation(operation, items)
      console.log(operation, items, answer)
      return [answer, totlen]
    }
  }
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? [...testDataArray ] : [ ...dataArray ];
  const firstItem = data[i];
  const [finalAnswer] = challengeTwoParser(firstItem);
  console.log(i, data.length)
  return finalAnswer
}

global.sixteenOne = challengeOne; global.sixteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }