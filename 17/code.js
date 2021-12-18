import daySeventeenData from './data.js';
import daySeventeenTestData from './testData.js';
import { sumOfArithmeticProgression } from '../common/utils.js'

const targetsRegex = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/

const formatData = (dataToFormat) => {
  let [targetsMatch, x1, x2, y1, y2] = dataToFormat.match(targetsRegex)
  x1 = parseInt(x1, 10)
  x2 = parseInt(x2, 10)
  y1 = parseInt(y1, 10)
  y2 = parseInt(y2, 10)
  return { x1, x2, y1, y2 }
}

const dataArray = formatData(daySeventeenData);
const testDataArray = formatData(daySeventeenTestData);
let data;

let Vx, Vy, x, y, maxHeight;


let maxYHit = false;
const checkPosition = () => {
  if (x >= data.x1 && x <= data.x2 && y >= data.y1 && y <= data.y2) return 'HIT'
  // If the probe has passed horizontally but hasn't passed vertically
  // then it's being fired too high, we can stop aiming higher
  if (x > data.x2 && y > data.y2) maxYHit = true;
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

let startVX = 0;
let foundStartVX = false;
const calculateAllHits = () => {
  const hits = [];
  while(!foundStartVX) {
    startVX++;
    foundStartVX = sumOfArithmeticProgression(startVX) > data.x1;
  }
  for (let initialVX = startVX; initialVX <= data.x2; initialVX++) {
    maxYHit = false;
    for (let initialVY = data.y1; initialVY <= Math.abs(data.y1); initialVY++) {
      maxHeight = 0;
      x = 0;
      y = 0;
      Vx = initialVX;
      Vy = initialVY;
      const didHit = doSimulation();
      if (didHit === 'HIT') hits.push({initialVX, initialVY, maxHeight});
      // use a calculation within the box check to see if we should continue with the Y
      if(maxYHit) break
    }
  }
  return hits;
}

const challengeOne = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  const hits = calculateAllHits().sort((a, b) => b.maxHeight - a.maxHeight)
  return hits[0].maxHeight;
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  return calculateAllHits().length
}

global.seventeenOne = challengeOne; global.seventeenTwo = challengeTwo;
export default { challengeOne, challengeTwo }