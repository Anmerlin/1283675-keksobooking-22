const ERROR_SHOW_TIME = 5000;

/**
 * Function for changing the state of interactive form elements
 * @param  {object} formName constants defining the form
  */
const changeStateFormControls = (formName, flag) => {
  const formElements = formName.elements;
  for (const element of formElements) {
    if (flag) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled')
    }
  }
};

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
const showErrorGetData = (err) => {
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
const debounceShowMarkers = (fn, ms) => {
  let timeout;

  return () => {
    clearTimeout(timeout);

    timeout = setTimeout(fn, ms);
  };
};

export {
  changeStateFormControls,
  getValueFromNubmer,
  hasClassValueInArray,
  showErrorGetData,
  isEscEvent,
  isEnterEvent,
  debounceShowMarkers
};
