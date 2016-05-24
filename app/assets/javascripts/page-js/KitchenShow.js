import JsController from 'JsController';
import SliderController from 'utils/SliderController';
import ModalController from 'utils/ModalController';

JsController['kitchen-show'] = function () {
  const $imageSliderContainer = document.querySelector('.listing-images-container');
  const imageSlider = new SliderController($imageSliderContainer);
  imageSlider.init();

  const $multipleReservationButton = document.querySelector('.multiple-reservation-button');
  const reservationModal = new ModalController('reservation-modal-show', [$multipleReservationButton], 'reservation-modal');
  reservationModal.init();
};