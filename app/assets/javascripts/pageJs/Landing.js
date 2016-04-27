import JsController from 'JsController';
import ModalController from 'ModalController';

const landingLoginButton = '.nav-login-button';
const landingSignupButton = '.nav-signup-button';

JsController.landing = function() {
    const $loginLandingButton = document.querySelector(landingLoginButton);
    const $landingSignupButton = document.querySelector(landingSignupButton);

    const loginModalController = new ModalController('login-modal-show', [$loginLandingButton], 'login-modal').init();
    const signupModalController = new ModalController('signup-modal-show', [$landingSignupButton], 'signup-modal').init();
};