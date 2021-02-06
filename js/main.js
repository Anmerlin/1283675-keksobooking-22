'use strict';

const TITLE_OFFER = ['Superior apartment', 'Sweet home', 'Luxurious palace', 'Open bungalow'];
const TYPE_OFFER = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
const FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION_OFFER = ['Superior apartment overlooking the park', 'A spacious palace where you can get lost', 'Two-storey house with vegetable garden and garage', 'Bungalow blown by all the winds'];
const PHOTOS_OFFER = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

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
 * Function of creating an ad object announcement
 * @returns {object} Object
 */
const createAnnouncement = () => {
  const locationValueX = getRandomNumberRangeInclusive(35.65, 35.7, 5);
  const locationValueY = getRandomNumberRangeInclusive(139.7, 139.8, 5);
  const addressValue = locationValueX + ', ' + locationValueY;

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumberRangeInclusive(1, 8) + '.png', // строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это случайное число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д.
    },
    offer: {
      title: getRandomElementFromArray(TITLE_OFFER), // строка — заголовок предложения. Придумайте самостоятельно.
      address: addressValue, // строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
      price: getRandomNumberRangeInclusive(50, 500), // число — стоимость. Любое положительное число.
      type: getRandomElementFromArray(TYPE_OFFER), //строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.
      rooms: getRandomNumberRangeInclusive(2, 10), //число — количество комнат. Любое положительное число.
      guests: getRandomNumberRangeInclusive(6, 20), // число — количество гостей, которое можно разместить. Любое положительное число.
      checkin: getRandomElementFromArray(CHECKIN_CHECKOUT_OFFER), // строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      checkout: getRandomElementFromArray(CHECKIN_CHECKOUT_OFFER), // строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
      features: getArrayRandomLengthFromValues(FEATURES_OFFER), // массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
      description: getRandomElementFromArray(DESCRIPTION_OFFER), // строка — описание помещения. Придумайте самостоятельно.
      photos: getArrayRandomLengthFromValues(PHOTOS_OFFER), // массив строк — массив случайной длины из значений: http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg.
    },
    location: {
      x: locationValueX, // число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
      y: locationValueY, // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    },
  };
};

//const similarAnnouncements = new Array(SIMILAR_ANNOUNCEMENTS_COUNT).fill(null).map(() => createaAnnouncement());

const similarAnnouncements = (count) => {
  let announcements = [];
  for (let i = 0; i < count; i++) {
    announcements[i] = createAnnouncement();
  }
  return announcements;
}

similarAnnouncements(SIMILAR_ANNOUNCEMENTS_COUNT);
