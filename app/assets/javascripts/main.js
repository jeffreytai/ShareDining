import JsController from 'JsController';
import 'pageJs/Landing';
import 'pageJs/Results';

document.addEventListener('DOMContentLoaded', () => {
  // grab the data-js attribute off of body, which indicates which modules we need to init
  const jsModules = document.querySelector('body').dataset.js.split(' ');

  // init the appropriate modules
  jsModules.forEach((module) => {
    JsController[module]();
  });
});
