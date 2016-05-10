import JsController from 'JsController';
import 'page-js/Landing';
import 'page-js/Results';
import 'page-js/KitchenNewController';
import 'page-js/KitchenShow';

function loadPageJs() {
  // grab the data-js attribute off of body, which indicates which modules we need to init
  const jsModules = document.querySelector('body').dataset.js.split(' ');

  // init the appropriate modules
  jsModules.forEach((module) => {
    JsController[module]();
  });
}

// we use the page:change event b/c of turbolinks
document.addEventListener('page:change', loadPageJs);
