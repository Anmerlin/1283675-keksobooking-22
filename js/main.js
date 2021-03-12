const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

import {initForm, setActionForm} from './form.js';
import {addMarkersOnMap} from './map.js';
import {getDataAnnouncements} from './requests.js';
import {showMessagePopup} from './popup.js';

const getData = () => {
  getDataAnnouncements((points) => {
    addMarkersOnMap(points.slice(0, SIMILAR_ANNOUNCEMENTS_COUNT));
  });
}

initForm();

getData();

setActionForm(showMessagePopup, getData);
