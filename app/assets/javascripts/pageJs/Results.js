import JsController from 'JsController';
import GoogleMap from 'GoogleMap';

const mapElName = '.results-map-container';

JsController.results = function() {
  window.map = new GoogleMap(mapElName, { lat: 45.5231, lng: -122.6765 });
};