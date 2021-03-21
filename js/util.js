const ERROR_SHOW_TIME = 5000;

/**
 * Universal function that returns a random integer or floating point number from the passed range inclusive
 * @param  {number} fromValue         Value "from"
 * @param  {number} toValue           Value "to"
 * @param  {number} numberSimbols     A number of simbols after comma
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
 * Function for checking the existence of a class value in an array
 * @param  {object} elem Object - value of class
 * @param  {array} arr   Array - for checking
 * @returns  {boolean}   Boolean
 */
const hasClassValueInArray = (elem, arr) => {
  const className = elem.className.split('--');
  if (arr.includes(className[1])) {
    return true;
  }
  return false;
};

/**
 * Function to display an error message when loading announcements data
 * @param {string} err  Error type string
 */
const onErrorGetData = (err) => {
  const mapContainer = document.querySelector('.map');
  const errorBlock = document.createElement('div');

  errorBlock.style.zIndex = 1000;
  errorBlock.style.position = 'absolute';
  errorBlock.style.left = 0;
  errorBlock.style.bottom = '50px';
  errorBlock.style.right = 0;
  errorBlock.style.padding = '10px 5px';
  errorBlock.style.fontSize = '16px';
  errorBlock.style.textAlign = 'center';
  errorBlock.style.color = 'white';
  errorBlock.style.backgroundColor = 'red';

  errorBlock.textContent = err;

  mapContainer.append(errorBlock);

  setTimeout(() => {
    errorBlock.remove();
  }, ERROR_SHOW_TIME);
};

/**
 * Function for testing keystrokes "Esc"
 * @param  {object} evt Data object on event
 * @return  {boolean}   Which key was pressed
 */
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

/**
 * Function for testing keystrokes "Enter"
 * @param  {object} evt Data object on event
 * @return {boolean}    Which key was pressed
 */
const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

/**
 * Debouncing function
 * @param  {function} fn  calback function
 * @param  {number} ms    delay time
 */
const debounceHandler = (fn, ms) => {
  let timeout;

  return () => {
    clearTimeout(timeout);

    timeout = setTimeout(fn, ms);
  };
};

export {
  getRandomNumberRangeInclusive,
  getRandomElementFromArray,
  getArrayRandomLengthFromValues,
  getValueFromNubmer,
  hasClassValueInArray,
  onErrorGetData,
  isEscEvent,
  isEnterEvent,
  debounceHandler
};
