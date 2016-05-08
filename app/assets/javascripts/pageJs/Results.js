import JsController from 'JsController';
import InfiniteScroll from 'InfiniteScroll';
import { addUrlParams } from 'utils';
import 'whatwg-fetch';

const RESULT_CLASS = 'result';

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
  const $resultsContainer = document.querySelector('.results-container');
  const $resultsList = document.querySelector('.results-list');
  const KITCHENS_URL = '/api/v1/kitchens';
  const NUM_RESULTS_TO_RETURN = 3;
  let currentIndex = 0;

  const infiniteScrollController = new InfiniteScroll($resultsContainer, () => {
    const url = addUrlParams(KITCHENS_URL, { 'num_results': NUM_RESULTS_TO_RETURN, 'index': currentIndex });

    // get the new kitchen data and append it to the result list
    fetch(url).then((data) => data.json()).then((json) => {
      const listFragment = document.createDocumentFragment();
      json.map(makeKitchenHtml).forEach((listElement) => {
        listFragment.appendChild(listElement);
      });

      $resultsList.appendChild(listFragment);
    });
  });

  infiniteScrollController.attachEvents();
};
