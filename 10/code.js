import dayTenData from './data.js';
import dayTenTestData from './testData.js';

const dataArray = dayTenData.split('\n');
const testDataArray = dayTenTestData.split('\n');

const bracketScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const matchingBrackets = {
  '{': '}',
  '[': ']',
  '<': '>',
  '(': ')',
}
const neededBracketScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}
const challengeOne = (useTestData) => {
  const data = (useTestData) ? [...testDataArray] : [...dataArray];
  let total = 0;
  const invalidBrackets = [];
  const firstInvalidSyntax = /[\>\}\]\)]/
  for (const ogBrackets of data) {
    let brackets = ogBrackets
    const matchingBracketsRegex = /(?:<>|\{\}|\[\]|\(\))/g
    const onlyOpeningBracketsRegex = /^[\{\<\(\[]*$/;
    let oldLength = 99999;
    while (brackets.length !== oldLength) {
      oldLength = brackets.length;
      brackets = brackets.replace(matchingBracketsRegex, "");
    }
    if (!brackets.match(onlyOpeningBracketsRegex)) invalidBrackets.push(brackets);
  }
  for (const brackets of invalidBrackets) {
    const match = brackets.match(firstInvalidSyntax);
    total += bracketScores[match[0]];
  }
  return total;
}

const reverseString = (string) => {
  return string.split('').reverse().map((char) => matchingBrackets[char]).join('');
}

const challengeTwo = (useTestData) => {
  const data = (useTestData) ? [...testDataArray] : [...dataArray];
  const scores = []
  const unfinishedBrackets = [];
  for (const ogBrackets of data) {
    let brackets = ogBrackets
    const matchingBracketsRegex = /(?:<>|\{\}|\[\]|\(\))/g
    const onlyOpeningBracketsRegex = /^[\{\<\(\[]+$/;
    let oldLength = 99999;
    while (brackets.length !== oldLength) {
      oldLength = brackets.length;
      brackets = brackets.replace(matchingBracketsRegex, "");
    }
    if (brackets.match(onlyOpeningBracketsRegex)) unfinishedBrackets.push(brackets);
  }

  for (const brackets of unfinishedBrackets) {
    let total = 0;
    const neededBrackets = reverseString(brackets)
    for (const bracket of neededBrackets.split("")) {
      total = (total * 5) + neededBracketScores[bracket];
    }
    scores.push(total);
  }
  scores.sort((a, b) => a - b)
  const middleIndex = Math.floor(scores.length / 2);
  return scores[middleIndex];
}

global.tenOne = challengeOne; global.tenTwo = challengeTwo;
export default {challengeOne, challengeTwo}