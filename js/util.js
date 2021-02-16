/**
 * Universal function that returns a random integer or floating point number from the passed range inclusive
 * @param  {number} fromValue         Value "from"
 * @param  {number} toValue           Value "to"
 * @param  {number} numberSimbols=0   A number of simbols after comma
 * @returns {number}                  Number from range
 */
const getRandomNumberRangeInclusive = (fromValue, toValue, numberSimbols = 0) => {
  if (fromValue >= 0 && toValue > 0 && toValue > fromValue) {
    if ((Number.isInteger(fromValue) || Number.isInteger(toValue)) && numberSimbols === 0) {
      let randomValue = fromValue + Math.random() * (toValue - fromValue + 1);
      return Math.floor(randomValue);
    }

    let randomValue = fromValue + Math.random() * (toValue - fromValue);
    return randomValue.toFixed(numberSimbols);
  }

  return 'Проверьте диапазон. Диапазон может быть только положительный, включая ноль и значение «до» больше, чем значение «от»';
}

/**
 * Function getting a random element of an array
 * @param  {array} arr    Array
 * @returns  {any}        Random value array
 */
const getRandomElementFromArray = (arr) => {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Function for getting an array of random length from values without repetitions
 * @param  {array} arr  Array
 * @returns {array}     Array of random length
 */
const getArrayRandomLengthFromValues = (arr) => {
  const randomLength = getRandomNumberRangeInclusive(1, arr.length);
  let currentArray = arr.slice();
  let result = [];

  while (currentArray.length > 0) {
    let randomIndex = getRandomNumberRangeInclusive(0, currentArray.length - 1);
    let element = currentArray.splice(randomIndex, 1)[0];
    result.push(element);
  }

  return result.slice(0, randomLength);
}

/**
 * Function for getting value from number
 * @param  {number} number  Number
 * @param  {array} words    Array value
 * @returns {*}             Value of array
 */
const getValueFromNubmer = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

/**
 * @param  {object} elem Object
 * @param  {array} arr   Array
 * @returns  {boolean}   Boolean
 */
const getClassValue = (elem, arr) => {
  const className = elem.className.split('--');
  if (arr.includes(className[1])) {
    return true;
  }
  return false;
};

export {
  getRandomNumberRangeInclusive,
  getRandomElementFromArray,
  getArrayRandomLengthFromValues,
  getValueFromNubmer,
  getClassValue
};
