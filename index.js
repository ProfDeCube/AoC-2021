import { challengeOne as oneOne, challengeTwo as oneTwo} from './01/code.js';
global.oneOne = oneOne; global.oneTwo = oneTwo;
import { challengeOne as twoOne, challengeTwo as twoTwo} from './02/code.js';
global.twoOne = twoOne; global.twoTwo = twoTwo;
import { challengeOne as threeOne, challengeTwo as threeTwo} from './03/code.js';
global.threeOne = threeOne; global.threeTwo = threeTwo;
import { challengeOne as fourOne, challengeTwo as fourTwo} from './04/code.js';
global.fourOne = fourOne; global.fourTwo = fourTwo;
import { challengeOne as fiveOne, challengeTwo as fiveTwo} from './05/code.js';
global.fiveOne = fiveOne; global.fiveTwo = fiveTwo;
import { challengeOne as sixOne, challengeTwo as sixTwo} from './06/code.js';
global.sixOne = sixOne; global.sixTwo = sixTwo;
import { challengeOne as sevenOne, challengeTwo as sevenTwo} from './07/code.js';
global.sevenOne = sevenOne; global.sevenTwo = sevenTwo;
import { challengeOne as eightOne, challengeTwo as eightTwo} from './08/code.js';
global.eightOne = eightOne; global.eightTwo = eightTwo;

const [node, index, day, challenge] = process.argv;

const intToString = {
    1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six',
    7: 'Seven', 8: 'Eight'
};

if (challenge) {
    const challengeName = intToString[day].toLowerCase() + intToString[challenge]
    const answer = global[challengeName]();
    console.log(`The answer to day ${day} challenge ${challenge} is: ${answer}`);
} else {
    const challengeOneName = intToString[day].toLowerCase() + intToString[1]
    const answerOne = global[challengeOneName]();
    console.log(`The answer to day ${day} challenge ${1} is: ${answerOne}`);
    const challengeTwoName = intToString[day].toLowerCase() + intToString[2]
    const answerTwo = global[challengeTwoName]();
    console.log(`The answer to day ${day} challenge ${2} is: ${answerTwo}`);
}