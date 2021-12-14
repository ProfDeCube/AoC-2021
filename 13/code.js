import dayThirteenData from './data.js';
import dayThirteenTestData from './testData.js';

const formatData = (dataToFormat) => {
  let [dots, folds] = dataToFormat.split('\n\n');
  dots = dots.split('\n');
  folds = folds.split('\n');
  return { dots, folds }
}

const dataArray = formatData(dayThirteenData);
const testDataArray = formatData(dayThirteenTestData);
let data

const foldHorizontal = (foldPoint) => {
  const newDots = [];
  for (const dot of data.dots) {
    const [x, y] = dot.split(',');
    if (parseInt(x, 10) > foldPoint) {
      const coords = `${foldPoint - (x - foldPoint)},${y}`;
      if (!newDots.includes(coords)) newDots.push(coords);
    } else {
      if (!newDots.includes(dot)) newDots.push(dot);
    }
    data.dots = newDots;
  }
}

const foldVertical = (foldPoint) => {
  const newDots = [];
  for (const dot of data.dots) {
    const [x, y] = dot.split(',');
    if (parseInt(y, 10) > foldPoint) {
      const coords = `${x},${foldPoint - (y - foldPoint)}`;
      if (!newDots.includes(coords)) newDots.push(coords);
    } else {
      if (!newDots.includes(dot)) newDots.push(dot);
    }
    data.dots = newDots;
  }
}

const challengeOne = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };

  for (const fold of data.folds) {
    if (fold.includes('y=')) {
      foldVertical(parseInt(fold.split('=').pop(), 10))
      break;
    } else {
      foldHorizontal(parseInt(fold.split('=').pop(), 10))
      break;
    }
  }
  return data.dots.length;
}


const challengeTwo = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };

  for (const fold of data.folds) {
    if (fold.includes('y=')) {
      foldVertical(parseInt(fold.split('=').pop(), 10))
    } else {
      foldHorizontal(parseInt(fold.split('=').pop(), 10))
    }
  }
  let width = 0;
  let height = 0;
  // Calculate width/height of output
  for(const dot of data.dots) {
    let [x, y] = dot.split(',')
    x = parseInt(x, 10);
    if (x > width) width = x;
    y = parseInt(y, 10);
    if (y > height) height = y;
  }
  // Create array to place dots
  const outputArray = [];
  for(let y = 0; y <= height; y++) {
    const rowArray = [];
    for(let x = 0; x <= width; x++) {
      rowArray.push('⬛');
    }
    outputArray.push(rowArray);
  }
  // Fill in the dots
  for(const dot of data.dots) {
    let [x, y] = dot.split(',')
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    outputArray[y][x] = '⬜'
  }
  return '\n' + outputArray.map((row) => row.join('')).join('\n') + '\n'
}

global.thirteenOne = challengeOne; global.thirteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }