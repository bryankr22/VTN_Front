const evalAccumulator = (acc, { key, record }) => {
  if (!acc[key]) {
    acc[key] = [record];
  } else {
    acc[key].push(record);
  }
  return acc;
}

export const groupByAlphabet = (arr = [], defaultProp = "label") => {
  const result = arr
    .sort((a, b) => a[defaultProp].localeCompare(b[defaultProp]))
    .reduce((acc, record) => {
      const key = record[defaultProp][0];
      return evalAccumulator(acc, { key, record });
    }, {});

  return Object.keys(result).map(key => result[key])
};

export const groupByDecade = (arr = [], defaultProp = "label") => {
  const result = arr
    .sort((a, b) => b[defaultProp].localeCompare(a[defaultProp]))
    .reduce((acc, record) => {
      const key = record[defaultProp].split('').slice(0, 3).join('');
      return evalAccumulator(acc, { key, record });
    }, {});

  const list = Object.keys(result).map(key => result[key]);
  return [...list].reverse();
};

export const extractMinYearRange = (str = '') => {
  const [year] = str.split(':');
  return Number(year) || 0;
}

export const extractMaxYearRange = (str = '') => {
  const [, year] = str.split(':');
  return Number(year) || new Date().getFullYear();
}

export const normalize = (function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
          var c = str.charAt(i);
          if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
          else ret.push(c);
      }
      return ret.join("").split(" ").join("-").split("%").join("").split("?").join("").split("/").join("");
  };
})();