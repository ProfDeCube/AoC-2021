import dayFourteenData from './data.js';
import dayFourteenTestData from './testData.js';
import {findPathWithCost} from 'modern-dijkstra';

const formatData = (dataToFormat) => {
  let lines = dataToFormat.split('\n');
  lines = lines.map((line) => {
    let lineArray = line.split('');
    return lineArray.map((point) => parseInt(point, 10))
  })
  const fullLines = extrapolateFullMap(lines);
  const graph = {};
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      const routes = {};
      if (x > 0) routes[`${x - 1},${y}`] = lines[y][x - 1]
      if (x < lines[0].length - 1) routes[`${x + 1},${y}`] = lines[y][x + 1]
      if (y > 0) routes[`${x},${y - 1}`] = lines[y - 1][x]
      if (y < lines.length - 1) routes[`${x},${y + 1}`] = lines[y + 1][x]
      graph[`${x},${y}`] = routes
    }
  }

  const fullGraph = {};
  for (let y = 0; y < fullLines.length; y++) {
    for (let x = 0; x < fullLines[0].length; x++) {
      const routes = {};
      if (x > 0) routes[`${x - 1},${y}`] = fullLines[y][x - 1]
      if (x < fullLines[0].length - 1) routes[`${x + 1},${y}`] = fullLines[y][x + 1]
      if (y > 0) routes[`${x},${y - 1}`] = fullLines[y - 1][x]
      if (y < fullLines.length - 1) routes[`${x},${y + 1}`] = fullLines[y + 1][x]
      fullGraph[`${x},${y}`] = routes
    }
  }

  return {
    graph,
    lines,
    fullLines,
    fullGraph,
    startNode: '0,0',
    endNode: `${lines[0].length - 1},${lines.length - 1}`,
    fullEndNode: `${fullLines[0].length - 1},${fullLines.length - 1}`
  }
}

const extrapolateFullMap = (lines) => {
  const newLinesTemp = [];
  for (const line of lines) {
    const newLine = [];
    for (let i = 0; i < 5; i++) {
      for (const number of line) {
        let newNumber = number + i;
        if (newNumber > 9) newNumber -= 9;
        newLine.push(newNumber);
      }
    }
    newLinesTemp.push(newLine);
  }
  const newLines = [];
  for (let i = 0; i < 5; i++) {
    for (const line of newLinesTemp) {
      const newLine = line.map((number) => {
        let newNumber = number + i;
        if (newNumber > 9) newNumber -= 9;
        return newNumber;
      })
      newLines.push(newLine);
    }
  }
  return newLines;
}

const dataArray = formatData(dayFourteenData);
const testDataArray = formatData(dayFourteenTestData);
let data;

const challengeOne = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  const [shortestPath, distance] = findPathWithCost(data.graph, data.startNode, data.endNode);
  return distance;
}

const challengeTwo = (useTestData) => {
  data = (useTestData) ? { ...testDataArray } : { ...dataArray };
  const [shortestPath, distance] = findPathWithCost(data.fullGraph, data.startNode, data.fullEndNode);
  return distance;
}

global.fifteenOne = challengeOne; global.fifteenTwo = challengeTwo;
export default { challengeOne, challengeTwo }