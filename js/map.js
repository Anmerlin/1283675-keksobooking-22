/* global L:readonly */

const LAT_COORD_DEFAULT = 35.68950;
const LNG_COORD_DEFAULT = 139.69171;
const NUMBER_DECIMAL_PLACES = 5;

import {setStatusForm} from './form.js';
import {createBalloonPopupOnMap} from './card.js';

const addressFieldForm = document.querySelector('#address');
addressFieldForm.value = `${LAT_COORD_DEFAULT}, ${LNG_COORD_DEFAULT}`;
addressFieldForm.setAttribute('readonly', true);

const map = L.map('map-canvas')
  .on('load', () => {
    /* С помощью полученных обновлений (стили, изображения и скрипты необходимые для Leaflet) от Кексобота
    реализуйте отображение карты и дальнейший переход страницы в активное состояние.
    Координаты центра Токио найдите самостоятельно. */
    setTimeout(() => {
      setStatusForm(true);
    }, 100)
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
  addressFieldForm.value = `${coords.lat.toFixed(NUMBER_DECIMAL_PLACES)}, ${coords.lng.toFixed(NUMBER_DECIMAL_PLACES)}`;
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
