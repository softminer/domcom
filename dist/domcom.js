(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["dc"] = factory();
	else
		root["dc"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** ./src/index.coffee ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var dc, extend;

	module.exports = dc = __webpack_require__(/*! ./dc */ 2);

	dc.extend = extend = __webpack_require__(/*! ./extend */ 5);

	extend(dc, __webpack_require__(/*! ./core */ 3), __webpack_require__(/*! ./util */ 1), __webpack_require__(/*! ./constant */ 51), __webpack_require__(/*! ./emitter */ 12));


/***/ },
/* 1 */
/*!*************************!*\
  !*** ./src/util.coffee ***!
  \*************************/
/***/ function(module, exports) {

	var bibind, dupStr, sibind,
	  __slice = [].slice;

	exports.isArray = function(exp) {
	  return Object.prototype.toString.call(exp) === '[object Array]';
	};

	exports.pairListDict = function() {
	  var i, len, list, result;
	  list = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	  if (list.length === 1) {
	    list = list[0];
	  }
	  len = list.length;
	  i = 0;
	  result = Object.create(null);
	  while (i < len) {
	    result[list[i]] = list[i + 1];
	    i += 2;
	  }
	  return result;
	};

	exports.sibind = exports.si = sibind = function(model, key) {
	  return function() {
	    return model[key];
	  };
	};

	exports.bibind = exports.bi = bibind = function(model, key) {
	  var fn;
	  fn = function(value) {
	    if (!arguments.length) {
	      return model[key];
	    } else {
	      return model[key] = value;
	    }
	  };
	  fn.setable = true;
	  return fn;
	};

	exports.bindings = function(model) {
	  var key, result;
	  result = Object.create(null);
	  for (key in model) {
	    result['$' + key] = bibind(model, key);
	    result['_' + key] = sibind(model, key);
	  }
	  return result;
	};

	exports.listToDict = function() {
	  var item, list, result, _i, _len;
	  list = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	  if (list.length === 1) {
	    list = list[0];
	  }
	  result = Object.create(null);
	  for (_i = 0, _len = list.length; _i < _len; _i++) {
	    item = list[_i];
	    result[item] = true;
	  }
	  return result;
	};

	exports.dupStr = dupStr = function(str, n) {
	  var i, s;
	  s = '';
	  i = 0;
	  while (i++ < n) {
	    s += str;
	  }
	  return s;
	};

	exports.newLine = function(str, indent, noNewLine) {
	  if (typeof str === 'number') {
	    if (indent) {
	      return '';
	    } else {
	      return '\n' + dupStr(' ', str);
	    }
	  } else {
	    if (typeof indent === 'number') {
	      if (noNewLine) {
	        return str;
	      } else {
	        return '\n' + dupStr(' ', indent) + str;
	      }
	    } else {
	      if (indent) {
	        return str;
	      } else {
	        return '\n' + dupStr(' ', indent) + str;
	      }
	    }
	  }
	};

	exports.funcString = function(fn) {
	  var e, s;
	  if (typeof fn !== 'function') {
	    if (fn == null) {
	      return 'null';
	    }
	    try {
	      return JSON.stringify(fn);
	    } catch (_error) {
	      e = _error;
	      return fn.toString();
	    }
	  }
	  s = fn.toString();
	  if (s.slice(0, 12) === "function (){") {
	    s = s.slice(12, s.length - 1);
	  } else if (s.slice(0, 13) === "function () {") {
	    s = s.slice(13, s.length - 1);
	  } else {
	    s = s.slice(9);
	  }
	  s = s.trim();
	  if (s.slice(0, 7) === 'return ') {
	    s = s.slice(7);
	  }
	  if (s[s.length - 1] === ';') {
	    s = s.slice(0, s.length - 1);
	  }
	  return 'fn:' + s;
	};


/***/ },
/* 2 */
/*!***********************!*\
  !*** ./src/dc.coffee ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	
	/** @api dc(element) - dc component constructor
	 *
	 * @param element
	 */
	var Component, DomNode, DomNodeList, componentCache, dc, globalDcId, querySelectorComponent, readyFnList, render, renderLoop, requestAnimationFrame, _ref;

	_ref = __webpack_require__(/*! ./core */ 3), Component = _ref.Component, DomNode = _ref.DomNode, DomNodeList = _ref.DomNodeList;

	requestAnimationFrame = __webpack_require__(/*! ./dom-util */ 11).requestAnimationFrame;

	componentCache = {};

	readyFnList = [];

	globalDcId = 1;

	module.exports = window.dc = dc = function(element, options) {
	  if (options == null) {
	    options = {};
	  }
	  if (typeof element === 'string') {
	    if (options.noCache) {
	      return querySelectorComponent(element, options.all);
	    } else {
	      return componentCache[element] || (componentCache[element] = querySelectorComponent(selector, options.all));
	    }
	  } else if (element instanceof Node) {
	    if (options.noCache) {
	      return new DomNode(element);
	    } else {
	      if (element.dcId) {
	        return componentCache[element.dcId];
	      } else {
	        element.dcId = globalDcId++;
	        return componentCache[element.dcId] = new DomNode(element);
	      }
	    }
	  } else if (element instanceof Component) {
	    return element;
	  } else {
	    throw new Error('error type for dc');
	  }
	};

	querySelectorComponent = function(selector, all) {
	  if (all) {
	    return new DomNodeList(document.querySelectorAll(selector));
	  } else {
	    return new DomNode(document.querySelector(selector));
	  }
	};

	dc.ready = function(fn) {
	  return readyFnList.push(fn);
	};

	dc.onReady = function() {
	  var fn, _i, _len;
	  for (_i = 0, _len = readyFnList.length; _i < _len; _i++) {
	    fn = readyFnList[_i];
	    fn();
	  }
	};

	dc.render = render = function() {
	  var comp, _i, _len, _results;
	  _results = [];
	  for (_i = 0, _len = rootComponents.length; _i < _len; _i++) {
	    comp = rootComponents[_i];
	    _results.push(comp.update());
	  }
	  return _results;
	};

	dc.renderLoop = renderLoop = function() {
	  requestAnimFrame(renderLoop);
	  render();
	};

	document.dcId = globalDcId;

	window.$document = componentCache[globalDcId] = new DomNode(document);

	globalDcId++;

	document.body.dcId = globalDcId;

	window.$body = componentCache[globalDcId] = new DomNode(document.body);

	globalDcId++;

	document.addEventListener('DOMContentLoaded', dc.onReady, false);


/***/ },
/* 3 */
/*!*******************************!*\
  !*** ./src/core/index.coffee ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var exports, extend;

	extend = __webpack_require__(/*! ../extend */ 5);

	module.exports = exports = extend({}, __webpack_require__(/*! ./base */ 7), __webpack_require__(/*! ./virtual-node */ 15), __webpack_require__(/*! ./instantiate */ 6), __webpack_require__(/*! ./tag */ 4), __webpack_require__(/*! ./property */ 31), __webpack_require__(/*! ./directives */ 38), __webpack_require__(/*! ./builtins */ 45));


/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./src/core/tag.coffee ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var extend, extendEventValue, getInputProp, input, inputTypes, tag, tagName, tagNames, type, _fn, _fn1, _i, _j, _len, _len1, _ref,
	  __slice = [].slice;

	extend = __webpack_require__(/*! ../extend */ 5);

	tag = __webpack_require__(/*! ./instantiate */ 6).tag;

	extendEventValue = __webpack_require__(/*! ./property */ 31).extendEventValue;

	tagNames = "a abbr acronym address area b base bdo big blockquote body br button caption cite code col colgroup dd del dfn div dl" + " dt em fieldset form h1 h2 h3 h4 h5 h6 head html hr i img input ins kbd label legend li link map meta noscript object" + " ol optgroup option p param pre q samp script select small span strong style sub sup" + " table tbody td textarea tfoot th thead title tr tt ul var header footer section";

	tagNames = tagNames.split(' ');

	_fn = function(tagName) {
	  return exports[tagName] = function() {
	    return tag.apply(null, [tagName].concat(__slice.call(arguments)));
	  };
	};
	for (_i = 0, _len = tagNames.length; _i < _len; _i++) {
	  tagName = tagNames[_i];
	  _fn(tagName);
	}

	inputTypes = 'text textarea checkbox radio date email number'.split(' ');

	getInputProp = function(type) {
	  if (type === 'checkbox') {
	    return 'checked';
	  } else {
	    return 'value';
	  }
	};

	input = exports.input = function(type, attrs, value) {
	  if (typeof type === 'object') {
	    value = attrs;
	    attrs = type;
	    type = 'text';
	  }
	  attrs = extend({
	    type: type
	  }, attrs);
	  if (value != null) {
	    attrs[getInputProp(type)] = value;
	    if (value.setable) {
	      extendEventValue(attrs, 'onchange', (function(event, comp) {
	        return value(this.value);
	      }), 'before');
	    }
	  }
	  return tag('input', attrs);
	};

	_ref = 'text textarea checkbox radio date email number'.split(' ');
	_fn1 = function(type) {
	  return exports[type] = function(value, attrs) {
	    var temp;
	    if (typeof value === 'object') {
	      temp = attrs;
	      attrs = value;
	      value = temp;
	    }
	    attrs = attrs || Object.create(null);
	    return input(type, attrs, value);
	  };
	};
	for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
	  type = _ref[_j];
	  _fn1(type);
	}


/***/ },
/* 5 */
/*!***************************!*\
  !*** ./src/extend.coffee ***!
  \***************************/
/***/ function(module, exports) {

	'use strict';
	var hasOwn, isPlainObject, toString;

	hasOwn = Object.prototype.hasOwnProperty;

	toString = Object.prototype.toString;

	isPlainObject = function(obj) {
	  'use strict';
	  var has_is_property_of_method, has_own_constructor, key;
	  if (!obj || toString.call(obj) !== '[object Object]') {
	    return false;
	  }
	  has_own_constructor = hasOwn.call(obj, 'constructor');
	  has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	  if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
	    return false;
	  }
	  for (key in obj) {
	    key = key;
	  }
	  return key === void 0 || hasOwn.call(obj, key);
	};

	module.exports = function() {
	  var clone, copy, copyIsArray, deep, i, length, name, options, src, target;
	  target = arguments[0];
	  i = 1;
	  length = arguments.length;
	  deep = false;
	  if (typeof target === 'boolean') {
	    deep = target;
	    target = arguments[1] || Object.create(null);
	    i = 2;
	  } else if (typeof target !== 'object' && typeof target !== 'function' || target === null) {
	    target = Object.create(null);
	  }
	  while (i < length) {
	    options = arguments[i];
	    if (options !== null) {
	      for (name in options) {
	        name = name;
	        src = target[name];
	        copy = options[name];
	        if (target === copy) {
	          ++i;
	          continue;
	        }
	        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && Array.isArray(src) ? src : [];
	          } else {
	            clone = src && isPlainObject(src) ? src : Object.create(null);
	          }
	          target[name] = extend(deep, clone, copy);
	        } else if (copy !== void 0) {
	          target[name] = copy;
	        }
	      }
	    }
	    ++i;
	  }
	  return target;
	};


/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./src/core/instantiate.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Case, Comment, Component, Func, If, List, Ref, Repeat, Tag, Text, attrsChildren, isAttrs, isComponent, list, tag, toComponent, toTagChildren, _ref,
	  __slice = [].slice;

	_ref = __webpack_require__(/*! ./base */ 7), Component = _ref.Component, toComponent = _ref.toComponent, isComponent = _ref.isComponent, Tag = _ref.Tag, Text = _ref.Text, Comment = _ref.Comment, Ref = _ref.Ref, If = _ref.If, Case = _ref.Case, Func = _ref.Func, List = _ref.List, Repeat = _ref.Repeat;

	isAttrs = function(item) {
	  return typeof item === 'object' && item !== null && !isComponent(item) && !(item instanceof Array);
	};

	attrsChildren = function(args) {
	  var attrs;
	  attrs = args[0];
	  if (!args.length) {
	    return [Object.create(null), []];
	  } else if (attrs==null) {
	    return [Object.create(null), args.slice(1)];
	  } else if (attrs instanceof Array) {
	    return [Object.create(null), args];
	  } else if (typeof attrs === 'function') {
	    return [Object.create(null), args];
	  } else if (typeof attrs === 'object') {
	    if (isComponent(attrs)) {
	      return [Object.create(null), args];
	    } else {
	      return [attrs, args.slice(1)];
	    }
	  } else {
	    return [Object.create(null), args];
	  }
	};

	toTagChildren = function(args) {
	  if (!(args instanceof Array)) {
	    return [args];
	  } else if (!args.length) {
	    return [];
	  } else if (args.length === 1) {
	    return toTagChildren(args[0]);
	  } else {
	    return args;
	  }
	};

	tag = exports.tag = function() {
	  var args, attrs, children, tagName, _ref1;
	  tagName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	  _ref1 = attrsChildren(args), attrs = _ref1[0], children = _ref1[1];
	  return new Tag(tagName, attrs, toTagChildren(children));
	};

	exports.nstag = function() {
	  var args, attrs, children, namespace, tagName, _ref1;
	  tagName = arguments[0], namespace = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
	  _ref1 = attrsChildren(args), attrs = _ref1[0], children = _ref1[1];
	  return new Tag(tagName, attrs, toTagChildren(children), namespace);
	};

	exports.ref = function(attrs, src, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Ref(src, options)]);
	  } else {
	    return new Ref(attrs, src);
	  }
	};

	exports.clone = function(attrs, src, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [toComponent(src).clone(options)]);
	  } else {
	    return toComponent(attrs).clone(src);
	  }
	};

	exports.if_ = function(attrs, test, then_, else_, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new If(test, then_, else_, options)]);
	  } else {
	    return new If(attrs, test, then_, else_);
	  }
	};

	exports.case_ = function(attrs, test, map, else_, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Case(test, map, else_, options)]);
	  } else {
	    return new Case(attrs, test, map, else_);
	  }
	};

	exports.func = function(attrs, fn, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Func(fn, options)]);
	  } else {
	    return new Func(attrs, fn);
	  }
	};

	exports.txt = function(attrs, text) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Text(text)]);
	  } else {
	    return new Text(attrs);
	  }
	};

	exports.comment = function(attrs, text) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Comment(text)]);
	  } else {
	    return new Comment(attrs);
	  }
	};

	exports.list = list = function() {
	  var attrs, lst;
	  attrs = arguments[0], lst = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new List(lst)]);
	  } else {
	    lst.unshift(attrs);
	    if (lst.length === 1) {
	      return toComponent(lst[0]);
	    } else {
	      return new List(lst);
	    }
	  }
	};


	/** @param itemFn - function (item, index, list, component) { ... }
	 */

	exports.repeat = function(attrs, list, itemFn, options) {
	  if (isAttrs(attrs)) {
	    return new Tag('div', attrs, [new Repeat(list, itemFn, options)]);
	  } else {
	    return new Repeat(attrs, list, itemFn);
	  }
	};


/***/ },
/* 7 */
/*!************************************!*\
  !*** ./src/core/base/index.coffee ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  isComponent: __webpack_require__(/*! ./isComponent */ 8),
	  toComponent: __webpack_require__(/*! ./toComponent */ 9),
	  Component: __webpack_require__(/*! ./component */ 10),
	  BaseComponent: __webpack_require__(/*! ./BaseComponent */ 14),
	  List: __webpack_require__(/*! ./List */ 27),
	  DomNodeList: __webpack_require__(/*! ./DomNodeList */ 28),
	  Tag: __webpack_require__(/*! ./Tag */ 30),
	  DomNode: __webpack_require__(/*! ./DomNode */ 29),
	  Text: __webpack_require__(/*! ./Text */ 13),
	  Comment: __webpack_require__(/*! ./Comment */ 32),
	  Html: __webpack_require__(/*! ./Html */ 33),
	  TransformComponent: __webpack_require__(/*! ./TransformComponent */ 26),
	  Ref: __webpack_require__(/*! ./Ref */ 34),
	  If: __webpack_require__(/*! ./If */ 35),
	  Case: __webpack_require__(/*! ./Case */ 36),
	  Func: __webpack_require__(/*! ./Func */ 25),
	  Repeat: __webpack_require__(/*! ./Repeat */ 37)
	};


/***/ },
/* 8 */
/*!******************************************!*\
  !*** ./src/core/base/isComponent.coffee ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = function(x) {
	  return x && x.getVirtualTree;
	};


/***/ },
/* 9 */
/*!******************************************!*\
  !*** ./src/core/base/toComponent.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, Text, isComponent, toComponent;

	Component = __webpack_require__(/*! ./component */ 10);

	isComponent = __webpack_require__(/*! ./isComponent */ 8);

	Text = __webpack_require__(/*! ./Text */ 13);

	module.exports = toComponent = function(x) {
	  var Func, List, e;
	  if (arguments.length !== 1) {
	    throw new Error('toComponent: wrong arguments length');
	  }
	  if (x == null) {
	    return new Text('');
	  } else if (isComponent(x)) {
	    return x;
	  } else if (typeof x === 'function') {
	    Func = __webpack_require__(/*! ./Func */ 25);
	    return new Func(x);
	  } else if (x instanceof Array) {
	    if (x.length === 1) {
	      return toComponent(x[0]);
	    } else {
	      List = __webpack_require__(/*! ./List */ 27);
	      return new List((function() {
	        var _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = x.length; _i < _len; _i++) {
	          e = x[_i];
	          _results.push(toComponent(e));
	        }
	        return _results;
	      })());
	    }
	  } else {
	    return new Text(x);
	  }
	};


/***/ },
/* 10 */
/*!****************************************!*\
  !*** ./src/core/base/component.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, componentId, extend, mountList, normalizeDomElement, removeNode, _ref,
	  __slice = [].slice;

	extend = __webpack_require__(/*! ../../extend */ 5);

	_ref = __webpack_require__(/*! ../../dom-util */ 11), normalizeDomElement = _ref.normalizeDomElement, removeNode = _ref.removeNode;

	componentId = 1;

	mountList = [];

	module.exports = Component = (function() {
	  function Component() {
	    this.listeners = {};
	    this.parentNode = null;
	    this.node = null;
	    this.options = null;
	    this.id = componentId++;
	  }

	  Component.prototype.setOptions = function(options) {
	    this.options = options;
	    return this;
	  };

	  Component.prototype.beforeMount = function() {
	    var cbs, fns;
	    fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    this.mountCallbackList = cbs = this.mountCallbackList || [];
	    cbs.push.apply(cbs, fns);
	    return this;
	  };

	  Component.prototype.unbindBeforeMount = function() {
	    var cbs, fn, fns, _i, _len;
	    fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    cbs = this.mountCallbackList;
	    for (_i = 0, _len = cbs.length; _i < _len; _i++) {
	      fn = cbs[_i];
	      if (cbs.indexOf(fn) === -1) {
	        continue;
	      } else {
	        cbs.splice(index, 1);
	      }
	    }
	    if (!cbs.length) {
	      this.mountCallbackList = null;
	      if (this.vtree instanceof LifeTimeEvent) {
	        this.vtree = null;
	      }
	    }
	    return this;
	  };

	  Component.prototype.afterUnmount = function() {
	    var cbs, fns;
	    fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    this.unmountCallbackList = cbs = this.unmountCallbackList || [];
	    cbs.push.apply(cbs, fns);
	    return this;
	  };

	  Component.prototype.unbindAfterUnmount = function() {
	    var cbs, fn, fns, _i, _len;
	    fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    cbs = this.unmountCallbackList;
	    for (_i = 0, _len = cbs.length; _i < _len; _i++) {
	      fn = cbs[_i];
	      if (cbs.indexOf(fn) === -1) {
	        continue;
	      } else {
	        cbs.splice(index, 1);
	      }
	    }
	    if (!cbs.length) {
	      this.unmountCallbackList = null;
	      if (this.vtree instanceof LifeTimeEvent) {
	        this.vtree = null;
	      }
	    }
	    return this;
	  };

	  Component.prototype.setParentNode = function(node) {
	    this.parentNode = node;
	    return this;
	  };

	  Component.prototype.nextNode = function() {
	    var container, index, len, node, siblings;
	    container = this.container;
	    if (!container) {
	      return this._nextNode;
	    }
	    index = this.index;
	    if (index == null) {
	      return container.nextNode();
	    } else {
	      siblings = container.children;
	      len = siblings.length;
	      while (index < len - 1) {
	        if (node = siblings[index + 1].firstNode()) {
	          return node;
	        }
	        index++;
	      }
	      if (container.tagName) {

	      } else {
	        return container.nextNode();
	      }
	    }
	  };

	  Component.prototype.mount = function(mountNode, beforeNode) {
	    this.mountNode = normalizeDomElement(mountNode);
	    if (this.parentNode && this.parentNode !== this.mountNode) {
	      this.unmount();
	    }
	    this.mounting = true;
	    this.setParentNode(this.mountNode);
	    this._nextNode = beforeNode;
	    this.render();
	    this.mounting = false;
	    return this;
	  };

	  Component.prototype.render = function() {
	    if (!this.vtree) {
	      this.vtree = this.getVirtualTree();
	    }
	    return this.vtree.render();
	  };

	  Component.prototype.create = function() {
	    this.vtree = this.getVirtualTree();
	    return this.vtree.render();
	  };

	  Component.prototype.update = function() {
	    return this.vtree.render();
	  };

	  Component.prototype.unmount = function() {
	    this.remove();
	    return this;
	  };

	  Component.prototype.remove = function() {
	    removeNode(this.parentNode, this.node);
	    this.vtree.executeUnmountCallback();
	    return this;
	  };

	  Component.prototype.hasLifeTimeEvent = function() {
	    return false;
	  };

	  Component.prototype.copyLifeCallback = function(srcComponent) {
	    this.beforeMountCallbackList = srcComponent.beforeMountCallbackList;
	    this.afterUnmountCallbackList = srcComponent.afterUnmountCallbackList;
	    return this;
	  };

	  return Component;

	})();

	extend(Component.prototype, __webpack_require__(/*! ../../emitter */ 12));


/***/ },
/* 11 */
/*!*****************************!*\
  !*** ./src/dom-util.coffee ***!
  \*****************************/
/***/ function(module, exports) {

	var createHtmlFragment, createUpdateHtml, insertNode, removeNode, _raf;

	_raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	exports.requestAnimationFrame = exports.raf = _raf || function(callback) {
	  window.setInterval(callback, 1000 / 60);
	};

	exports.normalizeDomElement = function(domElement) {
	  if (typeof domElement === 'string') {
	    domElement = document.querySelector(domElement);
	  }
	  return domElement || document.getElementsByTagName('body')[0];
	};

	exports.insertNode = insertNode = function(parent, child, beforeNode) {
	  var item, _i, _len;
	  if (!parent) {
	    return;
	  }
	  if (parent instanceof Array) {
	    parent.push(child);
	  } else if (child instanceof Array) {
	    child.parentNode = parent;
	    for (_i = 0, _len = child.length; _i < _len; _i++) {
	      item = child[_i];
	      insertNode(parent, item, beforeNode);
	    }
	  } else {
	    if (child instanceof Node) {
	      if (beforeNode && beforeNode.parentNode === parent) {
	        parent.insertBefore(child, beforeNode);
	      } else {
	        parent.appendChild(child);
	      }
	    }
	  }
	};

	exports.removeNode = removeNode = function(parent, child) {
	  var node, _i, _len;
	  if (child instanceof Array) {
	    for (_i = 0, _len = child.length; _i < _len; _i++) {
	      node = child[_i];
	      removeNode(parent, node);
	    }
	  } else {
	    if (child.parentNode === parent) {
	      parent.removeChild(child);
	    }
	  }
	};

	createHtmlFragment = function(html) {
	  var node;
	  node = document.createDocumentFragment();
	  node.innerHtml = html;
	  return node;
	};

	createUpdateHtml = function() {
	  var html, node, parentNode, renderParent, value;
	  node = document.createDocumentFragment();
	  html = this.html;
	  if (typeof html === 'function') {
	    value = html();
	    if (value == null) {
	      value = '';
	    }
	    node.innerHtml = domFnValue(value);
	    this.fistChild = node.firstChild;
	    this.lastChild = node.lastChild;
	    parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.appendChild(node);
	    } else {
	      parentNode = node;
	    }
	    renderParent = this.renderParent();
	    renderParent.push((this.renderTask = {
	      type: UPDATE_HTML,
	      cache: value,
	      html: html,
	      parentNode: parentNode,
	      fistChild: this.firstChild,
	      lastChild: this.lastChild
	    }));
	  } else {
	    if (html == null) {
	      html = '';
	    }
	    node.innerHtml = domFnValue(this.html);
	    this.fistChild = node.firstChild;
	    this.lastChild = node.lastChild;
	    parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.appendChild(node);
	    } else {
	      parentNode = node;
	    }
	  }
	  return node;
	};


/***/ },
/* 12 */
/*!****************************!*\
  !*** ./src/emitter.coffee ***!
  \****************************/
/***/ function(module, exports) {

	var __slice = [].slice;

	module.exports = {
	  on: function() {
	    var event, fn, listeners;
	    event = arguments[0], fn = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    listeners = this.listeners[event] || (this.listeners[event] = []);
	    listeners.push.apply(listeners, fn);
	    return this;
	  },
	  one: function(event, fn) {
	    var listeners, oneFn;
	    listeners = this.listeners[event] || (this.listeners[event] = []);
	    oneFn = (function(_this) {
	      return function() {
	        var args, index, result;
	        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        result = fn.apply(_this, args);
	        index = listeners.indexOf(oneFn);
	        listeners.splice(index, 0);
	        return result;
	      };
	    })(this);
	    listeners.push(oneFn);
	    return this;
	  },
	  off: function() {
	    var event, fn, fns, index, key, listeners, _i, _len;
	    event = arguments[0], fns = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (!arguments.length) {
	      for (key in this.listeners) {
	        listeners[key] = [];
	      }
	    } else {
	      listeners = this.listeners[event];
	      if (!listeners) {
	        return;
	      }
	      if (arguments.length >= 2) {
	        for (_i = 0, _len = fns.length; _i < _len; _i++) {
	          fn = fns[_i];
	          index = listeners.indexOf(fn);
	          listeners.splice(index, 0);
	        }
	      } else if (arguments.length === 1) {
	        listeners[event] = [];
	      }
	    }
	    return this;
	  },
	  emit: function() {
	    var args, event, fn, listeners, _i, _len;
	    event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    listeners = this.listeners[event];
	    if (!listeners) {
	      return;
	    }
	    for (_i = 0, _len = listeners.length; _i < _len; _i++) {
	      fn = listeners[_i];
	      fn.apply(this, args);
	    }
	    return this;
	  }
	};


/***/ },
/* 13 */
/*!***********************************!*\
  !*** ./src/core/base/Text.coffee ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, Text, VirtualNode, VirtualText, funcString, insertNode, newLine, _ref, _ref1,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	BaseComponent = __webpack_require__(/*! ./BaseComponent */ 14);

	insertNode = __webpack_require__(/*! ../../dom-util */ 11).insertNode;

	_ref = __webpack_require__(/*! ../virtual-node */ 15), VirtualNode = _ref.VirtualNode, VirtualText = _ref.VirtualText;

	_ref1 = __webpack_require__(/*! ../../util */ 1), funcString = _ref1.funcString, newLine = _ref1.newLine;

	module.exports = Text = (function(_super) {
	  __extends(Text, _super);

	  function Text(text, options) {
	    if (text == null) {
	      text = '';
	    }
	    this.text = text;
	    Text.__super__.constructor.call(this, options);
	  }

	  Text.prototype.VirtualNodeClass = VirtualText;

	  Text.prototype.firstNode = function() {
	    return this.node;
	  };

	  Text.prototype.getVirtualTree = function() {
	    var vtree;
	    if (vtree = this.vtree) {
	      vtree.srcComponents = [];
	      return vtree;
	    } else {
	      return this.vtree = this._vtree = new this.VirtualNodeClass(this);
	    }
	  };

	  Text.prototype.clone = function(options) {
	    return (new this.constructor(this.text, options)).copyLifeCallback(this);
	  };

	  Text.prototype.toString = function(indent, noNewLine) {
	    if (indent == null) {
	      indent = 2;
	    }
	    return newLine(funcString(this.text), indent, noNewLine);
	  };

	  return Text;

	})(BaseComponent);

	module.exports.VirtualText = VirtualText;


/***/ },
/* 14 */
/*!********************************************!*\
  !*** ./src/core/base/BaseComponent.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, Component,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Component = __webpack_require__(/*! ./component */ 10);

	module.exports = BaseComponent = (function(_super) {
	  __extends(BaseComponent, _super);

	  function BaseComponent(options) {
	    BaseComponent.__super__.constructor.call(this, options);
	  }

	  BaseComponent.prototype.isBaseComponent = true;

	  return BaseComponent;

	})(Component);


/***/ },
/* 15 */
/*!********************************************!*\
  !*** ./src/core/virtual-node/index.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  VirtualNode: __webpack_require__(/*! ./VirtualNode */ 16),
	  VirtualList: __webpack_require__(/*! ./VirtualList */ 17),
	  VirtualDomNodeList: __webpack_require__(/*! ./VirtualDomNodeList */ 18),
	  VirtualTag: __webpack_require__(/*! ./VirtualTag */ 19),
	  VirtualDomNode: __webpack_require__(/*! ./VirtualDomNode */ 21),
	  VirtualText: __webpack_require__(/*! ./VirtualText */ 22),
	  VirtualComment: __webpack_require__(/*! ./VirtualComment */ 23),
	  VirtualHtml: __webpack_require__(/*! ./VirtualHtml */ 24),
	  VirtualNoop: __webpack_require__(/*! ./VirtualNoop */ 20)
	};


/***/ },
/* 16 */
/*!**************************************************!*\
  !*** ./src/core/virtual-node/VirtualNode.coffee ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualNode, insertNode, newLine, vtreeMap;

	insertNode = __webpack_require__(/*! ../../dom-util */ 11).insertNode;

	newLine = __webpack_require__(/*! ../../util */ 1).newLine;

	vtreeMap = (VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16)).vtreeMap;

	module.exports = VirtualNode = (function() {
	  function VirtualNode() {
	    this.srcComponents = [];
	    this.vtreeId = VirtualNode.globalVtreeId++;
	    vtreeMap[this.vtreeId] = this;
	  }

	  VirtualNode.prototype.clone = function() {
	    return new this.constructor(this.baseComponent);
	  };

	  VirtualNode.prototype.render = function() {
	    var cb, creating, oldBaseComponent, replacing, src, vtree, vtreeRootComponent, _, _i, _j, _len, _len1, _ref, _ref1, _ref2;
	    if (!this.node) {
	      creating = true;
	      vtree = this;
	    } else {
	      vtreeRootComponent = this.vtreeRootComponent;
	      if (vtreeRootComponent) {
	        oldBaseComponent = this.baseComponent;
	        vtree = vtreeRootComponent.getVirtualTree();
	        if (vtreeRootComponent.listIndex) {
	          vtree.srcComponents.unshift(vtreeRootComponent.listIndex);
	        }
	        if (vtree.baseComponent !== oldBaseComponent) {
	          oldBaseComponent.remove();
	          if (!vtree.node) {
	            creating = true;
	            replacing = true;
	          }
	        }
	      } else {
	        vtree = this;
	      }
	    }
	    if (creating || replacing) {
	      _ref = vtree.srcComponents.concat([[vtree.baseComponent]]);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        _ref1 = _ref[_i], src = _ref1[0], _ = _ref1[1];
	        if (src.mountCallbackList) {
	          _ref2 = src.mountCallbackList;
	          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	            cb = _ref2[_j];
	            cb();
	          }
	        }
	      }
	    }
	    if (creating) {
	      vtree.createDom();
	    } else if (!vtree.isNoop) {
	      vtree.updateDom();
	    }
	    vtree.attachNode();
	    return vtree;
	  };

	  VirtualNode.prototype.attachNode = function() {
	    var baseComponent, baseParentNode, container, index, node, _i, _len, _ref, _ref1;
	    baseComponent = this.baseComponent, node = this.node;
	    baseParentNode = baseComponent.parentNode;
	    insertNode(baseParentNode, node, baseComponent.nextNode());
	    _ref = this.srcComponents;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      _ref1 = _ref[_i], container = _ref1[0], index = _ref1[1];
	      if (index != null) {
	        container.node[index] = node;
	      } else {
	        container.node = node;
	      }
	    }
	    return node;
	  };

	  VirtualNode.prototype.executeUnmountCallback = function() {
	    var cb, child, src, _, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
	    _ref = this.srcComponents.concat([[this.baseComponent]]);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      _ref1 = _ref[_i], src = _ref1[0], _ = _ref1[1];
	      if (src.unmountCallbackList) {
	        _ref2 = src.unmountCallbackList;
	        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	          cb = _ref2[_j];
	          cb();
	        }
	      }
	    }
	    if (this.children) {
	      if (this.children.executeUnmountCallback) {
	        this.children.executeUnmountCallback();
	      } else {
	        _ref3 = this.children;
	        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
	          child = _ref3[_k];
	          vtreeMap[child].executeUnmountCallback();
	        }
	      }
	    }
	    return this;
	  };

	  VirtualNode.prototype.hasMountCallback = function() {
	    var baseComponent, src, _, _i, _len, _ref, _ref1;
	    baseComponent = this.baseComponent;
	    if (baseComponent.mountCallbackList || baseComponent.unmountCallbackList) {
	      return true;
	    }
	    _ref = this.srcComponents;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      _ref1 = _ref[_i], src = _ref1[0], _ = _ref1[1];
	      if (src.unmountCallbackList || src.unmountCallbackList) {
	        return true;
	      }
	    }
	    return false;
	  };

	  VirtualNode.prototype.toString = function(indent, noNewLine) {
	    var s;
	    if (indent == null) {
	      indent = 0;
	    }
	    s = newLine(indent, noNewLine);
	    s += '@' + this.baseComponent.toString(indent, true);
	    return s;
	  };

	  return VirtualNode;

	})();

	VirtualNode.globalVtreeId = 1;

	VirtualNode.vtreeMap = vtreeMap = {};


/***/ },
/* 17 */
/*!**************************************************!*\
  !*** ./src/core/virtual-node/VirtualList.coffee ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualList, VirtualNode, vtreeMap,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	vtreeMap = (VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16)).vtreeMap;

	module.exports = VirtualList = (function(_super) {
	  __extends(VirtualList, _super);

	  function VirtualList(baseComponent, children) {
	    var child, myChildren, _i, _len;
	    this.baseComponent = baseComponent;
	    VirtualList.__super__.constructor.apply(this, arguments);
	    this.vtreeRootComponent = null;
	    if (!children || !children.length) {
	      this.chilren = null;
	    } else {
	      myChildren = [];
	      for (_i = 0, _len = children.length; _i < _len; _i++) {
	        child = children[_i];
	        myChildren.push(child.vtreeId || child);
	      }
	      this.children = myChildren;
	    }
	    this;
	  }

	  VirtualList.prototype.isActive = function() {
	    return this.vtreeRootComponent || this.children;
	  };

	  VirtualList.prototype.createDom = function() {
	    var baseComponent, child, children, i, node, _i, _len, _ref;
	    baseComponent = this.baseComponent;
	    this.node = baseComponent.node;
	    if (children = this.children) {
	      node = baseComponent.node;
	      this.renderChildrenDom();
	      _ref = baseComponent.children;
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        child = _ref[i];
	        node[i] = child.node;
	      }
	    }
	    return this;
	  };

	  VirtualList.prototype.updateDom = function() {
	    if (this.children) {
	      this.renderChildrenDom();
	    }
	    return this;
	  };

	  VirtualList.prototype.renderChildrenDom = function() {
	    var child, children, vtree, _i, _len, _ref;
	    children = [];
	    _ref = this.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      child = vtreeMap[child];
	      vtree = child.render();
	      if (vtree.isNoop) {
	        continue;
	      } else if (vtree.isPlaceHolder) {
	        if (vtree.children instanceof Array) {
	          children.push.apply(children, vtree.children);
	        } else {
	          if (vtree.children) {
	            if (vtree.children.isPlaceHolder) {
	              children.push.apply(children, vtree.children.children);
	            } else {
	              children.push(vtree.children.vtreeId);
	            }
	          }
	        }
	      } else {
	        children.push(vtree.vtreeId);
	      }
	    }
	    this.isPlaceHolder = !this.vtreeRootComponent && !this.hasMountCallback();
	    if (!children.length) {
	      this.children = null;
	      return this.isNoop = this.isPlaceHolder;
	    } else {
	      this.children = children;
	      return this.isNoop = false;
	    }
	  };

	  return VirtualList;

	})(VirtualNode);


/***/ },
/* 18 */
/*!*********************************************************!*\
  !*** ./src/core/virtual-node/VirtualDomNodeList.coffee ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualDomNodeList, VirtualNode,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16);

	module.exports = VirtualDomNodeList = (function(_super) {
	  __extends(VirtualDomNodeList, _super);

	  function VirtualDomNodeList(baseComponent, children) {
	    this.baseComponent = baseComponent;
	    VirtualDomNodeList.__super__.constructor.apply(this, arguments);
	    this.vtreeRootComponent = null;
	    this.children = children || null;
	  }

	  VirtualDomNodeList.prototype.isActive = function() {
	    return this.vtreeRootComponent || this.children;
	  };

	  VirtualDomNodeList.prototype.createDom = function() {
	    return this;
	  };

	  VirtualDomNodeList.prototype.updateDom = function() {
	    return this.renderChildrenDom('update');
	  };

	  VirtualDomNodeList.prototype.renderChildrenDom = function(method) {
	    var child, childComponent, children, _i, _len, _ref;
	    if (!this.children) {
	      return;
	    }
	    children = [];
	    _ref = this.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      child[method]();
	      childComponent = child.baseComponent;
	      if (child.isActive()) {
	        children.push(childComponent.vtree);
	      }
	    }
	    if (!children.length) {
	      return this.children = null;
	    } else {
	      return this.children = children;
	    }
	  };

	  return VirtualDomNodeList;

	})(VirtualNode);


/***/ },
/* 19 */
/*!*************************************************!*\
  !*** ./src/core/virtual-node/VirtualTag.coffee ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualList, VirtualNode, VirtualNoop, VirtualTag,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualList = __webpack_require__(/*! ./VirtualList */ 17);

	VirtualNoop = __webpack_require__(/*! ./VirtualNoop */ 20);

	VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16);

	module.exports = VirtualTag = (function(_super) {
	  __extends(VirtualTag, _super);

	  function VirtualTag(baseComponent, children) {
	    this.baseComponent = baseComponent;
	    this.children = children;
	    VirtualTag.__super__.constructor.apply(this, arguments);
	    this.vtreeRootComponent = null;
	    this;
	  }

	  VirtualTag.prototype.isActive = function() {
	    return this.baseComponent.activePropertiesCount || this.vtreeRootComponent || this.children;
	  };

	  VirtualTag.prototype.createDom = function() {
	    var baseComponent, children, node;
	    baseComponent = this.baseComponent, children = this.children;
	    if (baseComponent.namespace) {
	      node = document.createElementNS(baseComponent.namespace, baseComponent.tagName);
	    } else {
	      node = document.createElement(baseComponent.tagName);
	    }
	    baseComponent.node = this.node = node;
	    baseComponent.renderProperties();
	    this.baseComponent.children.setParentNode(node);
	    children && !children.isNoop && children.render();
	    this.isPlaceHolder = !baseComponent.activePropertiesCount && !this.vtreeRootComponent && !this.hasMountCallback();
	    if (children && children.isNoop) {
	      children = null;
	    }
	    this.isNoop = this.isPlaceHolder && !children;
	    this.children = children;
	    return this;
	  };

	  VirtualTag.prototype.updateDom = function() {
	    var baseComponent, children;
	    baseComponent = this.baseComponent, children = this.children;
	    baseComponent.renderProperties();
	    children && !children.isNoop && children.render();
	    this.isPlaceHolder = !baseComponent.activePropertiesCount && !this.vtreeRootComponent && !this.hasMountCallback();
	    if (children && children.isNoop) {
	      children = null;
	    }
	    this.isNoop = this.isPlaceHolder && !children;
	    this.children = children;
	    return this;
	  };

	  return VirtualTag;

	})(VirtualNode);


/***/ },
/* 20 */
/*!**************************************************!*\
  !*** ./src/core/virtual-node/VirtualNoop.coffee ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualNode, VirtualNoop,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16);

	module.exports = VirtualNoop = (function(_super) {
	  __extends(VirtualNoop, _super);

	  function VirtualNoop(baseComponent) {
	    this.baseComponent = baseComponent;
	    this.node = this.baseComponent.node;
	    this.isNoop = true;
	  }

	  VirtualNoop.prototype.isActive = function() {
	    return false;
	  };

	  VirtualNoop.prototype.createDom = function() {
	    return this.baseComponent.node;
	  };

	  VirtualNoop.prototype.updateDom = function() {
	    return this.node;
	  };

	  return VirtualNoop;

	})(VirtualNode);


/***/ },
/* 21 */
/*!*****************************************************!*\
  !*** ./src/core/virtual-node/VirtualDomNode.coffee ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualDomNode, VirtualNode,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16);

	module.exports = VirtualDomNode = (function(_super) {
	  __extends(VirtualDomNode, _super);

	  function VirtualDomNode() {
	    return VirtualDomNode.__super__.constructor.apply(this, arguments);
	  }

	  VirtualDomNode.prototype.isActive = function() {
	    return this.vtreeRootComponent || this.children;
	  };

	  VirtualDomNode.prototype.createDom = function() {
	    return this;
	  };

	  VirtualDomNode.prototype.updateDom = function() {
	    this.baseComponent.renderProperties();
	    return this;
	  };

	  return VirtualDomNode;

	})(VirtualNode);


/***/ },
/* 22 */
/*!**************************************************!*\
  !*** ./src/core/virtual-node/VirtualText.coffee ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualNode, VirtualNoop, VirtualText,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualNode = __webpack_require__(/*! ./VirtualNode */ 16);

	VirtualNoop = __webpack_require__(/*! ./VirtualNoop */ 20);

	module.exports = VirtualText = (function(_super) {
	  __extends(VirtualText, _super);

	  function VirtualText(baseComponent) {
	    this.baseComponent = baseComponent;
	    VirtualText.__super__.constructor.apply(this, arguments);
	    this.text = this.baseComponent.text;
	    this.node = null;
	  }

	  VirtualText.prototype.isActive = function() {
	    return this.text || this.vtreeRootComponent;
	  };

	  VirtualText.prototype.processText = function() {
	    var text;
	    text = this.text;
	    if (typeof text === 'function') {
	      text = text();
	    } else {
	      this.text = null;
	      this.isNoop = !this.vtreeRootComponent && !this.hasMountCallback();
	    }
	    return text;
	  };

	  VirtualText.prototype.createDom = function() {
	    this.baseComponent.node = this.node = document.createTextNode(this.processText());
	    return this;
	  };

	  VirtualText.prototype.updateDom = function() {
	    (this.text != null) && (this.node.textContent = this.processText());
	    return this;
	  };

	  return VirtualText;

	})(VirtualNode);


/***/ },
/* 23 */
/*!*****************************************************!*\
  !*** ./src/core/virtual-node/VirtualComment.coffee ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualComment, VirtualText,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualText = __webpack_require__(/*! ./VirtualText */ 22);

	module.exports = VirtualComment = (function(_super) {
	  __extends(VirtualComment, _super);

	  function VirtualComment() {
	    return VirtualComment.__super__.constructor.apply(this, arguments);
	  }

	  VirtualComment.prototype.createDom = function() {
	    this.baseComponent.node = this.node = document.createComment(this.processText());
	    return this;
	  };

	  VirtualComment.prototype.updateDom = function() {
	    this.text && (this.node.data = this.processText());
	    return this;
	  };

	  return VirtualComment;

	})(VirtualText);


/***/ },
/* 24 */
/*!**************************************************!*\
  !*** ./src/core/virtual-node/VirtualHtml.coffee ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var VirtualHtml, VirtualText,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualText = __webpack_require__(/*! ./VirtualText */ 22);

	module.exports = VirtualHtml = (function(_super) {
	  __extends(VirtualHtml, _super);

	  function VirtualHtml() {
	    return VirtualHtml.__super__.constructor.apply(this, arguments);
	  }

	  VirtualHtml.prototype.createDom = function() {
	    this.baseComponent.node = this.node = document.createDocumenutFragment(this.processText());
	    return this;
	  };

	  VirtualHtml.prototype.updateDom = function() {
	    if (!this.text) {
	      return this;
	    }
	    this.baseComponent.node = this.node = document.createDocumenutFragment(this.processText());
	    return this;
	  };

	  return VirtualHtml;

	})(VirtualText);


/***/ },
/* 25 */
/*!***********************************!*\
  !*** ./src/core/base/Func.coffee ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var Func, TransformComponent, funcString, newLine, toComponent, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	TransformComponent = __webpack_require__(/*! ./TransformComponent */ 26);

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = Func = (function(_super) {
	  __extends(Func, _super);

	  function Func(func, options) {
	    var content;
	    Func.__super__.constructor.call(this, options);
	    content = null;
	    this.getVirtualTree = (function(_this) {
	      return function() {
	        var vtree;
	        _this.content = content = toComponent(func());
	        content.setParentNode(_this.parentNode);
	        vtree = content.getVirtualTree();
	        vtree.vtreeRootComponent = _this;
	        vtree.srcComponents.unshift([_this, null]);
	        return _this.vtree = vtree;
	      };
	    })(this);
	    this.setParentNode = function(node) {
	      this.parentNode = node;
	      return content && content.setParentNode(node);
	    };
	    this.clone = function(options) {
	      return (new Func((function() {
	        return toComponent(func()).clone();
	      }), options || this.options)).copyLifeCallback(this);
	    };
	    this.toString = function(indent, noNewLine) {
	      if (indent == null) {
	        indent = 2;
	      }
	      return newLine("<Func " + (funcString(func)) + "/>", indent, noNewLine);
	    };
	    this;
	  }

	  return Func;

	})(TransformComponent);


/***/ },
/* 26 */
/*!*************************************************!*\
  !*** ./src/core/base/TransformComponent.coffee ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, TransformComponent, insertNode,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Component = __webpack_require__(/*! ./component */ 10);

	insertNode = __webpack_require__(/*! ../../dom-util */ 11).insertNode;

	module.exports = TransformComponent = (function(_super) {
	  __extends(TransformComponent, _super);

	  function TransformComponent(options) {
	    TransformComponent.__super__.constructor.call(this, options);
	    this.options = options || {};
	    return;
	  }

	  TransformComponent.prototype.setParentNode = function(node) {
	    this.parentNode = node;
	    return this.content && this.content.setParentNode(node);
	  };

	  TransformComponent.prototype.firstNode = function() {
	    return this.content.firstNode();
	  };

	  return TransformComponent;

	})(Component);


/***/ },
/* 27 */
/*!***********************************!*\
  !*** ./src/core/base/List.coffee ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, List, Text, VirtualList, checkContainer, exports, newLine, toComponent,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	BaseComponent = __webpack_require__(/*! ./BaseComponent */ 14);

	Text = __webpack_require__(/*! ./Text */ 13);

	VirtualList = __webpack_require__(/*! ../virtual-node */ 15).VirtualList;

	checkContainer = __webpack_require__(/*! ../../util */ 1).checkContainer;

	newLine = __webpack_require__(/*! ../../util */ 1).newLine;

	module.exports = exports = List = (function(_super) {
	  __extends(List, _super);

	  function List(children, options) {
	    var child, childIndexMap, i, _i, _len;
	    this.children = children;
	    options = options || {};
	    if (children.length === 0) {
	      children.push(new Text(''));
	    }
	    childIndexMap = {};
	    for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
	      child = children[i];
	      child = toComponent(child);
	      if (childIndexMap[child.id]) {
	        throw new Error('component should not occur mulitple times');
	      }
	      children[i] = child;
	      childIndexMap[child.id] = childIndexMap;
	      child.listIndex = [this, i];
	    }
	    this.isList = true;
	    List.__super__.constructor.call(this, options);
	    return;
	  }

	  List.prototype.clone = function(options) {
	    var child;
	    return (new List((function() {
	      var _i, _len, _ref, _results;
	      _ref = this.children;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        child = _ref[_i];
	        _results.push(child.clone());
	      }
	      return _results;
	    }).call(this), options || this.options)).copyLifeCallback(this);
	  };

	  List.prototype.setParentNode = function(node) {
	    var child, _i, _len, _ref;
	    this.parentNode = node;
	    _ref = this.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      child.setParentNode(node);
	    }
	  };

	  List.prototype.firstNode = function() {
	    return this.children[0].firstNode();
	  };

	  List.prototype.getVirtualTree = function() {
	    var child, children, componentChildren, i, node, vtree, _i, _len, _ref;
	    if (vtree = this.vtree) {
	      vtree.srcComponments = [];
	      return vtree;
	    } else {
	      this.node = node = [];
	      componentChildren = this.children;
	      node.length = componentChildren.length;
	      children = [];
	      _ref = this.children;
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        child = _ref[i];
	        vtree = child.getVirtualTree();
	        vtree.srcComponents.unshift([this, i]);
	        if (vtree.isNoop) {
	          node[i] = child.node;
	        } else {
	          children.push(vtree.vtreeId);
	        }
	      }
	      if (!children.length) {
	        children = null;
	      }
	      return this.vtree = new VirtualList(this, children);
	    }
	  };

	  List.prototype.toString = function(indent, noNewLine) {
	    var child, s, _i, _len, _ref;
	    if (indent == null) {
	      indent = 0;
	    }
	    s = newLine("<List>", indent, noNewLine);
	    _ref = this.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      s += child.toString(indent + 2);
	    }
	    return s += newLine('</List>', indent);
	  };

	  return List;

	})(BaseComponent);


/***/ },
/* 28 */
/*!******************************************!*\
  !*** ./src/core/base/DomNodeList.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, DomNode, DomNodeList, exports, newLine,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	BaseComponent = __webpack_require__(/*! ./BaseComponent */ 14);

	DomNode = __webpack_require__(/*! ./DomNode */ 29);

	newLine = __webpack_require__(/*! ../../util */ 1).newLine;

	module.exports = exports = DomNodeList = (function(_super) {
	  __extends(DomNodeList, _super);

	  function DomNodeList(children, options) {
	    var child, i, _i, _len;
	    this.children = children;
	    if (children.length === 0) {
	      children.push(new Text(''));
	    }
	    for (i = _i = 0, _len = children.length; _i < _len; i = ++_i) {
	      child = children[i];
	      if (child instanceof window.Node) {
	        child = new DomNode(child);
	      }
	      children[i] = child;
	      child.container = this;
	      child.index = i;
	    }
	    DomNodeList.__super__.constructor.call(this, options);
	    return;
	  }

	  DomNodeList.prototype.setParentNode = function(node) {
	    var child, _i, _len, _ref;
	    this.parentNode = node;
	    _ref = this.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      child = _ref[_i];
	      child.setParentNode(node);
	    }
	  };

	  DomNodeList.prototype.getVirtualTree = function() {
	    if (this.vtree) {
	      return this.vtree;
	    } else {
	      return this.vtree = this._vtree = new VirtualDomNodeList(this, []);
	    }
	  };

	  DomNodeList.prototype.firstNode = function() {
	    return this.children[0].firstNode();
	  };

	  return DomNodeList;

	})(BaseComponent);


/***/ },
/* 29 */
/*!**************************************!*\
  !*** ./src/core/base/DomNode.coffee ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, DomNode, Tag, VirtualDomNode, newLine,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	Tag = __webpack_require__(/*! ./Tag */ 30);

	VirtualDomNode = __webpack_require__(/*! ../virtual-node */ 15).VirtualDomNode;

	BaseComponent = __webpack_require__(/*! ./BaseComponent */ 14);

	newLine = __webpack_require__(/*! ../../util */ 1).newLine;

	module.exports = DomNode = (function(_super) {
	  __extends(DomNode, _super);

	  function DomNode(node, attrs, options) {
	    this.node = node;
	    this.tagName = node.tagName ? node.tagName.toLowerCase() : '';
	    this.namespace = node.namespace;
	    this.isTag = true;
	    BaseComponent.constructor.call(this, options);
	    this.processAttrs(attrs);
	    this.cacheDomProperties();
	    this.processDirectives();
	  }

	  DomNode.prototype.cacheDomProperties = function() {
	    var cacheProps, cacheSpecials, cacheStyle, events, key, node, nodeStyle, prop, props, specials, style, value;
	    node = this.node, cacheProps = this.cacheProps, props = this.props, cacheStyle = this.cacheStyle, style = this.style, events = this.events, cacheSpecials = this.cacheSpecials, specials = this.specials;
	    this.cacheClassName = node.className;
	    for (prop in props) {
	      value = props[prop];
	      cachePros[prop] = node[prop];
	    }
	    nodeStyle = node.style;
	    for (prop in style) {
	      value = style[prop];
	      cacheStyle[prop] = nodeStyle(node, prop);
	    }
	    for (key in specials) {
	      value = specials[key];
	      cacheSpecials[key] = this.getSpecialProp(key);
	    }
	    this.cacheClassName = node.className;
	    return this;
	  };

	  DomNode.prototype.getVirtualTree = function() {
	    if (this.vtree) {
	      return this.vtree;
	    } else {
	      return this.vtree = this._vtree = new VirtualDomNode(this, []);
	    }
	  };

	  DomNode.prototype.css = function(prop, value) {
	    var cacheStyle, node, nodeStyle, style, _i, _len;
	    if (arguments.length === 0) {
	      return this.cacheStyle;
	    }
	    if (arguments.length === 1) {
	      if (typeof prop === 'string') {
	        return this.cacheStyle[prop];
	      } else {
	        cacheStyle = this.cacheStyle, style = this.style, node = this.node;
	        nodeStyle = node.style;
	        for (value = _i = 0, _len = prop.length; _i < _len; value = ++_i) {
	          prop = prop[value];
	          style[prop] = value;
	          cacheStyle[prop] = cacheStyle[prop] || nodeStyle[prop];
	        }
	      }
	    } else if (arguments.length === 2) {
	      this.style[prop] = value;
	      this.cacheStyle[prop] = this.cacheStyle[prop] || this.node.style.display;
	    }
	    return this;
	  };

	  DomNode.prototype.show = function(showDisplay) {
	    var display;
	    display = this.style.display = this.styleDisplayOfShow(true, showDisplay);
	    return this.cacheStyle.display = this.cacheStyle.display || this.node.style.display;
	  };

	  DomNode.prototype.hide = function(showDisplay) {
	    var display;
	    display = this.style.display = this.styleDisplayOfShow(false, showDisplay);
	    return cacheStyle.display = cacheStyle.display || this.node.style.display;
	  };

	  DomNode.prototype.toString = function(indent, noNewLine) {
	    if (indent == null) {
	      indent = 0;
	    }
	    return newLine(indent, noNewLine) + '<DomNode>' + newLine(this.node.toString(), indent + 2) + newLine('</DomNode>', indent);
	  };

	  return DomNode;

	})(Tag);


/***/ },
/* 30 */
/*!**********************************!*\
  !*** ./src/core/base/Tag.coffee ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var BaseComponent, List, Tag, VirtualTag, checkContainer, classFn, eventHandlerFromArray, extend, funcString, insertNode, newLine, specialPropSet, styleFrom, updateProp, _ref, _ref1,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  __slice = [].slice;

	extend = __webpack_require__(/*! ../../extend */ 5);

	insertNode = __webpack_require__(/*! ../../dom-util */ 11).insertNode;

	_ref = __webpack_require__(/*! ../property */ 31), classFn = _ref.classFn, styleFrom = _ref.styleFrom, updateProp = _ref.updateProp, eventHandlerFromArray = _ref.eventHandlerFromArray, specialPropSet = _ref.specialPropSet;

	checkContainer = __webpack_require__(/*! ../../util */ 1).checkContainer;

	BaseComponent = __webpack_require__(/*! ./BaseComponent */ 14);

	List = __webpack_require__(/*! ./List */ 27);

	VirtualTag = __webpack_require__(/*! ../virtual-node */ 15).VirtualTag;

	_ref1 = __webpack_require__(/*! ../../util */ 1), funcString = _ref1.funcString, newLine = _ref1.newLine;

	module.exports = Tag = (function(_super) {
	  __extends(Tag, _super);

	  function Tag(tagName, attrs, children, options) {
	    this.tagName = tagName = tagName.toLowerCase();
	    this.namespace = attrs.namespace;
	    delete attrs.namespace;
	    if (!this.namespace) {
	      if (tagName === 'svg') {
	        this.namespace = "http://www.w3.org/2000/svg";
	      } else if (tagName === 'math') {
	        this.namespace = "http://www.w3.org/1998/Math/MathML";
	      }
	    }
	    this.isTag = true;
	    Tag.__super__.constructor.call(this, options);
	    this.children = new List(children, {});
	    this.processAttrs(attrs);
	    this.processDirectives();
	  }

	  Tag.prototype.clone = function(options) {
	    var child, children, result;
	    if (options == null) {
	      options = this.options;
	    }
	    children = (function() {
	      var _i, _len, _ref2, _results;
	      _ref2 = this.children.children;
	      _results = [];
	      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	        child = _ref2[_i];
	        _results.push(child.clone());
	      }
	      return _results;
	    }).call(this);
	    result = new Tag(this.tagName, Object.create(null), children, options || this.options);
	    result.cacheProps = this.cacheProps;
	    result.props = this.props;
	    result.cacheStyle = this.cacheStyle;
	    result.style = this.style;
	    result.cacheEvents = this.cacheEvents;
	    result.events = this.events;
	    result.cacheSpecials = this.cacheSpecials;
	    result.specials = this.specials;
	    result.activePropertiesCount = this.activePropertiesCount;
	    return result.copyLifeCallback(this);
	  };

	  Tag.prototype.processDirectives = function() {
	    var comp, directive, directives, _i, _len;
	    directives = this.directives;
	    if (!directives) {
	      return this;
	    }
	    if (typeof directives === 'function') {
	      return directives(this);
	    }
	    comp = this;
	    for (_i = 0, _len = directives.length; _i < _len; _i++) {
	      directive = directives[_i];
	      comp = directive(comp);
	    }
	    return comp;
	  };

	  Tag.prototype.processAttrs = function(attrs) {
	    var activePropertiesCount, key, props, specials, style, value;
	    if (attrs == null) {
	      attrs = {};
	    }
	    this.attrs = attrs;
	    this.directives = attrs.directives;
	    delete this.attrs.directives;
	    activePropertiesCount = 0;
	    this.className = classFn(attrs.className, attrs["class"]);
	    delete attrs.className;
	    delete attrs["class"];
	    if (this.className.needUpdate) {
	      activePropertiesCount++;
	    }
	    this.cacheClassName = '';
	    this.props = props = Object.create(null);
	    this.cacheProps = Object.create(null);
	    style = styleFrom(attrs.style);
	    if (typeof style !== 'object') {
	      style = Object.create(null);
	    } else {
	      activePropertiesCount += Object.keys(style).length;
	    }
	    this.style = style;
	    delete attrs.style;
	    this.cacheStyle = Object.create(null);
	    this.cacheEvents = Object.create(null);
	    this.events = Object.create(null);
	    this.specials = specials = Object.create(null);
	    this.cacheSpecials = Object.create(null);
	    for (key in attrs) {
	      value = attrs[key];
	      if (key.slice(0, 2) === 'on') {
	        if (this.addEventProp(key, value)) {
	          activePropertiesCount++;
	        }
	      } else {
	        if (specialPropSet[key]) {
	          specials[key] = value;
	        } else {
	          props[key] = value;
	        }
	        activePropertiesCount++;
	      }
	    }
	    this.activePropertiesCount = activePropertiesCount;
	  };

	  Tag.prototype.getChildren = function() {
	    return this.children;
	  };

	  Tag.prototype.setParentNode = function(node) {
	    this.parentNode = node;
	    this.children.setParentNode(this.node);
	  };

	  Tag.prototype.firstNode = function() {
	    return this.node;
	  };

	  Tag.prototype.getVirtualTree = function() {
	    var vtree;
	    if (vtree = this.vtree) {
	      vtree.srcComponents = [];
	      return vtree;
	    } else {
	      this.vtree = vtree = new VirtualTag(this, this.children.getVirtualTree());
	      return vtree;
	    }
	  };

	  Tag.prototype.isActive = function() {
	    return !this.node || this.activePropertiesCount || this.hasLifeTimeEvent();
	  };

	  Tag.prototype.renderProperties = function() {
	    var activePropertiesCount, cacheClassName, cacheEvents, cacheProps, cacheSpecials, cacheStyle, className, classes, display, elementStyle, events, node, prop, props, specials, style, value;
	    activePropertiesCount = this.activePropertiesCount;
	    if (!activePropertiesCount) {
	      return;
	    }
	    node = this.node, className = this.className, cacheProps = this.cacheProps, props = this.props, cacheStyle = this.cacheStyle, style = this.style, cacheEvents = this.cacheEvents, events = this.events, cacheSpecials = this.cacheSpecials, specials = this.specials;
	    if (className.needUpdate) {
	      cacheClassName = this.cacheClassName;
	      classes = className();
	      if (classes !== cacheClassName) {
	        node.className = classes;
	      }
	      if (!className.needUpdate) {
	        activePropertiesCount--;
	      }
	      this.cacheClassName = classes;
	    }
	    for (prop in props) {
	      value = props[prop];
	      if (typeof value === 'function') {
	        value = value();
	      } else {
	        delete props[prop];
	        activePropertiesCount--;
	      }
	      if (value == null) {
	        value = '';
	      }
	      value !== cacheProps[prop] && (node[prop] = value);
	    }
	    elementStyle = node.style;
	    for (prop in style) {
	      value = style[prop];
	      if (typeof value === 'function') {
	        value = value();
	      } else {
	        delete style[prop];
	        activePropertiesCount--;
	      }
	      if (value == null) {
	        value = '';
	      }
	      value !== cacheStyle[prop] && (elementStyle[prop] = value);
	    }
	    if ((cacheStyle.oldDisplay == null) && (display = elementStyle.display) && display !== 'none') {
	      cacheStyle.oldDisplay = display;
	    }
	    for (prop in events) {
	      value = events[prop];
	      delete events[prop];
	      cacheEvents[prop] = value;
	      activePropertiesCount--;
	      node[prop] = eventHandlerFromArray(value, node, this);
	    }
	    for (prop in specials) {
	      value = specials[prop];
	      if (typeof value === 'function') {
	        value = value();
	      } else {
	        delete props[prop];
	        activePropertiesCount--;
	      }
	      if (value == null) {
	        value = '';
	      }
	      value !== cacheProps[prop] && spercialPropSet[prop](this, cacheProps[prop], value);
	    }
	    this.activePropertiesCount = activePropertiesCount;
	  };

	  Tag.prototype.css = function(prop, value) {
	    var key, style, v, vtree;
	    if (arguments.length === 0) {
	      return this.cacheStyle;
	    }
	    if (arguments.length === 1) {
	      if (typeof prop === 'string') {
	        return this.cacheStyle[prop];
	      } else {
	        style = this.style;
	        for (key in prop) {
	          v = prop[key];
	          if (style[key] == null) {
	            this.activePropertiesCount++;
	            if (vtree = this.vtree) {
	              vtree.isNoop = vtree.isPlaceHolder = false;
	            }
	          }
	          if (v == null) {
	            v = '';
	          }
	          style[key] = v;
	        }
	      }
	    } else if (arguments.length === 2) {
	      style = this.style;
	      if (style[prop] == null) {
	        this.activePropertiesCount++;
	        if (vtree = this.vtree) {
	          vtree.isNoop = vtree.isPlaceHolder = false;
	        }
	      }
	      if (value == null) {
	        value = '';
	      }
	      style[prop] = value;
	    }
	    return this;
	  };

	  Tag.prototype.bind = function() {
	    var eventName, handlers, vtree;
	    eventName = arguments[0], handlers = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (eventName.slice(0, 2) !== 'on') {
	      eventName = 'on' + eventName;
	    }
	    if (this.addEventProp(eventName, handlers)) {
	      this.activePropertiesCount++;
	      if (vtree = this.vtree) {
	        vtree.isNoop = vtree.isPlaceHolder = false;
	      }
	    }
	    return this;
	  };

	  Tag.prototype.addEventProp = function(prop, value) {
	    var cacheCallbackList, node, nodeFn;
	    if (prop.slice(0, 2) !== 'on') {
	      prop = 'on' + prop;
	    }
	    if (cacheCallbackList = this.cacheEvents[prop]) {
	      if (typeof value === 'function') {
	        cacheCallbackList.push(value);
	      } else {
	        cacheCallbackList.push.apply(cacheCallbackList, value);
	      }
	      return;
	    }
	    if (typeof value === 'function') {
	      value = [value];
	    }
	    if (node = this.node) {
	      if (nodeFn = node[prop]) {
	        value.unshift(nodeFn);
	      }
	      this.cacheEvents[prop] = value;
	      return node[prop] = eventHandlerFromArray(value, node, this);
	    } else {
	      this.events[prop] = value;
	      return true;
	    }
	  };

	  Tag.prototype.unbind = function() {
	    var eventHandlers, eventName, events, h, handlers, index, _i, _len;
	    eventName = arguments[0], handlers = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (eventName.slice(0, 2) !== 'on') {
	      eventName = 'on' + eventName;
	    }
	    eventHandlers = this.events[eventName];
	    if (!eventHandlers) {
	      return this;
	    }
	    for (_i = 0, _len = handlers.length; _i < _len; _i++) {
	      h = handlers[_i];
	      index = eventHandlers.indexOf(h);
	      if (index >= 0) {
	        eventHandlers.splice(index, 1);
	      }
	    }
	    if (!eventHandlers.length) {
	      events = this.events;
	      if (this.node) {
	        delete this.node[eventName];
	      } else {
	        this.activePropertiesCount--;
	      }
	    }
	    return this;
	  };

	  Tag.prototype.addClass = function() {
	    var items, needUpdate, vtree;
	    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (!this.className) {
	      this.className = classFn(items);
	      this.activePropertiesCount--;
	    } else {
	      needUpdate = this.className.needUpdate;
	      this.className.extend(items);
	      if (!needUpdate && this.className.needUpdate) {
	        this.activePropertiesCount++;
	        if (vtree = this.vtree) {
	          vtree.isNoop = vtree.isPlaceHolder = false;
	        }
	      }
	    }
	    return this;
	  };

	  Tag.prototype.removeClass = function() {
	    var classes, needUpdate, vtree, _ref2;
	    classes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (!this.className) {
	      return this;
	    }
	    needUpdate = this.className.needUpdate;
	    (_ref2 = this.className).removeClass.apply(_ref2, classes);
	    if (!needUpdate && this.className.needUpdate) {
	      this.activePropertiesCount++;
	      if (vtree = this.vtree) {
	        vtree.isNoop = vtree.isPlaceHolder = false;
	      }
	    }
	    return this;
	  };

	  Tag.prototype.show = function(display) {
	    var vtree;
	    if (!this.style.display) {
	      this.activePropertiesCount++;
	      if (vtree = this.vtree) {
	        vtree.isNoop = vtree.isPlaceHolder = false;
	      }
	    }
	    return this.style.display = this.styleDisplayOfShow(true, display);
	  };

	  Tag.prototype.hide = function() {
	    var vtree;
	    if (!this.style.display) {
	      this.activePropertiesCount++;
	      if (vtree = this.vtree) {
	        vtree.isNoop = vtree.isPlaceHolder = false;
	      }
	    }
	    return this.style.display = !this.styleDisplayOfShow(false);
	  };

	  Tag.prototype.styleDisplayOfShow = function(status, display) {
	    var cacheStyle, oldDisplay;
	    if (status) {
	      cacheStyle = this.cacheStyle;
	      oldDisplay = this.cacheStyle.oldDisplay;
	      if (display) {
	        return display;
	      } else if (oldDisplay) {
	        return oldDisplay;
	      } else {
	        return 'block';
	      }
	    } else {
	      return 'none';
	    }
	  };

	  Tag.prototype.top = function() {
	    var elm, rect;
	    elm = this.node;
	    if (!elm) {
	      return 0;
	    }
	    rect = elm.getBoundingClientRect();
	    return rect.top;
	  };

	  Tag.prototype.bottom = function() {
	    var elm, rect;
	    elm = this.node;
	    if (!elm) {
	      return 0;
	    }
	    rect = elm.getBoundingClientRect();
	    return rect.bottom;
	  };

	  Tag.prototype.height = function() {
	    var elm, rect;
	    elm = this.node;
	    if (!elm) {
	      return 0;
	    }
	    rect = elm.getBoundingClientRect();
	    return rect.height;
	  };

	  Tag.prototype.width = function() {
	    var elm, rect;
	    elm = this.node;
	    if (!elm) {
	      return 0;
	    }
	    rect = elm.getBoundingClientRect();
	    return rect.width;
	  };

	  Tag.prototype.getSpecialProp = function(prop) {};

	  Tag.prototype.toString = function(indent, noNewLine) {
	    var child, key, s, value, _i, _len, _ref2, _ref3, _ref4;
	    if (indent == null) {
	      indent = 0;
	    }
	    s = newLine("<" + this.tagName, indent, noNewLine);
	    _ref2 = this.props;
	    for (key in _ref2) {
	      value = _ref2[key];
	      s += ' ' + key + '=' + funcString(value);
	    }
	    if (Object.keys(this.style).length) {
	      s += ' style={';
	      _ref3 = this.style;
	      for (key in _ref3) {
	        value = _ref3[key];
	        s += ' ' + key + '=' + funcString(value);
	      }
	      s += '}';
	    }
	    s += '>';
	    _ref4 = this.children.children;
	    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
	      child = _ref4[_i];
	      s += child.toString(indent + 2);
	    }
	    return s += newLine("</" + this.tagName + ">", indent + 2, 'noNewLine');
	  };

	  return Tag;

	})(BaseComponent);


/***/ },
/* 31 */
/*!**********************************!*\
  !*** ./src/core/property.coffee ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var classFn, extend, extendEventValue, isArray,
	  __slice = [].slice;

	isArray = __webpack_require__(/*! ../util */ 1).isArray;

	extend = __webpack_require__(/*! ../extend */ 5);

	exports.extendEventValue = extendEventValue = function(props, prop, value, before) {
	  var oldValue;
	  oldValue = props[prop];
	  if (!oldValue) {
	    oldValue = [];
	  } else if (!(oldValue instanceof Array)) {
	    oldValue = [oldValue];
	  }
	  if (!value) {
	    value = [];
	  } else if (!(value instanceof Array)) {
	    value = [value];
	  }
	  if (before) {
	    return props[prop] = value.concat(oldValue);
	  } else {
	    return props[prop] = oldValue.concat(value);
	  }
	};

	exports.extendAttrs = function(attrs, obj) {
	  var key, value;
	  attrs = attrs || Object.create(null);
	  attrs.className = classFn([attrs["class"], attrs.className]);
	  delete attrs["class"];
	  obj = obj || Object.create(null);
	  for (key in obj) {
	    value = obj[key];
	    if (key === 'style') {
	      attrs.style = attrs.style || Object.create(null);
	      extend(attrs.style, value);
	    } else if (key === 'className' || key === 'class') {
	      attrs.className = classFn([attrs.className, value]);
	    } else if (key === 'directives') {
	      if (!obj.directives) {
	        continue;
	      } else if (!attrs.directives) {
	        attrs.directives = obj.directives;
	        continue;
	      } else if (!(attrs.directives instanceof Array)) {
	        attrs.directives = [attrs.directives];
	      }
	      if (!(value instanceof Array)) {
	        attrs.directives.push(value);
	      } else {
	        attrs.directives.push.apply(attrs.directives, value);
	      }
	    } else if (key.slice(0, 2) === 'on') {
	      extendEventValue(attrs, key, value);
	    } else {
	      attrs[key] = value;
	    }
	  }
	  return attrs;
	};

	exports.classFn = classFn = function() {
	  var classMap, extendClassMap, fn, items, processClassValue;
	  items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	  classMap = Object.create(null);
	  fn = function() {
	    var klass, lst, needUpdate, value;
	    if (!arguments.length) {
	      lst = [];
	      needUpdate = false;
	      for (klass in classMap) {
	        value = classMap[klass];
	        if (typeof value === 'function') {
	          value = value();
	          needUpdate = true;
	        }
	        if (value) {
	          lst.push(klass);
	        }
	      }
	      fn.needUpdate = needUpdate;
	      return lst.join(' ');
	    } else {
	      extendClassMap(arguments.slice());
	    }
	  };
	  processClassValue = function(name, value) {
	    if (!value && classMap[name]) {
	      fn.needUpdate = true;
	      return delete classMap[name];
	    } else {
	      if (classMap[name] !== value) {
	        fn.needUpdate = true;
	        return classMap[name] = value;
	      }
	    }
	  };
	  extendClassMap = function(items) {
	    var item, name, names, value, _i, _j, _len, _len1, _ref;
	    if (!items) {
	      return;
	    }
	    if (!isArray(items)) {
	      items = [items];
	    }
	    for (_i = 0, _len = items.length; _i < _len; _i++) {
	      item = items[_i];
	      if (!item) {
	        continue;
	      }
	      if (typeof item === 'string') {
	        names = item.trim().split(/\s+(?:,\s+)?/);
	        for (_j = 0, _len1 = names.length; _j < _len1; _j++) {
	          name = names[_j];
	          if (name[0] === '!') {
	            processClassValue(name.slice(1), false);
	          } else {
	            processClassValue(name, true);
	          }
	        }
	      } else if (item instanceof Array) {
	        extendClassMap(item);
	      } else if (item && item.classMap) {
	        _ref = item.classMap;
	        for (name in _ref) {
	          value = _ref[name];
	          if (typeof value !== 'function') {
	            value = true;
	          }
	          processClassValue(name, value);
	        }
	      } else if (typeof item === 'object') {
	        for (name in item) {
	          value = item[name];
	          if (typeof value !== 'function') {
	            value = true;
	          }
	          processClassValue(name, value);
	        }
	      }
	    }
	  };
	  fn.needUpdate = false;
	  extendClassMap(items);
	  fn.classMap = classMap;
	  fn.removeClass = function() {
	    var item, items, _i, _len, _results;
	    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    _results = [];
	    for (_i = 0, _len = items.length; _i < _len; _i++) {
	      item = items[_i];
	      _results.push(processClassValue(item, false));
	    }
	    return _results;
	  };
	  fn.extend = function() {
	    var items;
	    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    return extendClassMap(items);
	  };
	  return fn;
	};

	exports.styleFrom = function(value) {
	  var item, key, result, v, _i, _j, _len, _len1, _ref, _ref1;
	  if (typeof value === 'string') {
	    result = Object.create(null);
	    value = value.trim().split(/\s*;\s*/);
	    for (_i = 0, _len = value.length; _i < _len; _i++) {
	      item = value[_i];
	      item = item.trim();
	      if (!item) {
	        continue;
	      }
	      _ref = item.split(/\s*:\s*/), key = _ref[0], v = _ref[1];
	      result[key] = v;
	    }
	    return result;
	  } else if (value instanceof Array) {
	    result = Object.create(null);
	    for (_j = 0, _len1 = value.length; _j < _len1; _j++) {
	      item = value[_j];
	      if (typeof item === 'string') {
	        item = item.trim();
	        if (!item) {
	          continue;
	        }
	        _ref1 = item.split(/\s*:\s*/), key = _ref1[0], value = _ref1[1];
	      } else {
	        key = item[0], value = item[1];
	      }
	      result[key] = value;
	    }
	    return result;
	  } else {
	    return value;
	  }
	};

	exports.updateProp = function(prop, value, cache, element) {
	  var dynamic, isFunc;
	  if (typeof value === 'function') {
	    value = value();
	    isFunc = true;
	  } else {
	    dynamic = false;
	  }
	  if (value == null) {
	    value = '';
	  }
	  if (cache[prop] !== value) {
	    element[prop] = value;
	  }
	  return isFunc;
	};

	exports.eventHandlerFromArray = function(callbackList, node, component) {
	  return function(event) {
	    var fn, _i, _len;
	    for (_i = 0, _len = callbackList.length; _i < _len; _i++) {
	      fn = callbackList[_i];
	      fn && fn.call(node, event, component);
	    }
	    if (!event) {
	      return;
	    }
	    if (!event.executeDefault) {
	      event.preventDefault();
	    }
	    if (!event.continuePropagation) {
	      event.stopPropagation();
	    }
	  };
	};

	exports.specialPropSet = {
	  left: 1,
	  top: 1,
	  width: 1,
	  height: 1,
	  right: 1,
	  bottom: 1,
	  scrollTop: 1,
	  scrollHeight: 1,
	  scrollWidth: 1,
	  scrollRight: 1,
	  scrollBottom: 1,
	  pageTop: 1,
	  pageLeft: 1,
	  pageHeight: 1,
	  pageRight: 1,
	  pageBottom: 1,
	  clientTop: 1,
	  clientLeft: 1,
	  clientWidth: 1,
	  clientHeight: 1,
	  clientRight: 1,
	  clientBottom: 1
	};


/***/ },
/* 32 */
/*!**************************************!*\
  !*** ./src/core/base/Comment.coffee ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var Comment, VirtualComment, funcString, newLine, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualComment = __webpack_require__(/*! ../virtual-node */ 15).VirtualComment;

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = Comment = (function(_super) {
	  __extends(Comment, _super);

	  function Comment() {
	    return Comment.__super__.constructor.apply(this, arguments);
	  }

	  Comment.prototype.VirtualNodeClass = VirtualComment;

	  Comment.prototype.toString = function(indent, noNewLine) {
	    if (indent == null) {
	      indent = 2;
	    }
	    return newLine("<Comment " + (funcString(this.text)) + "/>", indent, noNewLine);
	  };

	  return Comment;

	})(Text);


/***/ },
/* 33 */
/*!***********************************!*\
  !*** ./src/core/base/Html.coffee ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var Html, VirtualHtml, funcString, newLine, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	VirtualHtml = __webpack_require__(/*! ../virtual-node */ 15).VirtualHtml;

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = Html = (function(_super) {
	  __extends(Html, _super);

	  function Html() {
	    return Html.__super__.constructor.apply(this, arguments);
	  }

	  Html.prototype.VirtualNodeClass = VirtualHtml;

	  Html.prototype.toString = function(indent, noNewLine) {
	    if (indent == null) {
	      indent = 2;
	    }
	    return newLine("<Html " + (funcString(this.text)) + "/>", indent, noNewLine);
	  };

	  return Html;

	})(Text);


/***/ },
/* 34 */
/*!**********************************!*\
  !*** ./src/core/base/Ref.coffee ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, Ref, newLine, toComponent,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	Component = __webpack_require__(/*! ./component */ 10);

	newLine = __webpack_require__(/*! ../../util */ 1).newLine;

	module.exports = Ref = (function(_super) {
	  __extends(Ref, _super);

	  function Ref(content, options) {
	    Ref.__super__.constructor.call(this, options);
	    this.content = toComponent(content);
	    this.getVirtualTree = function() {
	      throw new Error('just keep isComponent(me) to be true, should not call me');
	    };
	    this;
	  }

	  Ref.prototype.isRef = true;

	  return Ref;

	})(Component);


/***/ },
/* 35 */
/*!*********************************!*\
  !*** ./src/core/base/If.coffee ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var If, TransformComponent, funcString, newLine, toComponent, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	TransformComponent = __webpack_require__(/*! ./TransformComponent */ 26);

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = If = (function(_super) {
	  __extends(If, _super);

	  function If(test, then_, else_, options) {
	    var content;
	    If.__super__.constructor.call(this, options);
	    this.then_ = then_ = toComponent(then_);
	    this.else_ = else_ = toComponent(else_);
	    if (typeof test === 'function') {
	      this.getVirtualTree = (function(_this) {
	        return function() {
	          var content, vtree;
	          content = test() ? then_ : else_;
	          vtree = content.getVirtualTree();
	          vtree.vtreeRootComponent = _this;
	          vtree.srcComponents.unshift([_this, null]);
	          return _this.vtree = vtree;
	        };
	      })(this);
	      this.setParentNode = function(node) {
	        this.parentNode = node;
	        then_.setParentNode(node);
	        return else_.setParentNode(node);
	      };
	    } else {
	      content = test ? then_ : else_;
	      this.getVirtualTree = function() {
	        var vtree;
	        vtree = content.getVirtualTree();
	        vtree.srcComponents.unshift([this, null]);
	        return this.vtree = vtree;
	      };
	      this.setParentNode = function(node) {
	        this.parentNode = node;
	        return content.setParentNode(node);
	      };
	    }
	    this.clone = function(options) {
	      return (new If(test, then_.clone(), else_clone(), options || this.options)).copyLifeCallback(this);
	    };
	    this.toString = function(indent, noNewLine) {
	      if (indent == null) {
	        indent = 0;
	      }
	      if (noNewLine == null) {
	        noNewLine = '';
	      }
	      return newLine(indent, noNewLine) + '<if ' + funcString(test) + '>' + then_.toString(indent + 2) + else_.toString(indent + 2) + newLine('</if>', indent);
	    };
	    this;
	  }

	  return If;

	})(TransformComponent);


/***/ },
/* 36 */
/*!***********************************!*\
  !*** ./src/core/base/Case.coffee ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var Case, TransformComponent, funcString, newLine, toComponent, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	TransformComponent = __webpack_require__(/*! ./TransformComponent */ 26);

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = Case = (function(_super) {
	  __extends(Case, _super);

	  function Case(test, map, else_, options) {
	    var content, key, value, vtree;
	    Case.__super__.constructor.call(this, options);
	    for (key in map) {
	      value = map[key];
	      map[key] = toComponent(value);
	    }
	    else_ = toComponent(else_);
	    if (typeof test === 'function') {
	      this.getVirtualTree = (function(_this) {
	        return function() {
	          var content, vtree;
	          content = map[test()] || else_;
	          vtree = content.getVirtualTree();
	          vtree.vtreeRootComponent = _this;
	          vtree.srcComponents.unshift([_this, null]);
	          return _this.vtree = vtree;
	        };
	      })(this);
	      this.setParentNode = function(node) {
	        var _;
	        this.parentNode = node;
	        for (_ in map) {
	          value = map[_];
	          map[key].setParentNode.node;
	        }
	        return else_.setParentNode(node);
	      };
	    } else {
	      content = map[test] || else_;
	      vtree = content.getVirtualTree();
	      vtree.srcComponents.unshift([this, null]);
	      this.getVirtualTree = function() {
	        return vtree;
	      };
	      this.setParentNode = function(node) {
	        this.parentNode = node;
	        return content.setParentNode(node);
	      };
	    }
	    this.clone = function(options) {
	      var cloneMap;
	      cloneMap = Object.create(null);
	      for (key in map) {
	        value = map[key];
	        cloneMap[key] = value.clone();
	      }
	      return (new Case(test, cloneMap, else_clone(), options || this.options)).copyLifeCallback(this);
	    };
	    this.toString = function(indent, noNewLine) {
	      var comp, s;
	      if (indent == null) {
	        indent = 0;
	      }
	      s = newLine(indent, noNewLine) + '<Case ' + funcString(test) + '>';
	      for (key in map) {
	        comp = map[key];
	        s += newLine(key + ': ' + comp.toString(indent + 2, true), indent + 2);
	      }
	      return s += else_.toString(indent + 2) + newLine('</Case>', indent);
	    };
	    this;
	  }

	  return Case;

	})(TransformComponent);


/***/ },
/* 37 */
/*!*************************************!*\
  !*** ./src/core/base/Repeat.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var List, Repeat, TransformComponent, funcString, isArray, newLine, toComponent, _ref,
	  __hasProp = {}.hasOwnProperty,
	  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	isArray = __webpack_require__(/*! ../../util */ 1).isArray;

	toComponent = __webpack_require__(/*! ./toComponent */ 9);

	TransformComponent = __webpack_require__(/*! ./TransformComponent */ 26);

	List = __webpack_require__(/*! ./List */ 27);

	_ref = __webpack_require__(/*! ../../util */ 1), funcString = _ref.funcString, newLine = _ref.newLine;

	module.exports = Repeat = (function(_super) {
	  __extends(Repeat, _super);

	  function Repeat(list, itemFn, options) {
	    var items;
	    Repeat.__super__.constructor.call(this, options);
	    if (typeof list !== 'function' && !isArray(list)) {
	      throw new Error('children for List should be array like or a function');
	    }
	    if (typeof list !== 'function') {
	      items = list;
	      if (!isArray(items)) {
	        throw new Error('Repeat Component need a list');
	      }
	    }
	    this.getVirtualTree = (function(_this) {
	      return function() {
	        var child, children, content, i, item, vtree, _i, _len;
	        if (typeof list === 'function') {
	          items = list();
	          if (!isArray(items)) {
	            throw new Error('Repeat Component need a list');
	          }
	        }
	        children = [];
	        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
	          item = items[i];
	          child = toComponent(itemFn(item, i, items, _this));
	          children.push(child);
	        }
	        _this.content = content = new List(children);
	        _this.parentNode && content.setParentNode(_this.parentNode);
	        vtree = content.getVirtualTree();
	        vtree.vtreeRootComponent = _this;
	        vtree.srcComponents.unshift([_this, null]);
	        return _this.vtree = vtree;
	      };
	    })(this);
	    this.clone = function(options) {
	      return (new Repeat(list, (function(item, index, list, comp) {
	        return itemFn(item, index, list, comp).clone();
	      }), options || this.options)).copyLifeCallback(this);
	    };
	    this;
	    this.toString = function(indent, noNewLine) {
	      if (indent == null) {
	        indent = 0;
	      }
	      return newLine("<Repeat " + (funcString(list)) + " " + (funcString(itemFn)) + "/>", indent, noNewLine);
	    };
	  }

	  return Repeat;

	})(TransformComponent);


/***/ },
/* 38 */
/*!******************************************!*\
  !*** ./src/core/directives/index.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var hide, show, _ref;

	exports.model = __webpack_require__(/*! ./model */ 40);

	exports.bind = __webpack_require__(/*! ./bind */ 41);

	_ref = __webpack_require__(/*! ./show-hide */ 42), show = _ref.show, hide = _ref.hide;

	exports.show = show;

	exports.hide = hide;

	exports.blink = __webpack_require__(/*! ./blink */ 39);

	exports.splitter = __webpack_require__(/*! ./splitter */ 43);

	exports.options = __webpack_require__(/*! ./options */ 44);


/***/ },
/* 39 */
/*!******************************************!*\
  !*** ./src/core/directives/blink.coffee ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = function(interval) {
	  return function(comp) {
	    var timer, visible;
	    if (interval == null) {
	      interval = 500;
	    }
	    timer = null;
	    comp.beforeMount(function() {
	      return timer = setInterval((function() {
	        var visible;
	        return visible = !visible;
	      }), interval);
	    });
	    comp.afterUnmount(function() {
	      return clearInterval(timer);
	    });
	    visible = true;
	    if (comp.style.visibility == null) {
	      comp.activePropertiesCount++;
	    }
	    this.style.visibility = function() {
	      if (visible) {
	        return 'visible';
	      } else {
	        return 'hidden';
	      }
	    };
	    return comp;
	  };
	};


/***/ },
/* 40 */
/*!******************************************!*\
  !*** ./src/core/directives/model.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var extendEventValue;

	extendEventValue = __webpack_require__(/*! ../property */ 31).extendEventValue;

	module.exports = function(exp, event) {
	  return function(comp) {
	    if (comp.props.value == null) {
	      comp.activePropertiesCount++;
	    }
	    comp.props.value = exp;
	    event = event || 'onchange';
	    if (comp.events[event] == null) {
	      comp.activePropertiesCount++;
	    }
	    extendEventValue(comp.events, event, (function(event, comp) {
	      return exp(this.value);
	    }), 'before');
	    return comp;
	  };
	};


/***/ },
/* 41 */
/*!*****************************************!*\
  !*** ./src/core/directives/bind.coffee ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = function(value) {
	  return function(comp) {
	    var props;
	    if (comp.props.value == null) {
	      comp.activePropertiesCount++;
	    }
	    props = comp.props;
	    props.value = value;
	    return comp;
	  };
	};


/***/ },
/* 42 */
/*!**********************************************!*\
  !*** ./src/core/directives/show-hide.coffee ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var showHide, styleDisplayOfShow;

	styleDisplayOfShow = __webpack_require__(/*! ../property */ 31).styleDisplayOfShow;


	/* @param test - paramenter expression for directive
	 */

	showHide = function(needShow) {
	  return function(test, showDisplay) {
	    return function(comp) {
	      var display;
	      display = comp.style.display;
	      if (display == null) {
	        comp.activePropertiesCount++;
	      }
	      if (typeof display === 'function') {
	        display = display();
	      }
	      comp.cacheStyle.oldDisplay = display || '';
	      comp.style.display = function() {
	        var testValue;
	        if (typeof test === 'function') {
	          testValue = !!test();
	        } else {
	          testValue = !!test;
	        }
	        return comp.styleDisplayOfShow(testValue === needShow, showDisplay);
	      };
	      return comp;
	    };
	  };
	};

	exports.show = showHide(true);

	exports.hide = showHide(false);


/***/ },
/* 43 */
/*!*********************************************!*\
  !*** ./src/core/directives/splitter.coffee ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, classFn, div, pairListDict, show, span, _ref;

	classFn = __webpack_require__(/*! ../property */ 31).classFn;

	pairListDict = __webpack_require__(/*! ../../util */ 1).pairListDict;

	Component = __webpack_require__(/*! ../base */ 7).Component;

	_ref = __webpack_require__(/*! ../tag */ 4), div = _ref.div, span = _ref.span;

	show = __webpack_require__(/*! ../directives */ 38).show;

	module.exports = function(direction) {
	  return function(comp) {
	    var arrawAAttr, arrawBAttr, arrowA, arrowAHovering, arrowB, arrowBHovering, attrs, barsize, buttonClass, children, clientX, cursor, drag, getSize, left, minAWidth, minBWidth, paneA, paneB, percent, pos, right, size, splitBar, splitBarAttr, splitBarAttrCss, splitbarClass, width;
	    attrs = comp.attrs;
	    direction = direction || 'vertical';
	    if (direction === 'vertical') {
	      left = "top";
	      right = "bottom";
	      width = "height";
	      clientX = "clientY";
	      splitbarClass = "splitbarH";
	      buttonClass = "splitbuttonH";
	      cursor = "s-resize";
	    } else {
	      left = "left";
	      right = "right";
	      width = "width";
	      clientX = "clientX";
	      splitbarClass = "splitbarV";
	      buttonClass = "splitbuttonV";
	      cursor = "e-resize";
	    }
	    pos = 200;
	    percent = 0.5;
	    size = null;
	    drag = false;
	    getSize = function() {
	      return size || 600;
	    };
	    children = comp.children.children;
	    paneA = children[0];
	    paneB = children[1];
	    minAWidth = attrs.minAWidth || 0;
	    minBWidth = attrs.minBWidth || 0;
	    splitBarAttr = {
	      "class": splitbarClass,
	      unselectable: "on",
	      style: splitBarAttrCss = {
	        "cursor": cursor,
	        "user-select": "none",
	        "-webkit-user-select": "none",
	        "-khtml-user-select": "none",
	        "-moz-user-select": "none"
	      }
	    };
	    splitBarAttrCss[left] = function() {
	      return pos + 'px';
	    };
	    splitBarAttrCss[width] = barsize = 6;
	    arrowAHovering = false;
	    arrawAAttr = {
	      "class": classFn(buttonClass, {
	        'inactive': function() {
	          return arrowAHovering;
	        }
	      }),
	      unselectable: "on",
	      style: {
	        cursor: 'pointer'
	      },
	      onmouseover: function() {
	        arrowAHovering = true;
	        return comp.update();
	      },
	      onmouseleave: function() {
	        arrowAHovering = false;
	        return comp.update();
	      },
	      onclick: function(e) {
	        pos = minAWidth;
	        return comp.update();
	      },
	      directives: show(function() {
	        return pos > minAWidth;
	      })
	    };
	    arrowBHovering = false;
	    arrawBAttr = {
	      "class": classFn(buttonClass + ' invert', {
	        'inactive': function() {
	          return arrowBHovering;
	        }
	      }),
	      unselectable: "on",
	      style: {
	        cursor: 'pointer'
	      },
	      onmouseover: function() {
	        arrowBHovering = true;
	        return comp.update();
	      },
	      onmouseleave: function() {
	        arrowBHovering = false;
	        return comp.update();
	      },
	      onclick: function(e) {
	        pos = getSize() - minBWidth;
	        return comp.update();
	      },
	      directives: show(function() {
	        return getSize() - pos > minBWidth;
	      })
	    };
	    arrowA = div(arrawAAttr);
	    arrowB = div(arrawBAttr);
	    children[2] = paneB;
	    children[1] = splitBar = div(splitBarAttr, span(), arrowA, arrowB);
	    splitBar.bind('mousedown', function(ev) {
	      return drag = true;
	    });
	    dc(document).bind('mouseup', function() {
	      return drag = false;
	    });
	    comp.bind('mousemove', function(ev) {
	      var bounds, pencent, w;
	      event.continuePropagation = true;
	      event.executeDefault = true;
	      if (!drag) {
	        return;
	      }
	      event.continuePropagation = false;
	      event.executeDefault = false;
	      bounds = comp.node.getBoundingClientRect();
	      size = w = bounds[right] - bounds[left];
	      pos = Math.max(ev[clientX] - bounds[left], 0);
	      pencent = pos / w;
	      return comp.update();
	    });
	    paneA.css(pairListDict('position', 'absolute', width, (function() {
	      return pos + 'px';
	    })));
	    paneB.css(pairListDict('position', 'absolute', left, (function() {
	      return (pos + barsize) + 'px';
	    }), width, (function() {
	      return getSize() - (pos + barsize) + 'px';
	    })));
	    comp.css(pairListDict('position', 'absolute'));
	    comp.bind('resize', function(ev) {
	      var bounds, w;
	      ev.preventDefault();
	      ev.stopPropagation();
	      bounds = comp.node.getBoundingClientRect();
	      w = bounds[right] - bounds[left];
	      pos = percent * w;
	      if (pos < minAWidth) {
	        pos = minAWidth;
	      } else if (w - pos < minBWidth) {
	        pos = w - minBWidth;
	      }
	      return comp.update();
	    });
	    return comp;
	  };
	};


/***/ },
/* 44 */
/*!********************************************!*\
  !*** ./src/core/directives/options.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var List, Tag, option, repeat, txt, _ref, _ref1;

	_ref = __webpack_require__(/*! ../base */ 7), Tag = _ref.Tag, List = _ref.List;

	_ref1 = __webpack_require__(/*! ../instantiate */ 6), repeat = _ref1.repeat, txt = _ref1.txt;

	option = __webpack_require__(/*! ../tag */ 4).option;

	module.exports = function(exp, attrs) {
	  return function(comp) {
	    if (!(comp instanceof Tag) || comp.tagName !== 'select') {
	      throw new Error('options should be only used in select tag');
	    }
	    comp.children = new List([
	      repeat(exp, function(item) {
	        return option(attrs, [txt(item)]);
	      })
	    ]);
	    return comp;
	  };
	};


/***/ },
/* 45 */
/*!****************************************!*\
  !*** ./src/core/builtins/index.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var extend;

	extend = __webpack_require__(/*! ../../extend */ 5);

	extend(exports, __webpack_require__(/*! ./accordion */ 47));

	exports.arrow = __webpack_require__(/*! ./arrow */ 48);

	exports.dialog = __webpack_require__(/*! ./dialog */ 46);

	extend(exports, __webpack_require__(/*! ./combo */ 49));

	exports.comboEdit = __webpack_require__(/*! ./comboEdit */ 50);


/***/ },
/* 46 */
/*!*****************************************!*\
  !*** ./src/core/builtins/dialog.coffee ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Component, div, globalID, list, tags;

	Component = __webpack_require__(/*! ../base */ 7).Component;

	list = __webpack_require__(/*! ../instantiate */ 6).list;

	tags = __webpack_require__(/*! ../tag */ 4);

	div = tags.div;

	globalID = 0;

	module.exports = function(options, template) {
	  var closeCallback, dlg, openCallback;
	  if (options.showClose) {
	    template = list(div({
	      "class": "dcdialog-close",
	      style: {
	        position: 'absolute',
	        "z-index": 10001,
	        top: 0,
	        right: '80px'
	      },
	      onclick: (function() {
	        return dlg.close();
	      })
	    }), template);
	  }
	  if (options.overlay) {
	    template = list(div({
	      "class": "dcdialog-overlay",
	      style: {
	        "z-index": 10000
	      }
	    }), div({
	      "class": "dcdialog-content",
	      style: {
	        position: 'absolute',
	        "z-index": 10001
	      }
	    }, template));
	  } else {
	    template = div({
	      "class": "dcdialog-content",
	      style: {
	        "z-index": 10001
	      }
	    }, template);
	  }
	  dlg = div({
	    id: 'dcdialog' + (++globalID),
	    "class": "dcdialog",
	    style: {
	      position: 'absolute',
	      top: '0px',
	      left: '0px',
	      "z-index": 9999
	    }
	  }, template);
	  openCallback = options.openCallback;
	  dlg.open = function() {
	    openCallback && openCallback();
	    return dlg.mount();
	  };
	  closeCallback = options.closeCallback;
	  dlg.close = function() {
	    dlg.unmount();
	    return closeCallback && closeCallback();
	  };
	  if (options.escClose) {
	    dlg.on('beforeMount', function() {
	      var escHandler;
	      escHandler = function(event) {
	        var esc;
	        esc = 27;
	        if (event.which === esc || event.keyCode === esc) {
	          return dlg.close();
	        }
	      };
	      return document.body.addEventListener('keydown', escHandler);
	    });
	    dlg.on('afterUnmount', function() {
	      return document.body.removeEventListener('keydown', escHandler);
	    });
	  }
	  return dlg;
	};


/***/ },
/* 47 */
/*!********************************************!*\
  !*** ./src/core/builtins/accordion.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	
	/** @module accordion
	 * @directive accordion
	 */
	var Component, a, accordion, accordionGroup, div, exports, extend, extendAttrs, h4, img, repeat, span, _ref;

	extend = __webpack_require__(/*! ../../extend */ 5);

	_ref = __webpack_require__(/*! ../tag */ 4), div = _ref.div, h4 = _ref.h4, a = _ref.a, span = _ref.span, img = _ref.img;

	Component = __webpack_require__(/*! ../base */ 7).Component;

	repeat = __webpack_require__(/*! ../instantiate */ 6).repeat;

	extendAttrs = __webpack_require__(/*! ../property */ 31).extendAttrs;

	module.exports = exports = accordion = function(attrs, accordionGroupList, options) {
	  var accordionOptions, comp;
	  attrs = extendAttrs({
	    "class": "panel-group"
	  }, attrs || Object.create(null));
	  accordionOptions = options || Object.create(null);
	  return comp = div(attrs, repeat(accordionGroupList, function(group, index) {
	    var content, groupAttrs, groupOptions, heading;
	    groupAttrs = group[0], heading = group[1], content = group[2], groupOptions = group[3];
	    groupOptions = groupOptions || Object.create(null);
	    groupOptions.toggleOpen = function() {
	      var group2, i, _i, _len;
	      groupOptions.opened = !groupOptions.opened;
	      if (accordionOptions.closeOthers && groupOptions.opened) {
	        for (i = _i = 0, _len = accordionGroupList.length; _i < _len; i = ++_i) {
	          group2 = accordionGroupList[i];
	          if (i !== index) {
	            group2[3].opened = false;
	          }
	        }
	      }
	      return comp.update();
	    };
	    return accordionGroup(groupAttrs, heading, content, groupOptions);
	  }));
	};

	exports.accordionGroup = accordionGroup = function(attrs, heading, content, options) {
	  return div({
	    "class": "panel panel-default"
	  }, div({
	    "class": "panel-heading",
	    onclick: options.toggleOpen
	  }, h4({
	    "class": "panel-title"
	  }, div({
	    "class": "accordion-toggle"
	  }, span({
	    "class": {
	      'text-muted': function() {
	        return options.disabled;
	      }
	    }
	  }, heading)))), div({
	    "class": {
	      "panel-collapse": function() {
	        return !options.opened;
	      }
	    },
	    style: {
	      display: function() {
	        if (options.opened) {
	          return 'block';
	        } else {
	          return 'none';
	        }
	      }
	    }
	  }, div({
	    "class": "panel-body"
	  }, content)));
	};

	exports.accordion = accordion;


/***/ },
/* 48 */
/*!****************************************!*\
  !*** ./src/core/builtins/arrow.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var arrowStyle, div, extendAttrs, reverseSide;

	div = __webpack_require__(/*! ../tag */ 4).div;

	extendAttrs = __webpack_require__(/*! ../property */ 31).extendAttrs;

	reverseSide = {
	  left: 'right',
	  right: 'left',
	  top: 'bottom',
	  bottom: 'top'
	};

	arrowStyle = function(direction, size, color) {
	  var props, sideStyle;
	  props = {
	    width: 0,
	    height: 0
	  };
	  sideStyle = size + "px solid transparent";
	  if (direction === 'left' || direction === 'right') {
	    props["border-top"] = props["border-bottom"] = sideStyle;
	  } else {
	    props["border-left"] = props["border-right"] = sideStyle;
	  }
	  props["border-" + reverseSide[direction]] = size + "px solid " + color;
	  return props;
	};

	module.exports = function(attrs, direction, size, color) {
	  attrs = extendAttrs(attrs, {
	    style: arrowStyle(direction, size, color)
	  });
	  return div(attrs);
	};


/***/ },
/* 49 */
/*!****************************************!*\
  !*** ./src/core/builtins/combo.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var combobox, div, extendAttrs, input, list, model, show, span, _ref, _ref1;

	list = __webpack_require__(/*! ../instantiate */ 6).list;

	_ref = __webpack_require__(/*! ../tag */ 4), input = _ref.input, span = _ref.span, div = _ref.div;

	_ref1 = __webpack_require__(/*! ../directives */ 38), model = _ref1.model, show = _ref1.show;

	extendAttrs = __webpack_require__(/*! ../property */ 31).extendAttrs;

	exports.combobox = combobox = function(attrs, modelValue, valueList, direction) {
	  var comp, disp, item, opts, showingItems;
	  showingItems = false;
	  disp = direction === 'v' || direction === 'vertical' ? 'block' : 'inline-block';
	  comp = null;
	  opts = (function() {
	    var _i, _len, _results;
	    _results = [];
	    for (_i = 0, _len = valueList.length; _i < _len; _i++) {
	      item = valueList[_i];
	      _results.push((function(item) {
	        return span({
	          style: {
	            display: disp,
	            border: "1px solid blue",
	            "min-width": "40px"
	          },
	          onclick: (function() {
	            modelValue(item);
	            return comp.update();
	          })
	        }, item);
	      })(item));
	    }
	    return _results;
	  })();
	  attrs = extendAttrs(attrs, {
	    onmouseleave: (function() {
	      showingItems = false;
	      return comp.update();
	    })
	  });
	  return comp = div(attrs, input({
	    directives: model(modelValue),
	    onmouseenter: (function() {
	      showingItems = true;
	      return comp.update();
	    })
	  }), div({
	    style: {
	      display: function() {
	        if (showingItems) {
	          return 'block';
	        } else {
	          return 'none';
	        }
	      }
	    }
	  }, opts));
	};

	exports.vcombo = function(attrs, modelValue, valueList) {
	  return combobox(attrs, modelValue, valueList, 'vertical');
	};

	exports.hcombo = function(attrs, modelValue, valueList) {
	  return combobox(attrs, modelValue, valueList, 'horizontal');
	};


/***/ },
/* 50 */
/*!********************************************!*\
  !*** ./src/core/builtins/comboEdit.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var extendAttrs, input, list, model, options, select, _ref, _ref1;

	list = __webpack_require__(/*! ../instantiate */ 6).list;

	_ref = __webpack_require__(/*! ../tag */ 4), input = _ref.input, select = _ref.select;

	_ref1 = __webpack_require__(/*! ../directives */ 38), model = _ref1.model, options = _ref1.options;

	extendAttrs = __webpack_require__(/*! ../property */ 31).extendAttrs;

	module.exports = function(attrs, modelValue, valueList) {
	  var inputAttrs, sel;
	  if (modelValue) {
	    attrs = extendAttrs(attrs, {
	      directives: [model(modelValue), options(valueList)]
	    });
	  } else {
	    attrs = extendAttrs({
	      directives: options(valueList)
	    });
	  }
	  sel = select(attrs);
	  inputAttrs = {
	    style: {
	      position: 'absolute',
	      top: function() {
	        return sel.top();
	      },
	      left: function() {
	        return sel.left();
	      },
	      height: function() {
	        return (sel.height() - 10) + 'px';
	      },
	      width: function() {
	        return (sel.width() - 10) + 'px';
	      }
	    },
	    value: function() {
	      return modelValue.value;
	    },
	    onchange: function() {
	      return modelValue.set(this.value);
	    }
	  };
	  return list(sel, input(inputAttrs));
	};


/***/ },
/* 51 */
/*!*****************************!*\
  !*** ./src/constant.coffee ***!
  \*****************************/
/***/ function(module, exports) {

	exports.operationConstant = {
	  CREATE_ELEMENT: 1,
	  CREATE_TEXT: 2,
	  UPDATE_TEXT: 3,
	  CREATE_COMMENT: 4,
	  UPDATE_COMMENT: 5,
	  CREATE_PROPS: 6,
	  UPDATE_PROPS: 7,
	  CREATE_PROP: 18,
	  UPDATE_PROP: 19,
	  UPDATE_STYLE: 24,
	  CREATE_EVENT: 8,
	  UPDATE_EVENT: 9,
	  UPDATE_SPECIAL: 23,
	  CREATE_EVENTS: 20,
	  UPDATE_EVENTS: 21,
	  UPDATE_SPECIALS: 22,
	  UPDATE_STYLES: 11,
	  APPEND_CHILD: 12,
	  INSERT_CHILD: 13,
	  CHILDREN: 14,
	  CREATE_HTML: 15,
	  UPDATE_HTML: 16,
	  REMOVE_CHILD: 17
	};

	exports.renderMode = {
	  AUTO: void 0,
	  REPLACE: 1,
	  PATCH_ALL: 2,
	  PATCH_DYNAMIC: 3,
	  KEEP: 4
	};


/***/ }
/******/ ])
});
;