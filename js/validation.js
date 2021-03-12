
const errShowSeatsForGuests = ['Значение количества комнат должно быть: 100 комнат'];

/**
 * Function for setting the style of an invalid form field
 * @param  {object} elem  checked field
 */
const setInvalidStyle = (elem) => {
  elem.style.borderWidth = '2px';
  elem.style.borderStyle = 'solid';
  elem.style.borderColor = 'red';
};

/**
 * Function that checks the correctness of filling the ad title
 * @param  {object} elem        checked field
 * @param  {number} minLength   minimum number of characters
 * @param  {numver} maxLenght   maximum number of characters
 */
const validateAnnouncementTitle = (elem, minLength, maxLenght) => {
  elem.addEventListener('input', () => {
    const valueLength = elem.value.length;

    if (valueLength < minLength) {
      setInvalidStyle(elem);
      elem.setCustomValidity('Необходимо еще ' + (minLength - valueLength) + ' симв.');
    } else if (valueLength > maxLenght) {
      setInvalidStyle(elem);
      elem.setCustomValidity('Удалите лишние ' + (valueLength - maxLenght) + ' симв.');
    } else {
      elem.style = '';
      elem.setCustomValidity('');
    }

    elem.reportValidity();
  });
}

/**
 * Function that checks the price per night field
 * @param  {object} elem              checked field
 * @param  {object} typeHousing       field with housing type
 * @param  {object} minPricesHousing  minimum prices for specific housing
 * @param  {number} maxPriceHousing   maximum housing price
 */
const validatePrice = (elem, typeHousing, minPricesHousing, maxPriceHousing) => {
  elem.addEventListener('input', () => {
    let valueType = typeHousing.value;
    let minPrice = minPricesHousing[valueType];
    const maxPrice = maxPriceHousing;
    const currentValue = elem.value;

    if (currentValue < minPrice) {
      setInvalidStyle(elem);
      elem.setCustomValidity(`Текущая цена меньше минимальной (${minPrice} руб.) на ${minPrice - currentValue} руб.`);
    } else if (currentValue > maxPrice) {
      setInvalidStyle(elem);
      elem.setCustomValidity(`Текущая цена больше максимальной (${maxPrice} руб.) на ${currentValue - maxPrice} руб.`);
    } else {
      elem.style = '';
      elem.setCustomValidity('');
    }

    elem.reportValidity();
  });
}

/**
 * Function that checks the number of seats depending on the number of rooms
 * @param  {object} elem          checked field
 * @param  {object} numberRooms   field with the number of rooms
 */
const validateSeats = (elem, numberRooms) => {
  const currentValue = elem.value;
  const valueRoom = numberRooms.value;

  if (currentValue == 0 && valueRoom != 100) {
    setInvalidStyle(elem);
    elem.setCustomValidity(errShowSeatsForGuests[currentValue]);
  } else if (currentValue > valueRoom) {
    setInvalidStyle(elem);
    elem.setCustomValidity(`Значение количества комнат должно быть: ${currentValue} комната(ы)`);
  } else {
    elem.style = '';
    elem.setCustomValidity('');
  }

  elem.reportValidity();

  elem.addEventListener('change', () => {
    validateSeats(elem, numberRooms);
  });
};

export {validateAnnouncementTitle, validatePrice, validateSeats};
