import { throttle, debounce } from 'utils/utils';

const DEFAULT_SENSITIVITY = 0.95;

export default class InfiniteScrollController {
  constructor(el, callback, sensitivity = DEFAULT_SENSITIVITY) {
    this.el = el;
    this.clientHeight = el.clientHeight;
    this.callback = callback;
    this.sensitivity = sensitivity;
  }

  attachEvents() {
    this.el.addEventListener('scroll', throttle(() => {
      const percentScroll = (this.el.scrollTop + this.clientHeight) / this.el.scrollHeight;

      if (percentScroll >= this.sensitivity) {
        this.callback();
      }
    }, 200));

    window.addEventListener('resize', debounce(() => {
      this.clientHeight = this.el.clientHeight;
    }, 200));
  }
}
