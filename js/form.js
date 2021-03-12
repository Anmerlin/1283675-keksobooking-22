const MIN_ANNOUNCEMENT_TITLE_LENGTH = 30;
const MAX_ANNOUNCEMENT_TITLE_LENGTH = 100;
const MAX_PRICE_HOUSING = 1000000;

import {validateAnnouncementTitle, validatePrice, validateSeats} from './validation.js';
import {sendDataFormAnnouncement} from './requests.js';
import {resetDataMap} from './map.js';

const minPriceHousePerNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const roomsForGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
}

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const announcementTitle = document.querySelector('#title');
const typeHousing = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');

const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

const numberRooms = document.querySelector('#room_number');
const numberSeats = document.querySelector('#capacity');

const resetFormButton = document.querySelector('.ad-form__reset');

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
 * Function of clearing the state of the form and map
 * @param  {function} data Function for setting markers on the map
 */
const clearForms = (data) => {
  adForm.reset();
  mapFilters.reset();
  setTimeout(() => {
    resetDataMap(data);
  }, 100);
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

  //Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей
  numberRooms.addEventListener('change', (evt) => {
    const currentVal = evt.target.value;
    const descendants = numberSeats.children;
    const capacitySeat = roomsForGuests[currentVal];
    const maxCapacitySeats = Math.max(...capacitySeat);

    if (numberSeats.hasAttribute('style')) {
      numberSeats.removeAttribute('style');
      numberSeats.setCustomValidity('')
    }

    for (let descendant of descendants) {
      const val = Number(descendant.value);

      if (capacitySeat.includes(val)) {
        descendant.disabled = false;

        if (val === maxCapacitySeats) {
          descendant.selected = true;
        }
      } else {
        descendant.disabled = true
      }
    }
  });
};

// Validate form
validateAnnouncementTitle(announcementTitle, MIN_ANNOUNCEMENT_TITLE_LENGTH, MAX_ANNOUNCEMENT_TITLE_LENGTH);
validatePrice(pricePerNight, typeHousing, minPriceHousePerNight, MAX_PRICE_HOUSING);
validateSeats(numberSeats, numberRooms);

/**
 * Function for setting actions with a form
 * @param  {function} popup Function to show a message when submitting a form
 * @param  {function} data  Function for setting markers on the map
 */
const setActionForm = (popup, data) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendDataFormAnnouncement(
      () => popup(true, data),
      () => popup(false),
      new FormData(evt.target),
    );
  });

  resetFormButton.addEventListener('click', () => {
    clearForms(data);
  })
};

export {initForm, setStatusForm, setActionForm, clearForms};
