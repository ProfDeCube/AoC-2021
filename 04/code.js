import dayFourData from './data.js';

let dataArray = dayFourData.split('\n\n');
let calls = dataArray.splice(0, 1)[0];
calls = calls.split(",").map(call => parseInt(call, 10));
dataArray = dataArray.map(item => {
  let bingoCard = item.split('\n');
  bingoCard = bingoCard.map(line => line.trim().split(/\s+/).map(number => parseInt(number, 10)));
  return bingoCard;
})

const checkCard = (card, calledNumbers) => {
  //check rows
  for (const row of card) {
    if (row.every(number => calledNumbers.includes(number))) return true
  }
  //check columns
  for (let i = 0; i < 5; i++) {
    let column = [];
    card.forEach(row => column.push(row[i]))
    if (column.every(number => calledNumbers.includes(number))) return true
  }
  return false;
}

const findWinningCard = () => {
  let callsToTest = [];
  for (let i = 5; i < calls.length; i++) {
    callsToTest = [...calls].splice(0, i);
    for (const card of dataArray) {
      if (checkCard(card, callsToTest)) {
        return [card, callsToTest];
      }
    }
  }
}

export const challengeOne = () => {
  // Find winning card
  const [winningCard, callsToTest] = findWinningCard();
  // Calculate Score
  let unmarkedSum = 0;
  for(const row of winningCard) {
    for (const number of row) {
      if(!callsToTest.includes(number)){
        unmarkedSum += number;
      }
    }
  }
  const winningNumber = callsToTest.pop();
  return unmarkedSum * winningNumber;
}

export const challengeTwo = () => {
  // Find winning card
  while (dataArray.length > 1) {
    const [winningCard, callsToTest] = findWinningCard();
    const winningCardIndex = dataArray.indexOf(winningCard);
    dataArray.splice(winningCardIndex, 1);
  }
  // Last Card
  const [winningCard, callsToTest] = findWinningCard();
  // Calculate Score
  let unmarkedSum = 0;
  for(const row of winningCard) {
    for (const number of row) {
      if(!callsToTest.includes(number)){
        unmarkedSum += number;
      }
    }
  }
  const winningNumber = callsToTest.pop();
  return unmarkedSum * winningNumber;
}