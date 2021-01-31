'use strict';

// Function that returns a random integer from the passed range inclusive
const getRandomInteger = (fromValue, toValue) => {
  if (fromValue >= 0 && toValue > 0 && toValue > fromValue) {
    let randomValue = fromValue + Math.random() * (toValue - fromValue + 1);
    return Math.floor(randomValue);
  }

  return 'Проверьте диапазон. Диапазон может быть только положительный, включая ноль и значение «до» больше, чем значение «от»';

}

// Function that returns a random floating point number from the passed range inclusive with the number of decimal places
const getRandomFloatInteger = (fromValue, toValue, numberSimbols = 1) => {
  if (fromValue >= 0 && toValue > 0 && toValue > fromValue) {
    let randomValue = fromValue + Math.random() * (toValue - fromValue);
    return randomValue.toFixed(numberSimbols);
  }

  return 'Проверьте диапазон. Диапазон может быть только положительный, включая ноль и значение «до» больше, чем значение «от»';
}

// Deriving functions for testing ESlint, else error))
getRandomInteger(1,9);
getRandomFloatInteger(0.3,3.12,3);
