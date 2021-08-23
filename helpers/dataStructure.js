export const groupByAlphabet = (arr = [], defaultProp = "label") => {
  const result = arr
  .sort((a, b) => a[defaultProp].localeCompare(b[defaultProp]))
  .reduce((acc, record) => {
    const alphabet = record[defaultProp][0];
    if (!acc[alphabet]) {
      acc[alphabet] = [record];
    } else {
      acc[alphabet].push(record);
    }
    return acc;
  }, {});

  return Object.keys(result).map(key => result[key])
};
