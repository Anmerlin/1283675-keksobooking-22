const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

import {initForm} from './form.js';
import {addMarkersOnMap} from './map.js';
import {createDataArraySimilarAnnouncements} from './data.js';

let dataAnnouncement = createDataArraySimilarAnnouncements(SIMILAR_ANNOUNCEMENTS_COUNT);

initForm();

addMarkersOnMap(dataAnnouncement);
