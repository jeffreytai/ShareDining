import JsController from 'JsController';
import SliderController from 'utils/SliderController';

JsController['kitchen-show'] = function() {
  const $imageSliderContainer = document.querySelector('.listing-images-container');
  const imageSlider = new SliderController($imageSliderContainer);
  imageSlider.init();
};