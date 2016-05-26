import JsController from 'JsController';
import SliderController from 'utils/SliderController';
import ModalController from 'utils/ModalController';

JsController['kitchen-show'] = function () {
  const $imageSliderContainer = document.querySelector('.listing-images-container');
  const imageSlider = new SliderController($imageSliderContainer);
  const $multipleReservationButton = document.querySelector('.multiple-reservation-button');
  const $singleReservationButton = document.querySelector('.single-reservation-button');
  const multipleReservationModal = new ModalController('multiple-reservation-modal-show', [$multipleReservationButton], 'multiple-reservation-modal');
  const singleReservationModal = new ModalController('single-reservation-modal-show', [$singleReservationButton], 'single-reservation-modal');

  imageSlider.init();
  multipleReservationModal.init();
  singleReservationModal.init();
};
