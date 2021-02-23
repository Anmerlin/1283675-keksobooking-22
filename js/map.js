/* global L:readonly */

const LAT_COORD_DEFAULT = 35.68950;
const LNG_COORD_DEFAULT = 139.69171;

import {setActiveForm} from './form.js';
import {createBalloonPopupOnMap} from './card.js';

const addressFieldForm = document.querySelector('#address');
addressFieldForm.value = `${LAT_COORD_DEFAULT}, ${LNG_COORD_DEFAULT}`;

const map = L.map('map-canvas')
  .on('load', () => {
    /* С помощью полученных обновлений (стили, изображения и скрипты необходимые для Leaflet) от Кексобота
    реализуйте отображение карты и дальнейший переход страницы в активное состояние.
    Координаты центра Токио найдите самостоятельно. */
    setActiveForm();
  })
  .setView({
    lat: LAT_COORD_DEFAULT,
    lng: LNG_COORD_DEFAULT,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const defaultPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_COORD_DEFAULT,
    lng: LNG_COORD_DEFAULT,
  }, {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

/**
 * Change of coordinates in the address field of the form
 */
mainPinMarker.on('moveend', (evt) => {
  let coords = evt.target.getLatLng();
  addressFieldForm.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
});

/**
 * Function of adding a marker to the map
 * @param  {array} points  An array of objects to display the marker and balloon
 */
const addMarkersOnMap = (points) => {
  points.forEach(({author, offer, location}) => {
    const marker = L.marker({
      lat: location.x,
      lng: location.y,
    }, {
      icon: defaultPinIcon,
    });

    marker
      .addTo(map)
      .bindPopup(
        createBalloonPopupOnMap({author, offer}),
      );
  });
};

export {addMarkersOnMap};
