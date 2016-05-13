export default class DateSlider {
  constructor($dateSlider, { step = 60, min = 0, max = 24, labelStep = 2, selectedClass = 'selected' } = {}) {
    this.$dateSlider = $dateSlider;
    this.step = step;
    this.min = min;
    this.max = max;
    this.labelStep = labelStep;
    this.numElements = (max - min) / (step / 60);
    this.selectedClass = selectedClass;
    this.isMouseDown = false; // used to detect dragging
    this.timeBlocks = []; // an array of all of the time blocks
  }

  /**
   * Inits the date slider on the specified element given to the contructor
   * @returns {void}
   */
  init() {
    this._createTimeBlocks();
    this._attachEvents();
  }

  /**
   * Creates the time block elements and puts them in the date slider element
   * @returns {void}
   * @private
   */
  _createTimeBlocks() {
    const documentFrag = document.createDocumentFragment();

    for (let idx = 0; idx < this.numElements; idx += 1) {
      const listElement = this._createTimeBlockElementHtml(idx);

      documentFrag.appendChild(listElement);
      this.timeBlocks.push(listElement);
    }

    this.$dateSlider.appendChild(documentFrag);
  }

  /**
   * Creates the time block element
   * @param {Number} idx - the current time block index
   * @returns {Element} - the time block element
   * @private
   */
  _createTimeBlockElementHtml(idx) {
    const timeOfDay = (this.min + idx * this.step) / 60; // the time of day 0-24
    const hours = Math.floor(timeOfDay);
    const mins = (timeOfDay % 1) * 60;
    const listEl = document.createElement('LI');
    const listElWidth = 100 / this.numElements;

    listEl.style.width = `${listElWidth}%`;
    listEl.classList.add('time-block');
    listEl.dataset.beginTime = timeOfDay;

    // special class for noon styling
    if (timeOfDay === 12) {
      listEl.classList.add('noon');
    }

    // only every labelStep element gets a time label
    if (idx % this.labelStep === 0) {
      listEl.innerHTML = `<span class="time-label">${hours}:${mins}0</span>`;
    }

    return listEl;
  }

  /**
   * Unselects all time blocks
   * @returns {void}
   * @private
   */
  _resetTimeBlocks() {
    this.timeBlocks.forEach((timeBlock) => {
      timeBlock.classList.remove(this.selectedClass);
    });
  }

  /**
   * Attaches any events needed for the date slider
   * @return {void}
   * @private
   */
  _attachEvents() {
    // the initial selection or deselection of a time block
    this.$dateSlider.addEventListener('mousedown', (evt) => {
      const target = evt.target;

      // select or deselect the element
      if (target && target.nodeName === 'LI') {
        this._resetTimeBlocks();
        target.classList.toggle(this.selectedClass);
        this.isMouseDown = true;
      }
    });

    // dragging select of time blocks
    this.$dateSlider.addEventListener('mouseenter', (evt) => {
      const target = evt.target;

      if (this.isMouseDown && target && target.nodeName === 'LI') {
        target.classList.add(this.selectedClass);
      }
    }, true);

    document.addEventListener('mouseup', () => this.isMouseDown = false);
  }

  /**
   * Returns a comma separated value of the min selected time and max selected time
   * @returns {String} - comma separated value of the min selected time and max selected time. Ex: 12,14
   */
  get value() {
    const selectedBlocks = this.timeBlocks.filter((timeBlock) => timeBlock.classList.contains(this.selectedClass));
    var minTime = 0, maxTime = 0;

    if (selectedBlocks.length) {
      minTime = selectedBlocks[0].dataset.beginTime;
      maxTime = selectedBlocks[selectedBlocks.length - 1].dataset.beginTime;
    }

    return `${minTime},${maxTime}`;
  }
}
