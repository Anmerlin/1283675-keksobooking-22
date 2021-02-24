let minPriceHousePerNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const typeHousing = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');

const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

/**
 * Form state change function
 * @param  {boolean} flag true - active, false - diasbled
 */
const changeStateForm = (flag) => {
  if (flag) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }
};

/**
 * Function for changing the state of interactive form elements
 * @param  {object} formName constants defining the form
 */
const changeStateFormControls = (formName) => {
  const formElements = formName.elements;
  for (const element of formElements) {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled')
    }
  }
};

/**
 * Function for changing the states of forms and interactive elements
 * @param  {boolean} flag true - active form, false - diasbled form
 */
const setStatusForm = (flag) => {
  changeStateForm(flag);
  changeStateFormControls(adForm);
  changeStateFormControls(mapFilters);
};

/**
 * Form initialization function
 */
const initForm = () => {
  // Реализуйте с помощью JavaScript перевод страницы в неактивное состояние, все пункты, кроме первого про карту.
  setStatusForm(false);

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

export {initForm, setStatusForm};
