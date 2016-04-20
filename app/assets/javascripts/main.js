import GoogleMap from 'GoogleMap';
import ModalShow from 'ModalShow';

// TODO: change this to real data, need to get lat/long based on value of search
const mapElName = '.results-map-container';
const landingLoginButton = '.nav-login-button';

window.map = new GoogleMap(mapElName, { lat: 45.5231, lng: -122.6765 });

document.addEventListener('DOMContentLoaded', () => {
  const modalController = new ModalShow({
    'login-show': [document.querySelector(landingLoginButton)]
  }).initBindings();
});
