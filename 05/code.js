import dayFiveData from './data.js';

let dataArray = dayFiveData.split('\n');

export const challengeOne = () => {
  const hitMap = {}
  for (const line of dataArray) {
    const [start, end] = line.split(' -> ');
    const [x1, y1] = start.split(',');
    const [x2, y2] = end.split(',');
    if (x1 === x2) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      for (let i = min; i <= max; i++) {
        const newValue = (hitMap[`${x1},${i}`]) ? hitMap[`${x1},${i}`] + 1 : 1;
        hitMap[`${x1},${i}`] = newValue;
      }
    } else if (y1 === y2) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);
      for (let i = min; i <= max; i++) {
        const newValue = (hitMap[`${i},${y1}`]) ? hitMap[`${i},${y1}`] + 1 : 1;
        hitMap[`${i},${y1}`] = newValue;
      }
    }
  }
  const busyHits = Object.values(hitMap).filter(item => item >= 2);
  return busyHits.length;
}

export const challengeTwo = () => {
  const hitMap = {}
  let lines = 0;
  for (const line of dataArray) {
    const [start, end] = line.split(' -> ');
    let [x1, y1] = start.split(',');
    let [x2, y2] = end.split(',');
    x1 = parseInt(x1, 10)
    x2 = parseInt(x2, 10)
    y1 = parseInt(y1, 10)
    y2 = parseInt(y2, 10)
    if (x1 === x2) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      for (let i = min; i <= max; i++) {
        const newValue = (hitMap[`${x1},${i}`]) ? hitMap[`${x1},${i}`] + 1 : 1;
        hitMap[`${x1},${i}`] = newValue;
      }
    } else if (y1 === y2) {
      const min = Math.min(x1, x2);
      const max = Math.max(x1, x2);
      for (let i = min; i <= max; i++) {
        const newValue = (hitMap[`${i},${y1}`]) ? hitMap[`${i},${y1}`] + 1 : 1;
        hitMap[`${i},${y1}`] = newValue;
      }
    } else {
      // Diagonals
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      const diff = maxX - minX;
      if ((x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2)) {
        // Positive Correlation
        for (let i = 0; i <= diff; i++) {
          const hitMapKey = `${minX + i},${minY + i}`
          const newValue = (hitMap[hitMapKey]) ? hitMap[hitMapKey] + 1 : 1;
          hitMap[hitMapKey] = newValue;
        }
      } else {
        // Negative Correlation
        for (let i = 0; i <= diff; i++) {
          const hitMapKey = `${minX + i},${maxY - i}`;
          const newValue = (hitMap[hitMapKey]) ? hitMap[hitMapKey] + 1 : 1;
          hitMap[hitMapKey] = newValue;
        }
      }
    }
  }
  const busyHits = Object.values(hitMap).filter(item => item >= 2);
  return busyHits.length;
}