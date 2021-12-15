export const addToObject = (object, key, count) => {
  if (Object.keys(object).includes(key)) {
    object[key] += count
  } else object[key] = count;
};
