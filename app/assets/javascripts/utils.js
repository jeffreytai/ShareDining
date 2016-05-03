function debounce(fn, delay) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function throttle(fn, delay) {
  var wait = false;

  return (...args) => {
    if (!wait) {
      fn(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };
}

export { debounce, throttle };
