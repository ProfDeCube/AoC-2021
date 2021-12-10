import dayOne from './01/code.js';
import dayTwo from './02/code.js';
import dayThree from './03/code.js';
import dayFour from './04/code.js';
import dayFive from './05/code.js';
import daySix from './06/code.js';
import daySeven from './07/code.js';
import dayEight from './08/code.js';
import dayNine from './09/code.js';
import dayTen from './10/code.js';

let testMode = false;
const args = [...process.argv];
if(args.indexOf("test") !== -1 || args.indexOf("-t") !== -1) {
  const index = args.indexOf("test") || args.indexOf("-t");
  args.splice(index, 1);
  testMode = true;
}
const [node, index, day, challenge] = args

const intToString = {
  1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six',
  7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten'
};

const runChallenge = (dayNumber, challengeNumber) => {
  const challengeName = intToString[dayNumber].toLowerCase() + intToString[challengeNumber]
  const startTime = new Date();
  const answer = global[challengeName](testMode);
  const endTime = new Date();
  let timeTaken = endTime - startTime;
  if (timeTaken > 1000) {
    timeTaken = `${(timeTaken / 1000).toFixed(1)}s`;
  } else {
    timeTaken = `${timeTaken}ms`;
  }
  const testDataString = (testMode) ? 'test data ' : ''
  console.log(`The ${testDataString}answer to day ${dayNumber} challenge ${challengeNumber} is: ${answer} (took ${timeTaken})`);
}

if (day) {
  if (challenge) {
    runChallenge(day, challenge);
  } else {
    runChallenge(day, 1);
    runChallenge(day, 2);
  }
} else {
  for (const dayNumber of Object.keys(intToString)) {
    runChallenge(parseInt(dayNumber, 10), 1);
    runChallenge(parseInt(dayNumber, 10), 2);
    console.log("")
  }
}