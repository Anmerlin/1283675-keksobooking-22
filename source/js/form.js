import {setStatusFormFilters, resetFormFilters} from './filter.js';
import {changeStateFormControls} from './util.js';
import {setDefaultPhoto, changePhotoHandler} from './photo.js';
import {validateAnnouncementTitle, validatePrice, validateSeats} from './validation.js';
import {sendDataFormAnnouncement} from './requests.js';
import {resetDataMap} from './map.js';

const DEFAULT_IMAGE = 'img/muffin-grey.svg';
const MIN_ANNOUNCEMENT_TITLE_LENGTH = 30;
const MAX_ANNOUNCEMENT_TITLE_LENGTH = 100;
const MAX_PRICE_HOUSING = 1000000;

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
const adFormReset = document.querySelector('.ad-form__reset');

const fileSelectionUser = document.querySelector('.ad-form__field input[type=file]');
const fileSelectionHousing = document.querySelector('.ad-form__upload input[type=file]');
const userPhotoPreview = document.querySelector('.ad-form-header__preview');
const housingPhotoPreview = document.querySelector('.ad-form__photo');

const announcementTitle = document.querySelector('#title');
const typeHousing = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');

const timeCheckIn = document.querySelector('#timein');
const timeCheckOut = document.querySelector('#timeout');

const numberRooms = document.querySelector('#room_number');
const numberSeats = document.querySelector('#capacity');

/**
 * Form state change function
 * @param  {boolean} flag true - active, false - diasbled
 */
const changeStateForm = (flag) => {
  if (flag) {
    adForm.classList.remove('ad-form--disabled');
  } else {
    adForm.classList.add('ad-form--disabled');
  }
};

/**
 * Function for changing the states of form and interactive elements
 * @param  {boolean} flag true - active form, false - diasbled form
 */
const setStatusForm = (flag) => {
  changeStateForm(flag);
  changeStateFormControls(adForm, flag);
};

/**
 * Function of clearing the state of the form and map
 * @param  {function} data Function for setting markers on the map
 */
const clearForms = (data) => {
  adForm.reset();
  setDefaultPhoto(fileSelectionUser, userPhotoPreview, true, DEFAULT_IMAGE);
  setDefaultPhoto(fileSelectionHousing, housingPhotoPreview);
  resetFormFilters();
  resetDataMap(data);
};

/**
 * Form initialization function
 */
const initializeForm = () => {
  // Реализуйте с помощью JavaScript перевод страницы в неактивное состояние, все пункты, кроме первого про карту.
  setStatusForm(false);
  setStatusFormFilters(false);

  // «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;
  typeHousing.addEventListener('change', (evt) => {
    const val = evt.target.value;
    pricePerNight.min = pricePerNight.placeholder = minPriceHousePerNight[val];
  });

  // «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого.
  timeCheckIn.addEventListener('change', (evt) => {
    const val = evt.target.value;
    timeCheckOut.value = val;
  });

  timeCheckOut.addEventListener('change', (evt) => {
    const val = evt.target.value;
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

    for (const descendant of descendants) {
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

  changePhotoHandler(fileSelectionUser, userPhotoPreview);
  changePhotoHandler(fileSelectionHousing, housingPhotoPreview);
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
const setHandlersForm = (popup, data) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendDataFormAnnouncement(
      () => popup(true, data),
      () => popup(false),
      new FormData(evt.target),
    );
  });

  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForms(data);
  });
};

export {initializeForm, setStatusForm, setHandlersForm, clearForms};
