import GoogleMap from 'GoogleMap';
import ModalController from 'ModalController';

// TODO: change this to real data, need to get lat/long based on value of search
const mapElName = '.results-map-container';
const landingLoginButton = '.nav-login-button';
const landingSignupButton = '.nav-signup-button';

window.map = new GoogleMap(mapElName, { lat: 45.5231, lng: -122.6765 });

document.addEventListener('DOMContentLoaded', () => {
  const $loginLandingButton = document.querySelector(landingLoginButton);
  const $landingSignupButton = document.querySelector(landingSignupButton);

  const loginModalController = new ModalController('login-modal-show', [$loginLandingButton], 'login-modal').init();
  const signupModalController = new ModalController('signup-modal-show', [$landingSignupButton], 'signup-modal').init();
});
