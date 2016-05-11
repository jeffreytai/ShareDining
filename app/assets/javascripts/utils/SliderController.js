const BREADCRUMB_LIST_EL_CLASS = 'breadcrumb-list-el';
const BREADCRUMB_BUTTON_CLASS = 'breadcrumb-button';
const CURRENT_CLASS = 'current';
const RIGHT_ARROW_CODE = 39;
const LEFT_ARROW_CODE = 37;

export default class SliderController {
  constructor($sliderContainer, options = {}) {
    this.$sliderList = $sliderContainer.querySelector('.slider-list');
    this.$sliderElements = this.$sliderList.querySelectorAll('li');
    this.$nextButton = $sliderContainer.querySelector('.next-button');
    this.$prevButton = $sliderContainer.querySelector('.prev-button');
    this.$breadcrumbList = $sliderContainer.querySelector('.breadcrumb-list');
    this.options = options;
    this.numElements = this.$sliderElements.length;
    this.breadcrumbElements = [];

    this.currentIndex = options.startingIndex || 0;
  }

  init() {
    this._addBreadcrumbs();
    this._attachEvents();
    this._changeCurrent(this.currentIndex);
  }

  _changeCurrent(nextIndex) {
    this.$sliderElements[this.currentIndex].classList.remove(CURRENT_CLASS);
    this.breadcrumbElements[this.currentIndex].classList.remove(CURRENT_CLASS);
    this.$sliderElements[nextIndex].classList.add(CURRENT_CLASS);
    this.breadcrumbElements[nextIndex].classList.add(CURRENT_CLASS);

    this.currentIndex = nextIndex;
  }

  _addBreadcrumbs() {
    var breadcrumbFrag = document.createDocumentFragment();

    // attach breadcrumb list elements to fragment
    for (let i = 0; i < this.numElements; i += 1) {
      const breadcrumbListEl = document.createElement('LI');

      breadcrumbListEl.classList.add(BREADCRUMB_LIST_EL_CLASS);
      breadcrumbListEl.innerHTML = `<button class="${BREADCRUMB_BUTTON_CLASS}"></button>`;
      breadcrumbFrag.appendChild(breadcrumbListEl);
      this.breadcrumbElements.push(breadcrumbListEl);
    }

    this.$breadcrumbList.appendChild(breadcrumbFrag);
  }

  _attachEvents() {
    const nextSlideFn = () => this._changeCurrent((this.currentIndex + 1) % this.numElements);
    const prevSlideFn = () => this._changeCurrent(this.currentIndex ? this.currentIndex - 1 : this.numElements - 1);

    this.$nextButton.addEventListener('click', nextSlideFn);
    this.$prevButton.addEventListener('click', prevSlideFn);
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === RIGHT_ARROW_CODE) {
        nextSlideFn();
      } else if (evt.keyCode === LEFT_ARROW_CODE) {
        prevSlideFn();
      }
    });

    // breadcrumb links should also change the slide
    this.$breadcrumbList.addEventListener('click', (evt) => {
      let target = evt.target;

      if (target && target.nodeName === 'BUTTON') {
        target = target.parentNode;
        const nextIndex = this.breadcrumbElements.indexOf(target);

        this._changeCurrent(nextIndex);
      }
    }, true);
  }
}
