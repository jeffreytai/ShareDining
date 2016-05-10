import JsController from 'JsController';
import ModalController from 'utils/ModalController';

const landingLoginButton = '.nav-login-button';
const landingSignupButton = '.nav-signup-button';
const addressInput = 'landing-location-input';

JsController.landing = function () {
  // init modals
  const $loginLandingButton = document.querySelector(landingLoginButton);
  const $landingSignupButton = document.querySelector(landingSignupButton);
  const loginModalController = new ModalController('login-modal-show', [$loginLandingButton], 'login-modal').init();
  const signupModalController = new ModalController('signup-modal-show', [$landingSignupButton], 'signup-modal').init();

  // init autocomplete
  const $addressInput = document.getElementsByClassName(addressInput)[0];
  // window.initLandingAutoComplete = function () {
  //   const autocomplete = new google.maps.places.Autocomplete($addressInput, {});
  // };
};
