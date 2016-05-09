import JsController from 'JsController';
import 'pageJs/Landing';
import 'pageJs/Results';
import 'pageJs/KitchenNewController';
import 'pageJs/KitchenShow';

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
