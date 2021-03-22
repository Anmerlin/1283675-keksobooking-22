import {setStatusFormFilters} from './filter.js';
import {showErrorGetData} from './util.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://22.javascript.pages.academy/keksobooking';

/**
 * Function for loading announcements and displaying them on the map
 * @param  {function} onSuccess  Function for setting markers on the map in case of success
 */
const getDataAnnouncements = (onSuccess) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((points) => {
      onSuccess(points);
      setStatusFormFilters(true);
    })
    .catch((err) => {
      setStatusFormFilters(false);
      showErrorGetData(`Ошибка загрузки данных объявлений на карту (${err}). Вы можете продолжать работу`);
    });
};

/**
 * Function to display a pop-up window based on form submission results
 * @param  {function} showMessagePopupSuccess Function to display a popup when the form is successfully submitted
 * @param  {function} showMessagePopupError   Function of displaying a pop-up window when form submission is unsuccessful
 * @param  {object} body                      A data object consisting of the fields of the form to be submitted
 */
const sendDataFormAnnouncement = (showMessagePopupSuccess, showMessagePopupError, body) => {
  fetch(
    URL_SEND_DATA, {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessagePopupSuccess();
      } else {
        showMessagePopupError();
      }
    })
    .catch(() => {
      showMessagePopupError();
    });
};

export {getDataAnnouncements, sendDataFormAnnouncement};
