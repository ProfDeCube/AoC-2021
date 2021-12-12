import dayTwelveData from './data.js';
import dayTwelveTestData from './testData.js';

const formatData = (dataToFormat) => {
  const temp = dataToFormat.split('\n').map((row) => {
    const [from, to] = row.split('-');
    return { from, to, string: row };
  });

  const formattedData = [];
  const strings = [];
  for (const item of temp) {
    const reversedString = item.string.split('-').reverse().join('-');
    if (!item.string.includes('-start') && !item.string.includes('end-')) {
      if (!strings.includes(item.string)) {
        formattedData.push(item);
        strings.push(item.string)
      }
    }
    if (!item.string.includes('start-') && !item.string.includes('-end')) {
      if (!strings.includes(reversedString)) {
        formattedData.push({ from: item.to, to: item.from, string: reversedString });
  
        strings.push(reversedString)
      }
    }
    if (item.string.includes('-start') || item.string.includes('end-')) {
      if (!strings.includes(reversedString)) {
        formattedData.push({ from: item.to, to: item.from, string: reversedString });
        strings.push(reversedString)
      }
    }
  }

  return formattedData;
}

const dataArray = formatData(dayTwelveData);
const testDataArray = formatData(dayTwelveTestData);
let data

const findAllPathsOneSmallCaveTwice = (
  start, routes, route, visitedSmallCaves, smallVisitedTwice,
) => {
  let paths = data.filter((item) => item.from == start);
  const possibleSmallRevisits = [];
  paths = paths.filter((path) => {
    if (path.to.toLowerCase() === path.to) {
      const smallUnvisited = !visitedSmallCaves.includes(path.to);
      if (!smallUnvisited) possibleSmallRevisits.push(path);
      return smallUnvisited;
    }
    return true;
  });
  for (const path of paths) {
    const currentRoute = [...route];
    const currentVisitedSmallCaves = [...visitedSmallCaves];
    if (path.to.toLowerCase() === path.to) {
      currentVisitedSmallCaves.push(path.to)
    }
    currentRoute.push(path.string)
    if (path.to === 'end') {
      let routeExists = false;
      if (!routeExists) routes.push(currentRoute)
    } else {
      findAllPathsOneSmallCaveTwice(
        path.to, routes, currentRoute, currentVisitedSmallCaves, smallVisitedTwice,
      );
    }
  }
  if (!smallVisitedTwice) {
    for (const path of possibleSmallRevisits) {
      const currentRoute = [...route];
      const currentVisitedSmallCaves = [...visitedSmallCaves];
      if (path.to.toLowerCase() === path.to) {
        currentVisitedSmallCaves.push(path.to)
      }
      currentRoute.push(path.string)
      if (path.to === 'end') {
        routes.push(currentRoute)
      } else {
        findAllPathsOneSmallCaveTwice(
          path.to, routes, currentRoute, currentVisitedSmallCaves, true,
        );
      }
    }
  }

}

const challengeOne = (useTestData) => {
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  const startingPaths = data.filter((item) => item.from == 'start');
  const routes = []
  for (const path of startingPaths) {
    const route = [];
    const visitedSmallCaves = [];
    if (path.to.toLowerCase() === path.to) {
      visitedSmallCaves.push(path.to)
    }
    route.push(path.string)
    findAllPathsOneSmallCaveTwice(path.to, routes, route, visitedSmallCaves, true);
  }
  return routes.length;
}


const challengeTwo = (useTestData) => {
  data = (useTestData) ? [...testDataArray] : [...dataArray];
  const startingPaths = data.filter((item) => item.from == 'start');
  const routes = []
  for (const path of startingPaths) {
    const route = [];
    const visitedSmallCaves = [];
    if (path.to.toLowerCase() === path.to) {
      visitedSmallCaves.push(path.to)
    }
    route.push(path.string)
    findAllPathsOneSmallCaveTwice(path.to, routes, route, visitedSmallCaves, false);
  }
  return routes.length;
}

global.twelveOne = challengeOne; global.twelveTwo = challengeTwo;
export default { challengeOne, challengeTwo }