import daySeventeenData from './data.js';
import daySeventeenTestData from './testData.js';

const targetsRegex = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/

const formatData = (dataToFormat) => {
  const [targetsMatch, x1, x2, y1, y2] = dataToFormat.match(targetsRegex)
  return { x1, x2, y1, y2 }
}

const dataArray = formatData(daySeventeenData);
const testDataArray = formatData(daySeventeenTestData);
let data;

let Vx, Vy, x, y, maxHeight;

const checkPosition = () => {
  if (x >= data.x1 && x <= data.x2 && y >= data.y1 && y <= data.y2) return 'HIT'
  if (x > data.x2 || y < data.y1) return 'MISS'
  return 'PENDING'
}

const doSimulation = () => {
  x += Vx;
  y += Vy;
  if(Vx !== 0) Vx--;
  Vy--;
  if(y > maxHeight) maxHeight = y;
  const didHit = checkPosition();
  if (didHit !== 'PENDING') {
    return didHit
  } else return doSimulation();
}

const hits = []

const challengeOne = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  for (let initialVX = 20; initialVX <= 230; initialVX++) {
    for (let initialVY = -99; initialVY <= 98; initialVY++) {
      maxHeight = 0;
      x = 0;
      y = 0;
      Vx = initialVX;
      Vy = initialVY;
      const didHit = doSimulation();
      if (didHit === 'HIT') hits.push({initialVX, initialVY, maxHeight});
    }
  }
  hits.sort((a, b) => b.maxHeight - a.maxHeight)
  return hits[0].maxHeight;
}


const challengeTwo = (useTestData) => {
  
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  for (let initialVX = 20; initialVX <= 230; initialVX++) {
    for (let initialVY = -99; initialVY <= 98; initialVY++) {
      maxHeight = 0;
      x = 0;
      y = 0;
      Vx = initialVX;
      Vy = initialVY;
      const didHit = doSimulation();
      if (didHit === 'HIT') hits.push({initialVX, initialVY, maxHeight});
    }
  }
  return hits.length
}

global.seventeenOne = challengeOne; global.seventeenTwo = challengeTwo;
export default { challengeOne, challengeTwo }