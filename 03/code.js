import dayThreeData from './data.js';

const dataArray = dayThreeData.split('\n');

export const challengeOne = () => {
    const breakdown = {}
    for (let i = 0; i < dataArray[0].length; i++) {
        breakdown[i] = {'zero': 0, 'one': 0}
    }
    for (let binaryNumber of dataArray) {
        for (let i = 0; i < binaryNumber.length; i++) {
            if(binaryNumber[i] == '1') {
                breakdown[i].one += 1
            } else {
                breakdown[i].zero += 1
            }
        }
    }
    let gammaRate = '';
    let epsilonRate = '';
    for (let i = 0; i < dataArray[0].length; i++) {
        if (breakdown[i].zero > breakdown[i].one) {
            gammaRate += '0';
            epsilonRate += '1';
        } else {
            gammaRate += '1';
            epsilonRate += '0';
        }
    }
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

const digitIterate = (array, digit, keepMostCommon) => {
    let occurances = {one: 0, zero: 0};
    for (let binaryNumber of array) {
        if(binaryNumber[digit] == '1') {
            occurances.one += 1
        } else {
            occurances.zero += 1
        }
    }
    if (occurances.zero > occurances.one) {
        if (keepMostCommon) return array.filter(item => item[digit] === '0')
        return array.filter(item => item[digit] === '1')
    }
    if (keepMostCommon) return array.filter(item => item[digit] === '1')
    return array.filter(item => item[digit] === '0')
}

export const challengeTwo = () => {
    let oxygenArray = [...dataArray];
    let co2Array = [...dataArray];
    for (let i = 0; i < dataArray[0].length; i++) {
        if(co2Array.length !== 1) {
            co2Array = digitIterate(co2Array, i, false)
        }
        if(oxygenArray.length !== 1) {
            oxygenArray = digitIterate(oxygenArray, i, true)
        }
        if(co2Array.length == 1 && oxygenArray.length == 1) {
            return parseInt(co2Array[0], 2) * parseInt(oxygenArray[0], 2)
        }
    }

}

global.threeOne = challengeOne; global.threeTwo = challengeTwo;
export default {challengeOne, challengeTwo}