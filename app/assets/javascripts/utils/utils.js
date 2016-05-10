/**
 * Debounces a given function for a given delay
 * @param {Function} fn - the function to be debounced
 * @param {Number} delay - the debounce delay (ms)
 * @returns {function()} - the debouned function
 */
function debounce(fn, delay) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Borrowed from underscore.js and Stackoverflow: http://stackoverflow.com/questions/27078285/simple-throttle-in-js
 * Throttle a given function for a given delay
 * @param {Function} func - the function to be throttled
 * @param {Number} wait - the throttle delay (ms)
 * @param {{}} options - to disable the execution on the leading edge, pass `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @returns {function()} - the throttled function
 */
function throttle(func, wait, options = {}) {
  var context, args,
    result,
    timeout = null,
    previous = 0,
    later = function () {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * Given a base url, adds parameters to the url
 * @param {String} base - the base url
 * @param {{}} params - the parameters key-value object
 * @return {String} - the url with params
 */
function addUrlParams(base, params = {}) {
  return Object.keys(params).reduce((url, key, idx) => !idx ? `${url}?${key}=${params[key]}` : `${url}&${key}=${params[key]}`, base);
}

export { debounce, throttle, addUrlParams };
