let minPriceHousePerNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const typeHousing = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');

const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

const initForm = () => {
  // «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;
  typeHousing.addEventListener('change', (evt) => {
    let val = evt.target.value;
    pricePerNight.min = pricePerNight.placeholder = minPriceHousePerNight[val];
  });

  // «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого.
  timeCheckIn.addEventListener('change', (evt) => {
    let val = evt.target.value;
    timeCheckOut.value = val;
  });

  timeCheckOut.addEventListener('change', (evt) => {
    let val = evt.target.value;
    timeCheckIn.value = val;
  });
};

export {
  initForm
};
