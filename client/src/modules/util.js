export const arrToHashByKey = (arr, key) => {
  return arr.reduce((hash, item) => {
    const val = item[key];

    if (typeof val !== "undefined") {
      hash[val] = item;
    }

    return hash;
  });
};
