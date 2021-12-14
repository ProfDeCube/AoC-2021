import dayFourteenData from './data.js';
import dayFourteenTestData from './testData.js';
import { addToObject } from '../common/utils.js'

const formatData = (dataToFormat) => {
  let [input, polyPairs] = dataToFormat.split('\n\n');
  const inputPairs = {};
  for (let i = 0; i < input.length - 1; i++) {
    const pair = `${input[i]}${input[i + 1]}`;
    addToObject(inputPairs, pair, 1);
  }
  const inputPairMap = {};
  polyPairs.split('\n').map((polyPair) => {
    let [pair, extra] = polyPair.split(' -> ');
    let [first, second] = pair.split('');
    inputPairMap[`${first}${second}`] = [`${first}${extra}`, `${extra}${second}`];
  })

  return { input, inputPairs, inputPairMap }
}

const dataArray = formatData(dayFourteenData);
const testDataArray = formatData(dayFourteenTestData);
let data;

const doPairIterate = () => {
  const newInputPairs = {};
  for (const inputPair in data.inputPairs) {
    const count = data.inputPairs[inputPair];
    for (const outputPair of data.inputPairMap[inputPair]) {
      if (Object.keys(newInputPairs).includes(outputPair)) {
        newInputPairs[outputPair] += count
      } else newInputPairs[outputPair] = count;
    }
  }
  data.inputPairs = newInputPairs;
}

const doIterations = (interations) => {
  for (let iteration = 0; iteration < interations; iteration++) {
    doPairIterate(interations);
  }

  const allOccurances = {};
  for (const pair in data.inputPairs) {
    const count = data.inputPairs[pair];
    addToObject(allOccurances, pair[0], count);
  }
  const startLetter = data.input[0];
  const endLetter = data.input[data.input.length - 1];
  addToObject(allOccurances, endLetter, 1);
  const values = Object.values(allOccurances).sort((a, b) => b - a);
  return (values[0] - values[values.length - 1])
}

const challengeOne = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  const interations = 10;
  return doIterations(interations);
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  const interations = 40;
  return doIterations(interations);
}

global.fourteenOne = challengeOne; global.fourteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }