import JsController from 'JsController';
import InfiniteScrollController from 'utils/InfiniteScrollController';
import { addUrlParams } from 'utils/utils';
import 'whatwg-fetch';
import GoogleMap from 'google-maps/GoogleMap';
import { MARKER_DEFAULT_STYLES, MARKER_HOVER_STYLES } from 'google-maps/styles';


const LOADING_CLASS = 'loading';
const RESULT_CLASS = 'result';
const KITCHENS_URL = '/api/v1/kitchens';
const NUM_RESULTS_TO_RETURN_INIT = 6;
const NUM_RESULTS_TO_RETURN_SCROLL = 4;

/**
 * Creates a kitchen list element from the given kitchen json object
 * @param {{}} kitchen - kitchen json object
 * @returns {Element} - the kitchen list element
 */
function makeKitchenHtml(kitchen) {
  const liEl = document.createElement('LI');

  liEl.classList.add(RESULT_CLASS);

  liEl.innerHTML = `
        <a class="result-link" id="${kitchen.token}" href="/kitchen/${kitchen.token}">
          <h2 class="result-title">${kitchen.title}</h2>
          <h2 class="result-price-container">
            <span class="result-price">£${Math.ceil(kitchen.price * 1.2)}</span>
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
  const $filterList = document.querySelector('.filters-list');
  const currentLatLng = { lat: window.landingLatitude, lng: window.landingLongitude };
  const nameToInputElementMap = {
    location: $locationInput,
    start_date: document.querySelector('#start_date'),
    end_date: document.querySelector('#end_date'),
    type_of_kitchen: document.querySelector('#type_of_kitchen'),
    sort_kitchens: document.querySelector('#sort_kitchens')
  };

  let kitchenToMarkerMap = {};
  let googleMapObject;
  let googleAutoCompleteObject;
  let currentHoveredId;
  let currentIndex = 0;

  /**
   * TODO: when returned results is less than numResults, set global to true and don't request anymore kitchens
   * Fetches the next numResults by using the params in nameToInputMap
   * @param {Number} numResults - number of results to fetch
   * @returns {Promise.<*>|*} - promise with json data
   */
  function fetchNextResults(numResults) {
    const urlParams = Object.keys(nameToInputElementMap).reduce((paramsObj, currKey) => {
      paramsObj[currKey] = nameToInputElementMap[currKey].value;
      return paramsObj;
    }, {
      num_results: numResults,
      index: currentIndex
    });
    const url = addUrlParams(KITCHENS_URL, urlParams);

    return fetch(url).then((data) => data.json());
  }

  /**
   * Loads the next numResults and returns true/false depending on if there is more data
   * @param {Number} numResults - number of results to load
   * @return {Promise} - promise after results are loaded
   */
  function loadNextResults(numResults) {
    return fetchNextResults(numResults).then((json) => {
      if (json && json.length) {
        const listFragment = document.createDocumentFragment();

        json.map(makeKitchenHtml).forEach((listElement) => {
          listFragment.appendChild(listElement);
        });

        // create the marker on the map and map it to the kitchen
        json.forEach((kitchen) => {
          kitchenToMarkerMap[kitchen.token] = GoogleMap.createMapMarker(googleMapObject, kitchen.latitude, kitchen.longitude);
        });

        $resultsList.appendChild(listFragment);
        currentIndex += numResults;
      }

      $resultsContainer.classList.remove(LOADING_CLASS);
    });
  }

  /**
   * Resets the current results and loads new results based on the current filters
   * @return {void}
   */
  function resetResults() {
    $resultsContainer.classList.add(LOADING_CLASS);
    currentIndex = 0;

    // remove all the current results from the DOM
    Array.prototype.forEach.call($resultsList.querySelectorAll('.result'), (e) => $resultsList.removeChild(e));

    // remove all the markers from the map
    Object.keys(kitchenToMarkerMap).forEach((key) => kitchenToMarkerMap[key].setMap(null));
    kitchenToMarkerMap = {};

    // load the next set of results
    loadNextResults(NUM_RESULTS_TO_RETURN_INIT);
  }

  // setup the infinite scrolling to return more results
  const infiniteScrollController = new InfiniteScrollController($resultsContainer, () => {
    loadNextResults(NUM_RESULTS_TO_RETURN_SCROLL);
  });
  infiniteScrollController.attachEvents();

  // attach event so that markers change on kitchen element hovers
  $resultsList.addEventListener('mouseenter', (evt) => {
    var target = evt.target;

    if (target && target.nodeName === 'A') {
      const kitchenId = target.id;

      // unhighlight previous kitchen incase mouseleave didn't do it
      if (currentHoveredId && currentHoveredId !== kitchenId) {
        kitchenToMarkerMap[currentHoveredId].setIcon(MARKER_DEFAULT_STYLES);
      }

      kitchenToMarkerMap[kitchenId].setIcon(MARKER_HOVER_STYLES);
      currentHoveredId = kitchenId;
    }
  }, true);

  // attach event so markers change back
  $resultsList.addEventListener('mouseleave', () => {
    if (currentHoveredId) {
      kitchenToMarkerMap[currentHoveredId].setIcon(MARKER_DEFAULT_STYLES);
      currentHoveredId = null;
    }
  });

  // attach event on filter or location change
  $filterList.addEventListener('change', resetResults);
  $locationInput.addEventListener('change', resetResults);

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
