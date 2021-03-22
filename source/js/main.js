import {initializeForm, setHandlersForm} from './form.js';
import {addMarkersOnMap, showFilteredAnnouncements} from './map.js';
import {getDataAnnouncements} from './requests.js';
import {showMessagePopup} from './popup.js';

const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

/**
 * Wrapper function for receiving data from the server and displaying markers announcements
 */
const getData = () => {
  getDataAnnouncements((points) => {
    addMarkersOnMap(points.slice(0, SIMILAR_ANNOUNCEMENTS_COUNT));
  });
}

/**
 * Wrapper function for receiving data from the server, filtering them and displaying markers announcements
 */
const getFilteredData = () => {
  getDataAnnouncements((points) => {
    showFilteredAnnouncements(points, SIMILAR_ANNOUNCEMENTS_COUNT);
  });
}

initializeForm();

getData();

getFilteredData();

setHandlersForm(showMessagePopup, getData);
