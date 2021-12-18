export const addToObject = (object, key, count) => {
  if (Object.keys(object).includes(key)) {
    object[key] += count
  } else object[key] = count;
};

export const sumOfArithmeticProgression = (n) => {
  return n * (n + 1) / 2;
}

const hexCharsToBin = (hexString) => {
  let binString = '';
  for (const char of hexString) {
    binString += parseInt(char, 16).toString(2).padStart(4, '0');
  }
  return binString;
}