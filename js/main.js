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

showCardOnMap(createDataArraySimilarAnnouncements(SIMILAR_ANNOUNCEMENTS_COUNT));

initForm();
