import {clearForms} from './form.js';
import {isEscEvent, isEnterEvent} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // содержимое шаблона #success
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // содержимое шаблона #error
const main = document.querySelector('main');

/**
 * Function to hide the window after submitting the form
 * @param  {object} evt  Data object on event
 */
const onPopupHide = (evt) => {
  const popup = main.querySelector('.success') || main.querySelector('.error');
  if (isEscEvent(evt) || isEnterEvent(evt) || evt.type === 'click') {
    evt.preventDefault();
    popup.remove();
  }
  document.removeEventListener('keydown', onPopupHide);
};

/**
 * Function to show popup after form submission
 * @param  {boolean} status Form submission status
 * @param  {function} data Function for setting markers on the map
 */
const showMessagePopup = (status, data) => {
  if (status) {
    const messageSuccess = successMessageTemplate.cloneNode(true);
    messageSuccess.style.zIndex = 1000;
    main.append(messageSuccess);
    clearForms(data);
    document.addEventListener('keydown', onPopupHide);
    messageSuccess.addEventListener('click', onPopupHide);
  } else {
    const messageError = errorMessageTemplate.cloneNode(true);
    const errorBtn = messageError.querySelector('.error__button');
    messageError.style.zIndex = 1000;
    main.append(messageError);
    errorBtn.focus();
    document.addEventListener('keydown', onPopupHide);
    errorBtn.addEventListener('keydown', onPopupHide);
    messageError.addEventListener('click', onPopupHide);
  }
};

export {showMessagePopup};
