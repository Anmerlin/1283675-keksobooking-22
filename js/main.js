import {
  createDataArraySimilarAnnouncements
} from './data.js';

import {
  showCardOnMap
} from './card.js';

import {
  initForm
} from './form.js';

const SIMILAR_ANNOUNCEMENTS_COUNT = 1;
let dataAnnouncement = createDataArraySimilarAnnouncements(SIMILAR_ANNOUNCEMENTS_COUNT);

showCardOnMap(dataAnnouncement[0]);

initForm();
