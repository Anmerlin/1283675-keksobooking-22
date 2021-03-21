const DEFAULT_FILTER_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const featuresCheckbox = mapFilters.querySelectorAll('.map__checkbox');

const prices = {
  'low': {
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
  },
};

const nameFields = {
  'housing-type': 'type',
  'housing-rooms': 'rooms',
  'housing-guests':'guests',
};

/**
 * Function to reset the form with filters
 */
const resetFormFilters = () => {
  mapFilters.reset();
};

/**
 * Function to check the selected type of accommodation, number of rooms and guests
 * @param  {object} announcements   announcements
 * @param  {string} filter          field name
 * @param  {object} elem            current element
 * @param  {boolean} isNumber       value is number
 * @return {boolean}                selected/default value
 */
const checkAnnouncements = (announcements, filter, elem, isNumber) => {
  let val = elem.value;

  if (isNumber) {
    val = +elem.value;
  }

  return announcements.offer[filter] === val || elem.value === DEFAULT_FILTER_VALUE;
};

/**
 * Function for checking the selected price
 * @param  {obect} announcements  announcements
 * @return {boolean}              selected/unselected price
 */
const checkAnnouncementsPrice = (announcements) => {
  const valuePrice = announcements.offer.price;

  if (housingPrice.value === 'middle') {
    return valuePrice >= prices.middle.start && valuePrice <= prices.middle.end;
  }

  if (housingPrice.value === 'low') {
    return valuePrice <= prices.low.end;
  }

  if (housingPrice.value === 'high') {
    return valuePrice >= prices.high.start;
  }

  return true;
};

/**
 * Function for checking selected features of announcements
 * @param  {object} announcements   announcements
 * @return {boolean}                selected/unselected feature
 */
const checkAnnouncementsFeatures = (announcements) => {
  return [...featuresCheckbox].every((item) => {
    if (item.checked) {
      return announcements.offer.features.indexOf(item.value) !== -1;
    }

    return true;
  });
};

/**
 * Function for getting filtered announcements
 * @param  {array} data     array of original announcements
 * @param  {number} count   number of nnouncements filtered
 * @return {array}          array of filtered announcements
 */
const getFilteredAnnouncements = (data, count) => {
  const filteredAnnouncements = [];

  for (let i = 0; filteredAnnouncements.length < count && data[i]; i++) {
    if (
      checkAnnouncements(data[i], nameFields[housingType.name], housingType) &&
      checkAnnouncements(data[i], nameFields[housingRooms.name], housingRooms, true) &&
      checkAnnouncements(data[i], nameFields[housingGuests.name], housingGuests, true) &&
      checkAnnouncementsPrice(data[i]) &&
      checkAnnouncementsFeatures(data[i])
    ) {
      filteredAnnouncements.push(data[i]);
    }
  }

  return filteredAnnouncements;
}

/**
 * Function to set the filter of the form handler
 * @param  {function} cb Callback function
 */
const setHandlerFormFilter = (cb) => {
  mapFilters.addEventListener('change', (evt) => {
    evt.preventDefault();
    cb();
  })
};

export {mapFilters, resetFormFilters, setHandlerFormFilter, getFilteredAnnouncements};
