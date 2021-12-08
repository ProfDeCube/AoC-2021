import dayEightData from './data.js';

const alphaSort = (string) => {
  return string.split('').sort((a, b) => a > b ? 1 : -1).join('');
}

let dataArray = dayEightData.split('\n');
dataArray = dataArray.map(item => {
  let [signals, outputs] = item.split(' | ');
  signals = signals.split(' ').map(alphaSort)
  outputs = outputs.split(' ').map(alphaSort)
  return { signals, outputs }
});

export const challengeOne = () => {
  let total = 0;
  for (const item of dataArray) {
    for (const output of item.outputs) {
      if ([2, 3, 4, 7].includes(output.length)) {
        total++
      }
    }
  }
  return total;
}

const containsAllChars = (input, chars) => {
  const inputArray = input.split('');
  const charsArray = chars.split('');
  const containsAll = charsArray.every(char => inputArray.includes(char));
  return containsAll;
}

const uncontainerChars = (chars, input) => {
  const inputArray = input.split('');
  const charsArray = chars.split('');

  const unconatined = [];
  for (const inputChar of inputArray) {
    if (!charsArray.includes(inputChar)) {
      unconatined.push(inputChar);
    }
  }
  return unconatined;
}

export const challengeTwo = () => {
  let total = 0;
  for (const item of dataArray) {
    const numbers = {}
    // Add unique numbers to lookup object
    for (const value of [...item.signals]) {
      switch (value.length) {
        case 2:
          numbers[1] = value;
          break;
        case 3:
          numbers[7] = value;
          break;
        case 4:
          numbers[4] = value;
          break;
        case 7:
          numbers[8] = value;
          break;
      }
    }
    for (const value of [...item.signals]) {
      if (value.length === 6) {
        // 0, 6, 9 have 6 segments lit each
        if (!containsAllChars(value, numbers[1])) {
          // 6 is the only one of these numbers not to have all the number 1s lights inside it
          numbers[6] = value
        } else {
          const uncontained = uncontainerChars(value, numbers[4]);
          if (uncontained.length === 0) {
            // 9 has all the segments of 4 within it
            numbers[9] = value;
          } else {
            // 0 does not
            numbers[0] = value;
          }
        }
      }
    }
    for (const value of [...item.signals]) {
      if (value.length === 5) {
        // 2, 3, 5 have 5 segments lit each
        if (containsAllChars(value, numbers[1])) {
          // 3 is the only one of these numbers not to have all the number 1s lights inside it
          numbers[3] = value;
        } else {
          const uncontained = uncontainerChars(numbers[9], value);
          if (uncontained.length === 0) {
            // 5 is completely contained within 9
            numbers[5] = value;
          } else {
            // 2 has one light that is not included in 9
            numbers[2] = value;
          }
        }
      }
    }

    // Invert map for easy lookup
    const numberMap = {};
    for (const number in numbers) {
      numberMap[numbers[number]] = number;
    }

    // Convert segments into numbers and construct full output value
    let outputString = '';
    for (const output of item.outputs) {
      outputString += numberMap[output];
    }
    total += parseInt(outputString, 10);
  }
  return total;
}