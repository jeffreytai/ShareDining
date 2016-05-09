import JsController from 'JsController';
import Slider from 'Slider';

JsController['kitchen-show'] = function() {
  const $imageSliderContainer = document.querySelector('.listing-images-container');
  const imageSlider = new Slider($imageSliderContainer);
  imageSlider.init();
};