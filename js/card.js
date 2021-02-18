import {
  getValueFromNubmer,
  hasClassValueInArray
} from './util.js';

const ROOMS_VALUE = [
  'комната',
  'комнаты',
  'комнат',
];
const GUESTS_VALUE = [
  'гостя',
  'гостей',
  'гостей',
];
const typeValueOffer = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const listCardsMapCanvas = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup'); // содержимое шаблона #card

/**
 * Function for creating card images from an array
 * @param  {object} elem Object - template element
 * @param  {object} container Object - parent element container
 * @param  {array} arr   Array  - an array of links
 * @return  {object}     Object - list of photo items
 */
const createImagesCardFromArray = (elem, container, arr) => {
  container.innerHTML = '';
  arr.forEach((currentValue) => {
    let currentElement = elem.cloneNode();
    currentElement.src = currentValue;
    return container.appendChild(currentElement);
  });
};

/**
 * Function of showing the card on the map
 * @param  {object} dataCard single ad card data object
 */
const showCardOnMap = (dataCard) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const dataAuthor = dataCard.author;
  const dataOffer = dataCard.offer;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const features = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photo = photosContainer.querySelector('.popup__photo');

  cardElement.querySelector('.popup__title').textContent = dataOffer.title; // Выведите заголовок объявления offer.title в заголовок .popup__title.
  cardElement.querySelector('.popup__text--address').textContent = dataOffer.address; // Выведите адрес offer.address в блок .popup__text--address.
  cardElement.querySelector('.popup__text--price').textContent = `${dataOffer.price} ₽/ночь`; //Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  cardElement.querySelector('.popup__type').textContent = typeValueOffer[dataOffer.type]; //В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace
  cardElement.querySelector('.popup__text--capacity').textContent = `${dataOffer.rooms} ${getValueFromNubmer(dataOffer.rooms, ROOMS_VALUE)} для ${dataOffer.guests} ${getValueFromNubmer(dataOffer.guests, GUESTS_VALUE)}`; // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataOffer.checkin}, выезд до ${dataOffer.checkout}`; // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».

  // В список .popup__features выведите все доступные удобства в объявлении.
  features.forEach((currentValue) => {
    if (!hasClassValueInArray(currentValue, dataOffer.features)) {
      currentValue.remove();
    }
    return currentValue;
  });

  cardElement.querySelector('.popup__description').textContent = dataOffer.description; // В блок .popup__description выведите описание объекта недвижимости offer.description.
  createImagesCardFromArray(photo, photosContainer, dataOffer.photos); // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
  cardElement.querySelector('.popup__avatar').src = dataAuthor.avatar; // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

  listCardsMapCanvas.appendChild(cardElement);
};

export {
  showCardOnMap
};
