import {
  createAnnouncement
} from './data.js';

const SIMILAR_ANNOUNCEMENTS_COUNT = 10;

//const similarAnnouncements = new Array(SIMILAR_ANNOUNCEMENTS_COUNT).fill(null).map(() => createaAnnouncement());

const similarAnnouncements = (count) => {
  let announcements = [];
  for (let i = 0; i < count; i++) {
    announcements[i] = createAnnouncement();
  }
  return announcements;
}

similarAnnouncements(SIMILAR_ANNOUNCEMENTS_COUNT);
