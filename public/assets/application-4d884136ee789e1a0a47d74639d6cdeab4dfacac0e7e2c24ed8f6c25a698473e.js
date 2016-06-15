(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var JsController = {};

exports.default = JsController;

},{}],2:[function(require,module,exports){
'use strict';

var _JsController = require('JsController');

var _JsController2 = _interopRequireDefault(_JsController);

require('page-js/Landing');

require('page-js/Results');

require('page-js/KitchenNew');

require('page-js/KitchenShow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPageJs() {
  // grab the data-js attribute off of body, which indicates which modules we need to init
  var jsModules = document.querySelector('body').dataset.js.split(' ');

  // init the appropriate modules
  jsModules.forEach(function (module) {
    _JsController2.default[module]();
  });
}

// we use the page:change event b/c of turbolinks
document.addEventListener('page:change', loadPageJs);

},{"JsController":1,"page-js/KitchenNew":5,"page-js/KitchenShow":6,"page-js/Landing":7,"page-js/Results":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styles = require('google-maps/styles');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleMap = function () {
  function GoogleMap() {
    _classCallCheck(this, GoogleMap);
  }

  _createClass(GoogleMap, null, [{
    key: 'createMap',
    value: function createMap($mapContainer, center) {
      var zoom = arguments.length <= 2 || arguments[2] === undefined ? 12 : arguments[2];
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      options.center = center;
      options.zoom = zoom;
      options.styles = _styles.MAP_STYLES;

      return new google.maps.Map($mapContainer, options);
    }
  }, {
    key: 'createAutoComplete',
    value: function createAutoComplete($inputEl) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return new google.maps.places.Autocomplete($inputEl, options);
    }
  }, {
    key: 'createMapMarker',
    value: function createMapMarker(map, lat, lng) {
      return new google.maps.Marker({
        position: { lat: lat, lng: lng },
        icon: _styles.MARKER_DEFAULT_STYLES,
        map: map
      });
    }
  }]);

  return GoogleMap;
}();

exports.default = GoogleMap;

},{"google-maps/styles":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAP_STYLES = exports.MAP_STYLES = [{
  "featureType": "administrative",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }, {
    "lightness": 33
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2e5d4"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#c5dac6"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels",
  "stylers": [{
    "visibility": "on"
  }, {
    "lightness": 20
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "lightness": 20
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#c5c6c6"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e4d7c6"
  }]
}, {
  "featureType": "road.local",
  "elementType": "geometry",
  "stylers": [{
    "color": "#fbfaf7"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#acbcc9"
  }]
}];

var MARKER_DEFAULT_STYLES = exports.MARKER_DEFAULT_STYLES = {
  path: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
  scale: 0.14,
  fillColor: '#888888',
  fillOpacity: 1,
  strokeColor: 'black',
  strokeWeight: 2
};

var MARKER_HOVER_STYLES = exports.MARKER_HOVER_STYLES = {
  path: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
  scale: 0.14,
  fillColor: '#FFFFFF',
  fillOpacity: 1,
  strokeColor: 'black',
  strokeWeight: 2
};

},{}],5:[function(require,module,exports){
'use strict';

var _JsController = require('JsController');

var _JsController2 = _interopRequireDefault(_JsController);

var _DateSlider = require('utils/DateSlider');

var _DateSlider2 = _interopRequireDefault(_DateSlider);

var _utils = require('utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_JsController2.default['kitchen-new'] = function () {
  var CURRENT_FIELDSET_CLASS = 'current';
  var CURRENT_MENU_ITEM_CLASS = 'current';
  var MENU_LINK_CLASS = 'kitchen-new-menu-link';
  var STICKY_MENU_CLASS = 'stuck';
  var KITCHEN_MENU_LINK_CLASS = 'kitchen-new-menu-link';
  var COMPLETED_LINK_CLASS = 'completed';
  var INCOMPLETE_LINK_CLASS = 'incomplete';

  var navHeight = document.querySelector('.main-nav').offsetHeight;
  var $stickyMenu = document.querySelector('.kitchen-new-side-menu');
  var $body = document.querySelector('body');
  var $buttonContainer = document.querySelector('.kitchen-new-button-container');
  var $nextButton = document.querySelector('.next-button');
  var $prevButton = document.querySelector('.prev-button');
  var $kitchenForm = document.querySelector('#new_kitchen');
  var $dateSliders = document.querySelectorAll('.date-slider');

  var $currentFieldset = document.querySelector('.fieldset.current'),
      $currentMenuItem = document.querySelector('.' + KITCHEN_MENU_LINK_CLASS + '.current'),

  // the hashArray holds all of the hashes for different form sections
  hashArray = Array.prototype.map.call(document.querySelectorAll('.' + KITCHEN_MENU_LINK_CLASS), function (el) {
    return '#' + el.href.split('#')[1];
  }),
      currentHash = location.hash,
      isStuck = false;

  function handleButtonChanges(newHash) {
    var currHashIdx = hashArray.indexOf(newHash);

    // disable previous button for first page
    $prevButton.disabled = currHashIdx === 0;

    if (currHashIdx === hashArray.length - 1) {
      $nextButton.innerText = 'Finish';
    } else {
      $nextButton.innerText = 'Next';
    }
  }

  function addCompletionIcon($newMenuItem) {
    var $requiredFields = $currentFieldset.querySelectorAll('[required="required"]'),
        $filledFields = Array.prototype.filter.call($requiredFields, function (el) {
      return String(el.value).trim();
    });

    if ($requiredFields.length === $filledFields.length) {
      $newMenuItem.classList.remove(INCOMPLETE_LINK_CLASS);
      $newMenuItem.classList.add(COMPLETED_LINK_CLASS);
    } else {
      $newMenuItem.classList.remove(COMPLETED_LINK_CLASS);
      $newMenuItem.classList.add(INCOMPLETE_LINK_CLASS);
    }
  }

  // changes the current fieldset and menu item
  function changeCurrentFieldset(newHash) {
    var $newFieldset = document.querySelector(newHash);

    // make sure that the hash change corresponds to the inventory form
    if ($newFieldset) {
      var $newMenuItem = document.querySelector('.' + MENU_LINK_CLASS + '[href="' + newHash + '"]');

      handleButtonChanges(newHash);
      addCompletionIcon($currentMenuItem);

      $currentFieldset.classList.remove(CURRENT_FIELDSET_CLASS);
      $currentMenuItem.classList.remove(CURRENT_MENU_ITEM_CLASS);
      $newFieldset.classList.add(CURRENT_FIELDSET_CLASS);
      $newMenuItem.classList.add(CURRENT_MENU_ITEM_CLASS);
      $currentFieldset = $newFieldset;
      $currentMenuItem = $newMenuItem;
    }
  }

  // change to proper fieldset if a hash is present, else make the current hash the first hash
  if (currentHash && document.querySelector(currentHash)) {
    changeCurrentFieldset(currentHash);
  } else {
    location.hash = hashArray[0];
  }

  // change shown fieldset on hashchange
  window.addEventListener('hashchange', function () {
    var newHash = location.hash;

    changeCurrentFieldset(newHash);
  });

  // handle button clicks via delegation
  $buttonContainer.addEventListener('click', function (evt) {
    if (evt.target && (evt.target === $nextButton || evt.target === $prevButton)) {
      var currIdx = hashArray.indexOf(location.hash);

      // if the last button is pressed, then submit the form
      if (event.target === $nextButton && currIdx === hashArray.length - 1) {
        $kitchenForm.submit();
      } else if (currIdx !== -1) {
        evt.target === $nextButton ? location.hash = hashArray[currIdx + 1] : location.hash = hashArray[currIdx - 1];
      }
    }
  });

  //  sticky menu listener
  document.addEventListener('scroll', (0, _utils.throttle)(function () {
    if (!isStuck && $body.scrollTop >= navHeight) {
      $stickyMenu.classList.add(STICKY_MENU_CLASS);
      isStuck = !isStuck;
    } else if (isStuck && $body.scrollTop <= navHeight) {
      $stickyMenu.classList.remove(STICKY_MENU_CLASS);
      isStuck = !isStuck;
    }
  }, 50));

  // init the date sliders
  Array.prototype.forEach.call($dateSliders, function (el) {
    var dateSlider = new _DateSlider2.default(el);
    dateSlider.init();
  });
};

},{"JsController":1,"utils/DateSlider":9,"utils/utils":13}],6:[function(require,module,exports){
'use strict';

var _JsController = require('JsController');

var _JsController2 = _interopRequireDefault(_JsController);

var _SliderController = require('utils/SliderController');

var _SliderController2 = _interopRequireDefault(_SliderController);

var _ModalController = require('utils/ModalController');

var _ModalController2 = _interopRequireDefault(_ModalController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_JsController2.default['kitchen-show'] = function () {
  var $imageSliderContainer = document.querySelector('.listing-images-container');
  var imageSlider = new _SliderController2.default($imageSliderContainer);
  var $multipleReservationButton = document.querySelector('.multiple-reservation-button');
  var $singleReservationButton = document.querySelector('.single-reservation-button');
  var multipleReservationModal = new _ModalController2.default('multiple-reservation-modal-show', [$multipleReservationButton], 'multiple-reservation-modal');
  var singleReservationModal = new _ModalController2.default('single-reservation-modal-show', [$singleReservationButton], 'single-reservation-modal');

  imageSlider.init();
  multipleReservationModal.init();
  singleReservationModal.init();
};

},{"JsController":1,"utils/ModalController":11,"utils/SliderController":12}],7:[function(require,module,exports){
'use strict';

var _JsController = require('JsController');

var _JsController2 = _interopRequireDefault(_JsController);

var _ModalController = require('utils/ModalController');

var _ModalController2 = _interopRequireDefault(_ModalController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var landingLoginButton = '.nav-login-button';
var landingSignupButton = '.nav-signup-button';
var addressInput = 'landing-location-input';

_JsController2.default.landing = function () {
  // init modals
  var $loginLandingButton = document.querySelector(landingLoginButton);
  var $landingSignupButton = document.querySelector(landingSignupButton);
  var loginModalController = new _ModalController2.default('login-modal-show', [$loginLandingButton], 'login-modal').init();
  var signupModalController = new _ModalController2.default('signup-modal-show', [$landingSignupButton], 'signup-modal').init();

  // init autocomplete
  var $addressInput = document.getElementsByClassName(addressInput)[0];
  // window.initLandingAutoComplete = function () {
  //   const autocomplete = new google.maps.places.Autocomplete($addressInput, {});
  // };
};

},{"JsController":1,"utils/ModalController":11}],8:[function(require,module,exports){
'use strict';

var _JsController = require('JsController');

var _JsController2 = _interopRequireDefault(_JsController);

var _InfiniteScrollController = require('utils/InfiniteScrollController');

var _InfiniteScrollController2 = _interopRequireDefault(_InfiniteScrollController);

var _utils = require('utils/utils');

require('whatwg-fetch');

var _GoogleMap = require('google-maps/GoogleMap');

var _GoogleMap2 = _interopRequireDefault(_GoogleMap);

var _styles = require('google-maps/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOADING_CLASS = 'loading';
var RESULT_CLASS = 'result';
var KITCHENS_URL = '/api/v1/kitchens';
var NUM_RESULTS_TO_RETURN_INIT = 6;
var NUM_RESULTS_TO_RETURN_SCROLL = 4;

/**
 * Creates a kitchen list element from the given kitchen json object
 * @param {{}} kitchen - kitchen json object
 * @returns {Element} - the kitchen list element
 */
function makeKitchenHtml(kitchen) {
  var liEl = document.createElement('LI');

  liEl.classList.add(RESULT_CLASS);

  liEl.innerHTML = '\n        <a class="result-link" id="' + kitchen.token + '" href="/kitchen/' + kitchen.token + '">\n          <h2 class="result-title">' + kitchen.title + '</h2>\n          <h2 class="result-price-container">\n            <span class="result-price">£' + Math.ceil(kitchen.price * 1.2) + '</span>\n            <span class="result-price-after">/night</span>\n          </h2>\n        </a>';

  return liEl;
}

_JsController2.default.results = function () {
  var $mapContainer = document.querySelector('#map');
  var $locationInput = document.querySelector('#pac-input');
  var $resultsContainer = document.querySelector('.results-container');
  var $resultsList = document.querySelector('.results-list');
  var $filterList = document.querySelector('.filters-list');
  var currentLatLng = { lat: window.landingLatitude, lng: window.landingLongitude };
  var nameToInputElementMap = {
    location: $locationInput,
    start_date: document.querySelector('#start_date'),
    end_date: document.querySelector('#end_date'),
    type_of_kitchen: document.querySelector('#type_of_kitchen'),
    sort_kitchens: document.querySelector('#sort_kitchens')
  };

  var kitchenToMarkerMap = {};
  var googleMapObject = void 0;
  var googleAutoCompleteObject = void 0;
  var currentHoveredId = void 0;
  var currentIndex = 0;

  /**
   * TODO: when returned results is less than numResults, set global to true and don't request anymore kitchens
   * Fetches the next numResults by using the params in nameToInputMap
   * @param {Number} numResults - number of results to fetch
   * @returns {Promise.<*>|*} - promise with json data
   */
  function fetchNextResults(numResults) {
    var urlParams = Object.keys(nameToInputElementMap).reduce(function (paramsObj, currKey) {
      paramsObj[currKey] = nameToInputElementMap[currKey].value;
      return paramsObj;
    }, {
      num_results: numResults,
      index: currentIndex
    });
    var url = (0, _utils.addUrlParams)(KITCHENS_URL, urlParams);

    return fetch(url).then(function (data) {
      return data.json();
    });
  }

  /**
   * Loads the next numResults and returns true/false depending on if there is more data
   * @param {Number} numResults - number of results to load
   * @return {Promise} - promise after results are loaded
   */
  function loadNextResults(numResults) {
    return fetchNextResults(numResults).then(function (json) {
      if (json && json.length) {
        (function () {
          var listFragment = document.createDocumentFragment();

          json.map(makeKitchenHtml).forEach(function (listElement) {
            listFragment.appendChild(listElement);
          });

          // create the marker on the map and map it to the kitchen
          json.forEach(function (kitchen) {
            kitchenToMarkerMap[kitchen.token] = _GoogleMap2.default.createMapMarker(googleMapObject, kitchen.latitude, kitchen.longitude);
          });

          $resultsList.appendChild(listFragment);
          currentIndex += numResults;
        })();
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
    Array.prototype.forEach.call($resultsList.querySelectorAll('.result'), function (e) {
      return $resultsList.removeChild(e);
    });

    // remove all the markers from the map
    Object.keys(kitchenToMarkerMap).forEach(function (key) {
      return kitchenToMarkerMap[key].setMap(null);
    });
    kitchenToMarkerMap = {};

    // load the next set of results
    loadNextResults(NUM_RESULTS_TO_RETURN_INIT);
  }

  // setup the infinite scrolling to return more results
  var infiniteScrollController = new _InfiniteScrollController2.default($resultsContainer, function () {
    loadNextResults(NUM_RESULTS_TO_RETURN_SCROLL);
  });
  infiniteScrollController.attachEvents();

  // attach event so that markers change on kitchen element hovers
  $resultsList.addEventListener('mouseenter', function (evt) {
    var target = evt.target;

    if (target && target.nodeName === 'A') {
      var kitchenId = target.id;

      // unhighlight previous kitchen incase mouseleave didn't do it
      if (currentHoveredId && currentHoveredId !== kitchenId) {
        kitchenToMarkerMap[currentHoveredId].setIcon(_styles.MARKER_DEFAULT_STYLES);
      }

      kitchenToMarkerMap[kitchenId].setIcon(_styles.MARKER_HOVER_STYLES);
      currentHoveredId = kitchenId;
    }
  }, true);

  // attach event so markers change back
  $resultsList.addEventListener('mouseleave', function () {
    if (currentHoveredId) {
      kitchenToMarkerMap[currentHoveredId].setIcon(_styles.MARKER_DEFAULT_STYLES);
      currentHoveredId = null;
    }
  });

  // attach event on filter or location change
  $filterList.addEventListener('change', resetResults);
  $locationInput.addEventListener('change', resetResults);

  // google maps callback
  window.resultsGoogleInit = function () {
    var autoCompleteOptions = {
      types: ['(cities)'],
      componentRestrictions: { country: 'GB' }
    };

    // init the autocomplete, the map, and then fetch the initial results
    googleAutoCompleteObject = _GoogleMap2.default.createAutoComplete($locationInput, autoCompleteOptions);
    googleMapObject = _GoogleMap2.default.createMap($mapContainer, currentLatLng);
    loadNextResults(NUM_RESULTS_TO_RETURN_INIT);
  };
};

},{"JsController":1,"google-maps/GoogleMap":3,"google-maps/styles":4,"utils/InfiniteScrollController":10,"utils/utils":13,"whatwg-fetch":14}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENTER_KEY_CODE = 13;

var DateSlider = function () {
  function DateSlider($dateSlider) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$step = _ref.step;
    var step = _ref$step === undefined ? 60 : _ref$step;
    var _ref$min = _ref.min;
    var min = _ref$min === undefined ? 0 : _ref$min;
    var _ref$max = _ref.max;
    var max = _ref$max === undefined ? 24 : _ref$max;
    var _ref$labelStep = _ref.labelStep;
    var labelStep = _ref$labelStep === undefined ? 3 : _ref$labelStep;
    var _ref$selectedClass = _ref.selectedClass;
    var selectedClass = _ref$selectedClass === undefined ? 'selected' : _ref$selectedClass;

    _classCallCheck(this, DateSlider);

    this.$dateSlider = $dateSlider;
    this.step = step;
    this.min = min;
    this.max = max;
    this.labelStep = labelStep;
    this.numElements = (max - min) / (step / 60);
    this.selectedClass = selectedClass;
    this.name = $dateSlider.dataset.name || 'dateslider'; // the name of the hidden input field associated with this slider
    this.isMouseDown = false; // used to detect dragging
    this.timeBlocks = []; // an array of all of the time blocks
    this.hiddenField = null; // the hidden input field
  }

  /**
   * Inits the date slider on the specified element given to the contructor
   * @returns {void}
   */


  _createClass(DateSlider, [{
    key: 'init',
    value: function init() {
      this._createTimeBlocks();
      this._createHiddenField();
      this._attachEvents();
    }

    /**
     * Creates the time block elements and puts them in the date slider element
     * @returns {void}
     * @private
     */

  }, {
    key: '_createTimeBlocks',
    value: function _createTimeBlocks() {
      var documentFrag = document.createDocumentFragment();

      for (var idx = 0; idx < this.numElements; idx += 1) {
        var listElement = this._createTimeBlockElementHtml(idx);

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

  }, {
    key: '_createTimeBlockElementHtml',
    value: function _createTimeBlockElementHtml(idx) {
      var timeOfDay = (this.min + idx * this.step) / 60; // the time of day 0-24
      var hours = Math.floor(timeOfDay);
      var minutes = timeOfDay % 1 * 60;
      var listEl = document.createElement('LI');
      var listElWidth = 100 / this.numElements;
      var minutesString = ('0' + minutes).slice(-2); // makes sure the minutes is always 2 digits long

      listEl.style.width = listElWidth + '%';
      listEl.classList.add('time-block');
      listEl.dataset.beginTime = timeOfDay;
      listEl.setAttribute('aria-label', 'begin time ' + timeOfDay);
      listEl.tabIndex = 0;

      // special class for noon styling
      if (timeOfDay === 12) {
        listEl.classList.add('noon');
      }

      // only every labelStep element gets a time label
      if (idx % this.labelStep === 0) {
        listEl.innerHTML = '<span class="time-label">' + hours + ':' + minutesString + '</span>';
      }

      return listEl;
    }

    /**
     * Creates the hidden field before the date slider element
     * @returns {void}
     * @private
     */

  }, {
    key: '_createHiddenField',
    value: function _createHiddenField() {
      this.hiddenField = document.createElement('input');
      this.hiddenField.setAttribute('type', 'hidden');
      this.hiddenField.setAttribute('name', this.name);
      this.$dateSlider.parentNode.insertBefore(this.hiddenField, this.$dateSlider);
    }

    /**
     * Unselects all time blocks
     * @returns {void}
     * @private
     */

  }, {
    key: '_resetTimeBlocks',
    value: function _resetTimeBlocks() {
      var _this = this;

      this.timeBlocks.forEach(function (timeBlock) {
        timeBlock.classList.remove(_this.selectedClass);
      });
    }

    /**
     * Start the highlight select
     * @param {Event} evt - the event generated by the handler
     * @returns {void}
     * @private
     */

  }, {
    key: '_startSelect',
    value: function _startSelect(evt) {
      var target = evt.target;

      // select or deselect the element
      if (target && target.nodeName === 'LI') {
        this._resetTimeBlocks();
        target.classList.toggle(this.selectedClass);
        this.isMouseDown = true;
        this.startingIndex = Array.prototype.indexOf.call(this.timeBlocks, target);
      }
    }

    /**
     * Stop the highlight select
     * @param {Event} evt - the event generated by the handler
     * @returns {void}
     * @private
     */

  }, {
    key: '_stopSelect',
    value: function _stopSelect(evt) {
      this.isMouseDown = false;
      this.hiddenField.value = this.value;
    }

    /**
     * Highlight the curret time block
     * @param {Event} evt - the event generated by the handler
     * @returns {void}
     * @private
     */

  }, {
    key: '_select',
    value: function _select(evt) {
      var _this2 = this;

      var target = evt.target;

      if (this.isMouseDown && target && target.nodeName === 'LI') {
        var currentIndex = Array.prototype.indexOf.call(this.timeBlocks, target);
        var minIndex = Math.min(currentIndex, this.startingIndex);
        var maxIndex = Math.max(currentIndex, this.startingIndex);
        var timeBlocksToBeSelected = this.timeBlocks.slice(minIndex, maxIndex + 1);

        // select all the blocks up to and including the current block in case the user moved too fast or went outside
        // of the dateslider
        timeBlocksToBeSelected.forEach(function (el) {
          return el.classList.add(_this2.selectedClass);
        });
      }
    }

    /**
     * Attaches any events needed for the date slider
     * @return {void}
     * @private
     */

  }, {
    key: '_attachEvents',
    value: function _attachEvents() {
      var _this3 = this;

      // the initial selection or deselection of a time block
      this.$dateSlider.addEventListener('mousedown', this._startSelect.bind(this));

      this.$dateSlider.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEY_CODE) {
          _this3.isMouseDown ? _this3._stopSelect(evt) : _this3._startSelect(evt);
        }
      });

      // dragging select of time blocks
      this.$dateSlider.addEventListener('mouseenter', this._select.bind(this), true);
      this.$dateSlider.addEventListener('focus', function (evt) {
        if (_this3.isMouseDown) {
          _this3._select(evt);
        }
      }, true);

      // stop the highlight and set the value of the hidden field
      document.addEventListener('mouseup', this._stopSelect.bind(this));
    }

    /**
     * Returns a comma separated value of the min selected time and max selected time
     * @returns {String} - comma separated value of the min selected time and max selected time. Ex: 12,14
     */

  }, {
    key: 'value',
    get: function get() {
      var _this4 = this;

      var selectedBlocks = this.timeBlocks.filter(function (timeBlock) {
        return timeBlock.classList.contains(_this4.selectedClass);
      });
      var minTime = 0,
          maxTime = 0;

      if (selectedBlocks.length) {
        minTime = selectedBlocks[0].dataset.beginTime;
        maxTime = +selectedBlocks[selectedBlocks.length - 1].dataset.beginTime + this.step / 60;
      }

      return minTime + ',' + maxTime;
    }
  }]);

  return DateSlider;
}();

exports.default = DateSlider;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('utils/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SENSITIVITY = 0.95;

var InfiniteScrollController = function () {
  function InfiniteScrollController(el, callback) {
    var sensitivity = arguments.length <= 2 || arguments[2] === undefined ? DEFAULT_SENSITIVITY : arguments[2];

    _classCallCheck(this, InfiniteScrollController);

    this.el = el;
    this.clientHeight = el.clientHeight;
    this.callback = callback;
    this.sensitivity = sensitivity;
  }

  _createClass(InfiniteScrollController, [{
    key: 'attachEvents',
    value: function attachEvents() {
      var _this = this;

      this.el.addEventListener('scroll', (0, _utils.throttle)(function () {
        var percentScroll = (_this.el.scrollTop + _this.clientHeight) / _this.el.scrollHeight;

        if (percentScroll >= _this.sensitivity) {
          _this.callback();
        }
      }, 200));

      window.addEventListener('resize', (0, _utils.debounce)(function () {
        _this.clientHeight = _this.el.clientHeight;
      }, 200));
    }
  }]);

  return InfiniteScrollController;
}();

exports.default = InfiniteScrollController;

},{"utils/utils":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalController = function () {
  function ModalController(bodyModalClass, modalLinks, modalClass) {
    _classCallCheck(this, ModalController);

    this.bodyModalClass = bodyModalClass;
    this.modalLinks = modalLinks;
    this.modalClass = modalClass;
  }

  _createClass(ModalController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var $body = document.querySelector('body');
      var $modal = document.querySelector('.' + this.modalClass);

      // make sure the modal exists before continuing
      if ($modal) {
        (function () {
          var ESCAPE_KEY_CODE = 27;
          var lastFocus = null;
          var closeModal = function closeModal() {
            $body.classList.remove(_this.bodyModalClass);
            lastFocus.focus(); // restore focus to the old element
          };

          // each link should open the modal by adding the bodyModalClass to body
          _this.modalLinks.forEach(function (link) {
            link.addEventListener('click', function (evt) {
              // save the last focus
              lastFocus = document.activeElement;
              $body.classList.add(_this.bodyModalClass);

              // focus on the modal
              $modal.setAttribute('tabindex', 0);
              $modal.focus();

              // stop prop so we don't close the modal when we bubble up to body
              evt.stopPropagation();
            });
          });

          // make sure only modal elements are focusable
          document.addEventListener('focus', function (evt) {
            if ($body.classList.contains(_this.bodyModalClass) && !$modal.contains(evt.target)) {
              event.preventDefault();
              $modal.focus();
            }
          }, true);

          // a click outside the modal should close it
          $body.addEventListener('click', function () {
            if ($body.classList.contains(_this.bodyModalClass)) {
              closeModal();
            }
          });

          // inside the modal don't bubble up so we don't close it
          $modal.addEventListener('click', function (evt) {
            return evt.stopPropagation();
          });

          // handle modal close on escape
          document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === ESCAPE_KEY_CODE && $body.classList.contains(_this.bodyModalClass)) {
              closeModal();
            }
          });
        })();
      }
    }
  }]);

  return ModalController;
}();

exports.default = ModalController;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BREADCRUMB_LIST_EL_CLASS = 'breadcrumb-list-el';
var BREADCRUMB_BUTTON_CLASS = 'breadcrumb-button';
var CURRENT_CLASS = 'current';
var RIGHT_ARROW_CODE = 39;
var LEFT_ARROW_CODE = 37;

var SliderController = function () {
  function SliderController($sliderContainer) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, SliderController);

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

  _createClass(SliderController, [{
    key: 'init',
    value: function init() {
      this._addBreadcrumbs();
      this._attachEvents();
      this._changeCurrent(this.currentIndex);
    }
  }, {
    key: '_changeCurrent',
    value: function _changeCurrent(nextIndex) {
      this.$sliderElements[this.currentIndex].classList.remove(CURRENT_CLASS);
      this.breadcrumbElements[this.currentIndex].classList.remove(CURRENT_CLASS);
      this.$sliderElements[nextIndex].classList.add(CURRENT_CLASS);
      this.breadcrumbElements[nextIndex].classList.add(CURRENT_CLASS);

      this.currentIndex = nextIndex;
    }
  }, {
    key: '_addBreadcrumbs',
    value: function _addBreadcrumbs() {
      var breadcrumbFrag = document.createDocumentFragment();

      // attach breadcrumb list elements to fragment
      for (var i = 0; i < this.numElements; i += 1) {
        var breadcrumbListEl = document.createElement('LI');

        breadcrumbListEl.classList.add(BREADCRUMB_LIST_EL_CLASS);
        breadcrumbListEl.innerHTML = '<button class="' + BREADCRUMB_BUTTON_CLASS + '"></button>';
        breadcrumbFrag.appendChild(breadcrumbListEl);
        this.breadcrumbElements.push(breadcrumbListEl);
      }

      this.$breadcrumbList.appendChild(breadcrumbFrag);
    }
  }, {
    key: '_attachEvents',
    value: function _attachEvents() {
      var _this = this;

      var nextSlideFn = function nextSlideFn() {
        return _this._changeCurrent((_this.currentIndex + 1) % _this.numElements);
      };
      var prevSlideFn = function prevSlideFn() {
        return _this._changeCurrent(_this.currentIndex ? _this.currentIndex - 1 : _this.numElements - 1);
      };

      this.$nextButton.addEventListener('click', nextSlideFn);
      this.$prevButton.addEventListener('click', prevSlideFn);
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === RIGHT_ARROW_CODE) {
          nextSlideFn();
        } else if (evt.keyCode === LEFT_ARROW_CODE) {
          prevSlideFn();
        }
      });

      // breadcrumb links should also change the slide
      this.$breadcrumbList.addEventListener('click', function (evt) {
        var target = evt.target;

        if (target && target.nodeName === 'BUTTON') {
          target = target.parentNode;
          var nextIndex = _this.breadcrumbElements.indexOf(target);

          _this._changeCurrent(nextIndex);
        }
      }, true);
    }
  }]);

  return SliderController;
}();

exports.default = SliderController;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Debounces a given function for a given delay
 * @param {Function} fn - the function to be debounced
 * @param {Number} delay - the debounce delay (ms)
 * @returns {function()} - the debouned function
 */
function debounce(fn, delay) {
  var timer = null;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(undefined, args);
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
function throttle(func, wait) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var context,
      args,
      result,
      timeout = null,
      previous = 0,
      later = function later() {
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
function addUrlParams(base) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return Object.keys(params).reduce(function (url, key, idx) {
    return !idx ? url + "?" + key + "=" + params[key] : url + "&" + key + "=" + params[key];
  }, base);
}

exports.debounce = debounce;
exports.throttle = throttle;
exports.addUrlParams = addUrlParams;

},{}],14:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[2]);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//


