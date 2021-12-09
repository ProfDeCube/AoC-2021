import { challengeOne as oneOne, challengeTwo as oneTwo } from './01/code.js';
global.oneOne = oneOne; global.oneTwo = oneTwo;
import { challengeOne as twoOne, challengeTwo as twoTwo } from './02/code.js';
global.twoOne = twoOne; global.twoTwo = twoTwo;
import { challengeOne as threeOne, challengeTwo as threeTwo } from './03/code.js';
global.threeOne = threeOne; global.threeTwo = threeTwo;
import { challengeOne as fourOne, challengeTwo as fourTwo } from './04/code.js';
global.fourOne = fourOne; global.fourTwo = fourTwo;
import { challengeOne as fiveOne, challengeTwo as fiveTwo } from './05/code.js';
global.fiveOne = fiveOne; global.fiveTwo = fiveTwo;
import { challengeOne as sixOne, challengeTwo as sixTwo } from './06/code.js';
global.sixOne = sixOne; global.sixTwo = sixTwo;
import { challengeOne as sevenOne, challengeTwo as sevenTwo } from './07/code.js';
global.sevenOne = sevenOne; global.sevenTwo = sevenTwo;
import { challengeOne as eightOne, challengeTwo as eightTwo } from './08/code.js';
global.eightOne = eightOne; global.eightTwo = eightTwo;
import { challengeOne as nineOne, challengeTwo as nineTwo } from './09/code.js';
global.nineOne = nineOne; global.nineTwo = nineTwo;

const [node, index, day, challenge] = process.argv;

const intToString = {
  1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six',
  7: 'Seven', 8: 'Eight', 9: 'Nine'
};

const runChallenge = (dayNumber, challengeNumber) => {
  const challengeName = intToString[dayNumber].toLowerCase() + intToString[challengeNumber]
  const startTime = new Date();
  const answer = global[challengeName]();
  const endTime = new Date();
  let timeTaken = endTime - startTime;
  if (timeTaken > 1000) {
    timeTaken = `${(timeTaken / 1000).toFixed(1)}s`;
  } else {
    timeTaken = `${timeTaken}ms`;
  }
  console.log(`The answer to day ${dayNumber} challenge ${challengeNumber} is: ${answer} (took ${timeTaken})`);
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
  }
}