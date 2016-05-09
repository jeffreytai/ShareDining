import JsController from 'JsController';
import InfiniteScroll from 'InfiniteScroll';
import { addUrlParams } from 'utils';
import 'whatwg-fetch';
import GoogleMap from 'GoogleMap';


const RESULT_CLASS = 'result';
const KITCHENS_URL = '/api/v1/kitchens';
const NUM_RESULTS_TO_RETURN_INIT = 6;
const NUM_RESULTS_TO_RETURN_SCROLL = 4;

function makeKitchenHtml(kitchen) {
  const liEl = document.createElement('LI');

  liEl.classList.add(RESULT_CLASS);

  liEl.innerHTML = `
        <a class="result-link" href="/kitchen/${kitchen.token}">
          <h2 class="result-title">${kitchen.title}</h2>
          <h2 class="result-price-container">
            <span class="result-price">£${kitchen.price}</span>
            <span class="result-price-after">/night</span>
          </h2>
        </a>`;

  return liEl;
}

JsController.results = function () {
  const $mapContainer = document.querySelector('#map');
  const $locationInput = document.querySelector('#pac-input');
  const $resultsContainer = document.querySelector('.results-container');
  const $resultsList = document.querySelector('.results-list');
  let currentLatLng = { lat: window.landingLatitude, lng: window.landingLongitude };
  let googleMapObject;
  let googleAutoCompleteObject;
  let currentIndex = 0;

  /**
   * Fetches the next numResults
   * @param {Number} numResults - number of results to fetch
   * @returns {Promise.<*>|*} - promise with json data
   */
  function fetchNextResults(numResults) {
    const url = addUrlParams(KITCHENS_URL, { 'num_results': numResults, 'index': currentIndex });

    return fetch(url).then((data) => data.json());
  }

  /**
   * Loads the next numResults and returns true/false depending on if there is more data
   * @param {Number} numResults - number of results to load
   * @return {void}
   */
  function loadNextResults(numResults) {
    fetchNextResults(numResults).then((json) => {
      if (json && json.length) {
        const listFragment = document.createDocumentFragment();

        json.map(makeKitchenHtml).forEach((listElement) => {
          listFragment.appendChild(listElement);
        });

        json.forEach((kitchen) => GoogleMap.createMapMarker(googleMapObject, kitchen.latitude, kitchen.longitude));

        $resultsList.appendChild(listFragment);
        currentIndex += numResults;
      }
    });
  }

  // setup the infinite scrolling to return more results
  const infiniteScrollController = new InfiniteScroll($resultsContainer, () => {
    loadNextResults(NUM_RESULTS_TO_RETURN_SCROLL);
  });
  infiniteScrollController.attachEvents();

  // google maps callback
  window.resultsGoogleInit = function () {
    const autoCompleteOptions = {
      types: ['(cities)'],
      componentRestrictions: { country: 'GB' }
    };

    // init the autocomplete, the map, and then fetch the initial results
    googleAutoCompleteObject = GoogleMap.createAutoComplete($locationInput, autoCompleteOptions);
    googleMapObject = GoogleMap.createMap($mapContainer, currentLatLng);
    loadNextResults(NUM_RESULTS_TO_RETURN_INIT);
  };
};
