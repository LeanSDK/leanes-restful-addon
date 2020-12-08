'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var statuses = _interopDefault(require('statuses'));
var assert = _interopDefault(require('assert'));
var parse = _interopDefault(require('co-body'));
var semver = _interopDefault(require('semver'));
var typeIs = require('type-is');
var contentType = _interopDefault(require('content-type'));
var qs = _interopDefault(require('querystring'));
var url = require('url');
var parse$1 = _interopDefault(require('parseurl'));
var fresh = _interopDefault(require('fresh'));
var net = _interopDefault(require('net'));
var mimeTypes = require('mime-types');
var path = require('path');
var path__default = _interopDefault(path);
var onFinished = _interopDefault(require('on-finished'));
var destroy = _interopDefault(require('destroy'));
var vary = _interopDefault(require('vary'));
var ensureErrorHandler = _interopDefault(require('error-inject'));
var contentDisposition = _interopDefault(require('content-disposition'));
var escapeHtml = _interopDefault(require('escape-html'));
var Keygrip = _interopDefault(require('keygrip'));
var NodeCookies = _interopDefault(require('cookies'));
var accepts = _interopDefault(require('accepts'));
var createError = _interopDefault(require('http-errors'));
var pathToRegexp = _interopDefault(require('path-to-regexp'));
var EventEmitter = _interopDefault(require('events'));
var http = _interopDefault(require('http'));
var Stream = _interopDefault(require('stream'));

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

// This file is part of leanes-restful-addon.
const cpoMetaObject = Symbol.for('~metaObject');
function action(target, key, descriptor) {
  const isClass = target[cpoMetaObject] != null;
  assert(!isClass, 'Decorator `action` may be used with instance methods only');
  const vmFunctor = descriptor.value || descriptor.initializer && descriptor.initializer();
  const vcClass = target.constructor;
  assert(vcClass.isExtensible, `Class '${target.name}' has been frozen previously. Method '${key}' can not be declared`); // const wrapper = function (...args) {
  //   return vmFunctor.apply(this, args);
  // };
  // Reflect.defineProperty(wrapper, 'class', {
  //   value: vcClass,
  //   enumerable: true
  // });
  // Reflect.defineProperty(vmFunctor, 'class', {
  //   value: vcClass,
  //   enumerable: true
  // });
  // Reflect.defineProperty(wrapper, 'name', {
  //   value: key,
  //   configurable: true
  // });

  Reflect.defineProperty(vmFunctor, 'name', {
    value: key,
    configurable: true
  }); // Reflect.defineProperty(vmFunctor, 'wrapper', {
  //   value: wrapper,
  //   enumerable: true
  // });
  // Reflect.defineProperty(wrapper, 'body', {
  //   value: vmFunctor,
  //   enumerable: true
  // });

  vcClass.metaObject.addMetaData('instanceMethods', key, vmFunctor);
  vcClass.metaObject.addMetaData('actions', key, vmFunctor);
  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    writable: false,
    value: vmFunctor
  };
}

/**
 * This file exports a dictionary of global primitive types that are shared by all contexts.
 * It is populated in [registerPrimitiveTypes()](./registerPrimitiveTypes.js).
 */

var primitiveTypes = {};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function makeJSONError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var errors = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : null;
      var actual = context.typeOf(_resolvePath(input, path)).toString();
      var field = stringifyPath(validation.path.concat(path));

      var pointer = `/${path.join('/')}`;

      errors.push({
        pointer,
        field,
        message,
        expected,
        actual
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return errors;
}

// Tracks whether we're in validation of cyclic objects.
var cyclicValidation = new WeakMap();
// Tracks whether we're toString() of cyclic objects.


var cyclicToString = new WeakSet();

function inValidationCycle(type, input) {
  try {
    var tracked = cyclicValidation.get(type);
    if (!tracked) {
      return false;
    } else {
      return weakSetHas(tracked, input);
    }
  } catch (e) {
    // some exotic values cannot be checked
    return true;
  }
}

function startValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (!tracked) {
    tracked = new WeakSet();
    cyclicValidation.set(type, tracked);
  }
  weakSetAdd(tracked, input);
}

function endValidationCycle(type, input) {
  var tracked = cyclicValidation.get(type);
  if (tracked) {
    weakSetDelete(tracked, input);
  }
}

function inToStringCycle(type) {
  return cyclicToString.has(type);
}

function startToStringCycle(type) {
  cyclicToString.add(type);
}

function endToStringCycle(type) {
  cyclicToString.delete(type);
}

function weakSetHas(weakset, value) {
  try {
    return weakset.has(value);
  } catch (e) {
    return true;
  }
}

function weakSetAdd(weakset, value) {
  try {
    weakset.add(value);
  } catch (e) {}
}

function weakSetDelete(weakset, value) {
  try {
    weakset.delete(value);
  } catch (e) {}
}

var validIdentifierOrAccessor = /^[$A-Z_][0-9A-Z_$[\].]*$/i;

var Validation = function () {
  function Validation(context, input) {
    classCallCheck(this, Validation);
    this.path = [];
    this.prefix = '';
    this.errors = [];
    this.cyclic = new WeakMap();

    this.context = context;
    this.input = input;
  }

  // Tracks whether we're in validation of cyclic objects.


  createClass(Validation, [{
    key: 'inCycle',
    value: function inCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (!tracked) {
        return false;
      } else {
        return weakSetHas(tracked, input);
      }
    }
  }, {
    key: 'startCycle',
    value: function startCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (!tracked) {
        tracked = new WeakSet();
        this.cyclic.set(type, tracked);
      }
      weakSetAdd(tracked, input);
    }
  }, {
    key: 'endCycle',
    value: function endCycle(type, input) {
      var tracked = this.cyclic.get(type);
      if (tracked) {
        weakSetDelete(tracked, input);
      }
    }
  }, {
    key: 'hasErrors',
    value: function hasErrors(path) {
      if (path) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = slicedToArray(_ref, 1);

            var candidate = _ref2[0];

            if (matchPath(path, candidate)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      } else {
        return this.errors.length > 0;
      }
    }
  }, {
    key: 'addError',
    value: function addError(path, expectedType, message) {
      this.errors.push([path, message, expectedType]);
      return this;
    }
  }, {
    key: 'clearError',
    value: function clearError(path) {
      var didClear = false;
      if (path) {
        var _errors = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.errors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var error = _step2.value;

            if (matchPath(path, error[0])) {
              didClear = true;
            } else {
              _errors.push(error);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.errors = _errors;
      } else {
        didClear = this.errors.length > 0;
        this.errors = [];
      }
      return didClear;
    }
  }, {
    key: 'resolvePath',
    value: function resolvePath(path) {
      return _resolvePath(this.input, path);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return makeJSONError(this);
    }
  }]);
  return Validation;
}();

function stringifyPath(path) {
  if (!path.length) {
    return 'Value';
  }
  var length = path.length;

  var parts = new Array(length);
  for (var i = 0; i < length; i++) {
    var part = path[i];
    if (part === '[[Return Type]]') {
      parts[i] = 'Return Type';
    } else if (typeof part !== 'string' || !validIdentifierOrAccessor.test(part)) {
      parts[i] = `[${String(part)}]`;
    } else if (i > 0) {
      parts[i] = `.${String(part)}`;
    } else {
      parts[i] = String(part);
    }
  }
  return parts.join('');
}

function _resolvePath(input, path) {
  var subject = input;
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (subject == null) {
      return undefined;
    }
    var part = path[i];
    if (part === '[[Return Type]]') {
      continue;
    }
    if (subject instanceof Map) {
      subject = subject.get(part);
    } else {
      subject = subject[part];
    }
  }
  return subject;
}

function matchPath(path, candidate) {
  var length = path.length;

  if (length > candidate.length) {
    return false;
  }
  for (var i = 0; i < length; i++) {
    if (candidate[i] !== path[i]) {
      return false;
    }
  }
  return true;
}

var RuntimeTypeError = function (_TypeError) {
  inherits(RuntimeTypeError, _TypeError);

  function RuntimeTypeError(message, options) {
    classCallCheck(this, RuntimeTypeError);

    var _this = possibleConstructorReturn(this, (RuntimeTypeError.__proto__ || Object.getPrototypeOf(RuntimeTypeError)).call(this, message));

    _this.name = "RuntimeTypeError";

    Object.assign(_this, options);
    return _this;
  }

  return RuntimeTypeError;
}(TypeError);

var delimiter = '\n-------------------------------------------------\n\n';

function makeTypeError(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var prefix = validation.prefix,
      input = validation.input,
      context = validation.context,
      errors = validation.errors;

  var collected = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : "*";
      var actual = _resolvePath(input, path);
      var actualType = context.typeOf(actual).toString();

      var field = stringifyPath(validation.path.concat(path));

      var actualAsString = makeString(actual);

      if (typeof actualAsString === 'string') {
        collected.push(`${field} ${message}\n\nExpected: ${expected}\n\nActual Value: ${actualAsString}\n\nActual Type: ${actualType}\n`);
      } else {
        collected.push(`${field} ${message}\n\nExpected: ${expected}\n\nActual: ${actualType}\n`);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (prefix) {
    return new RuntimeTypeError(`${prefix.trim()} ${collected.join(delimiter)}`, { errors });
  } else {
    return new RuntimeTypeError(collected.join(delimiter), { errors });
  }
}

function makeString(value) {
  if (value === null) {
    return 'null';
  }
  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    // Issue
    case 'symbol':
    case 'number':
    case 'boolean':
    case 'undefined':
      return String(value);
    case 'function':
      return;
    default:
      if (Array.isArray(value) || value.constructor == null || value.constructor === Object) {
        try {
          return JSON.stringify(value, null, 2);
        } catch (e) {
          return;
        }
      }
      return;
  }
}

function makeError(expected, input) {
  var context = expected.context;

  var validation = context.validate(expected, input);
  return makeTypeError(validation);
}

/**
 * Given two types, A and B, compare them and return either -1, 0, or 1:
 *
 *   -1 if A cannot accept type B.
 *
 *    0 if the types are effectively identical.
 *
 *    1 if A accepts every possible B.
 */


function compareTypes(a, b) {
  var result = void 0;

  if (a === b) {
    return 0;
  }

  if (b instanceof TypeAlias || b instanceof TypeParameter || b instanceof TypeParameterApplication || b instanceof TypeTDZ) {
    b = b.unwrap();
  }

  if (a instanceof TypeAlias) {
    result = a.compareWith(b);
  } else if (a instanceof FlowIntoType || a instanceof TypeParameter || b instanceof FlowIntoType) {
    result = a.compareWith(b);
  } else if (a instanceof AnyType || a instanceof ExistentialType || a instanceof MixedType) {
    return 1;
  } else {
    result = a.compareWith(b);
  }

  if (b instanceof AnyType) {
    // Note: This check cannot be moved higher in the scope,
    // as this would prevent types from being propagated upwards.
    return 1;
  } else {
    return result;
  }
}

/**
 * # Type
 *
 * This is the base class for all types.
 */
var Type = function () {
  function Type(context) {
    classCallCheck(this, Type);
    this.typeName = 'Type';

    this.context = context;
  }

  createClass(Type, [{
    key: 'errors',
    value: function* errors(validation, path, input) {}
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var validation = new Validation(this.context, input);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.errors(validation, [], input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;
          // eslint-disable-line no-unused-vars
          return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: 'acceptsType',
    value: function acceptsType(input) {
      if (compareTypes(this, input) === -1) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return -1;
    }
  }, {
    key: 'assert',
    value: function assert(input) {
      var error = makeError(this, input);
      if (error) {
        if (typeof Error.captureStackTrace === 'function') {
          Error.captureStackTrace(error, this.assert);
        }
        throw error;
      }
      return input;
    }

    /**
     * Get the inner type.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$Type';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return Type;
}();

var AnyType = function (_Type) {
  inherits(AnyType, _Type);

  function AnyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AnyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AnyType.__proto__ || Object.getPrototypeOf(AnyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'AnyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AnyType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {}
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'any';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return AnyType;
}(Type);

var errorMessages = {
  ERR_CONSTRAINT_VIOLATION: 'violated a constraint',
  ERR_EXPECT_ARRAY: 'must be an Array',
  ERR_EXPECT_TRUE: 'must be true',
  ERR_EXPECT_FALSE: 'must be false',
  ERR_EXPECT_BOOLEAN: 'must be true or false',
  ERR_EXPECT_EMPTY: 'must be empty',
  ERR_EXPECT_EXACT_VALUE: 'must be exactly $0',
  ERR_EXPECT_CALLABLE: 'must be callable',
  ERR_EXPECT_CLASS: 'must be a Class of $0',
  ERR_EXPECT_FUNCTION: 'must be a function',
  ERR_EXPECT_GENERATOR: 'must be a generator function',
  ERR_EXPECT_ITERABLE: 'must be iterable',
  ERR_EXPECT_ARGUMENT: 'argument "$0" must be: $1',
  ERR_EXPECT_RETURN: 'expected return type of: $0',
  ERR_EXPECT_N_ARGUMENTS: 'requires $0 argument(s)',
  ERR_EXPECT_INSTANCEOF: 'must be an instance of $0',
  ERR_EXPECT_KEY_TYPE: 'keys must be: $0',
  ERR_EXPECT_NULL: 'must be null',
  ERR_EXPECT_NUMBER: 'must be a number',
  ERR_EXPECT_OBJECT: 'must be an object',
  ERR_EXPECT_PROMISE: 'must be a promise of $0',
  ERR_EXPECT_STRING: 'must be a string',
  ERR_EXPECT_SYMBOL: 'must be a symbol',
  ERR_EXPECT_THIS: 'must be exactly this',
  ERR_EXPECT_VOID: 'must be undefined',
  ERR_INVALID_DATE: 'must be a valid date',
  ERR_MISSING_PROPERTY: 'does not exist on object',
  ERR_NO_INDEXER: 'is not one of the permitted indexer types',
  ERR_NO_UNION: 'must be one of: $0',
  ERR_UNKNOWN_KEY: 'should not contain the key: "$0"'
};

function getErrorMessage(key) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var message = errorMessages[key];
  if (params.length > 0) {
    return message.replace(/\$(\d+)/g, function (m, i) {
      return String(params[i]);
    });
  } else {
    return message;
  }
}

var TupleType = function (_Type) {
  inherits(TupleType, _Type);

  function TupleType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TupleType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TupleType.__proto__ || Object.getPrototypeOf(TupleType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TupleType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TupleType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var types = this.types;
      var length = types.length;
      var context = this.context;

      if (!context.checkPredicate('Array', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];
        return;
      }
      for (var i = 0; i < length; i++) {
        yield* types[i].errors(validation, path.concat(i), input[i]);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;
      var context = this.context;


      if (!context.checkPredicate('Array', input) || input.length < length) {
        return false;
      }
      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof TupleType)) {
        return -1;
      }
      var types = this.types;
      var inputTypes = input.types;
      if (inputTypes.length < types.length) {
        return -1;
      }
      var isGreater = false;
      for (var i = 0; i < types.length; i++) {
        var result = compareTypes(types[i], inputTypes[i]);
        if (result === 1) {
          isGreater = true;
        } else if (result === -1) {
          return -1;
        }
      }
      if (types.length < inputTypes.length) {
        return 0;
      } else if (isGreater) {
        return 1;
      } else {
        return 0;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `[${this.types.join(', ')}]`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return TupleType;
}(Type);

var ArrayType = function (_Type) {
  inherits(ArrayType, _Type);

  function ArrayType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ArrayType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ArrayType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ArrayType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var context = this.context;

      if (!context.checkPredicate('Array', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];
        return;
      }
      if (validation.inCycle(this, input)) {
        return;
      }
      validation.startCycle(this, input);
      var elementType = this.elementType;
      var length = input.length;


      for (var i = 0; i < length; i++) {
        yield* elementType.errors(validation, path.concat(i), input[i]);
      }
      validation.endCycle(this, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var context = this.context;

      if (!context.checkPredicate('Array', input)) {
        return false;
      }
      if (inValidationCycle(this, input)) {
        return true;
      }
      startValidationCycle(this, input);
      var elementType = this.elementType;
      var length = input.length;

      for (var i = 0; i < length; i++) {
        if (!elementType.accepts(input[i])) {
          endValidationCycle(this, input);
          return false;
        }
      }
      endValidationCycle(this, input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var elementType = this.elementType;

      if (input instanceof TupleType) {
        var types = input.types;

        for (var i = 0; i < types.length; i++) {
          var result = compareTypes(elementType, types[i]);
          if (result === -1) {
            return -1;
          }
        }
        return 1;
      } else if (input instanceof ArrayType) {
        return compareTypes(elementType, input.elementType);
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var elementType = this.elementType;

      if (inToStringCycle(this)) {
        if (typeof elementType.name === 'string') {
          return `Array<$Cycle<${elementType.name}>>`;
        } else {
          return `Array<$Cycle<Object>>`;
        }
      }
      startToStringCycle(this);
      var output = `Array<${elementType.toString()}>`;
      endToStringCycle(this);
      return output;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        elementType: this.elementType
      };
    }
  }]);
  return ArrayType;
}(Type);

var BooleanLiteralType = function (_Type) {
  inherits(BooleanLiteralType, _Type);

  function BooleanLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, BooleanLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = BooleanLiteralType.__proto__ || Object.getPrototypeOf(BooleanLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(BooleanLiteralType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (input !== this.value) {
        yield [path, getErrorMessage(this.value ? 'ERR_EXPECT_TRUE' : 'ERR_EXPECT_FALSE'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof BooleanLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.value ? 'true' : 'false';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.typeName,
        value: this.value
      };
    }
  }]);
  return BooleanLiteralType;
}(Type);

var BooleanType = function (_Type) {
  inherits(BooleanType, _Type);

  function BooleanType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, BooleanType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = BooleanType.__proto__ || Object.getPrototypeOf(BooleanType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'BooleanType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(BooleanType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (typeof input !== 'boolean') {
        yield [path, getErrorMessage('ERR_EXPECT_BOOLEAN'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'boolean';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof BooleanLiteralType) {
        return 1;
      } else if (input instanceof BooleanType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'boolean';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return BooleanType;
}(Type);

var EmptyType = function (_Type) {
  inherits(EmptyType, _Type);

  function EmptyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, EmptyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = EmptyType.__proto__ || Object.getPrototypeOf(EmptyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'EmptyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(EmptyType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield [path, getErrorMessage('ERR_EXPECT_EMPTY'), this];
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return false; // empty types accepts nothing.
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof EmptyType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'empty';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return EmptyType;
}(Type);

var ExistentialType = function (_Type) {
  inherits(ExistentialType, _Type);

  function ExistentialType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ExistentialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ExistentialType.__proto__ || Object.getPrototypeOf(ExistentialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExistentialType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ExistentialType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {}
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '*';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return ExistentialType;
}(Type);

/**
 * # TypeParameterApplication
 *
 */
var TypeParameterApplication = function (_Type) {
  inherits(TypeParameterApplication, _Type);

  function TypeParameterApplication() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeParameterApplication);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeParameterApplication.__proto__ || Object.getPrototypeOf(TypeParameterApplication)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameterApplication', _this.typeInstances = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeParameterApplication, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var parent = this.parent,
          typeInstances = this.typeInstances;

      yield* parent.errors.apply(parent, [validation, path, input].concat(toConsumableArray(typeInstances)));
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var parent = this.parent,
          typeInstances = this.typeInstances;

      return parent.accepts.apply(parent, [input].concat(toConsumableArray(typeInstances)));
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var _parent;

      return (_parent = this.parent).compareWith.apply(_parent, [input].concat(toConsumableArray(this.typeInstances)));
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.hasProperty === 'function') {
        var _ref2;

        return (_ref2 = inner).hasProperty.apply(_ref2, [name].concat(toConsumableArray(this.typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.parent;
      if (inner && typeof inner.getProperty === 'function') {
        var _ref3;

        return (_ref3 = inner).getProperty.apply(_ref3, [name].concat(toConsumableArray(this.typeInstances)));
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _parent2;

      return (_parent2 = this.parent).unwrap.apply(_parent2, toConsumableArray(this.typeInstances));
    }
  }, {
    key: 'toString',
    value: function toString() {
      var parent = this.parent,
          typeInstances = this.typeInstances;
      var name = parent.name;

      if (typeInstances.length) {
        var items = [];
        for (var i = 0; i < typeInstances.length; i++) {
          var typeInstance = typeInstances[i];
          items.push(typeInstance.toString());
        }
        return `${name}<${items.join(', ')}>`;
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeInstances: this.typeInstances
      };
    }
  }]);
  return TypeParameterApplication;
}(Type);

/**
 * Add constraints to the given subject type.
 */
function addConstraints(subject) {
  var _subject$constraints;

  for (var _len = arguments.length, constraints = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    constraints[_key - 1] = arguments[_key];
  }

  (_subject$constraints = subject.constraints).push.apply(_subject$constraints, toConsumableArray(constraints));
}

/**
 * Collect any errors from constraints on the given subject type.
 */


function* collectConstraintErrors(subject, validation, path) {
  var constraints = subject.constraints;
  var length = constraints.length;

  for (var _len2 = arguments.length, input = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    input[_key2 - 3] = arguments[_key2];
  }

  for (var i = 0; i < length; i++) {
    var constraint = constraints[i];
    var violation = constraint.apply(undefined, toConsumableArray(input));
    if (typeof violation === 'string') {
      yield [path, violation, this];
    }
  }
}

/**
 * Determine whether the input passes the constraints on the subject type.
 */
function constraintsAccept(subject) {
  var constraints = subject.constraints;
  var length = constraints.length;

  for (var _len3 = arguments.length, input = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    input[_key3 - 1] = arguments[_key3];
  }

  for (var i = 0; i < length; i++) {
    var constraint = constraints[i];
    if (typeof constraint.apply(undefined, toConsumableArray(input)) === 'string') {
      return false;
    }
  }
  return true;
}

var TypeAlias = function (_Type) {
  inherits(TypeAlias, _Type);

  function TypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeAlias.__proto__ || Object.getPrototypeOf(TypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeAlias', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeAlias, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;

      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = type.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          hasErrors = true;
          yield error;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasErrors) {
        yield* collectConstraintErrors(this, validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0; // should never need this because it's taken care of by compareTypes.
      } else if (this.hasConstraints) {
        // if we have constraints the types cannot be the same
        return -1;
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len3 = arguments.length, typeInstances = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        typeInstances[_key3] = arguments[_key3];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          type = this.type;

      if (withDeclaration) {
        return `type ${name} = ${type.toString()};`;
      } else {
        return name;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return this.type.properties;
    }
  }, {
    key: 'hasConstraints',
    get: function get$$1() {
      return this.constraints.length > 0;
    }
  }]);
  return TypeAlias;
}(Type);

var FlowIntoSymbol = Symbol('FlowInto');

/**
 * # TypeParameter
 *
 * Type parameters allow polymorphic type safety.
 * The first time a type parameter is checked, it records the shape of its input,
 * this recorded shape is used to check all future inputs for this particular instance.
 */

var TypeParameter = function (_Type) {
  inherits(TypeParameter, _Type);

  function TypeParameter() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeParameter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeParameter.__proto__ || Object.getPrototypeOf(TypeParameter)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeParameter', _this[FlowIntoSymbol] = null, _temp), possibleConstructorReturn(_this, _ret);
  }

  // Issue 252


  createClass(TypeParameter, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded,
          context = this.context;


      if (boundOrDefault instanceof FlowIntoType || boundOrDefault instanceof TypeAlias) {
        // We defer to the other type parameter so that values from this
        // one can flow "upwards".
        yield* boundOrDefault.errors(validation, path, input);
        return;
      } else if (recorded) {
        // we've already recorded a value for this type parameter
        yield* recorded.errors(validation, path, input);
        return;
      } else if (boundOrDefault) {
        if (boundOrDefault.typeName === 'AnyType' || boundOrDefault.typeName === 'ExistentialType') {
          return;
        } else {
          var hasErrors = false;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = boundOrDefault.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var error = _step.value;

              hasErrors = true;
              yield error;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (hasErrors) {
            return;
          }
        }
      }

      this.recorded = context.typeOf(input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded,
          context = this.context;

      if (boundOrDefault instanceof FlowIntoType || boundOrDefault instanceof TypeAlias) {
        // We defer to the other type parameter so that values from this
        // one can flow "upwards".
        return boundOrDefault.accepts(input);
      } else if (recorded) {
        return recorded.accepts(input);
      } else if (boundOrDefault) {
        if (boundOrDefault.typeName === "AnyType" || boundOrDefault.typeName === "ExistentialType") {
          return true;
        } else if (!boundOrDefault.accepts(input)) {
          return false;
        }
      }

      this.recorded = context.typeOf(input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded;

      if (input instanceof TypeParameter) {
        // We don't need to check for `recorded` or `bound` fields
        // because the input has already been unwrapped, so
        // if we got a type parameter it must be totally generic and
        // we treat it like Any.
        return 1;
      } else if (recorded) {
        return compareTypes(recorded, input);
      } else if (boundOrDefault) {
        return compareTypes(boundOrDefault, input);
      } else {
        // A generic type parameter accepts any input.
        return 1;
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var boundOrDefault = this.bound || this.default;
      var recorded = this.recorded;

      if (recorded) {
        return recorded.unwrap();
      } else if (boundOrDefault) {
        return boundOrDefault.unwrap();
      } else {
        return this;
      }
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      var id = this.id,
          bound = this.bound,
          defaultType = this.default;

      if (withBinding) {
        if (defaultType) {
          return `${id} = ${defaultType.toString()}`;
        } else if (bound) {
          return `${id}: ${bound.toString()}`;
        }
      }
      return id;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        bound: this.bound,
        recorded: this.recorded
      };
    }
  }]);
  return TypeParameter;
}(Type);

function flowIntoTypeParameter(typeParameter) {
  var existing = typeParameter[FlowIntoSymbol];
  if (existing) {
    return existing;
  }

  var target = new FlowIntoType(typeParameter.context);
  target.typeParameter = typeParameter;
  typeParameter[FlowIntoSymbol] = target;
  return target;
}

/**
 * # FlowIntoType
 *
 * A virtual type which allows types it receives to "flow" upwards into a type parameter.
 * The type parameter will become of a union of any types seen by this instance.
 */

var FlowIntoType = function (_Type) {
  inherits(FlowIntoType, _Type);

  function FlowIntoType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FlowIntoType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FlowIntoType.__proto__ || Object.getPrototypeOf(FlowIntoType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FlowIntoType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FlowIntoType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var typeParameter = this.typeParameter,
          context = this.context;
      var recorded = typeParameter.recorded,
          bound = typeParameter.bound;


      if (bound instanceof FlowIntoType) {
        // We defer to the other type so that values from this
        // one can flow "upwards".
        yield* bound.errors(validation, path, input);
        return;
      }
      if (recorded) {
        // we've already recorded a value for this type parameter
        if (bound) {
          var hasError = false;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = bound.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var error = _step.value;

              yield error;
              hasError = true;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (hasError) {
            return;
          }
        } else if (recorded.accepts(input)) {
          // our existing type already permits this value, there's nothing to do.
          return;
        } else {
          // we need to make a union
          typeParameter.recorded = context.union(recorded, context.typeOf(input));
          return;
        }
      } else if (bound) {
        if (bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType') {
          return;
        } else {
          var _hasError = false;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = bound.errors(validation, path, input)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _error = _step2.value;

              yield _error;
              _hasError = true;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (_hasError) {
            return;
          }
        }
      }

      typeParameter.recorded = context.typeOf(input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var typeParameter = this.typeParameter,
          context = this.context;
      var recorded = typeParameter.recorded,
          bound = typeParameter.bound;


      if (bound instanceof FlowIntoType) {
        // We defer to the other type so that values from this
        // one can flow "upwards".
        return bound.accepts(input);
      }
      if (recorded) {
        // we've already recorded a value for this type parameter
        if (bound && !bound.accepts(input)) {
          return false;
        } else if (recorded.accepts(input)) {
          // our existing type already permits this value, there's nothing to do.
          return true;
        } else {
          // we need to make a union
          typeParameter.recorded = context.union(recorded, context.typeOf(input));
          return true;
        }
      } else if (bound) {
        if (bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType') {
          return true;
        } else if (!bound.accepts(input)) {
          return false;
        }
      }

      typeParameter.recorded = context.typeOf(input);
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var typeParameter = this.typeParameter,
          context = this.context;
      var recorded = typeParameter.recorded,
          bound = typeParameter.bound;

      if (bound instanceof FlowIntoType) {
        // We defer to the other type so that values from this
        // one can flow "upwards".
        return bound.compareWith(input);
      }
      if (recorded) {
        if (bound && compareTypes(bound, input) === -1) {
          return -1;
        }
        var result = compareTypes(recorded, input);
        if (result === 0) {
          // our existing type already permits this value, there's nothing to do.
          return 0;
        }
        // we need to make a union
        typeParameter.recorded = context.union(recorded, input);
        return 1;
      } else if (bound) {
        if (bound.typeName === 'AnyType' || bound.typeName === 'ExistentialType') {
          return 1;
        }
        var _result = compareTypes(bound, input);
        if (_result === -1) {
          return -1;
        }
      }

      typeParameter.recorded = input;
      return 0;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.typeParameter.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      return this.typeParameter.toString(withBinding);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.typeParameter.toJSON();
    }
  }]);
  return FlowIntoType;
}(Type);

var FunctionTypeRestParam = function (_Type) {
  inherits(FunctionTypeRestParam, _Type);

  function FunctionTypeRestParam() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeRestParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeRestParam.__proto__ || Object.getPrototypeOf(FunctionTypeRestParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeRestParam', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeRestParam, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;

      yield* type.errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeParam || input instanceof FunctionTypeRestParam) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return `...${this.name}: ${type.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        type: this.type
      };
    }
  }]);
  return FunctionTypeRestParam;
}(Type);

var FunctionTypeParam = function (_Type) {
  inherits(FunctionTypeParam, _Type);

  function FunctionTypeParam() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeParam);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeParam.__proto__ || Object.getPrototypeOf(FunctionTypeParam)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeParam', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeParam, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var optional = this.optional,
          type = this.type;

      if (optional && input === undefined) {
        return;
      } else {
        yield* type.errors(validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var optional = this.optional,
          type = this.type;

      if (optional && input === undefined) {
        return true;
      } else {
        return type.accepts(input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeParam || input instanceof FunctionTypeRestParam) {
        return compareTypes(this.type, input.type);
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var optional = this.optional,
          type = this.type;

      return `${this.name}${optional ? '?' : ''}: ${type.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name,
        optional: this.optional,
        type: this.type
      };
    }
  }]);
  return FunctionTypeParam;
}(Type);

var FunctionTypeReturn = function (_Type) {
  inherits(FunctionTypeReturn, _Type);

  function FunctionTypeReturn() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionTypeReturn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionTypeReturn.__proto__ || Object.getPrototypeOf(FunctionTypeReturn)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionTypeReturn', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionTypeReturn, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;

      yield* type.errors(validation, path.concat('[[Return Type]]'), input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      return type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof FunctionTypeReturn) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return FunctionTypeReturn;
}(Type);

var ParentSymbol = Symbol('Parent');
var NameRegistrySymbol = Symbol('NameRegistry');
var ModuleRegistrySymbol = Symbol('ModuleRegistry');
var CurrentModuleSymbol = Symbol('CurrentModule');
var TypeConstructorRegistrySymbol = Symbol('TypeConstructorRegistry');
var InferrerSymbol = Symbol('Inferrer');


var TypeSymbol = Symbol('Type');
var TypeParametersSymbol = Symbol('TypeParameters');
var TypePredicateRegistrySymbol = Symbol('TypePredicateRegistry');

var FunctionType = function (_Type) {
  inherits(FunctionType, _Type);

  function FunctionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, FunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FunctionType.__proto__ || Object.getPrototypeOf(FunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'FunctionType', _this.params = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(FunctionType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_FUNCTION'), this];
        return;
      }
      var annotation = input[TypeSymbol];
      var returnType = this.returnType,
          params = this.params;

      if (annotation) {
        if (!annotation.params) {
          return;
        }
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          var annotationParam = annotation.params[i];
          if (!annotationParam && !param.optional) {
            yield [path, getErrorMessage('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()), this];
          } else if (!param.acceptsType(annotationParam)) {
            yield [path, getErrorMessage('ERR_EXPECT_ARGUMENT', param.name, param.type.toString()), this];
          }
        }
        if (!returnType.acceptsType(annotation.returnType)) {
          yield [path, getErrorMessage('ERR_EXPECT_RETURN', returnType.toString()), this];
        }
      } else {
        var context = this.context;
        // We cannot safely check an unannotated function.
        // But we need to propagate `any` type feedback upwards.

        for (var _i = 0; _i < params.length; _i++) {
          var _param = params[_i];
          _param.acceptsType(context.any());
        }
        returnType.acceptsType(context.any());
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (typeof input !== 'function') {
        return false;
      }
      var returnType = this.returnType,
          params = this.params;

      var annotation = input[TypeSymbol];
      if (annotation) {
        if (!annotation.params) {
          return true;
        }
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          var annotationParam = annotation.params[i];
          if (!annotationParam && !param.optional) {
            return false;
          } else if (!param.acceptsType(annotationParam)) {
            return false;
          }
        }
        if (!returnType.acceptsType(annotation.returnType)) {
          return false;
        }
        return true;
      } else {
        var context = this.context;
        // We cannot safely check an unannotated function.
        // But we need to propagate `any` type feedback upwards.

        for (var _i2 = 0; _i2 < params.length; _i2++) {
          var _param2 = params[_i2];
          _param2.acceptsType(context.any());
        }
        returnType.acceptsType(context.any());
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof FunctionType)) {
        return -1;
      }
      var returnType = this.returnType;
      var inputReturnType = input.returnType;
      var isGreater = false;
      var returnTypeResult = compareTypes(returnType, inputReturnType);
      if (returnTypeResult === -1) {
        return -1;
      } else if (returnTypeResult === 1) {
        isGreater = true;
      }

      var params = this.params;
      var inputParams = input.params;
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var inputParam = i >= inputParams.length ? input.rest : inputParams[i];
        if (inputParam == null) {
          return -1;
        }
        var result = compareTypes(param, inputParam);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
      }
      return isGreater ? 1 : 0;
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          if (!param.accepts(args[i])) {
            return false;
          }
        } else if (!param.accepts(undefined)) {
          return false;
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i3 = paramsLength; _i3 < argsLength; _i3++) {
          if (!rest.accepts(args[_i3])) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var params = this.params,
          rest = this.rest;

      var paramsLength = params.length;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          param.assert(args[i]);
        } else {
          param.assert(undefined);
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i4 = paramsLength; _i4 < argsLength; _i4++) {
          rest.assert(args[_i4]);
        }
      }

      return args;
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      this.returnType.assert(input);
      return input;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var params = this.params,
          rest = this.rest,
          context = this.context;

      var paramsLength = params.length;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var argsLength = args.length;
      for (var i = 0; i < paramsLength; i++) {
        var param = params[i];
        if (i < argsLength) {
          if (!param.acceptsType(args[i])) {
            return context.empty();
          }
        } else if (!param.accepts(undefined)) {
          return context.empty();
        }
      }

      if (argsLength > paramsLength && rest) {
        for (var _i5 = paramsLength; _i5 < argsLength; _i5++) {
          if (!rest.acceptsType(args[_i5])) {
            return context.empty();
          }
        }
      }

      return this.returnType.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var params = this.params,
          rest = this.rest,
          returnType = this.returnType;

      var args = [];
      for (var i = 0; i < params.length; i++) {
        args.push(params[i].toString());
      }
      if (rest) {
        args.push(rest.toString());
      }
      return `(${args.join(', ')}) => ${returnType.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        params: this.params,
        rest: this.rest,
        returnType: this.returnType
      };
    }
  }]);
  return FunctionType;
}(Type);

var GeneratorType = function (_Type) {
  inherits(GeneratorType, _Type);

  function GeneratorType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, GeneratorType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = GeneratorType.__proto__ || Object.getPrototypeOf(GeneratorType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'GeneratorType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(GeneratorType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var isValid = input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';
      if (!isValid) {
        yield [path, getErrorMessage('ERR_EXPECT_GENERATOR'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input && typeof input.next === 'function' && typeof input.return === 'function' && typeof input.throw === 'function';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof GeneratorType)) {
        var _result = compareTypes(this.yieldType, input);
        if (_result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
      var isGreater = false;
      var result = compareTypes(this.yieldType, input.yieldType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      result = compareTypes(this.returnType, input.returnType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      result = compareTypes(this.nextType, input.nextType);
      if (result === -1) {
        return -1;
      } else if (result === 1) {
        isGreater = true;
      }

      return isGreater ? 1 : 0;
    }
  }, {
    key: 'acceptsYield',
    value: function acceptsYield(input) {
      return this.yieldType.accepts(input);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return this.returnType.accepts(input);
    }
  }, {
    key: 'acceptsNext',
    value: function acceptsNext(input) {
      return this.nextType.accepts(input);
    }
  }, {
    key: 'assertYield',
    value: function assertYield(input) {
      return this.yieldType.assert(input);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return this.returnType.assert(input);
    }
  }, {
    key: 'assertNext',
    value: function assertNext(input) {
      return this.nextType.assert(input);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var yieldType = this.yieldType,
          returnType = this.returnType,
          nextType = this.nextType;

      return `Generator<${yieldType.toString()}, ${returnType.toString()}, ${nextType.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        yieldType: this.yieldType,
        returnType: this.returnType,
        nextType: this.nextType
      };
    }
  }]);
  return GeneratorType;
}(Type);

var warnedInstances = new WeakSet();

var TypeConstructor = function (_Type) {
  inherits(TypeConstructor, _Type);

  function TypeConstructor() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeConstructor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeConstructor.__proto__ || Object.getPrototypeOf(TypeConstructor)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeConstructor', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeConstructor, [{
    key: 'errors',
    value: function* errors(validation, path, input) {}
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var context = this.context,
          name = this.name;

      if (!warnedInstances.has(this)) {
        context.emitWarningMessage(`TypeConstructor ${name} does not implement accepts().`);
        warnedInstances.add(this);
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var context = this.context,
          name = this.name;

      if (!warnedInstances.has(this)) {
        context.emitWarningMessage(`TypeConstructor ${name} does not implement compareWith().`);
        warnedInstances.add(this);
      }
      return -1;
    }
  }, {
    key: 'inferTypeParameters',
    value: function inferTypeParameters(input) {
      return [];
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }]);
  return TypeConstructor;
}(Type);

var GenericType = function (_TypeConstructor) {
  inherits(GenericType, _TypeConstructor);

  function GenericType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, GenericType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = GenericType.__proto__ || Object.getPrototypeOf(GenericType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = "GenericType", _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(GenericType, [{
    key: "errors",
    value: function* errors(validation, path, input) {
      var name = this.name,
          impl = this.impl;

      if (!(input instanceof impl)) {
        yield [path, getErrorMessage("ERR_EXPECT_INSTANCEOF", name), this];
      }
    }
  }, {
    key: "accepts",
    value: function accepts(input) {
      var impl = this.impl;

      return input instanceof impl;
    }
  }, {
    key: "compareWith",
    value: function compareWith(input) {
      var context = this.context,
          impl = this.impl;

      var annotation = context.getAnnotation(impl);
      if (annotation) {
        for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          typeInstances[_key2 - 1] = arguments[_key2];
        }

        var expected = annotation.unwrap.apply(annotation, toConsumableArray(typeInstances));
        return compareTypes(input, expected);
      } else if (input instanceof GenericType && (input.impl === impl || impl && impl.isPrototypeOf(input.impl))) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: "unwrap",
    value: function unwrap() {
      var context = this.context,
          impl = this.impl;

      if (typeof impl !== "function") {
        return this;
      }
      var annotation = context.getAnnotation(impl);
      if (annotation != null) {
        return annotation.unwrap.apply(annotation, arguments);
      } else {
        return this;
      }
    }
  }, {
    key: "inferTypeParameters",
    value: function inferTypeParameters(input) {
      return [];
    }
  }]);
  return GenericType;
}(TypeConstructor);

function invariant(input, message) {
  if (!input) {
    var error = new Error(message);
    error.name = 'InvariantViolation';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(error, invariant);
    }
    throw error;
  }
}

var NullLiteralType = function (_Type) {
  inherits(NullLiteralType, _Type);

  function NullLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NullLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NullLiteralType.__proto__ || Object.getPrototypeOf(NullLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NullLiteralType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (input !== null) {
        yield [path, getErrorMessage('ERR_EXPECT_NULL'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === null;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NullLiteralType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'null';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return NullLiteralType;
}(Type);

var VoidType = function (_Type) {
  inherits(VoidType, _Type);

  function VoidType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, VoidType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = VoidType.__proto__ || Object.getPrototypeOf(VoidType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VoidType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(VoidType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (input !== undefined) {
        yield [path, getErrorMessage('ERR_EXPECT_VOID'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === undefined;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof VoidType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'void';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return VoidType;
}(Type);

var NullableType = function (_Type) {
  inherits(NullableType, _Type);

  function NullableType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NullableType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NullableType.__proto__ || Object.getPrototypeOf(NullableType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NullableType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NullableType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (input != null) {
        yield* this.type.errors(validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input == null) {
        return true;
      } else {
        return this.type.accepts(input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NullLiteralType || input instanceof VoidType) {
        return 1;
      } else if (input instanceof NullableType) {
        return compareTypes(this.type, input.type);
      } else {
        var result = compareTypes(this.type, input);
        if (result === -1) {
          return -1;
        } else {
          return 1;
        }
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `? ${this.type.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return NullableType;
}(Type);

var ObjectTypeProperty = function (_Type) {
  inherits(ObjectTypeProperty, _Type);

  function ObjectTypeProperty() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeProperty.__proto__ || Object.getPrototypeOf(ObjectTypeProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeProperty', _this['static'] = false, _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }
  // Ignore


  createClass(ObjectTypeProperty, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }

    /**
     * Determine whether the property is nullable.
     */

  }, {
    key: 'isNullable',
    value: function isNullable() {
      return this.value instanceof NullableType;
    }

    /**
     * Determine whether the property exists on the given input or its prototype chain.
     */

  }, {
    key: 'existsOn',
    value: function existsOn(input) {
      // Ignore
      var key = this.key,
          isStatic = this.static;

      return key in (isStatic ? input.constructor : input) === true;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      // Ignore
      var optional = this.optional,
          key = this.key,
          value = this.value,
          isStatic = this.static;

      var target = void 0;
      var targetPath = void 0;
      if (isStatic) {
        if (input === null || typeof input !== 'object' && typeof input !== 'function') {
          yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
          return;
        }
        targetPath = path.concat('constructor');
        if (typeof input.constructor !== 'function') {
          if (!optional) {
            yield [targetPath, getErrorMessage('ERR_EXPECT_FUNCTION'), this];
          }
          return;
        }
        targetPath.push(key);
        target = input.constructor[key];
      } else {
        target = input[key];
        targetPath = path.concat(key);
      }
      if (optional && target === undefined) {
        return;
      }
      if (this.isNullable() && !this.existsOn(input)) {
        yield [targetPath, getErrorMessage('ERR_MISSING_PROPERTY'), this];
        return;
      }
      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = value.errors(validation, targetPath, target)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          hasErrors = true;
          yield error;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasErrors) {
        yield* collectConstraintErrors(this, validation, targetPath, target);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      // Ignore
      var optional = this.optional,
          key = this.key,
          value = this.value,
          isStatic = this.static;

      var target = void 0;
      if (isStatic) {
        if (input === null || typeof input !== 'object' && typeof input !== 'function') {
          return false;
        }
        if (typeof input.constructor !== 'function') {
          return optional ? true : false;
        }
        target = input.constructor[key];
      } else {
        target = input[key];
      }

      if (optional && target === undefined) {
        return true;
      }

      if (this.isNullable() && !this.existsOn(input)) {
        return false;
      }

      if (!value.accepts(target)) {
        return false;
      } else {
        return constraintsAccept(this, target);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectTypeProperty)) {
        return -1;
      } else if (input.key !== this.key) {
        return -1;
      } else {
        return compareTypes(this.value, input.value);
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      var key = this.key;
      // Issue 252
      if (typeof key === 'symbol') {
        key = `[${key.toString()}]`;
      }
      if (this.static) {
        return `static ${key}${this.optional ? '?' : ''}: ${this.value.toString()};`;
      } else {
        return `${key}${this.optional ? '?' : ''}: ${this.value.toString()};`;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        key: this.key,
        value: this.value,
        optional: this.optional
      };
    }
  }]);
  return ObjectTypeProperty;
}(Type);

var ObjectTypeIndexer = function (_Type) {
  inherits(ObjectTypeIndexer, _Type);

  function ObjectTypeIndexer() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeIndexer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeIndexer.__proto__ || Object.getPrototypeOf(ObjectTypeIndexer)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeIndexer', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ObjectTypeIndexer, [{
    key: 'errors',
    value: function* errors(validation, path, key, value) {
      // special case number types
      if (this.key.typeName === 'NumberType' || this.key.typeName === 'NumericLiteralType') {
        key = +key;
      }

      yield* this.key.errors(validation, path.concat('[[Key]]'), key);
      yield* this.value.errors(validation, path.concat(key), value);
    }
  }, {
    key: 'accepts',
    value: function accepts(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'acceptsKey',
    value: function acceptsKey(key) {
      // special case number types
      if (this.key.typeName === 'NumberType' || this.key.typeName === 'NumericLiteralType') {
        key = +key;
      }
      return this.key.accepts(key);
    }
  }, {
    key: 'acceptsValue',
    value: function acceptsValue(value) {
      return this.value.accepts(value);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof ObjectTypeProperty) {
        if (!this.key.accepts(input.key)) {
          return -1;
        } else {
          return compareTypes(this.value, input.value);
        }
      } else if (!(input instanceof ObjectTypeIndexer)) {
        return -1;
      }

      var keyResult = compareTypes(this.key, input.key);
      if (keyResult === -1) {
        return -1;
      }
      var valueResult = compareTypes(this.value, input.value);
      if (valueResult === -1) {
        return -1;
      }

      if (keyResult === 0 && valueResult === 0) {
        return 0;
      } else {
        return 1;
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `[${this.id}: ${this.key.toString()}]: ${this.value.toString()};`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        id: this.id,
        key: this.key,
        value: this.value
      };
    }
  }]);
  return ObjectTypeIndexer;
}(Type);

var ObjectTypeCallProperty = function (_Type) {
  inherits(ObjectTypeCallProperty, _Type);

  function ObjectTypeCallProperty() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectTypeCallProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectTypeCallProperty.__proto__ || Object.getPrototypeOf(ObjectTypeCallProperty)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectTypeCallProperty', _this['static'] = false, _temp), possibleConstructorReturn(_this, _ret);
  }
  // Ignore


  createClass(ObjectTypeCallProperty, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      // Ignore
      var value = this.value,
          isStatic = this.static;


      var target = void 0;
      var targetPath = void 0;
      if (isStatic) {
        if (input === null || typeof input !== 'object' && typeof input !== 'function') {
          yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
          return;
        }
        targetPath = path.concat('constructor');
        if (typeof input.constructor !== 'function') {
          yield [targetPath, getErrorMessage('ERR_EXPECT_FUNCTION'), this];
          return;
        }
        target = input.constructor;
      } else {
        target = input;
        targetPath = path;
      }
      yield* value.errors(validation, targetPath, target);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      // Ignore
      var value = this.value,
          isStatic = this.static;

      var target = void 0;
      if (isStatic) {
        if (input === null || typeof input !== 'object' && typeof input !== 'function') {
          return false;
        }
        if (typeof input.constructor !== 'function') {
          return false;
        }
        target = input.constructor;
      } else {
        target = input;
      }
      return value.accepts(target);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectTypeCallProperty)) {
        return -1;
      }
      return compareTypes(this.value, input.value);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.value.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this.static) {
        return `static ${this.value.toString()};`;
      } else {
        return this.value.toString();
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return ObjectTypeCallProperty;
}(Type);

var Declaration = function (_Type) {
  inherits(Declaration, _Type);

  function Declaration() {
    classCallCheck(this, Declaration);
    return possibleConstructorReturn(this, (Declaration.__proto__ || Object.getPrototypeOf(Declaration)).apply(this, arguments));
  }

  return Declaration;
}(Type);

var VarDeclaration = function (_Declaration) {
  inherits(VarDeclaration, _Declaration);

  function VarDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, VarDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = VarDeclaration.__proto__ || Object.getPrototypeOf(VarDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'VarDeclaration', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(VarDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;

      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = type.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          hasErrors = true;
          yield error;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasErrors) {
        yield* collectConstraintErrors(this, validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `declare var ${this.name}: ${this.type.toString()};`;
    }
  }]);
  return VarDeclaration;
}(Declaration);

var TypeDeclaration = function (_Declaration) {
  inherits(TypeDeclaration, _Declaration);

  function TypeDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeDeclaration.__proto__ || Object.getPrototypeOf(TypeDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeDeclaration, [{
    key: 'addConstraint',
    value: function addConstraint() {
      var _typeAlias;

      (_typeAlias = this.typeAlias).addConstraint.apply(_typeAlias, arguments);
      return this;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.typeAlias.errors(validation, path, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var _typeAlias2;

      return (_typeAlias2 = this.typeAlias).apply.apply(_typeAlias2, arguments);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.typeAlias.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.typeAlias, input);
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var _typeAlias3;

      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 1] = arguments[_key2];
      }

      return (_typeAlias3 = this.typeAlias).hasProperty.apply(_typeAlias3, [name].concat(toConsumableArray(typeInstances)));
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var _typeAlias4;

      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return (_typeAlias4 = this.typeAlias).getProperty.apply(_typeAlias4, [name].concat(toConsumableArray(typeInstances)));
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _typeAlias5;

      return (_typeAlias5 = this.typeAlias).unwrap.apply(_typeAlias5, arguments);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `declare ${this.typeAlias.toString(true)};`;
    }
  }, {
    key: 'type',
    get: function get$$1() {
      return this.typeAlias.type;
    }
  }]);
  return TypeDeclaration;
}(Declaration);

var ModuleDeclaration = function (_Declaration) {
  inherits(ModuleDeclaration, _Declaration);

  function ModuleDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ModuleDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ModuleDeclaration.__proto__ || Object.getPrototypeOf(ModuleDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ModuleDeclaration, [{
    key: 'get',
    value: function get$$1(name) {
      var moduleExports = this.moduleExports;

      if (moduleExports) {
        var exporting = moduleExports.unwrap();
        if (typeof exporting.getProperty === 'function') {
          var prop = exporting.getProperty(name);
          if (prop) {
            return prop.unwrap();
          }
        }
      } else {
        var declaration = this.declarations[name];
        if (declaration) {
          return declaration.unwrap();
        }
      }
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      // Can't validate a module directly.
      // @todo should this throw?
    }
  }, {
    key: 'import',
    value: function _import(moduleName) {
      if (/^\.\//.test(moduleName)) {
        moduleName = `${this.name}${moduleName.slice(1)}`;
      }
      return this.innerContext.import(moduleName);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var name = this.name,
          declarations = this.declarations,
          modules = this.modules,
          moduleExports = this.moduleExports;

      var body = [];
      for (var _name in declarations) {
        // eslint-disable-line guard-for-in
        var declaration = declarations[_name];
        body.push(declaration.toString(true));
      }
      if (modules) {
        for (var _name2 in modules) {
          // eslint-disable-line guard-for-in
          var module = modules[_name2];
          body.push(module.toString());
        }
      }
      if (moduleExports) {
        body.push(moduleExports.toString());
      }
      return `declare module "${name}" {\n${indent$1(body.join('\n\n'))}}`;
    }
  }, {
    key: 'moduleType',
    get: function get$$1() {
      if (this.moduleExports) {
        return 'commonjs';
      } else {
        return 'es6';
      }
    }
  }, {
    key: 'isCommonJS',
    get: function get$$1() {
      return this.moduleExports ? true : false;
    }
  }, {
    key: 'isES6',
    get: function get$$1() {
      return this.moduleExports ? false : true;
    }
  }, {
    key: 'declarations',
    get: function get$$1() {
      var innerContext = this.innerContext;

      return innerContext[NameRegistrySymbol];
    }
  }, {
    key: 'modules',
    get: function get$$1() {
      var innerContext = this.innerContext;

      return innerContext[ModuleRegistrySymbol];
    }
  }]);
  return ModuleDeclaration;
}(Declaration);

function indent$1(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = `  ${lines[i]}`;
  }
  return lines.join('\n');
}

var ModuleExports = function (_Declaration) {
  inherits(ModuleExports, _Declaration);

  function ModuleExports() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ModuleExports);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ModuleExports.__proto__ || Object.getPrototypeOf(ModuleExports)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ModuleExports', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ModuleExports, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(validation, path, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `declare module.exports: ${this.type.toString()};`;
    }
  }]);
  return ModuleExports;
}(Declaration);

var ClassDeclaration = function (_Declaration) {
  inherits(ClassDeclaration, _Declaration);

  function ClassDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ClassDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ClassDeclaration.__proto__ || Object.getPrototypeOf(ClassDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ClassDeclaration', _this.shapeID = Symbol(), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ClassDeclaration, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var body = this.body;

      var superClass = this.superClass && this.superClass.unwrap();
      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', this.name), this];
        return;
      }
      if (superClass) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = superClass.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;

            var _ref3 = slicedToArray(_ref2, 3);

            var errorPath = _ref3[0];
            var errorMessage = _ref3[1];
            var expectedType = _ref3[2];

            var propertyName = errorPath[path.length];
            if (body.getProperty(propertyName)) {
              continue;
            } else {
              yield [errorPath, errorMessage, expectedType];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      yield* body.errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var body = this.body;

      var superClass = this.superClass && this.superClass.unwrap();
      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        return false;
      } else if (superClass && !superClass.accepts(input)) {
        return false;
      } else if (!body.accepts(input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof ClassDeclaration) {
        if (input === this) {
          return 0;
        } else if (this.isSuperClassOf(input)) {
          return 1;
        } else {
          return -1;
        }
      }
      return compareTypes(this.body, input);
    }

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      var prop = body.getProperty(key);
      if (prop) {
        return prop;
      } else if (superClass && typeof superClass.getProperty === 'function') {
        return superClass.getProperty(key);
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var body = this.body,
          superClass = this.superClass;

      if (body.hasProperty(key)) {
        return true;
      } else if (superClass && typeof superClass.hasProperty === 'function') {
        return superClass.hasProperty(key);
      } else {
        return false;
      }
    }

    /**
     * Determine whether this class declaration represents a super class of
     * the given type.
     */

  }, {
    key: 'isSuperClassOf',
    value: function isSuperClassOf(candidate) {
      var body = this.body,
          shapeID = this.shapeID;

      var current = candidate;

      while (current != null) {
        if (current === this || current === body || current.shapeID === shapeID) {
          return true;
        }
        if (current instanceof ClassDeclaration) {
          current = current.superClass;
        } else {
          current = current.unwrap();
        }
      }
      return false;
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var name = this.name,
          superClass = this.superClass,
          body = this.body;

      if (withDeclaration) {
        var superClassName = superClass && (typeof superClass.name === 'string' && superClass.name || superClass.toString());
        return `declare class ${name}${superClassName ? ` extends ${superClassName}` : ''} ${body.toString()}`;
      } else {
        return name;
      }
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      var body = this.body,
          superClass = this.superClass;

      if (superClass == null) {
        return body.properties;
      }
      var bodyProps = body.properties;
      var superProps = superClass.unwrap().properties;
      if (superProps == null) {
        return bodyProps;
      }
      var seen = {};
      var seenStatic = {};
      var props = [];
      for (var i = 0; i < superProps.length; i++) {
        var prop = superProps[i];
        props.push(prop);
        if (prop.static) {
          seenStatic[prop.key] = i;
        } else {
          seen[prop.key] = i;
        }
      }
      for (var _i = 0; _i < bodyProps.length; _i++) {
        var _prop = bodyProps[_i];
        if (seen[_prop.key]) {
          props[_i] = _prop;
        } else {
          props.push(_prop);
        }
      }
      return props;
    }
  }]);
  return ClassDeclaration;
}(Declaration);

var PartialType = function (_Type) {
  inherits(PartialType, _Type);

  function PartialType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, PartialType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = PartialType.__proto__ || Object.getPrototypeOf(PartialType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'PartialType', _this.typeParameters = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(PartialType, [{
    key: 'typeParameter',
    value: function typeParameter(id, bound, defaultType) {
      var target = new TypeParameter(this.context);
      target.id = id;
      target.bound = bound;
      target.default = defaultType;
      this.typeParameters.push(target);
      return target;
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      var constraints = this.constraints,
          type = this.type;

      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = type.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          hasErrors = true;
          yield error;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasErrors && constraints) {
        yield* collectConstraintErrors(this, validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var constraints = this.constraints,
          type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (constraints && !constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0;
      } else {
        return compareTypes(this.type, input);
      }
    }
  }, {
    key: 'toString',
    value: function toString(expand) {
      var type = this.type;

      return type.toString(expand);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        typeParameters: this.typeParameters,
        type: this.type
      };
    }
  }]);
  return PartialType;
}(Type);

var ParameterizedClassDeclaration = function (_Declaration) {
  inherits(ParameterizedClassDeclaration, _Declaration);

  function ParameterizedClassDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedClassDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedClassDeclaration.__proto__ || Object.getPrototypeOf(ParameterizedClassDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedClassDeclaration', _this.shapeID = Symbol(), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedClassDeclaration, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      yield* getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return getPartial(this).compareWith(input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len4 = arguments.length, typeInstances = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        typeInstances[_key4] = arguments[_key4];
      }

      return getPartial.apply(undefined, [this].concat(toConsumableArray(typeInstances))).type;
    }
  }, {
    key: 'isSuperClassOf',
    value: function isSuperClassOf(candidate) {
      return getPartial(this).type.isSuperClassOf(candidate);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len5 = arguments.length, typeInstances = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        typeInstances[_key5] = arguments[_key5];
      }

      target.typeInstances = typeInstances;
      return target;
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      if (!withDeclaration) {
        return this.name;
      }
      var partial = getPartial(this);
      var type = partial.type,
          typeParameters = partial.typeParameters;

      if (typeParameters.length === 0) {
        return partial.toString(true);
      }
      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      var superClass = type.superClass,
          body = type.body;

      var superClassName = superClass && (typeof superClass.name === 'string' && superClass.name || superClass.toString());
      return `declare class ${this.name}<${items.join(', ')}>${superClassName ? ` extends ${superClassName}` : ''} ${body.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return getPartial(this).toJSON();
    }
  }, {
    key: 'superClass',
    get: function get$$1() {
      return getPartial(this).type.superClass;
    }
  }, {
    key: 'body',
    get: function get$$1() {
      return getPartial(this).type.body;
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return getPartial(this).type.properties;
    }
  }, {
    key: 'typeParameters',
    get: function get$$1() {
      return getPartial(this).typeParameters;
    }
  }]);
  return ParameterizedClassDeclaration;
}(Declaration);

function getPartial(parent) {
  var context = parent.context,
      bodyCreator = parent.bodyCreator;

  var partial = new PartialType(context);
  var body = bodyCreator(partial);
  if (Array.isArray(body)) {
    partial.type = context.class.apply(context, [parent.name].concat(toConsumableArray(body)));
  } else {
    partial.type = context.class(parent.name, body);
  }

  partial.type.shapeID = parent.shapeID;

  var typeParameters = partial.typeParameters;

  for (var _len6 = arguments.length, typeInstances = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    typeInstances[_key6 - 1] = arguments[_key6];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var ExtendsDeclaration = function (_Declaration) {
  inherits(ExtendsDeclaration, _Declaration);

  function ExtendsDeclaration() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ExtendsDeclaration);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ExtendsDeclaration.__proto__ || Object.getPrototypeOf(ExtendsDeclaration)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ExtendsDeclaration', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ExtendsDeclaration, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(validation, path, input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var type = this.type;

      if (withDeclaration) {
        return `extends ${type.toString()}`;
      } else {
        return type.toString();
      }
    }
  }]);
  return ExtendsDeclaration;
}(Declaration);

var ObjectType = function (_Type) {
  inherits(ObjectType, _Type);

  function ObjectType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ObjectType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ObjectType.__proto__ || Object.getPrototypeOf(ObjectType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ObjectType', _this.properties = [], _this.indexers = [], _this.callProperties = [], _this.exact = false, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ObjectType, [{
    key: 'getProperty',


    /**
     * Get a property with the given name, or undefined if it does not exist.
     */
    value: function getProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return property;
        }
      }
      return this.getIndexer(key);
    }
  }, {
    key: 'setProperty',
    value: function setProperty(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var context = this.context,
          properties = this.properties;
      var length = properties.length;

      var newProp = new ObjectTypeProperty(context);
      newProp.key = key;
      newProp.value = value;
      newProp.optional = optional;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          properties[i] = newProp;
          return;
        }
      }
      properties.push(newProp);
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var properties = this.properties;
      var length = properties.length;

      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.key === key) {
          return true;
        }
      }
      return this.hasIndexer(key);
    }

    /**
     * Get an indexer with which matches the given key type.
     */

  }, {
    key: 'getIndexer',
    value: function getIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return indexer;
        }
      }
    }

    /**
     * Determine whether an indexer exists which matches the given key type.
     */

  }, {
    key: 'hasIndexer',
    value: function hasIndexer(key) {
      var indexers = this.indexers;
      var length = indexers.length;

      for (var i = 0; i < length; i++) {
        var indexer = indexers[i];
        if (indexer.acceptsKey(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (input === null) {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }

      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties) {
        if (!acceptsCallProperties(this, input)) {
          yield [path, getErrorMessage('ERR_EXPECT_CALLABLE'), this];
        }
      } else if (typeof input !== 'object') {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }

      if (validation.inCycle(this, input)) {
        return;
      }
      validation.startCycle(this, input);

      if (this.indexers.length > 0) {
        if (input instanceof Object && Array.isArray(input)) {
          yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
          return;
        }
        yield* collectErrorsWithIndexers(this, validation, path, input);
      } else {
        yield* collectErrorsWithoutIndexers(this, validation, path, input);
      }
      if (this.exact) {
        yield* collectErrorsExact(this, validation, path, input);
      }
      validation.endCycle(this, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      if (input === null) {
        return false;
      }
      var hasCallProperties = this.callProperties.length > 0;

      if (hasCallProperties) {
        if (!acceptsCallProperties(this, input)) {
          return false;
        }
      } else if (typeof input !== 'object') {
        return false;
      }
      if (inValidationCycle(this, input)) {
        return true;
      }
      startValidationCycle(this, input);

      var result = void 0;
      if (this.indexers.length > 0) {
        result = acceptsWithIndexers(this, input);
      } else {
        result = acceptsWithoutIndexers(this, input);
      }
      if (result && this.exact) {
        result = acceptsExact(this, input);
      }
      endValidationCycle(this, input);
      return result;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ObjectType || input instanceof ClassDeclaration || input instanceof ParameterizedClassDeclaration)) {
        return -1;
      }
      var hasCallProperties = this.callProperties.length > 0;

      var isGreater = false;
      if (hasCallProperties) {
        var _result = compareTypeCallProperties(this, input);
        if (_result === -1) {
          return -1;
        } else if (_result === 1) {
          isGreater = true;
        }
      }

      var result = void 0;
      if (this.indexers.length > 0) {
        result = compareTypeWithIndexers(this, input);
      } else {
        result = compareTypeWithoutIndexers(this, input);
      }

      if (result === -1) {
        return -1;
      } else if (isGreater) {
        return 1;
      } else {
        return result;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var callProperties = this.callProperties,
          properties = this.properties,
          indexers = this.indexers;

      if (inToStringCycle(this)) {
        return '$Cycle<Object>';
      }
      startToStringCycle(this);
      var body = [];
      for (var i = 0; i < callProperties.length; i++) {
        body.push(callProperties[i].toString());
      }
      for (var _i = 0; _i < properties.length; _i++) {
        body.push(properties[_i].toString());
      }
      for (var _i2 = 0; _i2 < indexers.length; _i2++) {
        body.push(indexers[_i2].toString());
      }
      endToStringCycle(this);
      if (this.exact) {
        return `{|\n${indent(body.join('\n'))}\n|}`;
      } else {
        return `{\n${indent(body.join('\n'))}\n}`;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        callProperties: this.callProperties,
        properties: this.properties,
        indexers: this.indexers,
        exact: this.exact
      };
    }
  }]);
  return ObjectType;
}(Type);

function acceptsCallProperties(type, input) {
  var callProperties = type.callProperties;

  for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];
    if (callProperty.accepts(input)) {
      return true;
    }
  }
  return false;
}

function compareTypeCallProperties(type, input) {
  var callProperties = type.callProperties;

  var inputCallProperties = input.callProperties;
  var identicalCount = 0;
  loop: for (var i = 0; i < callProperties.length; i++) {
    var callProperty = callProperties[i];

    for (var j = 0; j < inputCallProperties.length; j++) {
      var inputCallProperty = inputCallProperties[j];
      var result = compareTypes(callProperty, inputCallProperty);
      if (result === 0) {
        identicalCount++;
        continue loop;
      } else if (result === 1) {
        continue loop;
      }
    }
    // If we got this far, nothing accepted.
    return -1;
  }
  if (identicalCount === callProperties.length) {
    return 0;
  } else {
    return 1;
  }
}

function acceptsWithIndexers(type, input) {
  var properties = type.properties,
      indexers = type.indexers;

  var seen = [];
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
    seen.push(property.key);
  }
  loop: for (var key in input) {
    if (seen.indexOf(key) !== -1) {
      continue;
    }
    var value = input[key];
    for (var _i3 = 0; _i3 < indexers.length; _i3++) {
      var indexer = indexers[_i3];
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop;
      }
    }

    // if we got this far the key / value did not accepts any indexers.
    return false;
  }
  return true;
}

function compareTypeWithIndexers(type, input) {
  var indexers = type.indexers,
      properties = type.properties;

  var inputIndexers = input.indexers;
  var inputProperties = input.properties;
  var isGreater = false;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        var result = compareTypes(property, inputProperty);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
        continue loop;
      }
    }
  }
  loop: for (var _i4 = 0; _i4 < indexers.length; _i4++) {
    var indexer = indexers[_i4];
    for (var _j = 0; _j < inputIndexers.length; _j++) {
      var inputIndexer = inputIndexers[_j];
      var _result2 = compareTypes(indexer, inputIndexer);
      if (_result2 === 1) {
        isGreater = true;
        continue loop;
      } else if (_result2 === 0) {
        continue loop;
      }
    }
    // if we got this far, nothing accepted
    return -1;
  }
  return isGreater ? 1 : 0;
}

function acceptsWithoutIndexers(type, input) {
  var properties = type.properties;

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (!property.accepts(input)) {
      return false;
    }
  }
  return true;
}

function acceptsExact(type, input) {
  var properties = type.properties;

  var _loop = function _loop(key) {
    // eslint-disable-line guard-for-in
    if (!properties.some(function (property) {
      return property.key === key;
    })) {
      return {
        v: false
      };
    }
  };

  for (var key in input) {
    var _ret2 = _loop(key);

    if (typeof _ret2 === "object") return _ret2.v;
  }
  return true;
}

function compareTypeWithoutIndexers(type, input) {
  var properties = type.properties;

  var inputProperties = input.properties;
  var isGreater = false;
  loop: for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    for (var j = 0; j < inputProperties.length; j++) {
      var inputProperty = inputProperties[j];
      if (inputProperty.key === property.key) {
        var result = compareTypes(property.value, inputProperty.value);
        if (result === -1) {
          return -1;
        } else if (result === 1) {
          isGreater = true;
        }
        continue loop;
      }
    }
    return -1;
  }
  return isGreater ? 1 : 0;
}

function* collectErrorsWithIndexers(type, validation, path, input) {
  var properties = type.properties,
      indexers = type.indexers;

  var seen = [];
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    yield* property.errors(validation, path, input);
    seen.push(property.key);
  }
  loop: for (var key in input) {
    if (seen.indexOf(key) !== -1) {
      continue;
    }
    var value = input[key];
    for (var _i5 = 0; _i5 < indexers.length; _i5++) {
      var indexer = indexers[_i5];
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop;
      }
    }

    // if we got this far the key / value was not accepted by any indexers.
    yield [path.concat(key), getErrorMessage('ERR_NO_INDEXER'), type];
  }
}

function* collectErrorsWithoutIndexers(type, validation, path, input) {
  var properties = type.properties;

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    yield* property.errors(validation, path, input);
  }
}

function* collectErrorsExact(type, validation, path, input) {
  var properties = type.properties;

  var _loop2 = function* _loop2(key) {
    // eslint-disable-line guard-for-in
    if (!properties.some(function (property) {
      return property.key === key;
    })) {
      yield [path, getErrorMessage('ERR_UNKNOWN_KEY', key), type];
    }
  };

  for (var key in input) {
    yield* _loop2(key);
  }
}

function indent(input) {
  var lines = input.split('\n');
  var length = lines.length;

  for (var i = 0; i < length; i++) {
    lines[i] = `  ${lines[i]}`;
  }
  return lines.join('\n');
}

var IntersectionType = function (_Type) {
  inherits(IntersectionType, _Type);

  function IntersectionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, IntersectionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = IntersectionType.__proto__ || Object.getPrototypeOf(IntersectionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'IntersectionType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(IntersectionType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        yield* types[i].errors(validation, path, input);
      }
    }

    /**
     * Get a property with the given name, or undefined if it does not exist.
     */

  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = length - 1; i >= 0; i--) {
        var type = types[i];
        if (typeof type.getProperty === 'function') {
          var prop = type.getProperty(key);
          if (prop) {
            return prop;
          }
        }
      }
    }

    /**
     * Determine whether a property with the given name exists.
     */

  }, {
    key: 'hasProperty',
    value: function hasProperty(key) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (typeof type.hasProperty === 'function' && type.hasProperty(key)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (!type.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var types = this.types;
      var identicalCount = 0;
      if (input instanceof IntersectionType) {
        var inputTypes = input.types;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            var result = compareTypes(type, inputTypes[i]);
            if (result === 0) {
              identicalCount++;
              continue loop;
            } else if (result === 1) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return -1;
        }
        return identicalCount === types.length ? 0 : 1;
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          var _result = compareTypes(_type, input);
          if (_result === -1) {
            return -1;
          } else if (_result === 0) {
            identicalCount++;
          }
        }
        return identicalCount === types.length ? 0 : 1;
      }
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _ref2;

      var callProperties = [];
      var properties = [];
      var indexers = [];
      var types = this.types,
          context = this.context;

      for (var i = 0; i < types.length; i++) {
        var type = types[i].unwrap();
        invariant(type instanceof ObjectType, 'Can only intersect object types');
        callProperties.push.apply(callProperties, toConsumableArray(type.callProperties));
        indexers.push.apply(indexers, toConsumableArray(type.indexers));
        mergeProperties(properties, type.properties);
      }
      return (_ref2 = context).object.apply(_ref2, callProperties.concat(properties, indexers));
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.types.join(' & ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return IntersectionType;
}(Type);

function getPropertyIndex(name, properties) {
  for (var i = 0; i < properties.length; i++) {
    if (properties[i].name === name) {
      return i;
    }
  }
  return -1;
}

function mergeProperties(target, source) {
  for (var i = 0; i < source.length; i++) {
    var typeProp = source[i];
    var index = getPropertyIndex(typeProp.key, target);
    if (index === -1) {
      target.push(typeProp);
    } else {
      target[index] = typeProp;
    }
  }
  return target;
}

var MixedType = function (_Type) {
  inherits(MixedType, _Type);

  function MixedType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, MixedType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = MixedType.__proto__ || Object.getPrototypeOf(MixedType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'MixedType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(MixedType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {}
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'mixed';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return MixedType;
}(Type);

var NumericLiteralType = function (_Type) {
  inherits(NumericLiteralType, _Type);

  function NumericLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NumericLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NumericLiteralType.__proto__ || Object.getPrototypeOf(NumericLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumericLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NumericLiteralType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var value = this.value;

      if (input !== value) {
        yield [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', value), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NumericLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `${this.value}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return NumericLiteralType;
}(Type);

var NumberType = function (_Type) {
  inherits(NumberType, _Type);

  function NumberType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NumberType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NumberType.__proto__ || Object.getPrototypeOf(NumberType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'NumberType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NumberType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (typeof input !== 'number') {
        yield [path, getErrorMessage('ERR_EXPECT_NUMBER'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'number';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof NumberType) {
        return 0;
      } else if (input instanceof NumericLiteralType) {
        return 1;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'number';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return NumberType;
}(Type);

var ParameterizedTypeAlias = function (_TypeAlias) {
  inherits(ParameterizedTypeAlias, _TypeAlias);

  function ParameterizedTypeAlias() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedTypeAlias);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedTypeAlias.__proto__ || Object.getPrototypeOf(ParameterizedTypeAlias)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedTypeAlias', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedTypeAlias, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      yield* getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      var partial = getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances)));
      if (!partial.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0; // should never need this because it's taken care of by compareTypes.
      } else if (this.hasConstraints) {
        // if we have constraints the types cannot be the same
        return -1;
      } else {
        return compareTypes(getPartial$1(this), input);
      }
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      for (var _len4 = arguments.length, typeInstances = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        typeInstances[_key4 - 1] = arguments[_key4];
      }

      var inner = this.unwrap.apply(this, toConsumableArray(typeInstances));
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty.apply(inner, [name].concat(toConsumableArray(typeInstances)));
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      for (var _len5 = arguments.length, typeInstances = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        typeInstances[_key5 - 1] = arguments[_key5];
      }

      var inner = this.unwrap.apply(this, toConsumableArray(typeInstances));
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty.apply(inner, [name].concat(toConsumableArray(typeInstances)));
      }
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len6 = arguments.length, typeInstances = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        typeInstances[_key6] = arguments[_key6];
      }

      return getPartial$1.apply(undefined, [this].concat(toConsumableArray(typeInstances))).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString(withDeclaration) {
      var partial = getPartial$1(this);
      var typeParameters = partial.typeParameters;

      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }

      var name = this.name;

      var identifier = typeParameters.length > 0 ? `${name}<${items.join(', ')}>` : name;

      if (withDeclaration) {
        return `type ${identifier} = ${partial.toString()};`;
      } else {
        return identifier;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = getPartial$1(this);
      return partial.toJSON();
    }
  }, {
    key: 'properties',
    get: function get$$1() {
      return getPartial$1(this).type.properties;
    }
  }]);
  return ParameterizedTypeAlias;
}(TypeAlias);

function getPartial$1(parent) {
  var typeCreator = parent.typeCreator,
      context = parent.context,
      name = parent.name;

  var partial = new PartialType(context);
  partial.name = name;
  partial.type = typeCreator(partial);
  partial.constraints = parent.constraints;

  var typeParameters = partial.typeParameters;

  for (var _len7 = arguments.length, typeInstances = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    typeInstances[_key7 - 1] = arguments[_key7];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var ParameterizedFunctionType = function (_Type) {
  inherits(ParameterizedFunctionType, _Type);

  function ParameterizedFunctionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ParameterizedFunctionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ParameterizedFunctionType.__proto__ || Object.getPrototypeOf(ParameterizedFunctionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ParameterizedFunctionType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ParameterizedFunctionType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      for (var _len2 = arguments.length, typeInstances = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        typeInstances[_key2 - 3] = arguments[_key2];
      }

      yield* getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      for (var _len3 = arguments.length, typeInstances = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        typeInstances[_key3 - 1] = arguments[_key3];
      }

      return getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(getPartial$2(this), input);
    }
  }, {
    key: 'acceptsParams',
    value: function acceptsParams() {
      var _getPartial$type;

      return (_getPartial$type = getPartial$2(this).type).acceptsParams.apply(_getPartial$type, arguments);
    }
  }, {
    key: 'acceptsReturn',
    value: function acceptsReturn(input) {
      return getPartial$2(this).type.acceptsReturn(input);
    }
  }, {
    key: 'assertParams',
    value: function assertParams() {
      var _getPartial$type2;

      return (_getPartial$type2 = getPartial$2(this).type).assertParams.apply(_getPartial$type2, arguments);
    }
  }, {
    key: 'assertReturn',
    value: function assertReturn(input) {
      return getPartial$2(this).type.assertReturn(input);
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      for (var _len4 = arguments.length, typeInstances = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        typeInstances[_key4] = arguments[_key4];
      }

      return getPartial$2.apply(undefined, [this].concat(toConsumableArray(typeInstances))).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      var partial = getPartial$2(this);
      var type = partial.type,
          typeParameters = partial.typeParameters;

      if (typeParameters.length === 0) {
        return type.toString();
      }
      var items = [];
      for (var i = 0; i < typeParameters.length; i++) {
        var typeParameter = typeParameters[i];
        items.push(typeParameter.toString(true));
      }
      return `<${items.join(', ')}> ${type.toString()}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var partial = getPartial$2(this);
      return partial.toJSON();
    }
  }, {
    key: 'typeParameters',
    get: function get$$1() {
      return getPartial$2(this).typeParameters;
    }
  }, {
    key: 'params',
    get: function get$$1() {
      return getPartial$2(this).type.params;
    }
  }, {
    key: 'rest',
    get: function get$$1() {
      return getPartial$2(this).type.rest;
    }
  }, {
    key: 'returnType',
    get: function get$$1() {
      return getPartial$2(this).type.returnType;
    }
  }]);
  return ParameterizedFunctionType;
}(Type);

function getPartial$2(parent) {
  var context = parent.context,
      bodyCreator = parent.bodyCreator;

  var partial = new PartialType(context);
  var body = bodyCreator(partial);
  partial.type = context.function.apply(context, toConsumableArray(body));

  var typeParameters = partial.typeParameters;

  for (var _len5 = arguments.length, typeInstances = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    typeInstances[_key5 - 1] = arguments[_key5];
  }

  var limit = Math.min(typeInstances.length, typeParameters.length);
  for (var i = 0; i < limit; i++) {
    var typeParameter = typeParameters[i];
    var typeInstance = typeInstances[i];
    if (typeParameter.bound && typeParameter.bound !== typeInstance) {
      // if the type parameter is already bound we need to
      // create an intersection type with this one.
      typeParameter.bound = context.intersect(typeParameter.bound, typeInstance);
    } else {
      typeParameter.bound = typeInstance;
    }
  }

  return partial;
}

var RefinementType = function (_Type) {
  inherits(RefinementType, _Type);

  function RefinementType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, RefinementType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = RefinementType.__proto__ || Object.getPrototypeOf(RefinementType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'RefinementType', _this.constraints = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(RefinementType, [{
    key: 'addConstraint',
    value: function addConstraint() {
      for (var _len2 = arguments.length, constraints = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        constraints[_key2] = arguments[_key2];
      }

      addConstraints.apply(undefined, [this].concat(toConsumableArray(constraints)));
      return this;
    }
  }, {
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;

      var hasErrors = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = type.errors(validation, path, input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var error = _step.value;

          hasErrors = true;
          yield error;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasErrors) {
        yield* collectConstraintErrors(this, validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (!type.accepts(input)) {
        return false;
      } else if (!constraintsAccept(this, input)) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input === this) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len3 = arguments.length, typeInstances = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        typeInstances[_key3] = arguments[_key3];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var type = this.type;

      return `$Refinment<${type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return RefinementType;
}(Type);

var StringLiteralType = function (_Type) {
  inherits(StringLiteralType, _Type);

  function StringLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, StringLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StringLiteralType.__proto__ || Object.getPrototypeOf(StringLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(StringLiteralType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var value = this.value;

      if (input !== value) {
        yield [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', this.toString()), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof StringLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return StringLiteralType;
}(Type);

var StringType = function (_Type) {
  inherits(StringType, _Type);

  function StringType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, StringType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StringType.__proto__ || Object.getPrototypeOf(StringType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'StringType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(StringType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      if (typeof input !== 'string') {
        yield [path, getErrorMessage('ERR_EXPECT_STRING'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'string';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof StringLiteralType) {
        return 1;
      } else if (input instanceof StringType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'string';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return StringType;
}(Type);

var SymbolLiteralType = function (_Type) {
  inherits(SymbolLiteralType, _Type);

  function SymbolLiteralType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, SymbolLiteralType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = SymbolLiteralType.__proto__ || Object.getPrototypeOf(SymbolLiteralType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolLiteralType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(SymbolLiteralType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var value = this.value;

      if (input !== value) {
        yield [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', this.toString()), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return input === this.value;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof SymbolLiteralType && input.value === this.value) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `typeof ${String(this.value)}`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        value: this.value
      };
    }
  }]);
  return SymbolLiteralType;
}(Type);

var SymbolType = function (_Type) {
  inherits(SymbolType, _Type);

  function SymbolType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, SymbolType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = SymbolType.__proto__ || Object.getPrototypeOf(SymbolType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'SymbolType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(SymbolType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      // Issue 252
      if (typeof input !== 'symbol') {
        yield [path, getErrorMessage('ERR_EXPECT_SYMBOL'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return typeof input === 'symbol';
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (input instanceof SymbolLiteralType) {
        return 1;
      } else if (input instanceof SymbolType) {
        return 0;
      } else {
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'Symbol';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return SymbolType;
}(Type);

/**
 * # ThisType
 * Captures a reference to a particular instance of a class or a value,
 * and uses that value to perform an identity check.
 * In the case that `this` is undefined, any value will be permitted.
 */

var ThisType = function (_Type) {
  inherits(ThisType, _Type);

  function ThisType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ThisType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ThisType.__proto__ || Object.getPrototypeOf(ThisType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ThisType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ThisType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var recorded = this.recorded;

      if (input === recorded) {
        return;
      } else if (typeof recorded === 'function' && input instanceof recorded) {
        return;
      } else if (recorded != null) {
        yield [path, getErrorMessage('ERR_EXPECT_THIS'), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var recorded = this.recorded;

      if (input === recorded) {
        return true;
      } else if (typeof recorded === 'function' && input instanceof recorded) {
        return true;
      } else if (recorded != null) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      if (!(input instanceof ThisType)) {
        return -1;
      } else if (input.recorded && this.recorded) {
        return input.recorded === this.recorded ? 0 : -1;
      } else if (this.recorded) {
        return 0;
      } else {
        return 1;
      }
    }

    /**
     * Get the inner type.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString(withBinding) {
      return 'this';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return ThisType;
}(Type);

var warnedInstances$1 = new WeakSet();

var TypeBox = function (_Type) {
  inherits(TypeBox, _Type);

  function TypeBox() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeBox.__proto__ || Object.getPrototypeOf(TypeBox)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeBox', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeBox, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this.type;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.type.toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.type.toJSON();
    }
  }, {
    key: 'name',
    get: function get$$1() {
      return this.type.name;
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var reveal = this.reveal;

      var type = reveal();
      if (!type) {
        if (!warnedInstances$1.has(this)) {
          this.context.emitWarningMessage('Failed to reveal boxed type.');
          warnedInstances$1.add(this);
        }
        return this.context.mixed();
      } else if (!(type instanceof Type)) {
        // we got a boxed reference to something like a class
        return this.context.ref(type);
      }
      return type;
    }
  }]);
  return TypeBox;
}(Type);

var warnedMissing = {};

var TypeReference = function (_Type) {
  inherits(TypeReference, _Type);

  function TypeReference() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeReference);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeReference.__proto__ || Object.getPrototypeOf(TypeReference)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeReference', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(TypeReference, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.type, input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = this;

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type.unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.name;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        name: this.name
      };
    }
  }, {
    key: 'type',
    get: function get$$1() {
      var context = this.context,
          name = this.name;

      var type = context.get(name);
      if (!type) {
        if (!warnedMissing[name]) {
          context.emitWarningMessage(`Cannot resolve type: ${name}`);
          warnedMissing[name] = true;
        }
        return context.any();
      }
      return type;
    }
  }]);
  return TypeReference;
}(Type);

var warnedInstances$2 = new WeakSet();

var RevealedName = Symbol('RevealedName');
var RevealedValue = Symbol('RevealedValue');

var TypeTDZ = function (_Type) {
  inherits(TypeTDZ, _Type);

  function TypeTDZ() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, TypeTDZ);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = TypeTDZ.__proto__ || Object.getPrototypeOf(TypeTDZ)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'TypeTDZ', _this[RevealedName] = undefined, _this[RevealedValue] = undefined, _temp), possibleConstructorReturn(_this, _ret);
  }

  // Issue 252


  // Issue 252


  createClass(TypeTDZ, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* getRevealed(this).errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return getRevealed(this).accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(getRevealed(this), input);
    }
  }, {
    key: 'apply',
    value: function apply() {
      var target = new TypeParameterApplication(this.context);
      target.parent = getRevealed(this);

      for (var _len2 = arguments.length, typeInstances = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeInstances[_key2] = arguments[_key2];
      }

      target.typeInstances = typeInstances;
      return target;
    }

    /**
     * Get the inner type or value.
     */

  }, {
    key: 'unwrap',
    value: function unwrap() {
      return getRevealed(this).unwrap();
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.hasProperty === 'function') {
        return inner.hasProperty(name);
      } else {
        return false;
      }
    }
  }, {
    key: 'getProperty',
    value: function getProperty(name) {
      var inner = this.unwrap();
      if (inner && typeof inner.getProperty === 'function') {
        return inner.getProperty(name);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return getRevealed(this).toString();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return getRevealed(this).toJSON();
    }
  }, {
    key: 'name',
    get: function get$$1() {
      var name = this[RevealedName];
      if (!name) {
        name = getRevealed(this).name;
      }
      return name;
    },
    set: function set$$1(value) {
      this[RevealedName] = value;
    }
  }]);
  return TypeTDZ;
}(Type);

function getRevealed(container) {
  var existing = container[RevealedValue];
  if (existing) {
    return existing;
  } else {
    var reveal = container.reveal;

    var type = reveal();
    if (!type) {
      if (!warnedInstances$2.has(container)) {
        var name = container[RevealedName];
        if (name) {
          container.context.emitWarningMessage(`Failed to reveal type called "${name}" in Temporal Dead Zone.`);
        } else {
          container.context.emitWarningMessage('Failed to reveal unknown type in Temporal Dead Zone.');
        }
        warnedInstances$2.add(container);
      }
      return container.context.mixed();
    } else if (!(type instanceof Type)) {
      // we got a boxed reference to something like a class
      return container.context.ref(type);
    }
    return type;
  }
}

var UnionType = function (_Type) {
  inherits(UnionType, _Type);

  function UnionType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, UnionType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = UnionType.__proto__ || Object.getPrototypeOf(UnionType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'UnionType', _this.types = [], _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(UnionType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.accepts(input)) {
          return;
        }
      }
      yield [path, getErrorMessage('ERR_NO_UNION', this.toString()), this];
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var types = this.types;
      var length = types.length;

      for (var i = 0; i < length; i++) {
        var type = types[i];
        if (type.accepts(input)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var types = this.types;
      if (input instanceof UnionType) {
        var inputTypes = input.types;
        var identicalCount = 0;
        loop: for (var i = 0; i < types.length; i++) {
          var type = types[i];
          for (var j = 0; j < inputTypes.length; j++) {
            var result = compareTypes(type, inputTypes[i]);
            if (result === 0) {
              identicalCount++;
              continue loop;
            } else if (result === 1) {
              continue loop;
            }
          }
          // if we got this far then nothing accepted this type.
          return -1;
        }

        if (identicalCount === types.length) {
          return 0;
        } else {
          return 1;
        }
      } else {
        for (var _i = 0; _i < types.length; _i++) {
          var _type = types[_i];
          if (compareTypes(_type, input) >= 0) {
            return 1;
          }
        }
        return -1;
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var types = this.types;

      var normalized = new Array(types.length);
      for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (type.typeName === 'FunctionType' || type.typeName === 'ParameterizedFunctionType') {
          normalized[i] = `(${type.toString()})`;
        } else {
          normalized[i] = type.toString();
        }
      }
      return normalized.join(' | ');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        types: this.types
      };
    }
  }]);
  return UnionType;
}(Type);

function registerPrimitiveTypes(t) {
  primitiveTypes.null = Object.freeze(new NullLiteralType(t));
  primitiveTypes.empty = Object.freeze(new EmptyType(t));
  primitiveTypes.number = Object.freeze(new NumberType(t));
  primitiveTypes.boolean = Object.freeze(new BooleanType(t));
  primitiveTypes.string = Object.freeze(new StringType(t));
  primitiveTypes.symbol = Object.freeze(new SymbolType(t));
  primitiveTypes.any = Object.freeze(new AnyType(t));
  primitiveTypes.mixed = Object.freeze(new MixedType(t));
  primitiveTypes.void = Object.freeze(new VoidType(t));
  primitiveTypes.existential = Object.freeze(new ExistentialType(t));
  return t;
}

function registerBuiltinTypeConstructors(t) {

  t.declareTypeConstructor({
    name: 'Date',
    impl: Date,
    typeName: 'DateType',
    *errors(validation, path, input) {
      if (!(input instanceof Date)) {
        yield [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Date'), this];
      } else if (isNaN(input.getTime())) {
        yield [path, getErrorMessage('ERR_INVALID_DATE'), this];
      }
    },
    accepts(input) {
      return input instanceof Date && !isNaN(input.getTime());
    },
    compareWith(input) {
      if (input.typeName === 'DateType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Promise',
    impl: Promise,
    typeName: 'PromiseType',
    *errors(validation, path, input, futureType) {
      invariant(futureType, 'Must specify type parameter for Promise.');
      var context = this.context;

      if (!context.checkPredicate('Promise', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_PROMISE', futureType), this];
      }
    },
    accepts(input) {
      var context = this.context;

      return context.checkPredicate('Promise', input);
    },
    compareWith(input) {
      if (input.typeName === 'PromiseType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters(input) {
      return [];
    }
  });

  t.declareTypeConstructor({
    name: 'Map',
    impl: Map,
    typeName: 'MapType',
    *errors(validation, path, input, keyType, valueType) {
      invariant(keyType, 'Must specify two type parameters for Map.');
      invariant(valueType, 'Must specify two type parameters for Map.');
      var context = this.context;

      if (!context.checkPredicate('Map', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Map'), this];
        return;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          if (!keyType.accepts(key)) {
            yield [path, getErrorMessage('ERR_EXPECT_KEY_TYPE', keyType), this];
          }

          yield* valueType.errors(validation, path.concat(key), value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    accepts(input, keyType, valueType) {
      var context = this.context;

      if (!context.checkPredicate('Map', input)) {
        return false;
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref3 = _step2.value;

          var _ref4 = slicedToArray(_ref3, 2);

          var key = _ref4[0];
          var value = _ref4[1];

          if (!keyType.accepts(key) || !valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    },
    compareWith(input) {
      if (input.typeName === 'MapType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters(input) {
      var keyTypes = [];
      var valueTypes = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        loop: for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref5 = _step3.value;

          var _ref6 = slicedToArray(_ref5, 2);

          var key = _ref6[0];
          var value = _ref6[1];

          findKey: {
            for (var i = 0; i < keyTypes.length; i++) {
              var type = keyTypes[i];
              if (type.accepts(key)) {
                break findKey;
              }
            }
            keyTypes.push(t.typeOf(key));
          }

          for (var _i = 0; _i < valueTypes.length; _i++) {
            var _type = valueTypes[_i];
            if (_type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var typeInstances = [];

      if (keyTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (keyTypes.length === 1) {
        typeInstances.push(keyTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, keyTypes));
      }

      if (valueTypes.length === 0) {
        typeInstances.push(t.existential());
      } else if (valueTypes.length === 1) {
        typeInstances.push(valueTypes[0]);
      } else {
        typeInstances.push(t.union.apply(t, valueTypes));
      }

      return typeInstances;
    }
  });

  t.declareTypeConstructor({
    name: 'Set',
    impl: Set,
    typeName: 'SetType',
    *errors(validation, path, input, valueType) {
      invariant(valueType, 'Must specify type parameter for Set.');
      var context = this.context;

      if (!context.checkPredicate('Set', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_INSTANCEOF', 'Set'), this];
        return;
      }
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = input[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var value = _step4.value;

          yield* valueType.errors(validation, path, value);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    },
    accepts(input, valueType) {
      var context = this.context;

      if (!context.checkPredicate('Set', input)) {
        return false;
      }
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = input[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var value = _step5.value;

          if (!valueType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return true;
    },
    compareWith(input) {
      if (input.typeName === 'SetType') {
        return 0;
      }
      return -1;
    },
    inferTypeParameters(input) {
      var valueTypes = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        loop: for (var _iterator6 = input[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var value = _step6.value;

          for (var i = 0; i < valueTypes.length; i++) {
            var type = valueTypes[i];
            if (type.accepts(value)) {
              continue loop;
            }
          }
          valueTypes.push(t.typeOf(value));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (valueTypes.length === 0) {
        return [t.existential()];
      } else if (valueTypes.length === 1) {
        return [valueTypes[0]];
      } else {
        return [t.union.apply(t, valueTypes)];
      }
    }
  });

  return t;
}

function registerTypePredicates(context) {
  context.setPredicate('Array', function (input) {
    return Array.isArray(input);
  });
  context.setPredicate('Map', function (input) {
    return input instanceof Map;
  });
  context.setPredicate('Set', function (input) {
    return input instanceof Set;
  });
  context.setPredicate('Promise', function (input) {
    if (input instanceof Promise) {
      return true;
    } else {
      return input !== null && (typeof input === 'object' || typeof input === 'function') && typeof input.then === 'function';
    }
  });
}

var TypeInferer = function () {
  function TypeInferer(context) {
    classCallCheck(this, TypeInferer);

    this.context = context;
  }

  createClass(TypeInferer, [{
    key: 'infer',
    value: function infer(input) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      var inferred = new Map();
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferInternal',
    value: function inferInternal(input, inferred) {
      var primitive = this.inferPrimitive(input);
      if (primitive) {
        return primitive;
      }
      return this.inferComplex(input, inferred);
    }
  }, {
    key: 'inferPrimitive',
    value: function inferPrimitive(input) {
      var context = this.context;

      if (input === null) {
        return context.null();
      } else if (input === undefined) {
        return context.void();
      } else if (typeof input === 'number') {
        return context.number();
      } else if (typeof input === 'boolean') {
        return context.boolean();
      } else if (typeof input === 'string') {
        return context.string();
      }
      // Issue 252
      else if (typeof input === 'symbol') {
          return context.symbol(input);
        } else {
          return undefined;
        }
    }
  }, {
    key: 'inferComplex',
    value: function inferComplex(input, inferred) {
      var context = this.context;


      if (typeof input === 'function') {
        return this.inferFunction(input, inferred);
      } else if (input !== null && typeof input === 'object') {
        return this.inferObject(input, inferred);
      } else {
        return context.any();
      }
    }
  }, {
    key: 'inferFunction',
    value: function inferFunction(input, inferred) {
      var context = this.context;
      var length = input.length;

      var body = new Array(length + 1);
      for (var i = 0; i < length; i++) {
        body[i] = context.param(String.fromCharCode(97 + i), context.existential());
      }
      body[length] = context.return(context.existential());
      return context.fn.apply(context, body);
    }
  }, {
    key: 'inferObject',
    value: function inferObject(input, inferred) {
      var existing = inferred.get(input);
      if (existing) {
        return existing;
      }
      var context = this.context;

      var type = void 0;

      // Temporarily create a box for this type to catch cyclical references.
      // Nested references to this object will receive the boxed type.
      var box = context.box(function () {
        return type;
      });
      inferred.set(input, box);

      if (context.checkPredicate('Array', input)) {
        type = this.inferArray(input, inferred);
      } else if (!(input instanceof Object)) {
        type = this.inferDict(input, inferred);
      } else if (input.constructor !== Object) {
        var handler = context.getTypeConstructor(input.constructor);
        if (handler) {
          var typeParameters = handler.inferTypeParameters(input);
          type = handler.apply.apply(handler, toConsumableArray(typeParameters));
        } else {
          type = context.ref(input.constructor);
        }
      } else {
        var body = [];
        for (var key in input) {
          // eslint-disable-line
          var value = input[key];
          body.push(context.property(key, this.inferInternal(value, inferred)));
        }
        type = context.object.apply(context, body);
      }

      // Overwrite the box with the real value.
      inferred.set(input, type);
      return type;
    }
  }, {
    key: 'inferDict',
    value: function inferDict(input, inferred) {
      var numericIndexers = [];
      var stringIndexers = [];
      loop: for (var key in input) {
        // eslint-disable-line
        var value = input[key];
        var types = isNaN(+key) ? stringIndexers : numericIndexers;
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (type.accepts(value)) {
            continue loop;
          }
        }
        types.push(this.inferInternal(value, inferred));
      }

      var context = this.context;

      var body = [];
      if (numericIndexers.length === 1) {
        body.push(context.indexer('index', context.number(), numericIndexers[0]));
      } else if (numericIndexers.length > 1) {
        body.push(context.indexer('index', context.number(), context.union.apply(context, numericIndexers)));
      }

      if (stringIndexers.length === 1) {
        body.push(context.indexer('key', context.string(), stringIndexers[0]));
      } else if (stringIndexers.length > 1) {
        body.push(context.indexer('key', context.string(), context.union.apply(context, stringIndexers)));
      }

      return context.object.apply(context, body);
    }
  }, {
    key: 'inferArray',
    value: function inferArray(input, inferred) {
      var context = this.context;

      var types = [];
      var values = [];
      var length = input.length;

      loop: for (var i = 0; i < length; i++) {
        var item = input[i];
        var inferredType = this.inferInternal(item, inferred);
        for (var j = 0; j < types.length; j++) {
          var type = types[j];
          if (type.accepts(item) && inferredType.accepts(values[j])) {
            continue loop;
          }
        }
        types.push(inferredType);
        values.push(item);
      }
      if (types.length === 0) {
        return context.array(context.any());
      } else if (types.length === 1) {
        return context.array(types[0]);
      } else {
        return context.array(context.union.apply(context, types));
      }
    }
  }]);
  return TypeInferer;
}();

function makeReactPropTypes(objectType) {
  var output = {};
  if (!objectType.properties) {
    return output;
  }

  var _loop = function _loop(property) {
    output[property.key] = function (props, propName, componentName) {
      return makeError(property, props);
    };
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = objectType.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      _loop(property);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return output;
}

var delimiter$1 = '\n-------------------------------------------------\n\n';

function makeWarningMessage(validation) {
  if (!validation.hasErrors()) {
    return;
  }
  var input = validation.input,
      context = validation.context;

  var collected = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validation.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 3);

      var path = _ref2[0];
      var message = _ref2[1];
      var expectedType = _ref2[2];

      var expected = expectedType ? expectedType.toString() : "*";
      var actual = context.typeOf(_resolvePath(input, path)).toString();

      var field = stringifyPath(validation.path.concat(path));

      collected.push(`${field} ${message}\n\nExpected: ${expected}\n\nActual: ${actual}\n`);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return `Warning: ${collected.join(delimiter$1)}`;
}

function makeUnion(context, types) {
  var length = types.length;
  var merged = [];
  for (var i = 0; i < length; i++) {
    var type = types[i];
    if (type instanceof AnyType || type instanceof MixedType || type instanceof ExistentialType) {
      return type;
    }
    if (type instanceof UnionType) {
      mergeUnionTypes(merged, type.types);
    } else {
      merged.push(type);
    }
  }
  var union = new UnionType(context);
  union.types = merged;
  return union;
}

function mergeUnionTypes(aTypes, bTypes) {
  loop: for (var i = 0; i < bTypes.length; i++) {
    var bType = bTypes[i];
    for (var j = 0; j < aTypes.length; j++) {
      var aType = aTypes[j];
      if (compareTypes(aType, bType) !== -1) {
        continue loop;
      }
    }
    aTypes.push(bType);
  }
}

function makePropertyDescriptor(typeSource, input, propertyName, descriptor, shouldAssert) {
  if (typeof descriptor.get === 'function' && typeof descriptor.set === 'function') {
    return augmentExistingAccessors(typeSource, input, propertyName, descriptor, shouldAssert);
  } else {
    return propertyToAccessor(typeSource, input, propertyName, descriptor, shouldAssert);
  }
}

function makePropertyName(name) {
  return `_flowRuntime$${name}`;
}

function getClassName(input) {
  if (typeof input === 'function') {
    return input.name || '[Class anonymous]';
  } else if (typeof input.constructor === 'function') {
    return getClassName(input.constructor);
  } else {
    return '[Class anonymous]';
  }
}

function resolveType(receiver, typeSource) {
  if (typeof typeSource === 'function') {
    return typeSource.call(receiver);
  } else {
    return typeSource;
  }
}

function propertyToAccessor(typeSource, input, propertyName, descriptor, shouldAssert) {
  var safeName = makePropertyName(propertyName);
  var className = getClassName(input);
  var initializer = descriptor.initializer,
      writable = descriptor.writable,
      config = objectWithoutProperties(descriptor, ['initializer', 'writable']); // eslint-disable-line no-unused-vars

  var propertyPath = [className, propertyName];

  return _extends({}, config, {
    type: 'accessor',
    get() {
      if (safeName in this) {
        return this[safeName];
      } else if (initializer) {
        var type = resolveType(this, typeSource);
        var _value = initializer.call(this);
        var context = type.context;
        context.check(type, _value, 'Default value for property', propertyPath);
        Object.defineProperty(this, safeName, {
          writable: true,
          value: _value
        });
        return _value;
      } else {
        Object.defineProperty(this, safeName, {
          writable: true,
          value: undefined
        });
      }
    },
    set(value) {
      var type = resolveType(this, typeSource);
      var context = type.context;
      if (shouldAssert) {
        context.assert(type, value, 'Property', propertyPath);
      } else {
        context.warn(type, value, 'Property', propertyPath);
      }
      if (safeName in this) {
        this[safeName] = value;
      } else {
        Object.defineProperty(this, safeName, {
          writable: true,
          value: value
        });
      }
    }
  });
}

function augmentExistingAccessors(typeSource, input, propertyName, descriptor, shouldAssert) {

  var className = getClassName(input);
  var propertyPath = [className, propertyName];

  var originalSetter = descriptor.set;

  descriptor.set = function set$$1(value) {
    var type = resolveType(this, typeSource);
    var context = type.context;
    if (shouldAssert) {
      context.assert(type, value, 'Property', propertyPath);
    } else {
      context.warn(type, value, 'Property', propertyPath);
    }
    originalSetter.call(this, value);
  };
}

// eslint-disable-line no-redeclare

function annotateValue(input, type) {
  // eslint-disable-line no-redeclare
  if (type instanceof Type) {
    input[TypeSymbol] = type;
    return input;
  } else {
    var _type = input;
    return function (input) {
      input[TypeSymbol] = _type;
      return input;
    };
  }
}

// If A and B are object types, $Diff<A,B> is the type of objects that have
// properties defined in A, but not in B.
// Properties that are defined in both A and B are allowed too.

var $DiffType = function (_Type) {
  inherits($DiffType, _Type);

  function $DiffType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $DiffType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $DiffType.__proto__ || Object.getPrototypeOf($DiffType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$DiffType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($DiffType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var aType = this.aType,
          bType = this.bType;

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }
      aType = aType.unwrap();
      bType = bType.unwrap();
      invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
      var properties = aType.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        yield* property.errors(validation, path.concat(property.key), input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var aType = this.aType,
          bType = this.bType;

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        return false;
      }
      aType = aType.unwrap();
      bType = bType.unwrap();
      invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
      var properties = aType.properties;
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        if (!property.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context;

      var aType = this.aType,
          bType = this.bType;

      aType = aType.unwrap();
      bType = bType.unwrap();
      invariant(aType instanceof ObjectType && bType instanceof ObjectType, 'Can only $Diff object types.');
      var properties = aType.properties;
      var args = [];
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (bType.hasProperty(property.key)) {
          continue;
        }
        args.push(property);
      }
      return (_context = this.context).object.apply(_context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Diff<${this.aType.toString()}, ${this.bType.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        aType: this.aType,
        bType: this.bType
      };
    }
  }]);
  return $DiffType;
}(Type);

// Any subtype of T

var $FlowFixMeType = function (_Type) {
  inherits($FlowFixMeType, _Type);

  function $FlowFixMeType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $FlowFixMeType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $FlowFixMeType.__proto__ || Object.getPrototypeOf($FlowFixMeType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$FlowFixMeType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($FlowFixMeType, [{
    key: 'errors',
    value: function* errors(validation, input) {
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return 1;
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '$FlowFixMe';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName
      };
    }
  }]);
  return $FlowFixMeType;
}(Type);

// The set of keys of T.

var $KeysType = function (_Type) {
  inherits($KeysType, _Type);

  function $KeysType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $KeysType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $KeysType.__proto__ || Object.getPrototypeOf($KeysType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$KeysType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($KeysType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (input === property.key) {
          return;
        }
      }
      var keys = new Array(length);
      for (var _i = 0; _i < length; _i++) {
        keys[_i] = properties[_i].key;
      }
      yield [path, getErrorMessage('ERR_NO_UNION', keys.join(' | ')), this];
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (input === property.key) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context;

      var context = this.context;
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Keys<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      var keys = new Array(length);
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        keys[i] = context.literal(property.key);
      }
      return (_context = this.context).union.apply(_context, keys);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Keys<${this.type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $KeysType;
}(Type);

// Map over the keys and values in an object.

var $ObjMapiType = function (_Type) {
  inherits($ObjMapiType, _Type);

  function $ObjMapiType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ObjMapiType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ObjMapiType.__proto__ || Object.getPrototypeOf($ObjMapiType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ObjMapiType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ObjMapiType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = target.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key), prop.value);

          var value = input[prop.key];
          yield* returnType.errors(validation, path.concat(prop.key), value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = target.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key), prop.value);

          var value = input[prop.key];
          if (!returnType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      var args = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          args.push(context.property(prop.key, applied.invoke(context.literal(prop.key), prop.value)));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return context.object.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$ObjMapi<${this.object.toString()}, ${this.mapper.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        mapper: this.mapper
      };
    }
  }]);
  return $ObjMapiType;
}(Type);

// Map over the keys in an object.

var $ObjMapType = function (_Type) {
  inherits($ObjMapType, _Type);

  function $ObjMapType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ObjMapType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ObjMapType.__proto__ || Object.getPrototypeOf($ObjMapType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ObjMapType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ObjMapType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = target.properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key));

          var value = input[prop.key];
          yield* returnType.errors(validation, path.concat(prop.key), value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = target.properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          var returnType = applied.invoke(context.literal(prop.key));

          var value = input[prop.key];
          if (!returnType.accepts(value)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          mapper = this.mapper,
          context = this.context;

      var target = object.unwrap();
      invariant(target instanceof ObjectType, 'Target must be an object type.');

      var args = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.properties[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var prop = _step3.value;

          var applied = mapper.unwrap();
          invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

          args.push(context.property(prop.key, applied.invoke(context.literal(prop.key))));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return context.object.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$ObjMap<${this.object.toString()}, ${this.mapper.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        mapper: this.mapper
      };
    }
  }]);
  return $ObjMapType;
}(Type);

// The type of the named object property

var $PropertyType = function (_Type) {
  inherits($PropertyType, _Type);

  function $PropertyType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $PropertyType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $PropertyType.__proto__ || Object.getPrototypeOf($PropertyType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$PropertyType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($PropertyType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.unwrap().errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.unwrap().accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var object = this.object,
          property = this.property;

      var unwrapped = object.unwrap();
      invariant(typeof unwrapped.getProperty === 'function', 'Can only use $PropertyType on Objects.');
      return unwrapped.getProperty(property).unwrap();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$PropertyType<${this.object.toString()}, ${String(this.property)}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        object: this.object,
        property: this.property
      };
    }
  }]);
  return $PropertyType;
}(Type);

// An object of type $Shape<T> does not have to have all of the properties
// that type T defines. But the types of the properties that it does have
// must accepts the types of the same properties in T.

var $ShapeType = function (_Type) {
  inherits($ShapeType, _Type);

  function $ShapeType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ShapeType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ShapeType.__proto__ || Object.getPrototypeOf($ShapeType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ShapeType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ShapeType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type;


      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this];
        return;
      }

      type = type.unwrap();
      invariant(typeof type.getProperty === 'function', 'Can only $Shape<T> object types.');

      for (var key in input) {
        // eslint-disable-line guard-for-in
        var property = type.getProperty(key);
        if (!property) {
          continue;
        }
        yield* property.errors(validation, path, input);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type;

      if (input === null || typeof input !== 'object' && typeof input !== 'function') {
        return false;
      }
      type = type.unwrap();
      invariant(typeof type.getProperty === 'function', 'Can only $Shape<T> object types.');
      for (var key in input) {
        // eslint-disable-line guard-for-in
        var property = type.getProperty(key);
        if (!property || !property.accepts(input)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var _context;

      var type = this.type;

      type = type.unwrap();
      var context = this.context;
      invariant(type instanceof ObjectType, 'Can only $Shape<T> object types.');
      var properties = type.properties;
      var args = new Array(properties.length);
      for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        args[i] = context.property(property.key, property.value, true);
      }
      return (_context = this.context).object.apply(_context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Shape<${this.type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $ShapeType;
}(Type);

// Any subtype of T

var $SubType = function (_Type) {
  inherits($SubType, _Type);

  function $SubType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $SubType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $SubType.__proto__ || Object.getPrototypeOf($SubType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$SubType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($SubType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(input, path);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Subtype<${this.type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $SubType;
}(Type);

// Any, but at least T.

var $SuperType = function (_Type) {
  inherits($SuperType, _Type);

  function $SuperType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $SuperType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $SuperType.__proto__ || Object.getPrototypeOf($SuperType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$SuperType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($SuperType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      yield* this.type.errors(validation, path, input);
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      return this.type.accepts(input);
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      return this.type;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Supertype<${this.type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $SuperType;
}(Type);

// Map over the values in a tuple.

var $TupleMapType = function (_Type) {
  inherits($TupleMapType, _Type);

  function $TupleMapType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $TupleMapType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $TupleMapType.__proto__ || Object.getPrototypeOf($TupleMapType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$TupleMapType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($TupleMapType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var tuple = this.tuple,
          mapper = this.mapper,
          context = this.context;

      var target = tuple.unwrap();
      invariant(target instanceof TupleType, 'Target must be a tuple type.');

      if (!context.checkPredicate('Array', input)) {
        yield [path, getErrorMessage('ERR_EXPECT_ARRAY'), this];
        return;
      }

      for (var i = 0; i < target.types.length; i++) {
        var type = target.types[i];
        var applied = mapper.unwrap();
        invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

        var expected = applied.invoke(type);
        var value = input[i];
        yield* expected.errors(validation, path.concat(i), value);
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var tuple = this.tuple,
          mapper = this.mapper,
          context = this.context;

      var target = tuple.unwrap();
      invariant(target instanceof TupleType, 'Target must be a tuple type.');

      if (!context.checkPredicate('Array', input)) {
        return false;
      }

      for (var i = 0; i < target.types.length; i++) {
        var type = target.types[i];
        var applied = mapper.unwrap();
        invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

        if (!applied.invoke(type).accepts(input[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var tuple = this.tuple,
          mapper = this.mapper,
          context = this.context;

      var target = tuple.unwrap();
      invariant(target instanceof TupleType, 'Target must be an tuple type.');

      var args = [];
      for (var i = 0; i < target.types.length; i++) {
        var type = target.types[i];
        var applied = mapper.unwrap();
        invariant(applied instanceof FunctionType, 'Mapper must be a function type.');

        args.push(applied.invoke(type).unwrap().unwrap());
      }

      return context.tuple.apply(context, args);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$TupleMap<${this.tuple.toString()}, ${this.mapper.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        tuple: this.tuple,
        mapper: this.mapper
      };
    }
  }]);
  return $TupleMapType;
}(Type);

// The set of keys of T.

var $ValuesType = function (_Type) {
  inherits($ValuesType, _Type);

  function $ValuesType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, $ValuesType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = $ValuesType.__proto__ || Object.getPrototypeOf($ValuesType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = '$ValuesType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass($ValuesType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.value.accepts(input)) {
          return;
        }
      }
      var values = new Array(length);
      for (var _i = 0; _i < length; _i++) {
        values[_i] = properties[_i].value.toString();
      }
      yield [path, getErrorMessage('ERR_NO_UNION', values.join(' | ')), this];
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        if (property.value.accepts(input)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      return compareTypes(this.unwrap(), input);
    }
  }, {
    key: 'unwrap',
    value: function unwrap() {
      var context = this.context;
      var type = this.type.unwrap();
      invariant(type instanceof ObjectType, 'Can only $Values<T> object types.');

      var properties = type.properties;
      var length = properties.length;
      var values = new Array(length);
      for (var i = 0; i < length; i++) {
        var property = properties[i];
        values[i] = property.value;
      }
      return context.union.apply(context, values);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `$Values<${this.type.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        type: this.type
      };
    }
  }]);
  return $ValuesType;
}(Type);

function checkGenericType(context, expected, input) {
  var impl = expected.impl;

  if (typeof impl !== 'function') {
    // There is little else we can do here, so accept anything.
    return true;
  } else if (impl === input || impl.isPrototypeOf(input)) {
    return true;
  }

  var annotation = context.getAnnotation(impl);
  if (annotation == null) {
    return false;
  } else {
    return checkType(context, annotation, input);
  }
}

function checkType(context, expected, input) {
  var annotation = context.getAnnotation(input);
  if (annotation != null) {
    var result = compareTypes(expected, annotation);
    return result !== -1;
  }
  return true;
}

var ClassType = function (_Type) {
  inherits(ClassType, _Type);

  function ClassType() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ClassType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ClassType.__proto__ || Object.getPrototypeOf(ClassType)).call.apply(_ref, [this].concat(args))), _this), _this.typeName = 'ClassType', _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ClassType, [{
    key: 'errors',
    value: function* errors(validation, path, input) {
      var instanceType = this.instanceType,
          context = this.context;

      if (typeof input !== 'function') {
        yield [path, getErrorMessage('ERR_EXPECT_CLASS', instanceType.toString()), this];
        return;
      }
      var expectedType = instanceType.typeName === 'ClassDeclaration' ? instanceType : instanceType.unwrap();
      var isValid = expectedType instanceof GenericType ? checkGenericType(context, expectedType, input) : checkType(context, expectedType, input);
      if (!isValid) {
        yield [path, getErrorMessage('ERR_EXPECT_CLASS', instanceType.toString()), this];
      }
    }
  }, {
    key: 'accepts',
    value: function accepts(input) {
      var instanceType = this.instanceType,
          context = this.context;

      if (typeof input !== 'function') {
        return false;
      }
      var expectedType = instanceType.typeName === 'ClassDeclaration' ? instanceType : instanceType.unwrap();
      if (expectedType instanceof GenericType) {
        return checkGenericType(context, expectedType, input);
      } else {
        return checkType(context, expectedType, input);
      }
    }
  }, {
    key: 'compareWith',
    value: function compareWith(input) {
      var instanceType = this.instanceType;

      if (input instanceof ClassType) {
        return compareTypes(instanceType, input.instanceType);
      }
      return -1;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return `Class<${this.instanceType.toString()}>`;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        typeName: this.typeName,
        instanceType: this.instanceType
      };
    }
  }]);
  return ClassType;
}(Type);

/**
 * Keeps track of invalid references in order to prevent
 * multiple warnings.
 */
var warnedInvalidReferences = new WeakSet();

var TypeContext = function () {
  function TypeContext() {
    classCallCheck(this, TypeContext);
    this.mode = 'assert';
    this[NameRegistrySymbol] = {};
    this[TypePredicateRegistrySymbol] = {};
    this[TypeConstructorRegistrySymbol] = new Map();
    this[InferrerSymbol] = new TypeInferer(this);
    this[ModuleRegistrySymbol] = {};
  }

  /**
   * Calls to `t.check(...)` will call either
   * `t.assert(...)` or `t.warn(...)` depending on this setting.
   */


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  // Issue 252


  createClass(TypeContext, [{
    key: 'makeJSONError',
    value: function makeJSONError$$1(validation) {
      return makeJSONError(validation);
    }
  }, {
    key: 'makeTypeError',
    value: function makeTypeError$$1(validation) {
      return makeTypeError(validation);
    }
  }, {
    key: 'createContext',
    value: function createContext() {
      var context = new TypeContext();
      // Issue 252
      context[ParentSymbol] = this;
      return context;
    }
  }, {
    key: 'typeOf',
    value: function typeOf(input) {

      var annotation = this.getAnnotation(input);
      if (annotation) {
        if (typeof input === 'function' && (annotation instanceof ClassDeclaration || annotation instanceof ParameterizedClassDeclaration)) {
          return this.Class(annotation);
        }
        return annotation;
      }
      // Issue 252
      var inferrer = this[InferrerSymbol];

      return inferrer.infer(input);
    }
  }, {
    key: 'compareTypes',
    value: function compareTypes$$1(a, b) {
      return compareTypes(a, b);
    }
  }, {
    key: 'get',
    value: function get$$1(name) {
      // Issue 252
      var item = this[NameRegistrySymbol][name];

      for (var _len = arguments.length, propertyNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        propertyNames[_key - 1] = arguments[_key];
      }

      if (item != null) {
        var current = typeof item === 'function' ? new item(this) : item;
        for (var i = 0; i < propertyNames.length; i++) {
          var propertyName = propertyNames[i];
          if (typeof current.getProperty !== 'function') {
            return;
          }
          current = current.getProperty(propertyName);
          if (!current) {
            return;
          }
          current = current.unwrap();
        }
        return current;
      }
      // Issue 252
      var parent = this[ParentSymbol];
      if (parent) {
        var fromParent = parent.get.apply(parent, [name].concat(toConsumableArray(propertyNames)));
        if (fromParent) {
          return fromParent;
        }
      }

      // if we got this far, see if we have a global type with this name.
      if (typeof global[name] === 'function') {
        var target = new GenericType(this);
        target.name = name;
        target.impl = global[name];
        // Issue 252
        this[NameRegistrySymbol][name] = target;
        return target;
      }
    }

    /**
     * Get the predicate for a given type name.
     * e.g. `t.getPredicate('Array')`.
     */

  }, {
    key: 'getPredicate',
    value: function getPredicate(name) {
      var item = this[TypePredicateRegistrySymbol][name];
      if (item) {
        return item;
      }
      var parent = this[ParentSymbol];
      if (parent) {
        return parent.getPredicate(name);
      }
    }

    /**
     * Set the predicate for a given type name.
     * This can be used to customise the behaviour of things like Array
     * detection or allowing Thenables in place of the global Promise.
     */

  }, {
    key: 'setPredicate',
    value: function setPredicate(name, predicate) {
      this[TypePredicateRegistrySymbol][name] = predicate;
    }

    /**
     * Check the given value against the named predicate.
     * Returns false if no such predicate exists.
     * e.g. `t.checkPredicate('Array', [1, 2, 3])`
     */

  }, {
    key: 'checkPredicate',
    value: function checkPredicate(name, input) {
      var predicate = this.getPredicate(name);
      if (predicate) {
        return predicate(input);
      } else {
        return false;
      }
    }

    /**
     * Returns a decorator for a function or object with the given type.
     */

  }, {
    key: 'decorate',
    value: function decorate(type, shouldAssert) {
      var _this2 = this;

      if (shouldAssert == null) {
        shouldAssert = this.mode === 'assert';
      }
      return function (input, propertyName, descriptor) {
        if (descriptor && typeof propertyName === 'string') {
          return makePropertyDescriptor(type, input, propertyName, descriptor, Boolean(shouldAssert));
        } else {
          invariant(typeof type !== 'function', 'Cannot decorate an object or function as a method.');
          return _this2.annotate(input, type);
        }
      };
    }

    /**
     * Annotates an object or function with the given type.
     * If a type is specified as the sole argument, returns a
     * function which can decorate classes or functions with the given type.
     */

  }, {
    key: 'annotate',
    value: function annotate(input, type) {
      if (type === undefined) {
        return annotateValue(input);
      } else {
        return annotateValue(input, type);
      }
    }
  }, {
    key: 'getAnnotation',
    value: function getAnnotation(input) {
      if (input !== null && typeof input === 'object' || typeof input === 'function') {
        // Issue 252
        return input[TypeSymbol];
      }
    }
  }, {
    key: 'hasAnnotation',
    value: function hasAnnotation(input) {
      if (input == null) {
        return false;
      } else {
        return input[TypeSymbol] ? true : false;
      }
    }
  }, {
    key: 'setAnnotation',
    value: function setAnnotation(input, type) {
      input[TypeSymbol] = type;
      return input;
    }
  }, {
    key: 'type',
    value: function type(name, _type) {
      if (typeof _type === 'function') {
        var target = new ParameterizedTypeAlias(this);
        target.name = name;
        target.typeCreator = _type;
        return target;
      } else {
        var _target = new TypeAlias(this);
        _target.name = name;
        _target.type = _type;
        return _target;
      }
    }
  }, {
    key: 'declare',
    value: function declare(name, type) {

      if (name instanceof Declaration) {
        type = name;
        name = type.name;
      } else if (name instanceof TypeAlias) {
        type = name;
        name = type.name;
      }
      if (typeof type === 'function') {
        type = this.type(name, type);
      }
      if (type instanceof ModuleDeclaration) {
        var moduleRegistry = this[ModuleRegistrySymbol];
        moduleRegistry[name] = type;
        return type;
      } else {
        invariant(typeof name === 'string', 'Name must be a string');
        invariant(type instanceof Type, 'Type must be supplied to declaration');
        var nameRegistry = this[NameRegistrySymbol];

        if (type instanceof Declaration) {
          nameRegistry[name] = type;
          return type;
        } else if (type instanceof TypeAlias || type instanceof ParameterizedTypeAlias) {
          var target = new TypeDeclaration(this);
          target.name = name;
          target.typeAlias = type;
          nameRegistry[name] = target;
          return target;
        } else {
          var _target2 = this.var(name, type);
          nameRegistry[name] = _target2;
          return _target2;
        }
      }
    }
  }, {
    key: 'declarations',
    value: function* declarations() {
      var nameRegistry = this[NameRegistrySymbol];
      for (var key in nameRegistry) {
        // eslint-disable-line guard-for-in
        yield [key, nameRegistry[key]];
      }
    }
  }, {
    key: 'modules',
    value: function* modules() {
      var moduleRegistry = this[ModuleRegistrySymbol];
      for (var key in moduleRegistry) {
        // eslint-disable-line guard-for-in
        yield moduleRegistry[key];
      }
    }
  }, {
    key: 'import',
    value: function _import(moduleName) {
      var moduleRegistry = this[ModuleRegistrySymbol];
      if (moduleRegistry[moduleName]) {
        return moduleRegistry[moduleName];
      }

      var _moduleName$split = moduleName.split('/'),
          _moduleName$split2 = slicedToArray(_moduleName$split, 1),
          head = _moduleName$split2[0];

      var module = moduleRegistry[head];
      if (module) {
        return module.import(moduleName);
      }
      var parent = this[ParentSymbol];
      if (parent) {
        return parent.import(moduleName);
      }
    }
  }, {
    key: 'declareTypeConstructor',
    value: function declareTypeConstructor(_ref) {
      var name = _ref.name,
          impl = _ref.impl,
          typeName = _ref.typeName,
          errors = _ref.errors,
          accepts = _ref.accepts,
          inferTypeParameters = _ref.inferTypeParameters,
          compareWith = _ref.compareWith;

      var nameRegistry = this[NameRegistrySymbol];

      if (nameRegistry[name]) {
        this.emitWarningMessage(`Redeclaring type: ${name}, this may be unintended.`);
      }

      var target = new TypeConstructor(this);
      target.name = name;
      target.typeName = typeName;
      target.impl = impl;
      target.errors = errors;
      target.accepts = accepts;
      target.inferTypeParameters = inferTypeParameters;
      if (typeof compareWith === 'function') {
        target.compareWith = compareWith;
      }

      nameRegistry[name] = target;

      if (typeof impl === 'function') {
        // Issue 252
        var handlerRegistry = this[TypeConstructorRegistrySymbol];

        if (handlerRegistry.has(impl)) {
          this.emitWarningMessage(`A type handler already exists for the given implementation of ${name}.`);
        }
        handlerRegistry.set(impl, target);
      }
      return target;
    }
  }, {
    key: 'getTypeConstructor',
    value: function getTypeConstructor(impl) {
      // Issue 252
      var handlerRegistry = this[TypeConstructorRegistrySymbol];

      return handlerRegistry.get(impl);
    }
  }, {
    key: 'literal',
    value: function literal(input) {
      if (input === undefined) {
        return this.void();
      } else if (input === null) {
        return this.null();
      } else if (typeof input === 'boolean') {
        return this.boolean(input);
      } else if (typeof input === 'number') {
        return this.number(input);
      } else if (typeof input === 'string') {
        return this.string(input);
      }
      // Issue 252
      else if (typeof input === 'symbol') {
          return this.symbol(input);
        } else {
          return this.typeOf(input);
        }
    }
  }, {
    key: 'null',
    value: function _null() {
      return primitiveTypes.null;
    }
  }, {
    key: 'nullable',
    value: function nullable(type) {
      var target = new NullableType(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'existential',
    value: function existential() {
      return primitiveTypes.existential;
    }
  }, {
    key: 'empty',
    value: function empty() {
      return primitiveTypes.empty;
    }
  }, {
    key: 'any',
    value: function any() {
      return primitiveTypes.any;
    }
  }, {
    key: 'mixed',
    value: function mixed() {
      return primitiveTypes.mixed;
    }
  }, {
    key: 'void',
    value: function _void() {
      return primitiveTypes.void;
    }
  }, {
    key: 'this',
    value: function _this(input) {
      var target = new ThisType(this);
      if (input !== undefined) {
        target.recorded = input;
      }
      return target;
    }
  }, {
    key: 'number',
    value: function number(input) {
      if (input !== undefined) {
        var target = new NumericLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.number;
      }
    }
  }, {
    key: 'boolean',
    value: function boolean(input) {
      if (input !== undefined) {
        var target = new BooleanLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.boolean;
      }
    }
  }, {
    key: 'string',
    value: function string(input) {
      if (input !== undefined) {
        var target = new StringLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.string;
      }
    }
  }, {
    key: 'symbol',
    value: function symbol(input) {
      if (input !== undefined) {
        var target = new SymbolLiteralType(this);
        target.value = input;
        return target;
      } else {
        return primitiveTypes.symbol;
      }
    }
  }, {
    key: 'typeParameter',
    value: function typeParameter(id, bound, defaultType) {
      var target = new TypeParameter(this);
      target.id = id;
      target.bound = bound;
      target.default = defaultType;
      return target;
    }
  }, {
    key: 'flowInto',
    value: function flowInto(typeParameter) {
      return flowIntoTypeParameter(typeParameter);
    }

    /**
     * Bind the type parameters for the parent class of the given instance.
     */

  }, {
    key: 'bindTypeParameters',
    value: function bindTypeParameters(subject) {
      var instancePrototype = Object.getPrototypeOf(subject);
      // Issue
      var parentPrototype = instancePrototype && Object.getPrototypeOf(instancePrototype);
      // Issue
      var parentClass = parentPrototype && parentPrototype.constructor;

      if (!parentClass) {
        this.emitWarningMessage('Could not bind type parameters for non-existent parent class.');
        return subject;
      }
      // Issue 252
      var typeParametersPointer = parentClass[TypeParametersSymbol];

      if (typeParametersPointer) {
        var typeParameters = subject[typeParametersPointer];
        var keys = Object.keys(typeParameters);

        for (var _len2 = arguments.length, typeInstances = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          typeInstances[_key2 - 1] = arguments[_key2];
        }

        var length = Math.min(keys.length, typeInstances.length);
        for (var i = 0; i < length; i++) {
          var typeParam = typeParameters[keys[i]];
          typeParam.bound = typeInstances[i];
        }
      }
      return subject;
    }
  }, {
    key: 'module',
    value: function module(name, body) {
      var target = new ModuleDeclaration(this);
      target.name = name;
      var innerContext = this.createContext();
      // Issue 252
      innerContext[ParentSymbol] = this;
      // Issue 252
      innerContext[CurrentModuleSymbol] = target;

      target.innerContext = innerContext;
      body(innerContext);
      return target;
    }
  }, {
    key: 'moduleExports',
    value: function moduleExports(type) {
      var currentModule = this[CurrentModuleSymbol];
      if (!currentModule) {
        throw new Error('Cannot declare module.exports outside of a module.');
      }
      var target = new ModuleExports(this);
      target.type = type;
      currentModule.moduleExports = target;
      return target;
    }
  }, {
    key: 'var',
    value: function _var(name, type) {
      var target = new VarDeclaration(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'class',
    value: function _class(name, head) {
      if (typeof head === 'function') {
        var _target3 = new ParameterizedClassDeclaration(this);
        _target3.name = name;
        _target3.bodyCreator = head;
        return _target3;
      }
      var target = new ClassDeclaration(this);
      target.name = name;

      for (var _len3 = arguments.length, tail = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        tail[_key3 - 2] = arguments[_key3];
      }

      if (head != null) {
        tail.unshift(head);
      }
      var length = tail.length;

      var properties = [];
      var body = void 0;

      for (var i = 0; i < length; i++) {
        var item = tail[i];
        if (item instanceof ObjectTypeProperty || item instanceof ObjectTypeIndexer) {
          properties.push(item);
        } else if (item instanceof ObjectType) {
          invariant(!body, 'Class body must only be declared once.');
          body = item;
        } else if (item instanceof ExtendsDeclaration) {
          invariant(!target.superClass, 'Classes can only have one super class.');
          target.superClass = item;
        } else if (item != null && typeof item === 'object' && !(item instanceof Type)) {
          for (var propertyName in item) {
            // eslint-disable-line
            properties.push(this.property(propertyName, item[propertyName]));
          }
        } else {
          throw new Error('ClassDeclaration cannot contain the given type directly.');
        }
      }
      if (!body) {
        body = new ObjectType(this);
      }
      if (properties.length) {
        var _body$properties;

        (_body$properties = body.properties).push.apply(_body$properties, properties);
      }
      target.body = body;
      return target;
    }
  }, {
    key: 'extends',
    value: function _extends(subject) {
      var target = new ExtendsDeclaration(this);

      for (var _len4 = arguments.length, typeInstances = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        typeInstances[_key4 - 1] = arguments[_key4];
      }

      target.type = this.ref.apply(this, [subject].concat(toConsumableArray(typeInstances)));
      return target;
    }
  }, {
    key: 'fn',
    value: function fn(head) {
      for (var _len5 = arguments.length, tail = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        tail[_key5 - 1] = arguments[_key5];
      }

      return this.function.apply(this, [head].concat(tail));
    }
  }, {
    key: 'function',
    value: function _function(head) {
      if (typeof head === 'function') {
        var _target4 = new ParameterizedFunctionType(this);
        _target4.bodyCreator = head;
        return _target4;
      }
      var target = new FunctionType(this);
      if (head != null) {
        for (var _len6 = arguments.length, tail = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          tail[_key6 - 1] = arguments[_key6];
        }

        tail.unshift(head);
        var length = tail.length;

        for (var i = 0; i < length; i++) {
          var item = tail[i];
          if (item instanceof FunctionTypeParam) {
            target.params.push(item);
          } else if (item instanceof FunctionTypeRestParam) {
            target.rest = item;
          } else if (item instanceof FunctionTypeReturn) {
            target.returnType = item;
          } else {
            throw new Error('FunctionType cannot contain the given type directly.');
          }
        }
      }
      if (!target.returnType) {
        target.returnType = this.any();
      }
      return target;
    }
  }, {
    key: 'param',
    value: function param(name, type) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new FunctionTypeParam(this);
      target.name = name;
      target.type = type;
      target.optional = optional;
      return target;
    }
  }, {
    key: 'rest',
    value: function rest(name, type) {
      var target = new FunctionTypeRestParam(this);
      target.name = name;
      target.type = type;
      return target;
    }
  }, {
    key: 'return',
    value: function _return(type) {
      var target = new FunctionTypeReturn(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'generator',
    value: function generator(yieldType, returnType, nextType) {
      var target = new GeneratorType(this);
      target.yieldType = yieldType;
      target.returnType = returnType || this.any();
      target.nextType = nextType || this.any();
      return target;
    }
  }, {
    key: 'object',
    value: function object(head) {
      var target = new ObjectType(this);
      if (head != null && typeof head === 'object' && !(head instanceof Type)) {
        for (var propertyName in head) {
          // eslint-disable-line
          target.properties.push(this.property(propertyName, head[propertyName]));
        }
      } else {
        var body = void 0;

        for (var _len7 = arguments.length, tail = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          tail[_key7 - 1] = arguments[_key7];
        }

        if (head) {
          body = [head].concat(toConsumableArray(tail));
        } else {
          body = tail;
        }
        var _body = body,
            length = _body.length;

        for (var i = 0; i < length; i++) {
          var item = body[i];
          if (item instanceof ObjectTypeProperty) {
            target.properties.push(item);
          } else if (item instanceof ObjectTypeIndexer) {
            target.indexers.push(item);
          } else if (item instanceof ObjectTypeCallProperty) {
            target.callProperties.push(item);
          } else {
            throw new Error('ObjectType cannot contain the given type directly.');
          }
        }
      }
      return target;
    }
  }, {
    key: 'exactObject',
    value: function exactObject(head) {
      for (var _len8 = arguments.length, tail = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        tail[_key8 - 1] = arguments[_key8];
      }

      var object = this.object.apply(this, [head].concat(toConsumableArray(tail)));
      object.exact = true;
      return object;
    }
  }, {
    key: 'callProperty',
    value: function callProperty(value) {
      var target = new ObjectTypeCallProperty(this);
      target.value = value;
      return target;
    }
  }, {
    key: 'property',
    value: function property(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var target = new ObjectTypeProperty(this);
      target.key = key;
      if (value instanceof Type) {
        target.value = value;
      } else {
        target.value = this.object(value);
      }
      target.optional = optional;
      return target;
    }
  }, {
    key: 'indexer',
    value: function indexer(id, key, value) {
      var target = new ObjectTypeIndexer(this);
      target.id = id;
      target.key = key;
      target.value = value;
      return target;
    }
  }, {
    key: 'method',
    value: function method(name, head) {
      var target = new ObjectTypeProperty(this);
      target.key = name;

      for (var _len9 = arguments.length, tail = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
        tail[_key9 - 2] = arguments[_key9];
      }

      target.value = this.function.apply(this, [head].concat(tail));
      return target;
    }
  }, {
    key: 'staticCallProperty',
    value: function staticCallProperty(value) {
      var prop = this.callProperty(value);
      prop.static = true;
      return prop;
    }
  }, {
    key: 'staticProperty',
    value: function staticProperty(key, value) {
      var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var prop = this.property(key, value, optional);
      prop.static = true;
      return prop;
    }
  }, {
    key: 'staticMethod',
    value: function staticMethod(name, head) {
      for (var _len10 = arguments.length, tail = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        tail[_key10 - 2] = arguments[_key10];
      }

      var prop = this.method.apply(this, [name, head].concat(tail));
      prop.static = true;
      return prop;
    }
  }, {
    key: 'spread',
    value: function spread() {
      var target = new ObjectType(this);

      for (var _len11 = arguments.length, types = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        types[_key11] = arguments[_key11];
      }

      for (var i = 0; i < types.length; i++) {
        var type = types[i].unwrap();
        if (Array.isArray(type.callProperties)) {
          var _target$callPropertie;

          (_target$callPropertie = target.callProperties).push.apply(_target$callPropertie, toConsumableArray(type.callProperties));
        }
        if (Array.isArray(type.indexers)) {
          var _target$indexers;

          (_target$indexers = target.indexers).push.apply(_target$indexers, toConsumableArray(type.indexers));
        }
        if (Array.isArray(type.properties)) {
          for (var j = 0; j < type.properties.length; j++) {
            var prop = type.properties[j];
            invariant(prop instanceof ObjectTypeProperty);
            target.setProperty(prop.key, prop.value, prop.optional);
          }
        }
      }
      return target;
    }
  }, {
    key: 'tuple',
    value: function tuple() {
      var target = new TupleType(this);

      for (var _len12 = arguments.length, types = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        types[_key12] = arguments[_key12];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'array',
    value: function array(elementType) {
      var target = new ArrayType(this);
      target.elementType = elementType || this.any();
      return target;
    }
  }, {
    key: 'union',
    value: function union() {
      for (var _len13 = arguments.length, types = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        types[_key13] = arguments[_key13];
      }

      return makeUnion(this, types);
    }
  }, {
    key: 'intersect',
    value: function intersect() {
      var target = new IntersectionType(this);

      for (var _len14 = arguments.length, types = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        types[_key14] = arguments[_key14];
      }

      target.types = types;
      return target;
    }
  }, {
    key: 'intersection',
    value: function intersection() {
      return this.intersect.apply(this, arguments);
    }
  }, {
    key: 'box',
    value: function box(reveal) {
      var box = new TypeBox(this);
      box.reveal = reveal;
      return box;
    }
  }, {
    key: 'tdz',
    value: function tdz(reveal, name) {
      var tdz = new TypeTDZ(this);
      tdz.reveal = reveal;
      tdz.name = name;
      return tdz;
    }
  }, {
    key: 'ref',
    value: function ref(subject) {
      var target = void 0;
      if (typeof subject === 'string') {
        // try and eagerly resolve the reference
        target = this.get(subject);
        if (!target) {
          // defer dereferencing for now
          target = new TypeReference(this);
          target.name = subject;
        }
      } else if (typeof subject === 'function') {
        // Issue 252
        var handlerRegistry = this[TypeConstructorRegistrySymbol];

        // see if we have a dedicated TypeConstructor for this.
        target = handlerRegistry.get(subject);

        if (!target) {
          // just use a generic type handler.
          target = new GenericType(this);
          target.impl = subject;
          target.name = subject.name;
        }
      } else if (subject instanceof Type) {
        target = subject;
      } else {
        if (subject == null || typeof subject !== 'object') {
          this.emitWarningMessage(`Could not reference the given type, try t.typeOf(value) instead. (got ${String(subject)})`);
        } else if (!warnedInvalidReferences.has(subject)) {
          this.emitWarningMessage('Could not reference the given type, try t.typeOf(value) instead.');
          warnedInvalidReferences.add(subject);
        }
        return this.any();
      }

      for (var _len15 = arguments.length, typeInstances = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        typeInstances[_key15 - 1] = arguments[_key15];
      }

      if (typeInstances.length) {
        var _target5;

        invariant(typeof target.apply === 'function', `Cannot apply non-applicable type: ${target.typeName}.`);
        return (_target5 = target).apply.apply(_target5, toConsumableArray(typeInstances));
      } else {
        return target;
      }
    }
  }, {
    key: 'validate',
    value: function validate(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = new Validation(this, input);
      if (path) {
        var _validation$path;

        (_validation$path = validation.path).push.apply(_validation$path, toConsumableArray(path));
      } else if (typeof type.name === 'string') {
        validation.path.push(type.name);
      }
      validation.prefix = prefix;
      validation.errors = Array.from(type.errors(validation, [], input));
      return validation;
    }
  }, {
    key: 'check',
    value: function check(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      if (this.mode === 'assert') {
        return this.assert(type, input, prefix, path);
      } else {
        return this.warn(type, input, prefix, path);
      }
    }
  }, {
    key: 'assert',
    value: function assert(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = this.validate(type, input, prefix, path);
      var error = this.makeTypeError(validation);
      if (error) {
        throw error;
      }
      return input;
    }
  }, {
    key: 'warn',
    value: function warn(type, input) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var path = arguments[3];

      var validation = this.validate(type, input, prefix, path);
      var message = makeWarningMessage(validation);
      if (typeof message === 'string') {
        this.emitWarningMessage(message);
      }
      return input;
    }

    /**
     * Emits a warning message, using `console.warn()` by default.
     */

  }, {
    key: 'emitWarningMessage',
    value: function emitWarningMessage(message) {
      console.warn('flow-runtime:', message);
    }
  }, {
    key: 'propTypes',
    value: function propTypes(type) {
      return makeReactPropTypes(type.unwrap());
    }
  }, {
    key: 'match',
    value: function match() {
      for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      var clauses = args.pop();
      if (!Array.isArray(clauses)) {
        throw new Error('Invalid pattern, last argument must be an array.');
      }
      var pattern = this.pattern.apply(this, toConsumableArray(clauses));
      return pattern.apply(undefined, args);
    }
  }, {
    key: 'pattern',
    value: function pattern() {
      for (var _len17 = arguments.length, clauses = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        clauses[_key17] = arguments[_key17];
      }

      var length = clauses.length;

      var tests = new Array(length);
      for (var i = 0; i < length; i++) {
        var clause = clauses[i];
        var annotation = this.getAnnotation(clause);
        if (!annotation) {
          if (i !== length - 1) {
            throw new Error(`Invalid Pattern - found unannotated function in position ${i}, default clauses must be last.`);
          }
          tests[i] = true;
        } else {
          invariant(annotation instanceof FunctionType || annotation instanceof ParameterizedFunctionType, 'Pattern clauses must be annotated functions.');
          tests[i] = annotation;
        }
      }
      return function () {
        for (var _i = 0; _i < tests.length; _i++) {
          var test = tests[_i];
          var _clause = clauses[_i];
          if (test === true) {
            return _clause.apply(undefined, arguments);
          } else if (test.acceptsParams.apply(test, arguments)) {
            return _clause.apply(undefined, arguments);
          }
        }
        var error = new TypeError('Value did not match any of the candidates.');
        error.name = 'RuntimeTypeError';
        throw error;
      };
    }
  }, {
    key: 'wrapIterator',
    value: function wrapIterator(type) {
      var t = this;
      return function* wrappedIterator(input) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            yield t.check(type, item);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };
    }
  }, {
    key: 'refinement',
    value: function refinement(type) {
      var target = new RefinementType(this);
      target.type = type;

      for (var _len18 = arguments.length, constraints = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        constraints[_key18 - 1] = arguments[_key18];
      }

      target.addConstraint.apply(target, toConsumableArray(constraints));
      return target;
    }
  }, {
    key: '$exact',
    value: function $exact(type) {
      var target = new ObjectType(this);
      type = type.unwrap();
      if (Array.isArray(type.callProperties)) {
        var _target$callPropertie2;

        (_target$callPropertie2 = target.callProperties).push.apply(_target$callPropertie2, toConsumableArray(type.callProperties));
      }
      if (Array.isArray(type.indexers)) {
        var _target$indexers2;

        (_target$indexers2 = target.indexers).push.apply(_target$indexers2, toConsumableArray(type.indexers));
      }
      if (Array.isArray(type.properties)) {
        var _target$properties;

        (_target$properties = target.properties).push.apply(_target$properties, toConsumableArray(type.properties));
      }
      target.exact = true;
      return target;
    }
  }, {
    key: '$diff',
    value: function $diff(aType, bType) {
      var target = new $DiffType(this);
      target.aType = aType;
      target.bType = bType;
      return target;
    }
  }, {
    key: '$flowFixMe',
    value: function $flowFixMe() {
      return new $FlowFixMeType(this);
    }
  }, {
    key: '$keys',
    value: function $keys(type) {
      var target = new $KeysType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$objMap',
    value: function $objMap(object, mapper) {
      var target = new $ObjMapType(this);
      target.object = object;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$objMapi',
    value: function $objMapi(object, mapper) {
      var target = new $ObjMapiType(this);
      target.object = object;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$propertyType',
    value: function $propertyType(object, property) {
      var target = new $PropertyType(this);
      target.object = object;
      if (property instanceof Type) {
        var unwrapped = property.unwrap();
        target.property = unwrapped.value;
      } else {
        target.property = property;
      }
      return target;
    }
  }, {
    key: '$shape',
    value: function $shape(type) {
      var target = new $ShapeType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$subtype',
    value: function $subtype(type) {
      var target = new $SubType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$supertype',
    value: function $supertype(type) {
      var target = new $SuperType(this);
      target.type = type;
      return target;
    }
  }, {
    key: '$tupleMap',
    value: function $tupleMap(tuple, mapper) {
      var target = new $TupleMapType(this);
      target.tuple = tuple;
      target.mapper = mapper;
      return target;
    }
  }, {
    key: '$values',
    value: function $values(type) {
      var target = new $ValuesType(this);
      target.type = type;
      return target;
    }
  }, {
    key: 'Class',
    value: function Class(instanceType) {
      var target = new ClassType(this);
      target.instanceType = instanceType;
      return target;
    }
  }, {
    key: 'TypeParametersSymbol',


    // Issue 252
    get: function get$$1() {
      return TypeParametersSymbol;
    }
  }]);
  return TypeContext;
}();

var globalContext$1 = void 0;
if (typeof global !== 'undefined' && typeof global.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__ !== 'undefined') {
  globalContext$1 = global.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__;
} else {
  globalContext$1 = new TypeContext();
  registerPrimitiveTypes(globalContext$1);
  registerBuiltinTypeConstructors(globalContext$1);
  registerTypePredicates(globalContext$1);
  if (typeof global !== 'undefined') {
    global.__FLOW_RUNTIME_GLOBAL_CONTEXT_DO_NOT_USE_THIS_VARIABLE__ = globalContext$1;
  }
}

var globalContext$2 = globalContext$1;

// This file is part of leanes-restful-addon.
const cpoMetaObject$1 = Symbol.for('~metaObject');
const cphTemplatesList = Symbol.for('~templatesList');
function loadTemplates(Module) {
  assert(Module[cpoMetaObject$1] != null, 'Target for `loadTemplates` decorator must be a Class');
  const {
    FsUtils
  } = Module.NS;
  assert(FsUtils != null, 'Target for `loadTemplates` decorator should has FsUtilsAddon');
  const {
    Utils: {
      filesTreeSync
    }
  } = FsUtils.NS;

  let _filesTreeSyncType = globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.param("_arg1", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(globalContext$2.array(globalContext$2.string())));

  _filesTreeSyncType.assert(filesTreeSync);

  const vsRoot = Module.prototype.ROOT != null ? Module.prototype.ROOT : '.';
  const vsTemplatesDir = `${vsRoot}/templates`;
  const files = filesTreeSync(vsTemplatesDir, {
    filesOnly: true,
    nosort: true
  });
  const templatesList = (files != null ? files : []).map(i => {
    const templateName = i.replace(/\.js/, '');
    const vsTemplatePath = `${vsTemplatesDir}/${templateName}`;
    return vsTemplatePath;
  });
  Reflect.defineProperty(Module, cphTemplatesList, {
    enumerable: true,
    writable: true,
    value: templatesList
  });
  return Module;
}

var __filename$1 = '/mixins/BodyParseMixin.js';

var BodyParseMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    property
  } = Module.NS;
  Module.defineMixin(__filename$1, BaseClass => {
    var _class, _class2, _init, _descriptor, _class3, _temp;

    let Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "withRawBody", _descriptor, this);
      }

      async parseBody(...args) {
        const {
          parsed,
          raw
        } = await parse(this.context.req, {
          returnRawBody: this.withRawBody
        });
        this.context.request.body = parsed;
        this.context.request.raw = raw;
        return args;
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "withRawBody", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return false;
      }
    }), _applyDecoratedDescriptor(_class2.prototype, "parseBody", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "parseBody"), _class2.prototype)), _class2)) || _class;

    return Mixin;
  });
});

var __filename$2 = '/mixins/BulkMethodsRendererMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const ContextInterface = globalContext$2.type("ContextInterface", globalContext$2.object(globalContext$2.property("req", globalContext$2.ref("object")), globalContext$2.property("res", globalContext$2.ref("object")), globalContext$2.property("request", globalContext$2.nullable(globalContext$2.ref("HttpRequestInterface"))), globalContext$2.property("response", globalContext$2.nullable(globalContext$2.ref("HttpResponseInterface"))), globalContext$2.property("cookies", globalContext$2.nullable(globalContext$2.ref("HttpCookiesInterface"))), globalContext$2.property("state", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("respond", globalContext$2.nullable(globalContext$2.boolean())), globalContext$2.property("routePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("pathParams", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("transaction", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("session", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("throw", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.number()), globalContext$2.nullable(globalContext$2.string()), globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("assert", globalContext$2.function(globalContext$2.rest("_argrest", globalContext$2.ref("args")), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("onerror", globalContext$2.function(globalContext$2.param("err", globalContext$2.nullable(globalContext$2.any())), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("is", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean()))))), globalContext$2.property("accepts", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean())))), globalContext$2.property("acceptsEncodings", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("acceptsCharsets", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("acceptsLanguages", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("get", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.string()))), globalContext$2.property("set", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.nullable(globalContext$2.any())))), globalContext$2.property("append", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string(), globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("flushHeaders", globalContext$2.function(globalContext$2.return(globalContext$2.void()))), globalContext$2.property("remove", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("setReqResPair", globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())))));

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const ResourceListResultT = globalContext$2.type("ResourceListResultT", globalContext$2.exactObject(globalContext$2.property("meta", globalContext$2.exactObject(globalContext$2.property("pagination", globalContext$2.exactObject(globalContext$2.property("limit", globalContext$2.union(globalContext$2.number(), globalContext$2.string("not defined"))), globalContext$2.property("offset", globalContext$2.union(globalContext$2.number(), globalContext$2.string("not defined"))))))), globalContext$2.property("items", globalContext$2.array(globalContext$2.ref("object")))));

// This file is part of leanes-restful-addon.
const ResourceListResultT$1 = globalContext$2.tdz(() => ResourceListResultT);
const ContextInterface$1 = globalContext$2.tdz(() => ContextInterface);
const ResourceInterface = globalContext$2.type("ResourceInterface", globalContext$2.object(globalContext$2.property("list", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(ResourceListResultT$1))))), globalContext$2.property("detail", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object"))))), globalContext$2.property("create", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object"))))), globalContext$2.property("update", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object"))))), globalContext$2.property("delete", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("destroy", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("doAction", globalContext$2.function(globalContext$2.param("asAction", globalContext$2.string()), globalContext$2.param("context", globalContext$2.ref(ContextInterface$1)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.any()))))), globalContext$2.property("saveDelayeds", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))))));

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const RouterRouteT = globalContext$2.type("RouterRouteT", globalContext$2.object(globalContext$2.property("method", globalContext$2.string()), globalContext$2.property("path", globalContext$2.string()), globalContext$2.property("resource", globalContext$2.string()), globalContext$2.property("action", globalContext$2.string()), globalContext$2.property("tag", globalContext$2.string()), globalContext$2.property("template", globalContext$2.string()), globalContext$2.property("keyName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("entityName", globalContext$2.string()), globalContext$2.property("recordName", globalContext$2.nullable(globalContext$2.string()))));

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const RendererListResultT = globalContext$2.type("RendererListResultT", globalContext$2.object(globalContext$2.property("meta", globalContext$2.exactObject(globalContext$2.property("pagination", globalContext$2.exactObject(globalContext$2.property("limit", globalContext$2.union(globalContext$2.number(), globalContext$2.string("not defined"))), globalContext$2.property("offset", globalContext$2.union(globalContext$2.number(), globalContext$2.string("not defined"))))))), globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.array(globalContext$2.ref("object")))));

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const RendererItemResultT = globalContext$2.type("RendererItemResultT", globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.nullable(globalContext$2.ref("object")))));

const RendererItemResultT$1 = globalContext$2.tdz(() => RendererItemResultT);
const RendererListResultT$1 = globalContext$2.tdz(() => RendererListResultT);
const RouterRouteT$1 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$1 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$2 = globalContext$2.tdz(() => ContextInterface);
var BulkMethodsRendererMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method
  } = Module.NS;
  Module.defineMixin(__filename$2, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("bulkDelete", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn.typeParameter("R", undefined, globalContext$2.void());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("bulkDestroy", _fn2 => {
      const T = _fn2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn2.typeParameter("R", undefined, globalContext$2.void());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("render", _fn3 => {
      const T = _fn3.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn3.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$1), globalContext$2.ref(RendererItemResultT$1), globalContext$2.any())));

      return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$2)), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("resource", globalContext$2.ref(ResourceInterface$1)), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouterRouteT$1))), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async bulkDelete(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.void());

        let _resourceType = globalContext$2.string();

        let _actionType = globalContext$2.string();

        let _aoDataType = globalContext$2.flowInto(T);

        let _templatePathType = globalContext$2.nullable(globalContext$2.string());

        const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType).assert(resource);
        globalContext$2.param("action", _actionType).assert(action);
        globalContext$2.param("aoData", _aoDataType).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType).assert(templatePath);
        return _returnType.assert();
      }

      async bulkDestroy(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.void());

        let _resourceType2 = globalContext$2.string();

        let _actionType2 = globalContext$2.string();

        let _aoDataType2 = globalContext$2.flowInto(T);

        let _templatePathType2 = globalContext$2.nullable(globalContext$2.string());

        const _returnType2 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType2).assert(resource);
        globalContext$2.param("action", _actionType2).assert(action);
        globalContext$2.param("aoData", _aoDataType2).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType2).assert(templatePath);
        return _returnType2.assert();
      }

      async render(ctx, aoData, resource, opts = {}) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$1), globalContext$2.ref(RendererItemResultT$1), globalContext$2.any())));

        let _ctxType = globalContext$2.ref(ContextInterface$2);

        let _aoDataType3 = globalContext$2.flowInto(T);

        let _resourceType3 = globalContext$2.ref(ResourceInterface$1);

        let _optsType = globalContext$2.nullable(globalContext$2.ref(RouterRouteT$1));

        const _returnType3 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("ctx", _ctxType).assert(ctx);
        globalContext$2.param("aoData", _aoDataType3).assert(aoData);
        globalContext$2.param("resource", _resourceType3).assert(resource);
        globalContext$2.param("opts", _optsType).assert(opts);
        const args = arguments;
        const {
          path,
          resource: resourceName,
          action,
          template: templatePath
        } = opts;

        if (path != null && resourceName != null && action != null) {
          const {
            Templates
          } = this.Module.NS;
          return _returnType3.assert(await Promise.resolve().then(() => {
            const template = Templates != null ? Templates[templatePath] : undefined;

            if (_.isFunction(template)) {
              return template.call(resource, resourceName, action, aoData);
            } else if (_.includes(['bulkDelete', 'bulkDestroy'], action)) {
              return this[action].call(resource, resourceName, action, aoData, templatePath);
            } else {
              return super.render(...args);
            }
          }));
        } else {
          return _returnType3.assert(aoData);
        }
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "bulkDelete", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "bulkDelete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "bulkDestroy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "bulkDestroy"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "render", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$3 = '/mixins/CheckAdminOnlyResourceMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var CheckAdminOnlyResourceMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    Utils: {
      statuses
    }
  } = Module.NS;
  const UNAUTHORIZED = statuses('unauthorized');
  const FORBIDDEN = statuses('forbidden');
  Module.defineMixin(__filename$3, BaseClass => {
    var _class, _class2, _init, _class3, _temp;

    let Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async adminOnly(...args) {
        if (this.session.uid == null) {
          this.context.throw(UNAUTHORIZED);
          return;
        }

        if (!this.session.userIsAdmin) {
          this.context.throw(FORBIDDEN);
          return;
        }

        return args;
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "adminOnly", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "adminOnly"), _class2.prototype)), _class2)) || _class;

    return Mixin;
  });
});

var __filename$4 = '/mixins/CheckApiVersionResourceMixin.js';

var CheckApiVersionResourceMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    Utils: {
      assert,
      statuses
    }
  } = Module.NS;
  const UPGRADE_REQUIRED = statuses('upgrade required');
  Module.defineMixin(__filename$4, BaseClass => {
    var _class, _class2, _init, _class3, _temp;

    let Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async checkApiVersion(...args) {
        const vVersion = this.context.pathParams.v;
        assert(this.configs != null, `Needs to add '@mixin(ConfigurableMixin)' decorator to ${this.constructor.name}`);
        const vCurrentVersion = this.configs.version;
        assert(vCurrentVersion != null, 'No `version` specified in the configuration');
        const [vNeedVersion] = vCurrentVersion.match(/^\d{1,}[.]\d{1,}/) || [];
        assert(vNeedVersion != null, 'Incorrect `version` specified in the configuration');

        if (!semver.satisfies(vCurrentVersion, vVersion)) {
          this.context.throw(UPGRADE_REQUIRED, `Upgrade: v${vCurrentVersion}`);
        }

        return args;
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "checkApiVersion", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "checkApiVersion"), _class2.prototype)), _class2)) || _class;

    return Mixin;
  });
});

var __filename$5 = '/mixins/CheckSchemaVersionResourceMixin.js';

// This file is part of leanes-mapper-addon.
//
// leanes-mapper-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-mapper-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-mapper-addon.  If not, see <https://www.gnu.org/licenses/>.
// import type { CollectionInterface } from './CollectionInterface';
const CursorInterface = globalContext$2.type("CursorInterface", CursorInterface => {
  const Collection = CursorInterface.typeParameter("Collection"),
        Delegate = CursorInterface.typeParameter("Delegate"),
        Iterable = CursorInterface.typeParameter("Iterable", undefined, globalContext$2.array(globalContext$2.nullable(Delegate)));
  return globalContext$2.object(globalContext$2.property("isClosed", globalContext$2.boolean()), globalContext$2.property("setCollection", globalContext$2.function(globalContext$2.param("aoCollection", Collection), globalContext$2.return(CursorInterface))), globalContext$2.property("setIterable", globalContext$2.function(globalContext$2.param("alArray", Iterable), globalContext$2.return(CursorInterface))), globalContext$2.property("toArray", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.array(globalContext$2.nullable(Delegate)))))), globalContext$2.property("next", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(Delegate))))), globalContext$2.property("hasNext", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.boolean())))), globalContext$2.property("close", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("count", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.number())))), globalContext$2.property("forEach", globalContext$2.function(globalContext$2.param("lambda", globalContext$2.function(globalContext$2.param("_arg0", Delegate), globalContext$2.param("_arg1", globalContext$2.number()), globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("Promise", globalContext$2.void()))))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("map", globalContext$2.function(_fn => {
    const R = _fn.typeParameter("R");

    return [globalContext$2.param("lambda", globalContext$2.function(globalContext$2.param("_arg0", Delegate), globalContext$2.param("_arg1", globalContext$2.number()), globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R))))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.array(R)))];
  })), globalContext$2.property("filter", globalContext$2.function(globalContext$2.param("lambda", globalContext$2.function(globalContext$2.param("_arg0", Delegate), globalContext$2.param("_arg1", globalContext$2.number()), globalContext$2.return(globalContext$2.union(globalContext$2.boolean(), globalContext$2.ref("Promise", globalContext$2.boolean()))))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.array(globalContext$2.nullable(Delegate)))))), globalContext$2.property("find", globalContext$2.function(globalContext$2.param("lambda", globalContext$2.function(globalContext$2.param("_arg0", Delegate), globalContext$2.param("_arg1", globalContext$2.number()), globalContext$2.return(globalContext$2.union(globalContext$2.boolean(), globalContext$2.ref("Promise", globalContext$2.boolean()))))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(Delegate))))), globalContext$2.property("compact", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.array(globalContext$2.nullable(Delegate)))))), globalContext$2.property("reduce", globalContext$2.function(_fn2 => {
    const I = _fn2.typeParameter("I");

    return [globalContext$2.param("lambda", globalContext$2.function(globalContext$2.param("_arg0", I), globalContext$2.param("_arg1", Delegate), globalContext$2.param("_arg2", globalContext$2.number()), globalContext$2.return(globalContext$2.union(I, globalContext$2.ref("Promise", I))))), globalContext$2.param("initialValue", I), globalContext$2.return(globalContext$2.ref("Promise", I))];
  })), globalContext$2.property("first", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(Delegate))))));
});

// This file is part of leanes-mapper-addon.
const CursorInterface$1 = globalContext$2.tdz(() => CursorInterface);
const CollectionInterface = globalContext$2.type("CollectionInterface", CollectionInterface => {
  const T = CollectionInterface.typeParameter("T");
  return globalContext$2.object(globalContext$2.property("collectionName", globalContext$2.function(globalContext$2.return(globalContext$2.string()))), globalContext$2.property("collectionPrefix", globalContext$2.function(globalContext$2.return(globalContext$2.string()))), globalContext$2.property("collectionFullName", globalContext$2.function(globalContext$2.param("asName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.string()))), globalContext$2.property("recordHasBeenChanged", globalContext$2.function(globalContext$2.param("asType", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("generateId", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.union(globalContext$2.string(), globalContext$2.number()))))), globalContext$2.property("build", globalContext$2.function(globalContext$2.param("properties", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("create", globalContext$2.function(globalContext$2.param("properties", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("push", globalContext$2.function(globalContext$2.param("aoRecord", T), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("delete", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("destroy", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("remove", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("find", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(T))))), globalContext$2.property("findMany", globalContext$2.function(globalContext$2.param("ids", globalContext$2.array(globalContext$2.union(globalContext$2.string(), globalContext$2.number()))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(CursorInterface$1, globalContext$2.ref(CollectionInterface, T), T))))), globalContext$2.property("take", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(T))))), globalContext$2.property("takeMany", globalContext$2.function(globalContext$2.param("ids", globalContext$2.array(globalContext$2.union(globalContext$2.string(), globalContext$2.number()))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(CursorInterface$1, globalContext$2.ref(CollectionInterface, T), T))))), globalContext$2.property("takeAll", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(CursorInterface$1, globalContext$2.ref(CollectionInterface, T), T))))), globalContext$2.property("update", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.param("properties", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("override", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.param("aoRecord", T), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("clone", globalContext$2.function(globalContext$2.param("aoRecord", T), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("copy", globalContext$2.function(globalContext$2.param("aoRecord", T), globalContext$2.return(globalContext$2.ref("Promise", T)))), globalContext$2.property("includes", globalContext$2.function(globalContext$2.param("id", globalContext$2.union(globalContext$2.string(), globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.boolean())))), globalContext$2.property("length", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.number())))));
});

// This file is part of leanes-mapper-addon.
//
// leanes-mapper-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-mapper-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-mapper-addon.  If not, see <https://www.gnu.org/licenses/>.
// import type { CollectionInterface } from './CollectionInterface';
// import type { RecordStaticInterface } from './RecordStaticInterface';
const RecordInterface = globalContext$2.type("RecordInterface", RecordInterface => {
  return globalContext$2.object(globalContext$2.property("parseRecordName", globalContext$2.function(globalContext$2.param("asName", globalContext$2.string()), globalContext$2.return(globalContext$2.tuple(globalContext$2.string(), globalContext$2.string())))), globalContext$2.property("findRecordByName", globalContext$2.function(globalContext$2.param("asName", globalContext$2.string()), globalContext$2.return(globalContext$2.Class(globalContext$2.existential())))), globalContext$2.property("save", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("create", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("update", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("delete", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.union(globalContext$2.void(), RecordInterface))))), globalContext$2.property("destroy", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("attributes", globalContext$2.function(globalContext$2.return(globalContext$2.ref("object")))), globalContext$2.property("clone", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("copy", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("decrement", globalContext$2.function(globalContext$2.param("asAttribute", globalContext$2.string()), globalContext$2.param("step", globalContext$2.nullable(globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("increment", globalContext$2.function(globalContext$2.param("asAttribute", globalContext$2.string()), globalContext$2.param("step", globalContext$2.nullable(globalContext$2.number())), globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("toggle", globalContext$2.function(globalContext$2.param("asAttribute", globalContext$2.string()), globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("updateAttribute", globalContext$2.function(globalContext$2.param("name", globalContext$2.string()), globalContext$2.param("value", globalContext$2.nullable(globalContext$2.any())), globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("updateAttributes", globalContext$2.function(globalContext$2.param("aoAttributes", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("isNew", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.boolean())))), globalContext$2.property("reload", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", RecordInterface)))), globalContext$2.property("changedAttributes", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.tuple(globalContext$2.nullable(globalContext$2.any()), globalContext$2.nullable(globalContext$2.any())))))))), globalContext$2.property("resetAttribute", globalContext$2.function(globalContext$2.param("asAttribute", globalContext$2.string()), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("rollbackAttributes", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))));
});

const RecordInterface$1 = globalContext$2.tdz(() => RecordInterface);
const CollectionInterface$1 = globalContext$2.tdz(() => CollectionInterface);
const slice = [].slice;
var CheckSchemaVersionResourceMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    property,
    inject,
    Utils: {
      assert
    }
  } = Module.NS;
  Module.defineMixin(__filename$5, BaseClass => {
    let _t$TypeParametersSymb;

    var _dec, _dec2, _dec3, _class, _class2, _init, _descriptor, _class3, _temp;

    const _MixinTypeParametersSymbol = Symbol("MixinTypeParameters");

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", Mixin => {
      const D = Mixin.typeParameter("D", undefined, globalContext$2.ref(RecordInterface$1));
      return [globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_collectionFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(CollectionInterface$1, globalContext$2.flowInto(D))))), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("_migrations", globalContext$2.return(globalContext$2.ref(CollectionInterface$1))), globalContext$2.method("checkSchemaVersion", globalContext$2.param("args", globalContext$2.any()))];
    })), _dec2 = globalContext$2.decorate(function () {
      return globalContext$2.function(globalContext$2.return(globalContext$2.ref(CollectionInterface$1, globalContext$2.flowInto(this[_MixinTypeParametersSymbol].D))));
    }), _dec3 = inject('CollectionFactory<*>'), _dec(_class = initializeMixin(_class = (_class2 = (_temp = (_t$TypeParametersSymb = globalContext$2.TypeParametersSymbol, _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        const _typeParameters = {
          D: globalContext$2.typeParameter("D")
        };
        super(...args);

        _initializerDefineProperty(this, "_collectionFactory", _descriptor, this);

        this[_MixinTypeParametersSymbol] = _typeParameters;
      }

      get _migrations() {
        const _returnType = globalContext$2.return(globalContext$2.ref(CollectionInterface$1));

        return _returnType.assert(this._collectionFactory(this.ApplicationModule.NS.MIGRATIONS));
      }

      async checkSchemaVersion(...args) {
        const migrationNames = this.ApplicationModule.NS.MIGRATION_NAMES;
        const [lastMigration] = slice.call(migrationNames, -1);

        if (lastMigration == null) {
          return args;
        }

        const includes = await this._migrations.includes(lastMigration);

        if (includes) {
          return args;
        } else {
          assert.fail('Code schema version is not equal current DB version');
        }

        return args;
      }

    }), _class3[_t$TypeParametersSymb] = _MixinTypeParametersSymbol, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_collectionFactory", [_dec2, _dec3, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, "_migrations", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_migrations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkSchemaVersion", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "checkSchemaVersion"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$6 = '/mixins/ContextifyApplicationMediatorMixin.js';

// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.
const NotificationInterface = globalContext$2.type("NotificationInterface", NotificationInterface => {
  const T = NotificationInterface.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.any()));
  return globalContext$2.object(globalContext$2.property("getName", globalContext$2.function(globalContext$2.return(globalContext$2.string()))), globalContext$2.property("setBody", globalContext$2.function(globalContext$2.param("aoBody", T), globalContext$2.return(T))), globalContext$2.property("getBody", globalContext$2.function(globalContext$2.return(T))), globalContext$2.property("setType", globalContext$2.function(globalContext$2.param("asType", globalContext$2.string()), globalContext$2.return(globalContext$2.string()))), globalContext$2.property("getType", globalContext$2.function(globalContext$2.return(globalContext$2.nullable(globalContext$2.string())))));
});

const ResourceInterface$2 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$3 = globalContext$2.tdz(() => ContextInterface);
const NotificationInterface$1 = globalContext$2.tdz(() => NotificationInterface);
var ContextifyApplicationMediatorMixin = (Module => {
  const {
    RESOURCE_RESULT,
    initializeMixin,
    meta,
    method
  } = Module.NS;
  Module.defineMixin(__filename$6, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("listNotificationInterests", globalContext$2.param("args", globalContext$2.any()), globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("handleNotification", globalContext$2.param("aoNotification", globalContext$2.ref(NotificationInterface$1)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("execute", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn.typeParameter("R", undefined, globalContext$2.ref("Promise", globalContext$2.exactObject(globalContext$2.property("result", T), globalContext$2.property("resource", globalContext$2.ref(ResourceInterface$2)))));

      return [globalContext$2.param("resourceName", globalContext$2.string()), globalContext$2.param("opts", globalContext$2.object(globalContext$2.property("context", globalContext$2.ref(ContextInterface$3)), globalContext$2.property("reverse", globalContext$2.string()))), globalContext$2.param("action", globalContext$2.string()), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      listNotificationInterests(...args) {
        const _returnType2 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

        const interests = super.listNotificationInterests(...args);
        interests.push(RESOURCE_RESULT);
        return _returnType2.assert(interests);
      }

      handleNotification(aoNotification) {
        let _aoNotificationType = globalContext$2.ref(NotificationInterface$1);

        const _returnType3 = globalContext$2.return(globalContext$2.void());

        globalContext$2.param("aoNotification", _aoNotificationType).assert(aoNotification);
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();

        switch (vsName) {
          case RESOURCE_RESULT:
            this.emitter.emit(vsType, voBody);
            break;

          default:
            super.handleNotification(aoNotification);
        }
      }

      async execute(resourceName, opts, action) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref("Promise", globalContext$2.exactObject(globalContext$2.property("result", T), globalContext$2.property("resource", globalContext$2.ref(ResourceInterface$2)))));

        let _resourceNameType = globalContext$2.string();

        let _optsType = globalContext$2.object(globalContext$2.property("context", globalContext$2.ref(ContextInterface$3)), globalContext$2.property("reverse", globalContext$2.string()));

        let _actionType = globalContext$2.string();

        const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resourceName", _resourceNameType).assert(resourceName);
        globalContext$2.param("opts", _optsType).assert(opts);
        globalContext$2.param("action", _actionType).assert(action);
        const {
          context,
          reverse
        } = opts;
        return _returnType.assert(await new Promise((resolve, reject) => {
          // resolve();
          try {
            this.emitter.once(reverse, ({
              error,
              result,
              resource
            }) => {
              if (error != null) {
                reject(error);
                return;
              }

              resolve({
                result,
                resource
              });
            });
            this.send(resourceName, {
              context,
              reverse
            }, action, null);
          } catch (err) {
            reject(err);
          }
        }));
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "listNotificationInterests", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "listNotificationInterests"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleNotification", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "handleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "execute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "execute"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$7 = '/mixins/ContextifyApplicationMixin.js';

const ResourceInterface$3 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$4 = globalContext$2.tdz(() => ContextInterface);
var ContextifyApplicationMixin = (Module => {
  const {
    APPLICATION_MEDIATOR,
    initializeMixin,
    meta,
    method,
    property
  } = Module.NS;
  Module.defineMixin(__filename$7, BaseClass => {
    var _dec, _dec2, _class, _class2, _init, _descriptor, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("context", globalContext$2.ref(ContextInterface$4)), globalContext$2.method("execute", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn.typeParameter("R", undefined, globalContext$2.ref("Promise", globalContext$2.exactObject(globalContext$2.property("result", T), globalContext$2.property("resource", globalContext$2.ref(ResourceInterface$3)))));

      return [globalContext$2.param("resourceName", globalContext$2.string()), globalContext$2.param("_arg1", globalContext$2.any()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }))), _dec2 = globalContext$2.decorate(globalContext$2.ref(ContextInterface$4)), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "context", _descriptor, this);
      }

      async execute(resourceName, {
        context: ContextInterface,
        reverse: string
      }, action) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref("Promise", globalContext$2.exactObject(globalContext$2.property("result", T), globalContext$2.property("resource", globalContext$2.ref(ResourceInterface$3)))));

        let _resourceNameType = globalContext$2.string();

        let _actionType = globalContext$2.string();

        const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resourceName", _resourceNameType).assert(resourceName);
        globalContext$2.param("action", _actionType).assert(action);
        this.context = context;
        const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
        return _returnType.assert(await appMediator.execute(resourceName, {
          context,
          reverse
        }, action));
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "context", [_dec2, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return null;
      }
    }), _applyDecoratedDescriptor(_class2.prototype, "execute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "execute"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$8 = '/mixins/ContextifyResourceExecutionMixin.js';

// This file is part of LeanES.
const NotificationInterface$2 = globalContext$2.tdz(() => NotificationInterface);
const MediatorInterface = globalContext$2.type("MediatorInterface", globalContext$2.object(globalContext$2.property("getMediatorName", globalContext$2.function(globalContext$2.return(globalContext$2.string()))), globalContext$2.property("getViewComponent", globalContext$2.function(globalContext$2.return(globalContext$2.nullable(globalContext$2.any())))), globalContext$2.property("setViewComponent", globalContext$2.function(globalContext$2.param("aoViewComponent", globalContext$2.nullable(globalContext$2.any())), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("listNotificationInterests", globalContext$2.function(globalContext$2.return(globalContext$2.array()))), globalContext$2.property("handleNotification", globalContext$2.function(_fn => {
  const T = _fn.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.any()));

  return [globalContext$2.param("aoNotification", globalContext$2.ref(NotificationInterface$2, T)), globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("Promise", globalContext$2.void())))];
})), globalContext$2.property("onRegister", globalContext$2.function(globalContext$2.return(globalContext$2.void()))), globalContext$2.property("onRemove", globalContext$2.function(globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))))));

const MediatorInterface$1 = globalContext$2.tdz(() => MediatorInterface);
const NotificationInterface$3 = globalContext$2.tdz(() => NotificationInterface);
var ContextifyResourceExecutionMixin = (Module => {
  const {
    APPLICATION_MEDIATOR,
    LIGHTWEIGHT,
    initializeMixin,
    meta,
    method,
    property,
    inject
  } = Module.NS;
  Module.defineMixin(__filename$8, BaseClass => {
    var _dec, _dec2, _dec3, _class, _class2, _init, _descriptor, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_appMediatorFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(MediatorInterface$1)))), globalContext$2.method("_appMediator", globalContext$2.return(globalContext$2.ref(MediatorInterface$1))), globalContext$2.method("execute", globalContext$2.param("aoNotification", globalContext$2.ref(NotificationInterface$3)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))))), _dec2 = globalContext$2.decorate(globalContext$2.function(globalContext$2.return(globalContext$2.ref(MediatorInterface$1)))), _dec3 = inject(`Factory<${APPLICATION_MEDIATOR}>`), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "_appMediatorFactory", _descriptor, this);
      }

      get _appMediator() {
        const _returnType2 = globalContext$2.return(globalContext$2.ref(MediatorInterface$1));

        return _returnType2.assert(this._appMediatorFactory());
      }

      async execute(aoNotification) {
        let _aoNotificationType = globalContext$2.ref(NotificationInterface$3);

        const _returnType = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

        globalContext$2.param("aoNotification", _aoNotificationType).assert(aoNotification);
        let voResult;
        const {
          ERROR,
          DEBUG,
          LEVELS,
          SEND_TO_LOG
        } = Module.NS.Pipes.NS.LogMessage;
        const resourceName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsAction = aoNotification.getType();

        const service = this._appMediator.getViewComponent();

        try {
          if (service.context != null) {
            return _returnType.assert(await super.execute(aoNotification));
          } else {
            this.send(SEND_TO_LOG, '>>>>>>>>>> LIGHTWEIGHT CREATE', LEVELS[DEBUG]);
            const t1 = Date.now();
            const app = this.Module.NS.MainApplication.new(LIGHTWEIGHT);
            app.start();
            this.send(SEND_TO_LOG, `>>>>>>>>>> LIGHTWEIGHT START after ${Date.now() - t1}`, LEVELS[DEBUG]);
            voResult = await app.execute(resourceName, voBody, vsAction);
            this.send(SEND_TO_LOG, '>>>>>>>>>> LIGHTWEIGHT END', LEVELS[DEBUG]);
            const t2 = Date.now();
            await app.finish();
            this.send(SEND_TO_LOG, `>>>>>>>>>> LIGHTWEIGHT DESTROYED after ${Date.now() - t2}`, LEVELS[DEBUG]);
          }
        } catch (error) {
          voResult = {
            error,
            resource: this
          };
        }

        this.send(RESOURCE_RESULT, voResult, voBody.reverse);
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_appMediatorFactory", [_dec2, _dec3, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, "_appMediator", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_appMediator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "execute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "execute"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$9 = '/mixins/CountMethodsRendererMixin.js';

const RendererItemResultT$2 = globalContext$2.tdz(() => RendererItemResultT);
const RendererListResultT$2 = globalContext$2.tdz(() => RendererListResultT);
const RouterRouteT$2 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$4 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$5 = globalContext$2.tdz(() => ContextInterface);
var CountMethodsRendererMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method
  } = Module.NS;
  Module.defineMixin(__filename$9, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("count", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn.typeParameter("R", undefined, globalContext$2.number());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("length", _fn2 => {
      const T = _fn2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn2.typeParameter("R", undefined, globalContext$2.number());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("render", _fn3 => {
      const T = _fn3.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn3.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$2), globalContext$2.ref(RendererItemResultT$2), globalContext$2.any())));

      return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$5)), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("resource", globalContext$2.ref(ResourceInterface$4)), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouterRouteT$2))), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async count(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.number());

        let _resourceType = globalContext$2.string();

        let _actionType = globalContext$2.string();

        let _aoDataType = globalContext$2.flowInto(T);

        let _templatePathType = globalContext$2.nullable(globalContext$2.string());

        const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType).assert(resource);
        globalContext$2.param("action", _actionType).assert(action);
        globalContext$2.param("aoData", _aoDataType).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType).assert(templatePath);
        return _returnType.assert(aoData);
      }

      async length(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.number());

        let _resourceType2 = globalContext$2.string();

        let _actionType2 = globalContext$2.string();

        let _aoDataType2 = globalContext$2.flowInto(T);

        let _templatePathType2 = globalContext$2.nullable(globalContext$2.string());

        const _returnType2 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType2).assert(resource);
        globalContext$2.param("action", _actionType2).assert(action);
        globalContext$2.param("aoData", _aoDataType2).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType2).assert(templatePath);
        return _returnType2.assert(aoData);
      }

      async render(ctx, aoData, resource, opts = {}) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$2), globalContext$2.ref(RendererItemResultT$2), globalContext$2.any())));

        let _ctxType = globalContext$2.ref(ContextInterface$5);

        let _aoDataType3 = globalContext$2.flowInto(T);

        let _resourceType3 = globalContext$2.ref(ResourceInterface$4);

        let _optsType = globalContext$2.nullable(globalContext$2.ref(RouterRouteT$2));

        const _returnType3 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("ctx", _ctxType).assert(ctx);
        globalContext$2.param("aoData", _aoDataType3).assert(aoData);
        globalContext$2.param("resource", _resourceType3).assert(resource);
        globalContext$2.param("opts", _optsType).assert(opts);
        const args = arguments;
        const {
          path,
          resource: resourceName,
          action,
          template: templatePath
        } = opts;

        if (path != null && resourceName != null && action != null) {
          const {
            Templates
          } = this.Module.NS;
          return _returnType3.assert(await Promise.resolve().then(() => {
            const template = Templates != null ? Templates[templatePath] : undefined;

            if (_.isFunction(template)) {
              return template.call(resource, resourceName, action, aoData);
            } else if (_.includes(['count', 'length'], action)) {
              return this[action].call(resource, resourceName, action, aoData, templatePath);
            } else {
              return super.render(...args);
            }
          }));
        } else {
          return _returnType3.assert(aoData);
        }
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "count", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "count"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "render", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$a = '/mixins/CrudRendererMixin.js';

const RendererItemResultT$3 = globalContext$2.tdz(() => RendererItemResultT);
const RendererListResultT$3 = globalContext$2.tdz(() => RendererListResultT);
const ResourceListResultT$2 = globalContext$2.tdz(() => ResourceListResultT);
const RouterRouteT$3 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$5 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$6 = globalContext$2.tdz(() => ContextInterface);
var CrudRendererMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    Utils: {
      _
    }
  } = Module.NS;
  Module.defineMixin(__filename$a, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("create", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.ref("object"));

      const R = _fn.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("delete", _fn2 => {
      const T = _fn2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn2.typeParameter("R", undefined, globalContext$2.void());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("destroy", _fn3 => {
      const T = _fn3.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));

      const R = _fn3.typeParameter("R", undefined, globalContext$2.void());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("detail", _fn4 => {
      const T = _fn4.typeParameter("T", undefined, globalContext$2.ref("object"));

      const R = _fn4.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("itemDecorator", globalContext$2.param("aoData", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.ref("object"))))), globalContext$2.method("list", _fn5 => {
      const T = _fn5.typeParameter("T", undefined, globalContext$2.ref(ResourceListResultT$2));

      const R = _fn5.typeParameter("R", undefined, globalContext$2.ref(RendererListResultT$3));

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("query", _fn6 => {
      const T = _fn6.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn6.typeParameter("R", undefined, globalContext$2.any());

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("update", _fn7 => {
      const T = _fn7.typeParameter("T", undefined, globalContext$2.ref("object"));

      const R = _fn7.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

      return [globalContext$2.param("resource", globalContext$2.string()), globalContext$2.param("action", globalContext$2.string()), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("templatePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }), globalContext$2.method("render", _fn8 => {
      const T = _fn8.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn8.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$3), globalContext$2.ref(RendererItemResultT$3), globalContext$2.any())));

      return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$6)), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("resource", globalContext$2.ref(ResourceInterface$5)), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouterRouteT$3))), globalContext$2.return(globalContext$2.ref("Promise", R))];
    }))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async create(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.ref("object"));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

        let _resourceType = globalContext$2.string();

        let _actionType = globalContext$2.string();

        let _aoDataType = globalContext$2.flowInto(T);

        let _templatePathType = globalContext$2.nullable(globalContext$2.string());

        const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType).assert(resource);
        globalContext$2.param("action", _actionType).assert(action);
        globalContext$2.param("aoData", _aoDataType).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType).assert(templatePath);
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = this.Module.NS.Templates[templateName] || Mixin.prototype.itemDecorator;
        return _returnType.assert({
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        });
      }

      async 'delete'(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.void());

        let _resourceType2 = globalContext$2.string();

        let _actionType2 = globalContext$2.string();

        let _aoDataType2 = globalContext$2.flowInto(T);

        let _templatePathType2 = globalContext$2.nullable(globalContext$2.string());

        const _returnType2 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType2).assert(resource);
        globalContext$2.param("action", _actionType2).assert(action);
        globalContext$2.param("aoData", _aoDataType2).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType2).assert(templatePath);
        return _returnType2.assert();
      }

      async destroy(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.nullable(globalContext$2.ref("object")));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.void());

        let _resourceType3 = globalContext$2.string();

        let _actionType3 = globalContext$2.string();

        let _aoDataType3 = globalContext$2.flowInto(T);

        let _templatePathType3 = globalContext$2.nullable(globalContext$2.string());

        const _returnType3 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType3).assert(resource);
        globalContext$2.param("action", _actionType3).assert(action);
        globalContext$2.param("aoData", _aoDataType3).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType3).assert(templatePath);
        return _returnType3.assert();
      }

      async detail(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.ref("object"));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

        let _resourceType4 = globalContext$2.string();

        let _actionType4 = globalContext$2.string();

        let _aoDataType4 = globalContext$2.flowInto(T);

        let _templatePathType4 = globalContext$2.nullable(globalContext$2.string());

        const _returnType4 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType4).assert(resource);
        globalContext$2.param("action", _actionType4).assert(action);
        globalContext$2.param("aoData", _aoDataType4).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType4).assert(templatePath);
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = this.Module.NS.Templates[templateName] || Mixin.prototype.itemDecorator;
        return _returnType4.assert({
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        });
      }

      async itemDecorator(aoData) {
        let _aoDataType5 = globalContext$2.nullable(globalContext$2.ref("object"));

        const _returnType5 = globalContext$2.return(globalContext$2.union(globalContext$2.nullable(globalContext$2.ref("object")), globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.ref("object")))));

        globalContext$2.param("aoData", _aoDataType5).assert(aoData);

        if (aoData != null) {
          result = JSON.parse(JSON.stringify(aoData));
          let {
            createdAt,
            updatedAt,
            deletedAt
          } = aoData;
          createdAt = createdAt && createdAt.toISOString() || null;
          updatedAt = updatedAt && updatedAt.toISOString() || null;
          deletedAt = deletedAt && deletedAt.toISOString() || null;
          result.createdAt = createdAt;
          result.updatedAt = updatedAt;
          result.deletedAt = deletedAt;
        } else {
          result = null;
        }

        return _returnType5.assert(result);
      }

      async list(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.ref(ResourceListResultT$2));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref(RendererListResultT$3));

        let _resourceType5 = globalContext$2.string();

        let _actionType5 = globalContext$2.string();

        let _aoDataType6 = globalContext$2.flowInto(T);

        let _templatePathType5 = globalContext$2.nullable(globalContext$2.string());

        const _returnType6 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType5).assert(resource);
        globalContext$2.param("action", _actionType5).assert(action);
        globalContext$2.param("aoData", _aoDataType6).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType5).assert(templatePath);
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = this.Module.NS.Templates[templateName] || Mixin.prototype.itemDecorator;
        return _returnType6.assert({
          meta: aoData.meta,
          [this.listEntityName]: await Promise.all(aoData.items.map(itemDecorator.bind(this)))
        });
      }

      async query(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.any());

        let _resourceType6 = globalContext$2.string();

        let _actionType6 = globalContext$2.string();

        let _aoDataType7 = globalContext$2.flowInto(T);

        let _templatePathType6 = globalContext$2.nullable(globalContext$2.string());

        const _returnType7 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType6).assert(resource);
        globalContext$2.param("action", _actionType6).assert(action);
        globalContext$2.param("aoData", _aoDataType7).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType6).assert(templatePath);
        return _returnType7.assert(aoData);
      }

      async update(resource, action, aoData, templatePath) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.ref("object"));
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.ref(RendererItemResultT$3));

        let _resourceType7 = globalContext$2.string();

        let _actionType7 = globalContext$2.string();

        let _aoDataType8 = globalContext$2.flowInto(T);

        let _templatePathType7 = globalContext$2.nullable(globalContext$2.string());

        const _returnType8 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("resource", _resourceType7).assert(resource);
        globalContext$2.param("action", _actionType7).assert(action);
        globalContext$2.param("aoData", _aoDataType8).assert(aoData);
        globalContext$2.param("templatePath", _templatePathType7).assert(templatePath);
        const templateName = templatePath.replace(new RegExp(`/${action}$`), '/itemDecorator');
        const itemDecorator = this.Module.NS.Templates[templateName] || Mixin.prototype.itemDecorator;
        return _returnType8.assert({
          [this.itemEntityName]: await itemDecorator.call(this, aoData)
        });
      }

      async render(ctx, aoData, resource, opts = {}) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$3), globalContext$2.ref(RendererItemResultT$3), globalContext$2.any())));

        let _ctxType = globalContext$2.ref(ContextInterface$6);

        let _aoDataType9 = globalContext$2.flowInto(T);

        let _resourceType8 = globalContext$2.ref(ResourceInterface$5);

        let _optsType = globalContext$2.nullable(globalContext$2.ref(RouterRouteT$3));

        const _returnType9 = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

        globalContext$2.param("ctx", _ctxType).assert(ctx);
        globalContext$2.param("aoData", _aoDataType9).assert(aoData);
        globalContext$2.param("resource", _resourceType8).assert(resource);
        globalContext$2.param("opts", _optsType).assert(opts);
        const args = arguments;
        const {
          path,
          resource: resourceName,
          action,
          template: templatePath
        } = opts;

        if (path != null && resourceName != null && action != null) {
          const {
            Templates
          } = this.Module.NS;
          return _returnType9.assert(await Promise.resolve().then(() => {
            const template = Templates != null ? Templates[templatePath] : undefined;

            if (_.isFunction(template)) {
              return template.call(resource, resourceName, action, aoData);
            } else if (_.includes(['create', 'delete', 'destroy', 'detail', 'list', 'update'], action)) {
              return this[action].call(resource, resourceName, action, aoData, templatePath);
            } else {
              return super.render(...args);
            }
          }));
        } else {
          return _returnType9.assert(aoData);
        }
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "create", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'delete', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'delete'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroy", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "destroy"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "detail", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "detail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "itemDecorator", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "itemDecorator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "list", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "list"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "query", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "render", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$b = '/mixins/EditableResourceMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var EditableResourceMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    chains,
    Utils: {
      _
    }
  } = Module.NS;
  Module.defineMixin(__filename$b, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = chains(function () {
      this.beforeHook('protectEditable', {
        only: ['create', 'update', 'delete']
      });
      this.beforeHook('setCurrentUserOnCreate', {
        only: ['create']
      });
      this.beforeHook('setCurrentUserOnUpdate', {
        only: ['update']
      });
      this.beforeHook('setCurrentUserOnDelete', {
        only: ['delete']
      });
    }), initializeMixin(_class = _dec(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async setCurrentUserOnCreate(...args) {
        this.recordBody.creatorId = this.session.uid || null;
        this.recordBody.editorId = this.recordBody.creatorId;
        return args;
      }

      async setCurrentUserOnUpdate(...args) {
        this.recordBody.editorId = this.session.uid || null;
        return args;
      }

      async setCurrentUserOnDelete(...args) {
        this.recordBody.editorId = this.session.uid || null;
        this.recordBody.removerId = this.recordBody.editorId;
        return args;
      }

      async protectEditable(...args) {
        this.recordBody = _.omit(this.recordBody, ['creatorId', 'editorId', 'removerId']);
        return args;
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "setCurrentUserOnCreate", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentUserOnCreate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentUserOnUpdate", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentUserOnUpdate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentUserOnDelete", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentUserOnDelete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "protectEditable", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "protectEditable"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$c = '/mixins/OwnerableResourceMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var OwnerableResourceMixin = (Module => {
  const {
    initializeMixin,
    meta,
    method,
    property,
    Utils: {
      _,
      statuses
    }
  } = Module.NS;
  const HTTP_NOT_FOUND = statuses('not found');
  const UNAUTHORIZED = statuses('unauthorized');
  const FORBIDDEN = statuses('forbidden');
  Module.defineMixin(__filename$c, BaseClass => {
    var _dec, _dec2, _class, _class2, _init, _descriptor, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("listQuery", globalContext$2.ref("object")), globalContext$2.method("setOwnerId", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("protectOwnerId", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("filterOwnerByCurrentUser", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("checkOwner", globalContext$2.param("args", globalContext$2.any())))), _dec2 = globalContext$2.decorate(globalContext$2.ref("object")), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "listQuery", _descriptor, this);
      }

      async setOwnerId(...args) {
        this.recordBody.ownerId = this.session.uid || null;
        return args;
      }

      async protectOwnerId(...args) {
        this.recordBody = _.omit(this.recordBody, ['ownerId']);
        return args;
      }

      async filterOwnerByCurrentUser(...args) {
        if (this.listQuery.$filter != null) {
          this.listQuery.$filter = {
            $and: [this.listQuery.$filter, {
              '@doc.ownerId': {
                $eq: this.session.uid
              }
            }]
          };
        } else {
          this.listQuery.$filter = {
            '@doc.ownerId': {
              $eq: this.session.uid
            }
          };
        }

        return args;
      }

      async checkOwner(...args) {
        if (this.session.uid == null) {
          this.context.throw(UNAUTHORIZED);
          return;
        }

        if (this.session.userIsAdmin) {
          return args;
        }

        const key = this.context.pathParams[this.keyName];

        if (key == null) {
          return args;
        }

        const doc = await this.collection.find(key);

        if (doc == null) {
          this.context.throw(HTTP_NOT_FOUND);
        }

        if (!doc.ownerId) {
          return args;
        }

        if (this.session.uid !== doc.ownerId) {
          this.context.throw(FORBIDDEN);
          return;
        }

        return args;
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "listQuery", [_dec2, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return {};
      }
    }), _applyDecoratedDescriptor(_class2.prototype, "setOwnerId", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setOwnerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "protectOwnerId", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "protectOwnerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filterOwnerByCurrentUser", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "filterOwnerByCurrentUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkOwner", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "checkOwner"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$d = '/mixins/PerformSyntheticRequestApplicationMixin.js';

// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.
const LegacyResponseInterface = globalContext$2.type("LegacyResponseInterface", LegacyResponseInterface => {
  const T = LegacyResponseInterface.typeParameter("T", undefined, globalContext$2.tdz(() => AxiosResponse, "AxiosResponse"));
  return globalContext$2.object(globalContext$2.property("body", globalContext$2.nullable(globalContext$2.$propertyType(T, globalContext$2.string("data")))), globalContext$2.property("headers", globalContext$2.$propertyType(T, globalContext$2.string("headers"))), globalContext$2.property("status", globalContext$2.$propertyType(T, globalContext$2.string("status"))), globalContext$2.property("message", globalContext$2.$propertyType(T, globalContext$2.string("statusText"))));
});

const AxiosResponse = globalContext$2.type("AxiosResponse", AxiosResponse => {
  const T = AxiosResponse.typeParameter("T", undefined, globalContext$2.any()),
        R = AxiosResponse.typeParameter("R", undefined, T);
  return globalContext$2.object(globalContext$2.property("data", R), globalContext$2.property("status", globalContext$2.number()), globalContext$2.property("statusText", globalContext$2.string()), globalContext$2.property("headers", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("config", globalContext$2.ref(globalContext$2.tdz(() => Config, "Config"), T, R)), globalContext$2.property("request", globalContext$2.nullable(globalContext$2.any())));
});
const AxiosTransformer = globalContext$2.type("AxiosTransformer", AxiosTransformer => {
  const T = AxiosTransformer.typeParameter("T");
  return globalContext$2.object(globalContext$2.callProperty(globalContext$2.function(globalContext$2.param("data", T), globalContext$2.param("headers", globalContext$2.ref("object"), true), globalContext$2.return(globalContext$2.ref("object")))));
});
const AxiosBasicCredentials = globalContext$2.type("AxiosBasicCredentials", globalContext$2.object(globalContext$2.property("username", globalContext$2.string()), globalContext$2.property("password", globalContext$2.string())));
const AxiosProxyConfig = globalContext$2.type("AxiosProxyConfig", globalContext$2.object(globalContext$2.property("host", globalContext$2.string()), globalContext$2.property("port", globalContext$2.number()), globalContext$2.property("auth", globalContext$2.object(globalContext$2.property("username", globalContext$2.string()), globalContext$2.property("password", globalContext$2.string())), true), globalContext$2.property("protocol", globalContext$2.string(), true)));
const Method = globalContext$2.type("Method", globalContext$2.union(globalContext$2.string("get"), globalContext$2.string("GET"), globalContext$2.string("delete"), globalContext$2.string("DELETE"), globalContext$2.string("head"), globalContext$2.string("HEAD"), globalContext$2.string("options"), globalContext$2.string("OPTIONS"), globalContext$2.string("post"), globalContext$2.string("POST"), globalContext$2.string("put"), globalContext$2.string("PUT"), globalContext$2.string("patch"), globalContext$2.string("PATCH")));
const ResponseType = globalContext$2.type("ResponseType", globalContext$2.union(globalContext$2.string("arraybuffer"), globalContext$2.string("blob"), globalContext$2.string("document"), globalContext$2.string("json"), globalContext$2.string("text"), globalContext$2.string("stream")));
const RequestArgumentsT = globalContext$2.type("RequestArgumentsT", RequestArgumentsT => {
  const T = RequestArgumentsT.typeParameter("T"),
        R = RequestArgumentsT.typeParameter("R", undefined, T);
  return globalContext$2.tuple(globalContext$2.string(), globalContext$2.string(), globalContext$2.nullable(globalContext$2.ref(globalContext$2.tdz(() => Config, "Config"), T, R)));
}); // export type AxiosPromise<T = any, R = T> = Promise<AxiosResponse<T, R>>;

const Config = globalContext$2.type("Config", Config => {
  const T = Config.typeParameter("T"),
        R = Config.typeParameter("R", undefined, T);
  return globalContext$2.object(globalContext$2.property("url", globalContext$2.string(), true), globalContext$2.property("method", Method, true), globalContext$2.property("baseURL", globalContext$2.string(), true), globalContext$2.property("transformRequest", globalContext$2.union(globalContext$2.ref(AxiosTransformer, T), globalContext$2.array(globalContext$2.ref(AxiosTransformer, T)), globalContext$2.object(globalContext$2.indexer("key", globalContext$2.number(), globalContext$2.ref(AxiosTransformer, T)))), true), globalContext$2.property("transformResponse", globalContext$2.union(globalContext$2.ref(AxiosTransformer, R), globalContext$2.array(globalContext$2.ref(AxiosTransformer, R)), globalContext$2.object(globalContext$2.indexer("key", globalContext$2.number(), globalContext$2.ref(AxiosTransformer, T)))), true), globalContext$2.property("headers", globalContext$2.ref("object"), true), globalContext$2.property("params", globalContext$2.ref("object"), true), globalContext$2.property("paramsSerializer", globalContext$2.function(globalContext$2.param("params", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.string())), true), globalContext$2.property("data", globalContext$2.any(), true), globalContext$2.property("body", globalContext$2.any(), true), globalContext$2.property("form", globalContext$2.any(), true), globalContext$2.property("timeout", globalContext$2.number(), true), globalContext$2.property("withCredentials", globalContext$2.boolean(), true), globalContext$2.property("adapter", globalContext$2.function(_fn => {
    const T = _fn.typeParameter("T"),
          R = _fn.typeParameter("R");

    return [globalContext$2.param("config", globalContext$2.ref(Config, T, R)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(AxiosResponse, T, R)))];
  }), true), globalContext$2.property("auth", AxiosBasicCredentials, true), globalContext$2.property("responseType", ResponseType, true), globalContext$2.property("xsrfCookieName", globalContext$2.string(), true), globalContext$2.property("xsrfHeaderName", globalContext$2.string(), true), globalContext$2.property("onUploadProgress", globalContext$2.function(globalContext$2.param("progressEvent", globalContext$2.any()), globalContext$2.return(globalContext$2.void())), true), globalContext$2.property("onDownloadProgress", globalContext$2.function(globalContext$2.param("progressEvent", globalContext$2.any()), globalContext$2.return(globalContext$2.void())), true), globalContext$2.property("maxContentLength", globalContext$2.number(), true), globalContext$2.property("validateStatus", globalContext$2.function(globalContext$2.param("status", globalContext$2.number()), globalContext$2.return(globalContext$2.boolean())), true), globalContext$2.property("followRedirect", globalContext$2.boolean(), true), globalContext$2.property("maxRedirects", globalContext$2.number(), true), globalContext$2.property("socketPath", globalContext$2.union(globalContext$2.string(), globalContext$2.null()), true), globalContext$2.property("httpAgent", globalContext$2.mixed(), true), globalContext$2.property("httpsAgent", globalContext$2.mixed(), true), globalContext$2.property("proxy", globalContext$2.union(AxiosProxyConfig, globalContext$2.boolean(false)), true), globalContext$2.property("cancelToken", globalContext$2.tdz(() => CancelToken, "CancelToken"), true));
});
const LegacyRequestInterface = globalContext$2.type("LegacyRequestInterface", globalContext$2.object(globalContext$2.callProperty(globalContext$2.function(_fn2 => {
  const T = _fn2.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn2.typeParameter("R", undefined, T),
        L = _fn2.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("method", globalContext$2.string()), globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("head", globalContext$2.function(_fn3 => {
  const T = _fn3.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn3.typeParameter("R", undefined, T),
        L = _fn3.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("options", globalContext$2.function(_fn4 => {
  const T = _fn4.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn4.typeParameter("R", undefined, T),
        L = _fn4.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("get", globalContext$2.function(_fn5 => {
  const T = _fn5.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn5.typeParameter("R", undefined, T),
        L = _fn5.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("post", globalContext$2.function(_fn6 => {
  const T = _fn6.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn6.typeParameter("R", undefined, T),
        L = _fn6.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("put", globalContext$2.function(_fn7 => {
  const T = _fn7.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn7.typeParameter("R", undefined, T),
        L = _fn7.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("patch", globalContext$2.function(_fn8 => {
  const T = _fn8.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn8.typeParameter("R", undefined, T),
        L = _fn8.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
})), globalContext$2.property("delete", globalContext$2.function(_fn9 => {
  const T = _fn9.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn9.typeParameter("R", undefined, T),
        L = _fn9.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface, globalContext$2.ref(AxiosResponse, T, R)));

  return [globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.nullable(globalContext$2.ref(Config, T, R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
}))));

const Cancel = globalContext$2.type("Cancel", globalContext$2.object(globalContext$2.property("message", globalContext$2.string())));
const Canceler = globalContext$2.type("Canceler", globalContext$2.object(globalContext$2.callProperty(globalContext$2.function(globalContext$2.param("message", globalContext$2.string(), true), globalContext$2.return(globalContext$2.void())))));
const CancelTokenStatic = globalContext$2.type("CancelTokenStatic", globalContext$2.object(globalContext$2.property("new", globalContext$2.function(globalContext$2.param("executor", globalContext$2.function(globalContext$2.param("cancel", Canceler), globalContext$2.return(globalContext$2.void()))), globalContext$2.return(globalContext$2.tdz(() => CancelToken, "CancelToken")))), globalContext$2.property("source", globalContext$2.function(globalContext$2.return(globalContext$2.tdz(() => CancelTokenSource, "CancelTokenSource"))))));
const CancelToken = globalContext$2.type("CancelToken", globalContext$2.object(globalContext$2.property("promise", globalContext$2.ref("Promise", Cancel)), globalContext$2.property("reason", Cancel, true), globalContext$2.property("throwIfRequested", globalContext$2.function(globalContext$2.return(globalContext$2.void())))));
const CancelTokenSource = globalContext$2.type("CancelTokenSource", globalContext$2.object(globalContext$2.property("token", CancelToken), globalContext$2.property("cancel", Canceler)));
const AxiosInterceptorManager = globalContext$2.type("AxiosInterceptorManager", AxiosInterceptorManager => {
  const V = AxiosInterceptorManager.typeParameter("V");
  return globalContext$2.object(globalContext$2.property("use", globalContext$2.function(globalContext$2.param("onFulfilled", globalContext$2.function(globalContext$2.param("value", V), globalContext$2.return(globalContext$2.union(V, globalContext$2.ref("Promise", V)))), true), globalContext$2.param("onRejected", globalContext$2.function(globalContext$2.param("error", globalContext$2.mixed()), globalContext$2.return(globalContext$2.mixed())), true), globalContext$2.return(globalContext$2.number()))), globalContext$2.property("eject", globalContext$2.function(globalContext$2.param("id", globalContext$2.number()), globalContext$2.return(globalContext$2.void()))));
});
const RequestT = globalContext$2.type("RequestT", globalContext$2.spread(LegacyRequestInterface, globalContext$2.object(globalContext$2.property("defaults", globalContext$2.intersection(globalContext$2.object(globalContext$2.property("headers", globalContext$2.ref("object"))), globalContext$2.ref(Config, globalContext$2.existential(), globalContext$2.existential()))), globalContext$2.property("interceptors", globalContext$2.object(globalContext$2.property("request", globalContext$2.ref(AxiosInterceptorManager, globalContext$2.ref(Config, globalContext$2.existential(), globalContext$2.existential()))), globalContext$2.property("response", globalContext$2.ref(AxiosInterceptorManager, globalContext$2.ref(AxiosResponse, globalContext$2.mixed()))))), globalContext$2.property("CancelToken", CancelTokenStatic), globalContext$2.property("create", globalContext$2.function(globalContext$2.param("config", globalContext$2.ref(Config, globalContext$2.existential(), globalContext$2.existential())), globalContext$2.return(LegacyRequestInterface))), globalContext$2.property("all", globalContext$2.function(_fn10 => {
  const T = _fn10.typeParameter("T");

  return [globalContext$2.param("values", globalContext$2.array(globalContext$2.union(T, globalContext$2.ref("Promise", T)))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.array(T)))];
})), globalContext$2.property("spread", globalContext$2.function(_fn11 => {
  const T = _fn11.typeParameter("T"),
        R = _fn11.typeParameter("R");

  return [globalContext$2.param("callback", globalContext$2.function(globalContext$2.rest("args", globalContext$2.array(T)), globalContext$2.return(R))), globalContext$2.return(globalContext$2.function(globalContext$2.param("array", globalContext$2.array(T)), globalContext$2.return(R)))];
})))));
 // export type RequestT = RequestT;

const LegacyResponseInterface$1 = globalContext$2.tdz(() => LegacyResponseInterface);
const AxiosResponse$1 = globalContext$2.tdz(() => AxiosResponse);
const Config$1 = globalContext$2.tdz(() => Config);
var PerformSyntheticRequestApplicationMixin = (Module => {
  const {
    APPLICATION_MEDIATOR,
    initializeMixin,
    meta,
    method
  } = Module.NS;
  Module.defineMixin(__filename$d, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("perform", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn.typeParameter("R", undefined, T);

      const L = _fn.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$1, globalContext$2.ref(AxiosResponse$1, T, R)));

      return [globalContext$2.param("methodName", globalContext$2.string()), globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.ref(Config$1, globalContext$2.flowInto(T), globalContext$2.flowInto(R))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(L)))];
    }))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      async perform(methodName, url, options) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, T);
        const L = globalContext$2.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$1, globalContext$2.ref(AxiosResponse$1, T, R)));

        let _methodNameType = globalContext$2.string();

        let _urlType = globalContext$2.string();

        let _optionsType = globalContext$2.ref(Config$1, globalContext$2.flowInto(T), globalContext$2.flowInto(R));

        const _returnType = globalContext$2.return(globalContext$2.union(globalContext$2.nullable(L), globalContext$2.ref("Promise", globalContext$2.nullable(L))));

        globalContext$2.param("methodName", _methodNameType).assert(methodName);
        globalContext$2.param("url", _urlType).assert(url);
        globalContext$2.param("options", _optionsType).assert(options);
        const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
        return _returnType.assert(((await appMediator.perform) < T, L > (options)));
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "perform", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "perform"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$e = '/mixins/PerformSyntheticRequestMixin.js';

// This file is part of leanes-restful-addon.
const RendererItemResultT$4 = globalContext$2.tdz(() => RendererItemResultT);
const RendererListResultT$4 = globalContext$2.tdz(() => RendererListResultT);
const RouterRouteT$4 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$6 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$7 = globalContext$2.tdz(() => ContextInterface);
const RendererInterface = globalContext$2.type("RendererInterface", globalContext$2.object(globalContext$2.property("render", globalContext$2.function(_fn => {
  const T = _fn.typeParameter("T", undefined, globalContext$2.any()),
        R = _fn.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$4), globalContext$2.ref(RendererItemResultT$4), globalContext$2.any())));

  return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$7)), globalContext$2.param("aoData", T), globalContext$2.param("resource", globalContext$2.ref(ResourceInterface$6)), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouterRouteT$4))), globalContext$2.return(globalContext$2.ref("Promise", R))];
}))));

// This file is part of leanes-restful-addon.
const LegacyResponseInterface$2 = globalContext$2.tdz(() => LegacyResponseInterface);
const AxiosResponse$2 = globalContext$2.tdz(() => AxiosResponse);
const Config$2 = globalContext$2.tdz(() => Config);
const RouterRouteT$5 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$7 = globalContext$2.tdz(() => ResourceInterface);
const RendererInterface$1 = globalContext$2.tdz(() => RendererInterface);
const ContextInterface$8 = globalContext$2.tdz(() => ContextInterface);
const HttpMediatorInterface = globalContext$2.type("HttpMediatorInterface", HttpMediatorInterface => {
  return globalContext$2.object(globalContext$2.property("middlewares", globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$8)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), globalContext$2.property("handlers", globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$8)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), globalContext$2.property("responseFormats", globalContext$2.array(globalContext$2.string())), globalContext$2.property("routerName", globalContext$2.string()), globalContext$2.property("use", globalContext$2.function(globalContext$2.param("index", globalContext$2.union(globalContext$2.number(), globalContext$2.function())), globalContext$2.param("middleware", globalContext$2.nullable(globalContext$2.function())), globalContext$2.return(HttpMediatorInterface))), globalContext$2.property("callback", globalContext$2.function(globalContext$2.return(globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))))), globalContext$2.property("handleStatistics", globalContext$2.function(globalContext$2.param("reqLength", globalContext$2.number()), globalContext$2.param("resLength", globalContext$2.number()), globalContext$2.param("time", globalContext$2.number()), globalContext$2.param("aoContext", globalContext$2.ref(ContextInterface$8)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("onerror", globalContext$2.function(globalContext$2.param("err", globalContext$2.ref("Error")), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("respond", globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$8)), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("perform", globalContext$2.function(_fn => {
    const T = _fn.typeParameter("T", undefined, globalContext$2.any()),
          R = _fn.typeParameter("R", undefined, T),
          L = _fn.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$2, globalContext$2.ref(AxiosResponse$2, T, R)));

    return [globalContext$2.param("method", globalContext$2.string()), globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.ref(Config$2, T, R)), globalContext$2.return(globalContext$2.ref("Promise", L))];
  })), globalContext$2.property("rendererFor", globalContext$2.function(globalContext$2.param("asFormat", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RendererInterface$1)))), globalContext$2.property("sendHttpResponse", globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$8)), globalContext$2.param("aoData", globalContext$2.nullable(globalContext$2.any())), globalContext$2.param("resource", globalContext$2.ref(ResourceInterface$7)), globalContext$2.param("opts", globalContext$2.ref(RouterRouteT$5)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("defineRoutes", globalContext$2.function(globalContext$2.return(globalContext$2.void()))), globalContext$2.property("sender", globalContext$2.function(globalContext$2.param("resourceName", globalContext$2.string()), globalContext$2.param("aoMessage", globalContext$2.exactObject(globalContext$2.property("context", globalContext$2.ref(ContextInterface$8)), globalContext$2.property("reverse", globalContext$2.string()))), globalContext$2.param("params", globalContext$2.ref(RouterRouteT$5)), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("createNativeRoute", globalContext$2.function(globalContext$2.param("opts", globalContext$2.ref(RouterRouteT$5)), globalContext$2.return(globalContext$2.void()))));
});

const HttpMediatorInterface$1 = globalContext$2.tdz(() => HttpMediatorInterface);
const LegacyResponseInterface$3 = globalContext$2.tdz(() => LegacyResponseInterface);
const AxiosResponse$3 = globalContext$2.tdz(() => AxiosResponse);
const Config$3 = globalContext$2.tdz(() => Config);
var PerformSyntheticRequestMixin = (Module => {
  const {
    HTTP_MEDIATOR,
    initializeMixin,
    meta,
    method,
    property,
    inject
  } = Module.NS;
  Module.defineMixin(__filename$e, BaseClass => {
    var _dec, _dec2, _dec3, _class, _class2, _init, _descriptor, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_httpMediatorFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$1)))), globalContext$2.method("_httpMediator", globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$1))), globalContext$2.method("perform", _fn => {
      const T = _fn.typeParameter("T", undefined, globalContext$2.any());

      const R = _fn.typeParameter("R", undefined, T);

      const L = _fn.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$3, globalContext$2.ref(AxiosResponse$3, T, R)));

      return [globalContext$2.param("methodName", globalContext$2.string()), globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.ref(Config$3, globalContext$2.flowInto(T), globalContext$2.flowInto(R))), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(L)))];
    }))), _dec2 = globalContext$2.decorate(globalContext$2.function(globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$1)))), _dec3 = inject(`Factory<${HTTP_MEDIATOR}>`), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "_httpMediatorFactory", _descriptor, this);
      }

      get _httpMediator() {
        const _returnType2 = globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$1));

        return _returnType2.assert(this._httpMediatorFactory());
      }

      async perform(methodName, url, options) {
        const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
        const R = globalContext$2.typeParameter("R", undefined, T);
        const L = globalContext$2.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$3, globalContext$2.ref(AxiosResponse$3, T, R)));

        let _methodNameType = globalContext$2.string();

        let _urlType = globalContext$2.string();

        let _optionsType = globalContext$2.ref(Config$3, globalContext$2.flowInto(T), globalContext$2.flowInto(R));

        const _returnType = globalContext$2.return(globalContext$2.union(globalContext$2.nullable(L), globalContext$2.ref("Promise", globalContext$2.nullable(L))));

        globalContext$2.param("methodName", _methodNameType).assert(methodName);
        globalContext$2.param("url", _urlType).assert(url);
        globalContext$2.param("options", _optionsType).assert(options);

        if (this._httpMediator != null) {
          return _returnType.assert(((await this._httpMediator.perform) < T, L > (options)));
        }
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_httpMediatorFactory", [_dec2, _dec3, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, "_httpMediator", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_httpMediator"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "perform", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "perform"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$f = '/mixins/RestfulFacadeMixin.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
var RestfulFacadeMixin = (Module => {
  const {
    JSON_RENDERER,
    initializeMixin,
    meta,
    method
  } = Module.NS;
  Module.defineMixin(__filename$f, BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("initializeFacade", globalContext$2.return(globalContext$2.void())))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      initializeFacade() {
        const _returnType = globalContext$2.return(globalContext$2.void());

        super.initializeFacade(...arguments);

        if (!this.isBound('Context')) {
          this.bind('Context').to(this.Module.NS.Context);
        }

        if (!this.isBound('Factory<Context>')) {
          this.bind('Factory<Context>').toFactory(context => {
            return () => {
              return this.get('Context');
            };
          });
        }

        if (!this.isBound('HttpRequest')) {
          this.bind('HttpRequest').to(this.Module.NS.HttpRequest);
        }

        if (!this.isBound('HttpResponse')) {
          this.bind('HttpResponse').to(this.Module.NS.HttpResponse);
        }

        if (!this.isBound('HttpCookies')) {
          this.bind('HttpCookies').to(this.Module.NS.HttpCookies);
        }

        if (!this.isBound(JSON_RENDERER)) {
          this.bind(JSON_RENDERER).to(this.Module.NS.Renderer).inSingletonScope();
        }

        if (!this.isBound('RendererFactory<*>')) {
          this.bind('RendererFactory<*>').toFactory(context => {
            return globalContext$2.annotate(rendererName => {
              let _rendererNameType = globalContext$2.string();

              globalContext$2.param("rendererName", _rendererNameType).assert(rendererName);
              return this.get(rendererName);
            }, globalContext$2.function(globalContext$2.param("rendererName", globalContext$2.string())));
          });
        }

        if (!this.isBound('RouterFactory<*>')) {
          this.bind('RouterFactory<*>').toFactory(context => {
            return globalContext$2.annotate(routerName => {
              let _routerNameType = globalContext$2.string();

              globalContext$2.param("routerName", _routerNameType).assert(routerName);
              return this.get(`Factory<${routerName}>`)();
            }, globalContext$2.function(globalContext$2.param("routerName", globalContext$2.string())));
          });
        }

        if (!this.isBound('ResourceChecker<*>')) {
          this.bind('ResourceChecker<*>').toFactory(context => {
            return globalContext$2.annotate(resourceName => {
              let _resourceNameType = globalContext$2.string();

              globalContext$2.param("resourceName", _resourceNameType).assert(resourceName);
              return this.isBound(`Factory<${resourceName}>`);
            }, globalContext$2.function(globalContext$2.param("resourceName", globalContext$2.string())));
          });
        }
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "initializeFacade", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "initializeFacade"), _class2.prototype)), _class2)) || _class) || _class);
    return Mixin;
  });
});

var __filename$g = '/context/HttpRequest.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const HttpRequestInterface = globalContext$2.type("HttpRequestInterface", globalContext$2.object(globalContext$2.property("req", globalContext$2.ref("object")), globalContext$2.property("body", globalContext$2.nullable(globalContext$2.any())), globalContext$2.property("accepts", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean())))), globalContext$2.property("acceptsCharsets", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("acceptsEncodings", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("acceptsLanguages", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.property("is", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean()))))), globalContext$2.property("get", globalContext$2.function(globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.string()))), globalContext$2.property("setContext", globalContext$2.function(globalContext$2.param("context", globalContext$2.ref("ContextInterface")), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("setReq", globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())))));

const HttpRequestInterface$1 = globalContext$2.tdz(() => HttpRequestInterface);
const ContextInterface$9 = globalContext$2.tdz(() => ContextInterface);
var HttpRequest = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

  const {
    CoreObject,
    // ConfigurableMixin,
    assert,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    mixin,
    injectable,
    Utils: {
      _
    }
  } = Module.NS;
  let // @mixin(ConfigurableMixin)
  HttpRequest = (_dec = globalContext$2.annotate(globalContext$2.class("HttpRequest", globalContext$2.extends(CoreObject), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_req", globalContext$2.ref("object")), globalContext$2.method("req", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.property("ctx", globalContext$2.ref(ContextInterface$9)), globalContext$2.property("body", globalContext$2.nullable(globalContext$2.any())), globalContext$2.property("raw", globalContext$2.nullable(globalContext$2.any())), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("header", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("headers", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("originalUrl", globalContext$2.return(globalContext$2.string())), globalContext$2.method("url", globalContext$2.return(globalContext$2.string())), globalContext$2.method("url", globalContext$2.param("url", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("origin", globalContext$2.return(globalContext$2.string())), globalContext$2.method("href", globalContext$2.return(globalContext$2.string())), globalContext$2.method("method", globalContext$2.return(globalContext$2.string())), globalContext$2.method("method", globalContext$2.param("method", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("path", globalContext$2.return(globalContext$2.string())), globalContext$2.method("path", globalContext$2.param("path", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("query", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("query", globalContext$2.param("obj", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("querystring", globalContext$2.return(globalContext$2.string())), globalContext$2.method("querystring", globalContext$2.param("str", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("search", globalContext$2.return(globalContext$2.string())), globalContext$2.method("search", globalContext$2.param("str", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("host", globalContext$2.return(globalContext$2.string())), globalContext$2.method("hostname", globalContext$2.return(globalContext$2.string())), globalContext$2.method("fresh", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("stale", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("idempotent", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("socket", globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.method("charset", globalContext$2.return(globalContext$2.string())), globalContext$2.method("length", globalContext$2.return(globalContext$2.number())), globalContext$2.method("protocol", globalContext$2.return(globalContext$2.union(globalContext$2.string("http"), globalContext$2.string("https")))), globalContext$2.method("secure", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("ip", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("ips", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("subdomains", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("accepts", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean()))), globalContext$2.method("acceptsCharsets", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("acceptsEncodings", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("acceptsLanguages", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("is", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())))), globalContext$2.method("type", globalContext$2.return(globalContext$2.string())), globalContext$2.method("get", globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("setContext", globalContext$2.param("context", globalContext$2.ref(ContextInterface$9)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("setReq", globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())), globalContext$2.staticMethod("restoreObject"), globalContext$2.staticMethod("replicateObject"))), _dec2 = injectable(), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(globalContext$2.ref("object")), _dec5 = globalContext$2.decorate(globalContext$2.ref(ContextInterface$9)), _dec6 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.any())), _dec7 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.any())), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class HttpRequest extends CoreObject {
    // native request object
    get req() {
      const _returnType = globalContext$2.return(globalContext$2.ref("object"));

      // native request object
      return _returnType.assert(this._req);
    }

    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "_req", _descriptor, this);

      _initializerDefineProperty(this, "ctx", _descriptor2, this);

      _initializerDefineProperty(this, "body", _descriptor3, this);

      _initializerDefineProperty(this, "raw", _descriptor4, this);

      globalContext$2.ref(HttpRequestInterface$1).assert(this);
    }

    get header() {
      const _returnType2 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType2.assert(this.headers);
    }

    get headers() {
      const _returnType3 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType3.assert(this.req.headers);
    }

    get originalUrl() {
      const _returnType4 = globalContext$2.return(globalContext$2.string());

      return _returnType4.assert(this.ctx.originalUrl);
    }

    get url() {
      const _returnType5 = globalContext$2.return(globalContext$2.string());

      return _returnType5.assert(this.req.url);
    }

    set url(url) {
      let _urlType = globalContext$2.string();

      const _returnType6 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("url", _urlType).assert(url);
      return _returnType6.assert(this.req.url = url);
    }

    get origin() {
      const _returnType7 = globalContext$2.return(globalContext$2.string());

      return _returnType7.assert(`${this.protocol}://${this.host}`);
    }

    get href() {
      const _returnType8 = globalContext$2.return(globalContext$2.string());

      if (/^https?:\/\//i.test(this.originalUrl)) return _returnType8.assert(this.originalUrl);
      return _returnType8.assert(this.origin + this.originalUrl);
    }

    get method() {
      const _returnType9 = globalContext$2.return(globalContext$2.string());

      return _returnType9.assert(this.req.method);
    }

    set method(method) {
      let _methodType = globalContext$2.string();

      const _returnType10 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("method", _methodType).assert(method);
      return _returnType10.assert(this.req.method = method);
    }

    get path() {
      const _returnType11 = globalContext$2.return(globalContext$2.string());

      return _returnType11.assert(parse$1(this.req).pathname);
    }

    set path(path) {
      let _pathType = globalContext$2.string();

      const _returnType12 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("path", _pathType).assert(path);
      const url$1 = parse$1(this.req);
      if (url$1.pathname === path) return _returnType12.assert(path);
      url$1.pathname = path;
      url$1.path = null;
      return _returnType12.assert(this.url = url.format(url$1));
    }

    get query() {
      const _returnType13 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType13.assert(qs.parse(this.querystring));
    }

    set query(obj) {
      let _objType = globalContext$2.ref("object");

      const _returnType14 = globalContext$2.return(globalContext$2.ref("object"));

      globalContext$2.param("obj", _objType).assert(obj);
      this.querystring = qs.stringify(obj);
      return _returnType14.assert(obj);
    }

    get querystring() {
      const _returnType15 = globalContext$2.return(globalContext$2.string());

      if (this.req == null) return _returnType15.assert(''); // return parse(this.req).query || '';

      return _returnType15.assert(parse$1(this.req) != null ? parse$1(this.req).query : '');
    }

    set querystring(str) {
      let _strType = globalContext$2.string();

      const _returnType16 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("str", _strType).assert(str);
      const url$1 = parse$1(this.req);
      if (url$1.search === `?${str}`) return _returnType16.assert(str);
      url$1.search = str;
      url$1.path = null;
      return _returnType16.assert(this.url = url.format(url$1));
    }

    get search() {
      const _returnType17 = globalContext$2.return(globalContext$2.string());

      if (!this.querystring) return _returnType17.assert('');
      return _returnType17.assert(`?${this.querystring}`);
    }

    set search(str) {
      let _strType2 = globalContext$2.string();

      const _returnType18 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("str", _strType2).assert(str);
      return _returnType18.assert(this.querystring = str);
    }

    get host() {
      const _returnType19 = globalContext$2.return(globalContext$2.string());

      const trustProxy = this.configs != null && this.configs.trustProxy != null ? this.configs.trustProxy : false;
      const host = trustProxy && this.get('X-Forwarded-Host') || this.get('Host');
      if (!host) return _returnType19.assert('');
      return _returnType19.assert(host.split(/\s*,\s*/)[0]);
    }

    get hostname() {
      const _returnType20 = globalContext$2.return(globalContext$2.string());

      if (!this.host) {
        return _returnType20.assert('');
      }

      return _returnType20.assert(this.host.split(':')[0]);
    }

    get fresh() {
      const _returnType21 = globalContext$2.return(globalContext$2.boolean());

      const method = this.method;
      const s = this.ctx.status; // GET or HEAD for weak freshness validation only

      if ('GET' !== method && 'HEAD' !== method) return _returnType21.assert(false); // 2xx or 304 as per rfc2616 14.26

      if (s >= 200 && s < 300 || 304 == s) return _returnType21.assert(fresh(this.headers, this.ctx.response.headers));
      return _returnType21.assert(false);
    }

    get stale() {
      const _returnType22 = globalContext$2.return(globalContext$2.boolean());

      return _returnType22.assert(!this.fresh);
    }

    get idempotent() {
      const _returnType23 = globalContext$2.return(globalContext$2.boolean());

      const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
      return _returnType23.assert(_.includes(methods, this.method));
    }

    get socket() {
      const _returnType24 = globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")));

      return _returnType24.assert(this.req.socket);
    }

    get charset() {
      const _returnType25 = globalContext$2.return(globalContext$2.string());

      let type = this.get('Content-Type');
      if (type == null) return _returnType25.assert('');

      try {
        type = contentType.parse(type);
      } catch (error) {
        return _returnType25.assert('');
      }

      return _returnType25.assert(type.parameters.charset || '');
    }

    get length() {
      const _returnType26 = globalContext$2.return(globalContext$2.number());

      const contentLength = this.get('Content-Length');

      if (contentLength != null) {
        if (contentLength === '') return _returnType26.assert(0);
        return _returnType26.assert(~~Number(contentLength));
      } else {
        return _returnType26.assert(0);
      }
    }

    get protocol() {
      const _returnType27 = globalContext$2.return(globalContext$2.union(globalContext$2.string("http"), globalContext$2.string("https")));

      const trustProxy = this.configs != null && this.configs.trustProxy != null ? this.configs.trustProxy : false;
      if (this.socket != null ? this.socket.encrypted : undefined) return _returnType27.assert('https');
      if (this.req.secure) return _returnType27.assert('https');
      if (!trustProxy) return _returnType27.assert('http');
      const proto = this.get('X-Forwarded-Proto') || 'http';
      return _returnType27.assert(proto.split(/\s*,\s*/)[0]);
    }

    get secure() {
      const _returnType28 = globalContext$2.return(globalContext$2.boolean());

      return _returnType28.assert(this.protocol === 'https');
    }

    get ip() {
      const _returnType29 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      const socRemoteAddress = this.req.socket && this.req.socket.remoteAddress;
      const reqRemoteAddress = this.req.remoteAddress;
      return _returnType29.assert(this.ips[0] || socRemoteAddress || reqRemoteAddress || '');
    }

    get ips() {
      const _returnType30 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      // return [];
      const trustProxy = this.configs != null && this.configs.trustProxy != null ? this.configs.trustProxy : false;
      const value = this.get('X-Forwarded-For');

      if (trustProxy != null && value != null) {
        return _returnType30.assert(value.split(/\s*,\s*/));
      } else {
        return _returnType30.assert([]);
      }
    }

    get subdomains() {
      const _returnType31 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      // return [];
      const offset = this.configs != null && this.configs.subdomainOffset != null ? this.configs.subdomainOffset : 2;
      const hostname = this.hostname;
      if (net.isIP(hostname) != 0) return _returnType31.assert([]);
      return _returnType31.assert(hostname.split('.').reverse().slice(offset));
    }

    accepts(...args) {
      let _argsType = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType32 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean()));

      globalContext$2.rest("args", _argsType).assert(args);
      return _returnType32.assert(this.ctx.accept.types(...args));
    }

    acceptsCharsets(...args) {
      let _argsType2 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType33 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType2).assert(args);
      return _returnType33.assert(this.ctx.accept.charsets(...args));
    }

    acceptsEncodings(...args) {
      let _argsType3 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType34 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType3).assert(args);
      return _returnType34.assert(this.ctx.accept.encodings(...args));
    }

    acceptsLanguages(...args) {
      let _argsType4 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType35 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType4).assert(args);
      return _returnType35.assert(this.ctx.accept.languages(...args));
    }

    is(...args) {
      let _argsType5 = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      const _returnType36 = globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())));

      globalContext$2.rest("args", _argsType5).assert(args);
      let [types] = args;
      if (!types) return _returnType36.assert(typeIs.is(this.req));
      if (!_.isArray(types)) types = args;
      return _returnType36.assert(typeIs.is(this.req, types));
    }

    get type() {
      const _returnType37 = globalContext$2.return(globalContext$2.string());

      const type = this.get('Content-Type');
      if (type == null) return _returnType37.assert('');
      return _returnType37.assert(type.split(';')[0]);
    }

    'get'(field) {
      let _fieldType = globalContext$2.string();

      const _returnType38 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("field", _fieldType).assert(field);

      switch (field = _fieldType.assert(field.toLowerCase())) {
        case 'referer':
        case 'referrer':
          return _returnType38.assert(this.req.headers.referrer || this.req.headers.referer || '');

        default:
          return _returnType38.assert(this.req.headers[field] || '');
      }
    }

    setContext(context) {
      let _contextType = globalContext$2.ref(ContextInterface$9);

      const _returnType39 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("context", _contextType).assert(context);
      this.ctx = context;
    }

    setReq(req) {
      let _reqType = globalContext$2.ref("object");

      const _returnType40 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("req", _reqType).assert(req);
      this._req = req;
    }

    static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

  }, _class3.__filename = __filename$g, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_req", [_dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "req", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "req"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ctx", [_dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "body", [_dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "raw", [_dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "header", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "header"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "headers", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "headers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "originalUrl", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "originalUrl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "url", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "url", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "origin", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "origin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "href", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "href"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "method", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "method"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "method", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "method"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "path", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "path"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "path", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "path"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "query", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "query", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "querystring", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "querystring"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "querystring", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "querystring"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "search", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "search"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "host", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "host"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hostname", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "hostname"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fresh", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "fresh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stale", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "stale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "idempotent", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "idempotent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "socket", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "socket"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "charset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "charset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "protocol", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "protocol"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "secure", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "secure"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ip", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "ip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ips", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "ips"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subdomains", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "subdomains"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "accepts", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "accepts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsCharsets", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsCharsets"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsEncodings", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsEncodings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsLanguages", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsLanguages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "is", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "is"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setContext", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setContext"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setReq", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setReq"), _class2.prototype), _applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), _applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2)), _class2)) || _class) || _class) || _class) || _class);
});

var __filename$h = '/context/HttpResponse.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const HttpResponseInterface = globalContext$2.type("HttpResponseInterface", globalContext$2.object(globalContext$2.property("res", globalContext$2.ref("object")), globalContext$2.property("body", globalContext$2.any()), globalContext$2.property("is", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean()))))), globalContext$2.property("get", globalContext$2.function(globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))))), globalContext$2.property("set", globalContext$2.function(globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.nullable(globalContext$2.any())))), globalContext$2.property("append", globalContext$2.function(globalContext$2.param("field", globalContext$2.string()), globalContext$2.param("val", globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("remove", globalContext$2.function(globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("flushHeaders", globalContext$2.function(globalContext$2.return(globalContext$2.void()))), globalContext$2.property("setContext", globalContext$2.function(globalContext$2.param("context", globalContext$2.ref("ContextInterface")), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("setRes", globalContext$2.function(globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())))));

const HttpResponseInterface$1 = globalContext$2.tdz(() => HttpResponseInterface);
const ContextInterface$a = globalContext$2.tdz(() => ContextInterface);
const hasProp = {}.hasOwnProperty;
/*
Идеи взяты из https://github.com/koajs/koa/blob/master/lib/response.js
*/

var HttpResponse = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _init, _init2, _descriptor, _descriptor2, _class3, _temp;

  const {
    CoreObject,
    assert,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    injectable,
    Utils: {
      _,
      statuses,
      assign
    }
  } = Module.NS;
  let HttpResponse = (_dec = globalContext$2.annotate(globalContext$2.class("HttpResponse", globalContext$2.extends(CoreObject), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_res", globalContext$2.ref("object")), globalContext$2.method("res", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.property("ctx", globalContext$2.ref(ContextInterface$a)), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("socket", globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.method("header", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("headers", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("status", globalContext$2.return(globalContext$2.nullable(globalContext$2.number()))), globalContext$2.method("status", globalContext$2.param("code", globalContext$2.nullable(globalContext$2.number())), globalContext$2.return(globalContext$2.nullable(globalContext$2.number()))), globalContext$2.method("message", globalContext$2.return(globalContext$2.string())), globalContext$2.method("message", globalContext$2.param("msg", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("body", globalContext$2.return(globalContext$2.any())), globalContext$2.method("body", globalContext$2.param("val", globalContext$2.any()), globalContext$2.return(globalContext$2.any())), globalContext$2.method("length", globalContext$2.return(globalContext$2.number())), globalContext$2.method("length", globalContext$2.param("n", globalContext$2.number()), globalContext$2.return(globalContext$2.number())), globalContext$2.method("headerSent", globalContext$2.return(globalContext$2.nullable(globalContext$2.boolean()))), globalContext$2.method("vary", globalContext$2.param("field", globalContext$2.string())), globalContext$2.method("redirect", globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("alt", globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("attachment", globalContext$2.param("filename", globalContext$2.string())), globalContext$2.method("lastModified", globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("Date")))), globalContext$2.method("lastModified", globalContext$2.param("val", globalContext$2.union(globalContext$2.string(), globalContext$2.ref("Date"))), globalContext$2.return(globalContext$2.ref("Date"))), globalContext$2.method("etag", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("etag", globalContext$2.param("val", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("type", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("type", globalContext$2.param("_type", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("is", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())))), globalContext$2.method("get", globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.method("set", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.nullable(globalContext$2.any()))), globalContext$2.method("append", globalContext$2.param("field", globalContext$2.string()), globalContext$2.param("val", globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), globalContext$2.return(globalContext$2.void())), globalContext$2.method("remove", globalContext$2.param("field", globalContext$2.string()), globalContext$2.return(globalContext$2.void())), globalContext$2.method("writable", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("flushHeaders", globalContext$2.return(globalContext$2.void())), globalContext$2.method("setContext", globalContext$2.param("context", globalContext$2.ref(ContextInterface$a)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("setRes", globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())), globalContext$2.staticMethod("restoreObject"), globalContext$2.staticMethod("replicateObject"))), _dec2 = injectable(), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(globalContext$2.ref("object")), _dec5 = globalContext$2.decorate(globalContext$2.ref(ContextInterface$a)), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class HttpResponse extends CoreObject {
    // native response object
    get res() {
      const _returnType = globalContext$2.return(globalContext$2.ref("object"));

      // native response object
      return _returnType.assert(this._res);
    }

    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "_res", _descriptor, this);

      _initializerDefineProperty(this, "ctx", _descriptor2, this);

      globalContext$2.ref(HttpResponseInterface$1).assert(this);
    }

    // = null;
    get socket() {
      const _returnType2 = globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")));

      return _returnType2.assert(this.ctx.req.socket);
    }

    get header() {
      const _returnType3 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType3.assert(this.headers);
    }

    get headers() {
      const _returnType4 = globalContext$2.return(globalContext$2.ref("object"));

      // return this.res._headers || this.res.headers;
      if (_.isFunction(this.res.getHeaders)) {
        return _returnType4.assert(this.res.getHeaders());
      } else {
        return _returnType4.assert(this.res._headers || {});
      }
    }

    get status() {
      const _returnType5 = globalContext$2.return(globalContext$2.nullable(globalContext$2.number()));

      return _returnType5.assert(this.res.statusCode);
    }

    set status(code) {
      let _codeType = globalContext$2.nullable(globalContext$2.number());

      const _returnType6 = globalContext$2.return(globalContext$2.nullable(globalContext$2.number()));

      globalContext$2.param("code", _codeType).assert(code);
      assert(_.isNumber(code), 'status code must be a number');
      assert(statuses[code], `invalid status code: ${code}`);
      assert(!this.res.headersSent, 'headers have already been sent');
      this._explicitStatus = true;
      this.res.statusCode = code;
      this.res.statusMessage = statuses[code];

      if (Boolean(this.body && statuses.empty[code])) {
        this.body = null;
      }

      return _returnType6.assert(code);
    }

    get message() {
      const _returnType7 = globalContext$2.return(globalContext$2.string());

      return _returnType7.assert(this.res.statusMessage || statuses[this.status]);
    }

    set message(msg) {
      let _msgType = globalContext$2.string();

      const _returnType8 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("msg", _msgType).assert(msg);
      this.res.statusMessage = msg;
      return _returnType8.assert(msg);
    }

    get body() {
      const _returnType9 = globalContext$2.return(globalContext$2.any());

      return _returnType9.assert(this._body);
    }

    set body(val) {
      let _valType = globalContext$2.any();

      const _returnType10 = globalContext$2.return(globalContext$2.any());

      globalContext$2.param("val", _valType).assert(val);
      const original = this._body;
      this._body = val;
      if (this.res.headersSent) return _returnType10.assert();

      if (val == null) {
        if (!statuses.empty[this.status]) {
          this.status = 204;
        }

        this.remove('Content-Type');
        this.remove('Content-Length');
        this.remove('Transfer-Encoding');
        return _returnType10.assert();
      }

      if (!this._explicitStatus) {
        this.status = 200;
      }

      const setType = !this.headers['content-type'];

      if (_.isString(val)) {
        if (setType) {
          this.type = /^\s*</.test(val) ? 'html' : 'text';
        }

        this.length = Buffer.byteLength(val);
        return _returnType10.assert();
      }

      if (_.isBuffer(val)) {
        if (setType) {
          this.type = 'bin';
        }

        this.length = val.length;
        return _returnType10.assert();
      }

      if (_.isFunction(val.pipe)) {
        onFinished(this.res, destroy.bind(null, val));
        ensureErrorHandler(val, err => this.ctx.onerror(err));
        if (original != null && original !== val) this.remove('Content-Length');
        if (setType) this.type = 'bin';
        return _returnType10.assert();
      }

      this.remove('Content-Length');
      this.type = 'json';
      return _returnType10.assert(val);
    }

    get length() {
      const _returnType11 = globalContext$2.return(globalContext$2.number());

      const len = this.headers['content-length'];

      if (len == null) {
        if (!this.body) {
          return _returnType11.assert(0);
        }

        if (_.isString(this.body)) {
          return _returnType11.assert(Buffer.byteLength(this.body));
        }

        if (_.isBuffer(this.body)) {
          return _returnType11.assert(this.body.length);
        }

        if (_.isObjectLike(this.body)) {
          return _returnType11.assert(Buffer.byteLength(JSON.stringify(this.body)));
        }

        return _returnType11.assert(0);
      }

      return _returnType11.assert(~~Number(len));
    }

    set length(n) {
      let _nType = globalContext$2.number();

      const _returnType12 = globalContext$2.return(globalContext$2.number());

      globalContext$2.param("n", _nType).assert(n);
      this.set('Content-Length', n);
      return _returnType12.assert(n);
    }

    get headerSent() {
      const _returnType13 = globalContext$2.return(globalContext$2.nullable(globalContext$2.boolean()));

      return _returnType13.assert(this.res.headersSent);
    }

    vary(field) {
      let _fieldType = globalContext$2.string();

      globalContext$2.param("field", _fieldType).assert(field);
      vary(this.res, field);
    }

    redirect(url, alt) {
      let _urlType = globalContext$2.string();

      let _altType = globalContext$2.nullable(globalContext$2.string());

      globalContext$2.param("url", _urlType).assert(url);
      globalContext$2.param("alt", _altType).assert(alt);
      if ('back' === url) url = _urlType.assert(this.ctx.get('Referrer') || alt || '/');
      this.set('Location', url);
      if (!statuses.redirect[this.status]) this.status = 302;

      if (this.ctx.accepts('html')) {
        url = _urlType.assert(escapeHtml(url));
        this.type = 'text/html; charset=utf-8';
        this.body = `Redirecting to <a href=\"${url}\">#{url}</a>.`;
        return;
      }

      this.type = 'text/plain; charset=utf-8';
      this.body = `Redirecting to ${url}`;
    }

    attachment(filename) {
      let _filenameType = globalContext$2.string();

      globalContext$2.param("filename", _filenameType).assert(filename);

      if (filename != null) {
        this.type = path.extname(filename);
      }

      this.set('Content-Disposition', contentDisposition(filename));
    }

    get lastModified() {
      const _returnType14 = globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("Date")));

      const date = this.get('last-modified');
      if (date != null) return _returnType14.assert(new Date(date));
    }

    set lastModified(val) {
      let _valType2 = globalContext$2.union(globalContext$2.string(), globalContext$2.ref("Date"));

      const _returnType15 = globalContext$2.return(globalContext$2.ref("Date"));

      globalContext$2.param("val", _valType2).assert(val);
      if (_.isString(val)) val = _valType2.assert(new Date(val));
      this.set('Last-Modified', val.toUTCString());
      return _returnType15.assert(val);
    }

    get etag() {
      const _returnType16 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType16.assert(this.get('ETag'));
    }

    set etag(val) {
      let _valType3 = globalContext$2.string();

      const _returnType17 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("val", _valType3).assert(val);
      if (!/^(W\/)?"/.test(val)) val = _valType3.assert(`\"${val}\"`);
      this.set('ETag', val);
      return _returnType17.assert(val);
    }

    get type() {
      const _returnType18 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      const type = this.get('Content-Type');
      if (!type) return _returnType18.assert('');
      return _returnType18.assert(type.split(';')[0]);
    }

    set type(_type) {
      let _typeType = globalContext$2.nullable(globalContext$2.string());

      const _returnType19 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      globalContext$2.param("_type", _typeType).assert(_type);
      const type = mimeTypes.contentType(_type);

      if (type) {
        this.set('Content-Type', type);
      } else {
        this.remove('Content-Type');
      }

      return _returnType19.assert(_type);
    }

    is(...args) {
      let _argsType = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      const _returnType20 = globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())));

      globalContext$2.rest("args", _argsType).assert(args);
      let [types] = args;

      if (!types) {
        return _returnType20.assert(this.type || false);
      }

      if (!_.isArray(types)) {
        types = args;
      }

      return _returnType20.assert(typeIs.is(this.type, types));
    }

    'get'(field) {
      let _fieldType2 = globalContext$2.string();

      const _returnType21 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())));

      globalContext$2.param("field", _fieldType2).assert(field);
      return _returnType21.assert(this.headers[field.toLowerCase()] || '');
    }

    'set'(...args) {
      let _argsType2 = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")));

      const _returnType22 = globalContext$2.return(globalContext$2.nullable(globalContext$2.any()));

      globalContext$2.rest("args", _argsType2).assert(args);
      const [field, val] = args;

      if (2 === args.length) {
        if (_.isArray(val)) {
          this.res.setHeader(field, val.map(String));
        } else {
          this.res.setHeader(field, String(val));
        }
      } else {
        for (const key in field) {
          if (!hasProp.call(field, key)) continue;
          this.set(key, field[key]);
        }
      }
    }

    append(field, val) {
      let _fieldType3 = globalContext$2.string();

      let _valType4 = globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()));

      const _returnType23 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("field", _fieldType3).assert(field);
      globalContext$2.param("val", _valType4).assert(val);
      const prev = this.get(field);

      if (prev != null && prev !== '') {
        if (_.isArray(prev)) {
          val = _valType4.assert(prev.concat(val));
        } else {
          val = _valType4.assert([prev].concat(val));
        }
      }

      this.set(field, val);
    }

    remove(field) {
      let _fieldType4 = globalContext$2.string();

      const _returnType24 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("field", _fieldType4).assert(field);
      this.res.removeHeader(field);
    }

    get writable() {
      const _returnType25 = globalContext$2.return(globalContext$2.boolean());

      if (this.res.finished) return _returnType25.assert(false);
      const socket = this.res.socket;
      if (socket == null) return _returnType25.assert(true);
      return _returnType25.assert(socket.writable);
    }

    flushHeaders() {
      const _returnType26 = globalContext$2.return(globalContext$2.void());

      // const headerNames = Object.keys(this.res._headers) || Object.keys(this.res.headers);
      // for (const header of headerNames) {
      //   this.remove(header);
      // }
      if (_.isFunction(this.res.flushHeaders)) {
        this.res.flushHeaders();
      } else {
        const headerNames = _.isFunction(this.res.getHeaderNames) ? this.res.getHeaderNames() : Object.keys(this.res._headers);

        for (const header of headerNames) {
          this.res.removeHeader(header);
        }
      }
    }

    setContext(context) {
      let _contextType = globalContext$2.ref(ContextInterface$a);

      const _returnType27 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("context", _contextType).assert(context);
      this.ctx = context;
    }

    setRes(res) {
      let _resType = globalContext$2.ref("object");

      const _returnType28 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("res", _resType).assert(res);
      this._res = res;
    }

    static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

  }, _class3.__filename = __filename$h, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_res", [_dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "res", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "res"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ctx", [_dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "socket", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "socket"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "header", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "header"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "headers", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "headers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "status", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "status"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "status", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "status"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "message", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "message"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "message", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "message"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "body", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "body"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "body", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "body"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "headerSent", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "headerSent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vary", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "vary"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "redirect", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "redirect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachment", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "attachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastModified", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "lastModified"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastModified", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "lastModified"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "etag", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "etag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "etag", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "etag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "is", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "is"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'set', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'set'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "append", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "append"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "writable", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "writable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flushHeaders", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "flushHeaders"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setContext", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setContext"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRes", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setRes"), _class2.prototype), _applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), _applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2)), _class2)) || _class) || _class) || _class) || _class);
});

var __filename$i = '/context/HttpCookies.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const HttpCookiesInterface = globalContext$2.type("HttpCookiesInterface", HttpCookiesInterface => {
  return globalContext$2.object(globalContext$2.property("req", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("res", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("key", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("get", globalContext$2.function(globalContext$2.param("name", globalContext$2.string()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(globalContext$2.nullable(globalContext$2.string())))), globalContext$2.property("set", globalContext$2.function(globalContext$2.param("name", globalContext$2.string()), globalContext$2.param("value", globalContext$2.any()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(HttpCookiesInterface))), globalContext$2.property("setReqResOpts", globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.exactObject(globalContext$2.property("key", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("secure", globalContext$2.nullable(globalContext$2.boolean()))))), globalContext$2.return(globalContext$2.void()))));
});

const HttpCookiesInterface$1 = globalContext$2.tdz(() => HttpCookiesInterface);
var HttpCookies = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

  const {
    CoreObject,
    assert,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    injectable,
    Utils: {
      _
    }
  } = Module.NS;
  let HttpCookies = (_dec = globalContext$2.annotate(globalContext$2.class("HttpCookies", globalContext$2.extends(CoreObject), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_cookies", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("req", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("res", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("key", globalContext$2.nullable(globalContext$2.string())), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("get", globalContext$2.param("name", globalContext$2.string()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("set", globalContext$2.param("name", globalContext$2.string()), globalContext$2.param("value", globalContext$2.any()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.return(globalContext$2.ref(HttpCookiesInterface$1))), globalContext$2.staticMethod("restoreObject"), globalContext$2.staticMethod("replicateObject"), globalContext$2.method("setReqResOpts", globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.exactObject(globalContext$2.property("key", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("secure", globalContext$2.nullable(globalContext$2.boolean()))))), globalContext$2.return(globalContext$2.void())))), _dec2 = injectable(), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec5 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec6 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec7 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class HttpCookies extends CoreObject {
    // ipoCookies = PointerT(Cookies.protected({
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "_cookies", _descriptor, this);

      _initializerDefineProperty(this, "req", _descriptor2, this);

      _initializerDefineProperty(this, "res", _descriptor3, this);

      _initializerDefineProperty(this, "key", _descriptor4, this);

      globalContext$2.ref(HttpCookiesInterface$1).assert(this);
    }

    'get'(name, opts) {
      let _nameType = globalContext$2.string();

      let _optsType = globalContext$2.nullable(globalContext$2.ref("object"));

      const _returnType = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      globalContext$2.param("name", _nameType).assert(name);
      globalContext$2.param("opts", _optsType).assert(opts);
      return _returnType.assert(this._cookies.get(name, opts));
    }

    'set'(name, value, opts) {
      let _nameType2 = globalContext$2.string();

      let _valueType = globalContext$2.any();

      let _optsType2 = globalContext$2.nullable(globalContext$2.ref("object"));

      const _returnType2 = globalContext$2.return(globalContext$2.ref(HttpCookiesInterface$1));

      globalContext$2.param("name", _nameType2).assert(name);
      globalContext$2.param("value", _valueType).assert(value);
      globalContext$2.param("opts", _optsType2).assert(opts);

      this._cookies.set(name, value, opts);

      return _returnType2.assert(this);
    }

    static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    setReqResOpts(req, res, opts = {}) {
      let _reqType = globalContext$2.ref("object");

      let _resType = globalContext$2.ref("object");

      let _optsType3 = globalContext$2.nullable(globalContext$2.exactObject(globalContext$2.property("key", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("secure", globalContext$2.nullable(globalContext$2.boolean()))));

      const _returnType3 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("req", _reqType).assert(req);
      globalContext$2.param("res", _resType).assert(res);
      globalContext$2.param("opts", _optsType3).assert(opts);
      const key = opts.key || 'secret';
      const secure = opts.secure || false;
      this.req = req;
      this.res = res;
      this.key = key;
      const keys = new Keygrip([key], 'sha256', 'hex');
      this._cookies = new NodeCookies(req, res, {
        keys,
        secure
      });
    }

  }, _class3.__filename = __filename$i, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_cookies", [_dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "req", [_dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "res", [_dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "key", [_dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'set', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'set'), _class2.prototype), _applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), _applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2), _applyDecoratedDescriptor(_class2.prototype, "setReqResOpts", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setReqResOpts"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
});

var __filename$j = '/context/Context.js';

const HttpCookiesInterface$2 = globalContext$2.tdz(() => HttpCookiesInterface);
const HttpResponseInterface$2 = globalContext$2.tdz(() => HttpResponseInterface);
const HttpRequestInterface$2 = globalContext$2.tdz(() => HttpRequestInterface);
const ContextInterface$b = globalContext$2.tdz(() => ContextInterface);
const HttpMediatorInterface$2 = globalContext$2.tdz(() => HttpMediatorInterface);
var Context = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _class3, _temp;

  const {
    PRODUCTION,
    HTTP_MEDIATOR,
    CoreObject,
    // HttpRequest, HttpResponse, HttpCookies,
    // ConfigurableMixin,
    assert,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    mixin,
    injectable,
    inject,
    Utils: {
      _,
      statuses
    }
  } = Module.NS;
  let // @mixin(ConfigurableMixin)
  Context = (_dec = globalContext$2.annotate(globalContext$2.class("Context", globalContext$2.extends(CoreObject), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_httpMediatorFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$2)))), globalContext$2.method("_httpMediator", globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$2))), globalContext$2.property("request", globalContext$2.ref(HttpRequestInterface$2)), globalContext$2.property("response", globalContext$2.ref(HttpResponseInterface$2)), globalContext$2.property("cookies", globalContext$2.ref(HttpCookiesInterface$2)), globalContext$2.property("_req", globalContext$2.ref("object")), globalContext$2.property("_res", globalContext$2.ref("object")), globalContext$2.method("req", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("res", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.property("accept", globalContext$2.ref("object")), globalContext$2.property("state", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("respond", globalContext$2.nullable(globalContext$2.boolean())), globalContext$2.property("routePath", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("pathParams", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("transaction", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("session", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("isPerformExecution", globalContext$2.boolean()), globalContext$2.method("throw", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.number()), globalContext$2.nullable(globalContext$2.string()), globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.void())), globalContext$2.method("assert", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("onerror", globalContext$2.param("err", globalContext$2.nullable(globalContext$2.any())), globalContext$2.return(globalContext$2.void())), globalContext$2.method("header", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("headers", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("method", globalContext$2.return(globalContext$2.string())), globalContext$2.method("method", globalContext$2.param("method", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("url", globalContext$2.return(globalContext$2.string())), globalContext$2.method("url", globalContext$2.param("url", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.property("originalUrl", globalContext$2.string()), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("origin", globalContext$2.return(globalContext$2.string())), globalContext$2.method("href", globalContext$2.return(globalContext$2.string())), globalContext$2.method("path", globalContext$2.return(globalContext$2.string())), globalContext$2.method("path", globalContext$2.param("path", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("query", globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("query", globalContext$2.param("query", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("object"))), globalContext$2.method("querystring", globalContext$2.return(globalContext$2.string())), globalContext$2.method("querystring", globalContext$2.param("querystring", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("host", globalContext$2.return(globalContext$2.string())), globalContext$2.method("hostname", globalContext$2.return(globalContext$2.string())), globalContext$2.method("fresh", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("stale", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("socket", globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.method("protocol", globalContext$2.return(globalContext$2.string())), globalContext$2.method("secure", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("ip", globalContext$2.return(globalContext$2.string())), globalContext$2.method("ips", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("subdomains", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("is", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())))), globalContext$2.method("accepts", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean()))), globalContext$2.method("acceptsEncodings", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("acceptsCharsets", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("acceptsLanguages", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())))), globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()))), globalContext$2.method("get", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.string())), globalContext$2.method("body", globalContext$2.return(globalContext$2.any())), globalContext$2.method("body", globalContext$2.param("body", globalContext$2.any()), globalContext$2.return(globalContext$2.any())), globalContext$2.method("status", globalContext$2.return(globalContext$2.nullable(globalContext$2.number()))), globalContext$2.method("status", globalContext$2.param("status", globalContext$2.nullable(globalContext$2.number())), globalContext$2.return(globalContext$2.nullable(globalContext$2.number()))), globalContext$2.method("message", globalContext$2.return(globalContext$2.string())), globalContext$2.method("message", globalContext$2.param("message", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("length", globalContext$2.return(globalContext$2.number())), globalContext$2.method("length", globalContext$2.param("length", globalContext$2.number()), globalContext$2.return(globalContext$2.number())), globalContext$2.method("writable", globalContext$2.return(globalContext$2.boolean())), globalContext$2.method("type", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("type", globalContext$2.param("type", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("headerSent", globalContext$2.return(globalContext$2.nullable(globalContext$2.boolean()))), globalContext$2.method("redirect", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("attachment", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.void())), globalContext$2.method("set", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")))), globalContext$2.return(globalContext$2.nullable(globalContext$2.any()))), globalContext$2.method("append", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string(), globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.return(globalContext$2.void())), globalContext$2.method("vary", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.void())), globalContext$2.method("flushHeaders", globalContext$2.param("args", globalContext$2.any()), globalContext$2.return(globalContext$2.void())), globalContext$2.method("remove", globalContext$2.rest("args", globalContext$2.tuple(globalContext$2.string())), globalContext$2.return(globalContext$2.void())), globalContext$2.method("lastModified", globalContext$2.param("date", globalContext$2.union(globalContext$2.string(), globalContext$2.ref("Date"))), globalContext$2.return(globalContext$2.ref("Date"))), globalContext$2.method("etag", globalContext$2.param("value", globalContext$2.string()), globalContext$2.return(globalContext$2.string())), globalContext$2.method("setReqResPair", globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.void())), globalContext$2.staticMethod("restoreObject"), globalContext$2.staticMethod("replicateObject"))), _dec2 = injectable(), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(globalContext$2.function(globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$2)))), _dec5 = inject(`Factory<${HTTP_MEDIATOR}>`), _dec6 = globalContext$2.decorate(globalContext$2.ref(HttpRequestInterface$2)), _dec7 = inject('HttpRequest'), _dec8 = globalContext$2.decorate(globalContext$2.ref(HttpResponseInterface$2)), _dec9 = inject('HttpResponse'), _dec10 = globalContext$2.decorate(globalContext$2.ref(HttpCookiesInterface$2)), _dec11 = inject('HttpCookies'), _dec12 = globalContext$2.decorate(globalContext$2.ref("object")), _dec13 = globalContext$2.decorate(globalContext$2.ref("object")), _dec14 = globalContext$2.decorate(globalContext$2.ref("object")), _dec15 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec16 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.boolean())), _dec17 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec18 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec19 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec20 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec21 = globalContext$2.decorate(globalContext$2.boolean()), _dec22 = globalContext$2.decorate(globalContext$2.string()), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class Context extends CoreObject {
    get _httpMediator() {
      const _returnType = globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$2));

      return _returnType.assert(this._httpMediatorFactory());
    }

    // native response object
    get req() {
      const _returnType2 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType2.assert(this._req);
    }

    get res() {
      const _returnType3 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType3.assert(this._res);
    }

    'throw'(...args) {
      let _argsType = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.number()), globalContext$2.nullable(globalContext$2.string()), globalContext$2.nullable(globalContext$2.ref("object")));

      const _returnType4 = globalContext$2.return(globalContext$2.void());

      globalContext$2.rest("args", _argsType).assert(args);
      throw createError(...args);
    }

    assert(...args) {
      return assert(...args);
    }

    onerror(err) {
      let _errType = globalContext$2.nullable(globalContext$2.any());

      const _returnType5 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("err", _errType).assert(err);

      if (err == null) {
        return _returnType5.assert();
      }

      if (!_.isError(err)) {
        err = _errType.assert(new Error(`non-error thrown: ${err}`));
      }

      const headerSent = err.headerSent = !!(this.headerSent || !this.writable);

      this._httpMediator.getViewComponent().emit('error', err, this);

      if (headerSent) return _returnType5.assert();
      if (_.isFunction(this.res.getHeaderNames)) this.res.getHeaderNames().forEach(name => {
        this.res.removeHeader(name);
      });
      const vlHeaderNames = Object.keys(this.res.headers || {});
      vlHeaderNames.forEach(name => {
        this.res.removeHeader(name);
        delete this.res.headers[name];
      });
      this.set(err.headers || {});
      this.type = 'text';

      if ('ENOENT' === err.code) {
        err.status = 404;
      }

      if (!_.isNumber(err.status) || !statuses[err.status]) {
        err.status = 500;
      }

      const code = statuses[err.status];
      const msg = err.expose ? err.message : code;
      const message = {
        error: true,
        errorNum: err.status,
        errorMessage: msg,
        code: err.code || code
      };

      if (!(this.configs != null && this.configs.environment === PRODUCTION)) {
        message.exception = `${err.name || 'Error'}: ${msg}`;
        message.stacktrace = err.stack.split('\n');
      }

      this.status = err.status;
      const vsMessage = JSON.stringify(message);
      this.length = Buffer.byteLength(vsMessage);
      this.res.end(vsMessage);
    } // Request aliases


    get header() {
      const _returnType6 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType6.assert(this.request.header);
    }

    get headers() {
      const _returnType7 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType7.assert(this.request.headers);
    }

    get method() {
      const _returnType8 = globalContext$2.return(globalContext$2.string());

      return _returnType8.assert(this.request.method);
    }

    set method(method) {
      let _methodType = globalContext$2.string();

      const _returnType9 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("method", _methodType).assert(method);
      return _returnType9.assert(this.request.method = method);
    }

    get url() {
      const _returnType10 = globalContext$2.return(globalContext$2.string());

      return _returnType10.assert(this.request.url);
    }

    set url(url) {
      let _urlType = globalContext$2.string();

      const _returnType11 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("url", _urlType).assert(url);
      return _returnType11.assert(this.request.url = url);
    }

    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "_httpMediatorFactory", _descriptor, this);

      _initializerDefineProperty(this, "request", _descriptor2, this);

      _initializerDefineProperty(this, "response", _descriptor3, this);

      _initializerDefineProperty(this, "cookies", _descriptor4, this);

      _initializerDefineProperty(this, "_req", _descriptor5, this);

      _initializerDefineProperty(this, "_res", _descriptor6, this);

      _initializerDefineProperty(this, "accept", _descriptor7, this);

      _initializerDefineProperty(this, "state", _descriptor8, this);

      _initializerDefineProperty(this, "respond", _descriptor9, this);

      _initializerDefineProperty(this, "routePath", _descriptor10, this);

      _initializerDefineProperty(this, "pathParams", _descriptor11, this);

      _initializerDefineProperty(this, "transaction", _descriptor12, this);

      _initializerDefineProperty(this, "session", _descriptor13, this);

      _initializerDefineProperty(this, "isPerformExecution", _descriptor14, this);

      _initializerDefineProperty(this, "originalUrl", _descriptor15, this);

      globalContext$2.ref(ContextInterface$b).assert(this);
    }

    get origin() {
      const _returnType12 = globalContext$2.return(globalContext$2.string());

      return _returnType12.assert(this.request.origin);
    }

    get href() {
      const _returnType13 = globalContext$2.return(globalContext$2.string());

      return _returnType13.assert(this.request.href);
    }

    get path() {
      const _returnType14 = globalContext$2.return(globalContext$2.string());

      return _returnType14.assert(this.request.path);
    }

    set path(path) {
      let _pathType = globalContext$2.string();

      const _returnType15 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("path", _pathType).assert(path);
      return _returnType15.assert(this.request.path = path);
    }

    get query() {
      const _returnType16 = globalContext$2.return(globalContext$2.ref("object"));

      return _returnType16.assert(this.request.query);
    }

    set query(query) {
      let _queryType = globalContext$2.ref("object");

      const _returnType17 = globalContext$2.return(globalContext$2.ref("object"));

      globalContext$2.param("query", _queryType).assert(query);
      return _returnType17.assert(this.request.query = query);
    }

    get querystring() {
      const _returnType18 = globalContext$2.return(globalContext$2.string());

      return _returnType18.assert(this.request.querystring);
    }

    set querystring(querystring) {
      let _querystringType = globalContext$2.string();

      const _returnType19 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("querystring", _querystringType).assert(querystring);
      return _returnType19.assert(this.request.querystring = querystring);
    }

    get host() {
      const _returnType20 = globalContext$2.return(globalContext$2.string());

      return _returnType20.assert(this.request.host);
    }

    get hostname() {
      const _returnType21 = globalContext$2.return(globalContext$2.string());

      return _returnType21.assert(this.request.hostname);
    }

    get fresh() {
      const _returnType22 = globalContext$2.return(globalContext$2.boolean());

      return _returnType22.assert(this.request.fresh);
    }

    get stale() {
      const _returnType23 = globalContext$2.return(globalContext$2.boolean());

      return _returnType23.assert(this.request.stale);
    }

    get socket() {
      const _returnType24 = globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")));

      return _returnType24.assert(this.request.socket);
    }

    get protocol() {
      const _returnType25 = globalContext$2.return(globalContext$2.string());

      return _returnType25.assert(this.request.protocol);
    }

    get secure() {
      const _returnType26 = globalContext$2.return(globalContext$2.boolean());

      return _returnType26.assert(this.request.secure);
    }

    get ip() {
      const _returnType27 = globalContext$2.return(globalContext$2.string());

      return _returnType27.assert(this.request.ip);
    }

    get ips() {
      const _returnType28 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      return _returnType28.assert(this.request.ips);
    }

    get subdomains() {
      const _returnType29 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      return _returnType29.assert(this.request.subdomains);
    }

    is(...args) {
      let _argsType2 = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      const _returnType30 = globalContext$2.return(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.boolean())));

      globalContext$2.rest("args", _argsType2).assert(args);
      return _returnType30.assert(this.request.is(...args));
    }

    accepts(...args) {
      let _argsType3 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType31 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array(), globalContext$2.boolean()));

      globalContext$2.rest("args", _argsType3).assert(args);
      return _returnType31.assert(this.request.accepts(...args));
    }

    acceptsEncodings(...args) {
      let _argsType4 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType32 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType4).assert(args);
      return _returnType32.assert(this.request.acceptsEncodings(...args));
    }

    acceptsCharsets(...args) {
      let _argsType5 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType33 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType5).assert(args);
      return _returnType33.assert(this.request.acceptsCharsets(...args));
    }

    acceptsLanguages(...args) {
      let _argsType6 = globalContext$2.tuple(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array())));

      const _returnType34 = globalContext$2.return(globalContext$2.union(globalContext$2.string(), globalContext$2.array()));

      globalContext$2.rest("args", _argsType6).assert(args);
      return _returnType34.assert(this.request.acceptsLanguages(...args));
    }

    'get'(...args) {
      let _argsType7 = globalContext$2.tuple(globalContext$2.string());

      const _returnType35 = globalContext$2.return(globalContext$2.string());

      globalContext$2.rest("args", _argsType7).assert(args);
      return _returnType35.assert(this.request.get(...args));
    } // Response aliases


    get body() {
      const _returnType36 = globalContext$2.return(globalContext$2.any());

      return _returnType36.assert(this.response.body);
    }

    set body(body) {
      let _bodyType = globalContext$2.any();

      const _returnType37 = globalContext$2.return(globalContext$2.any());

      globalContext$2.param("body", _bodyType).assert(body);
      return _returnType37.assert(this.response.body = body);
    }

    get status() {
      const _returnType38 = globalContext$2.return(globalContext$2.nullable(globalContext$2.number()));

      return _returnType38.assert(this.response.status);
    }

    set status(status) {
      let _statusType = globalContext$2.nullable(globalContext$2.number());

      const _returnType39 = globalContext$2.return(globalContext$2.nullable(globalContext$2.number()));

      globalContext$2.param("status", _statusType).assert(status);
      return _returnType39.assert(this.response.status = status);
    }

    get message() {
      const _returnType40 = globalContext$2.return(globalContext$2.string());

      return _returnType40.assert(this.response.message);
    }

    set message(message) {
      let _messageType = globalContext$2.string();

      const _returnType41 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("message", _messageType).assert(message);
      return _returnType41.assert(this.response.message = message);
    }

    get length() {
      const _returnType42 = globalContext$2.return(globalContext$2.number());

      return _returnType42.assert(this.response.length);
    }

    set length(length) {
      let _lengthType = globalContext$2.number();

      const _returnType43 = globalContext$2.return(globalContext$2.number());

      globalContext$2.param("length", _lengthType).assert(length);
      return _returnType43.assert(this.response.length = length);
    }

    get writable() {
      const _returnType44 = globalContext$2.return(globalContext$2.boolean());

      return _returnType44.assert(this.response.writable);
    }

    get type() {
      const _returnType45 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType45.assert(this.response.type);
    }

    set type(type) {
      let _typeType = globalContext$2.nullable(globalContext$2.string());

      const _returnType46 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      globalContext$2.param("type", _typeType).assert(type);
      return _returnType46.assert(this.response.type = type);
    }

    get headerSent() {
      const _returnType47 = globalContext$2.return(globalContext$2.nullable(globalContext$2.boolean()));

      return _returnType47.assert(this.response.headerSent);
    }

    redirect(...args) {
      let _argsType8 = globalContext$2.tuple(globalContext$2.string());

      const _returnType48 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      globalContext$2.rest("args", _argsType8).assert(args);
      return _returnType48.assert(this.response.redirect(...args));
    }

    attachment(...args) {
      let _argsType9 = globalContext$2.tuple(globalContext$2.string());

      const _returnType49 = globalContext$2.return(globalContext$2.void());

      globalContext$2.rest("args", _argsType9).assert(args);
      return _returnType49.assert(this.response.attachment(...args));
    }

    'set'(...args) {
      let _argsType10 = globalContext$2.tuple(globalContext$2.union(globalContext$2.string(), globalContext$2.ref("object")));

      const _returnType50 = globalContext$2.return(globalContext$2.nullable(globalContext$2.any()));

      globalContext$2.rest("args", _argsType10).assert(args);
      return _returnType50.assert(this.response.set(...args));
    }

    append(...args) {
      let _argsType11 = globalContext$2.tuple(globalContext$2.string(), globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())));

      const _returnType51 = globalContext$2.return(globalContext$2.void());

      globalContext$2.rest("args", _argsType11).assert(args);
      return _returnType51.assert(this.response.append(...args));
    }

    vary(...args) {
      let _argsType12 = globalContext$2.tuple(globalContext$2.string());

      const _returnType52 = globalContext$2.return(globalContext$2.void());

      globalContext$2.rest("args", _argsType12).assert(args);
      return _returnType52.assert(this.response.vary(...args));
    }

    flushHeaders(...args) {
      const _returnType53 = globalContext$2.return(globalContext$2.void());

      return _returnType53.assert(this.response.flushHeaders(...args));
    }

    remove(...args) {
      let _argsType13 = globalContext$2.tuple(globalContext$2.string());

      const _returnType54 = globalContext$2.return(globalContext$2.void());

      globalContext$2.rest("args", _argsType13).assert(args);
      return _returnType54.assert(this.response.remove(...args));
    }

    set lastModified(date) {
      let _dateType = globalContext$2.union(globalContext$2.string(), globalContext$2.ref("Date"));

      const _returnType55 = globalContext$2.return(globalContext$2.ref("Date"));

      globalContext$2.param("date", _dateType).assert(date);
      return _returnType55.assert(this.response.lastModified = date);
    }

    set etag(value) {
      let _valueType = globalContext$2.string();

      const _returnType56 = globalContext$2.return(globalContext$2.string());

      globalContext$2.param("value", _valueType).assert(value);
      return _returnType56.assert(this.response.etag = value);
    }

    setReqResPair(req, res) {
      let _reqType = globalContext$2.ref("object");

      let _resType = globalContext$2.ref("object");

      const _returnType57 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("req", _reqType).assert(req);
      globalContext$2.param("res", _resType).assert(res);
      this._req = req;
      this._res = res;
      this.originalUrl = req.url;
      this.accept = accepts(req); // this.request = HttpRequest.new();

      this.request.setContext(this);
      this.request.setReq(req); // this.response = HttpResponse.new();

      this.response.setContext(this);
      this.response.setRes(res);
      this.state = {};
      const key = this.configs != null ? this.configs.cookieKey || 'secret' : 'secret';
      const secure = req.secure; // this.cookies = HttpCookies.new(req, res, {key, secure});
      // this.cookies = HttpCookies.new();

      this.cookies.setReqResOpts(req, res, {
        key,
        secure
      });
    }

    static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

  }, _class3.__filename = __filename$j, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_httpMediatorFactory", [_dec4, _dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "_httpMediator", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "_httpMediator"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "request", [_dec6, _dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "response", [_dec8, _dec9, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cookies", [_dec10, _dec11, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_req", [_dec12, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_res", [_dec13, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "req", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "req"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "res", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "res"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "accept", [_dec14, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "state", [_dec15, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "respond", [_dec16, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "routePath", [_dec17, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pathParams", [_dec18, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "transaction", [_dec19, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "session", [_dec20, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "isPerformExecution", [_dec21, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, 'throw', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'throw'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "assert", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "assert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onerror", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onerror"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "header", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "header"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "headers", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "headers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "method", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "method"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "method", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "method"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "url", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "url", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "originalUrl", [_dec22, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "origin", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "origin"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "href", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "href"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "path", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "path"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "path", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "path"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "query", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "query", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "querystring", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "querystring"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "querystring", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "querystring"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "host", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "host"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hostname", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "hostname"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fresh", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "fresh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stale", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "stale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "socket", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "socket"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "protocol", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "protocol"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "secure", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "secure"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ip", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "ip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ips", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "ips"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "subdomains", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "subdomains"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "is", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "is"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "accepts", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "accepts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsEncodings", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsEncodings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsCharsets", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsCharsets"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "acceptsLanguages", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "acceptsLanguages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "body", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "body"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "body", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "body"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "status", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "status"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "status", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "status"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "message", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "message"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "message", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "message"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "length", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "length"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "writable", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "writable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "headerSent", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "headerSent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "redirect", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "redirect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachment", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "attachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'set', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'set'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "append", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "append"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "vary", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "vary"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flushHeaders", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "flushHeaders"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lastModified", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "lastModified"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "etag", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "etag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setReqResPair", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "setReqResPair"), _class2.prototype), _applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), _applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2)), _class2)) || _class) || _class) || _class) || _class);
});

var __filename$k = '/renderer/Renderer.js';

const RendererItemResultT$5 = globalContext$2.tdz(() => RendererItemResultT);
const RendererListResultT$5 = globalContext$2.tdz(() => RendererListResultT);
const RouterRouteT$6 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$8 = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$c = globalContext$2.tdz(() => ContextInterface);
const RendererInterface$2 = globalContext$2.tdz(() => RendererInterface);
const MediatorInterface$2 = globalContext$2.tdz(() => MediatorInterface);
var Renderer = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _init, _init2, _descriptor, _class3, _temp;

  const {
    // APPLICATION_MEDIATOR,
    CoreObject,
    initialize,
    partOf,
    meta,
    method,
    nameBy,
    property,
    injectable,
    inject
  } = Module.NS;
  let Renderer = (_dec = globalContext$2.annotate(globalContext$2.class("Renderer", globalContext$2.extends(CoreObject), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_ApplicationModule", globalContext$2.Class(globalContext$2.existential())), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("ApplicationModule", globalContext$2.return(globalContext$2.Class(globalContext$2.existential()))), globalContext$2.method("render", _fn => {
    const T = _fn.typeParameter("T", undefined, globalContext$2.any());

    const S = _fn.typeParameter("S", undefined, globalContext$2.ref(ResourceInterface$8));

    const R = _fn.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$5), globalContext$2.ref(RendererItemResultT$5), globalContext$2.any())));

    return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$c)), globalContext$2.param("aoData", globalContext$2.flowInto(T)), globalContext$2.param("resource", globalContext$2.flowInto(S)), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouterRouteT$6))), globalContext$2.return(globalContext$2.ref("Promise", R))];
  }))), _dec2 = injectable(), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(globalContext$2.Class(globalContext$2.existential())), _dec5 = inject('ApplicationModule'), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class Renderer extends CoreObject {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "_ApplicationModule", _descriptor, this);

      globalContext$2.ref(RendererInterface$2).assert(this);
    }

    get ApplicationModule() {
      const _returnType2 = globalContext$2.return(globalContext$2.Class(globalContext$2.existential()));

      return _returnType2.assert(this._ApplicationModule);
    } // @inject(`Factory<${APPLICATION_MEDIATOR}>`)
    // @property _appMediatorFactory: () => MediatorInterface;
    //
    // @property get _appMediator(): MediatorInterface {
    //   return this._appMediatorFactory();
    // }


    async render(ctx, aoData, resource, opts = {}) {
      const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
      const S = globalContext$2.typeParameter("S", undefined, globalContext$2.ref(ResourceInterface$8));
      const R = globalContext$2.typeParameter("R", undefined, globalContext$2.nullable(globalContext$2.union(globalContext$2.ref(RendererListResultT$5), globalContext$2.ref(RendererItemResultT$5), globalContext$2.any())));

      let _ctxType = globalContext$2.ref(ContextInterface$c);

      let _aoDataType = globalContext$2.flowInto(T);

      let _resourceType = globalContext$2.flowInto(S);

      let _optsType = globalContext$2.nullable(globalContext$2.ref(RouterRouteT$6));

      const _returnType = globalContext$2.return(globalContext$2.union(R, globalContext$2.ref("Promise", R)));

      globalContext$2.param("ctx", _ctxType).assert(ctx);
      globalContext$2.param("aoData", _aoDataType).assert(aoData);
      globalContext$2.param("resource", _resourceType).assert(resource);
      globalContext$2.param("opts", _optsType).assert(opts);
      const {
        path,
        resource: resourceName,
        action,
        template: templatePath
      } = opts;

      if (path != null && resourceName != null && action != null) {
        // const service = this._appMediator.getViewComponent();
        // const { Templates } = service.Module.NS;
        const {
          Templates
        } = this.ApplicationModule.NS;
        return _returnType.assert(await Promise.resolve().then(() => {
          if (Templates == null) return aoData;
          if (Templates[templatePath] == null) return aoData;
          return Templates[templatePath].call(resource, resourceName, action, aoData) || aoData;
        }));
      } else {
        return _returnType.assert(aoData);
      }
    }

  }, _class3.__filename = __filename$k, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_ApplicationModule", [_dec4, _dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "ApplicationModule", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "ApplicationModule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "render", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "render"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
});

var __filename$l = '/proxies/Router.js';

// This file is part of leanes-restful-addon.
//
// leanes-restful-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-restful-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-restful-addon.  If not, see <https://www.gnu.org/licenses/>.
const RouteOptionsT = globalContext$2.type("RouteOptionsT", globalContext$2.object(globalContext$2.property("to", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member"))), true), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("action", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("template", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("keyName", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("entityName", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("recordName", globalContext$2.nullable(globalContext$2.string()), true)));

// This file is part of leanes-restful-addon.
const RouteOptionsT$1 = globalContext$2.tdz(() => RouteOptionsT);
const RouterRouteT$7 = globalContext$2.tdz(() => RouterRouteT);
const RouterInterface = globalContext$2.type("RouterInterface", RouterInterface => {
  return globalContext$2.object(globalContext$2.property("map", globalContext$2.function(globalContext$2.return(globalContext$2.void()))), globalContext$2.property("externals", globalContext$2.function(globalContext$2.return(globalContext$2.array(globalContext$2.nullable(RouterInterface))))), globalContext$2.property("root", globalContext$2.function(globalContext$2.param("opts", globalContext$2.object(globalContext$2.property("to", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("action", globalContext$2.nullable(globalContext$2.string())))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("defineMethod", globalContext$2.function(globalContext$2.param("container", globalContext$2.array(globalContext$2.ref(RouterRouteT$7))), globalContext$2.param("method", globalContext$2.string()), globalContext$2.param("path", globalContext$2.string()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("get", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("post", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("put", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("delete", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("head", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("options", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("patch", globalContext$2.function(globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$1))), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("resource", globalContext$2.function(globalContext$2.param("asName", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.union(globalContext$2.object(globalContext$2.property("path", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("only", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("via", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("param", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.function()))), globalContext$2.param("lambda", globalContext$2.nullable(globalContext$2.function())), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("namespace", globalContext$2.function(globalContext$2.param("asName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.param("aoOpts", globalContext$2.union(globalContext$2.object(globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("prefix", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.function())), globalContext$2.param("lambda", globalContext$2.nullable(globalContext$2.function())), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("member", globalContext$2.function(globalContext$2.param("lambda", globalContext$2.function()), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("collection", globalContext$2.function(globalContext$2.param("lambda", globalContext$2.function()), globalContext$2.return(globalContext$2.void()))), globalContext$2.property("resources", globalContext$2.array(RouterInterface)), globalContext$2.property("routes", globalContext$2.array(globalContext$2.object(globalContext$2.property("method", globalContext$2.string()), globalContext$2.property("path", globalContext$2.string()), globalContext$2.property("resource", globalContext$2.string()), globalContext$2.property("action", globalContext$2.string()), globalContext$2.property("tag", globalContext$2.string()), globalContext$2.property("template", globalContext$2.string()), globalContext$2.property("keyName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("entityName", globalContext$2.string()), globalContext$2.property("recordName", globalContext$2.nullable(globalContext$2.string()))))));
});

const RouterRouteT$8 = globalContext$2.tdz(() => RouterRouteT);
const RouteOptionsT$2 = globalContext$2.tdz(() => RouteOptionsT);
const RouterInterface$1 = globalContext$2.tdz(() => RouterInterface);
const slice$1 = [].slice;
const hasProp$1 = {}.hasOwnProperty;
var Router = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _class3, _temp;

  const {
    Proxy,
    Proto,
    assert,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    mixin,
    Utils: {
      _,
      inflect
    }
  } = Module.NS;
  let Router = (_dec = globalContext$2.annotate(globalContext$2.class("Router", Router => {
    return [globalContext$2.extends(Proxy), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_path", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_name", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_module", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_only", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_via", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_above", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("_at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("_resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_tag", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_templates", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_param", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("_routers", globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(Router)))), globalContext$2.property("_pathes", globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(RouterRouteT$8)))), globalContext$2.property("_resources", globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(Router)))), globalContext$2.method("path", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("name", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("above", globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")))), globalContext$2.method("tag", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("templates", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("param", globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))), globalContext$2.method("defaultEntityName", globalContext$2.return(globalContext$2.string())), globalContext$2.method("map"), globalContext$2.method("externals"), globalContext$2.method("root", globalContext$2.param("opts", globalContext$2.object(globalContext$2.property("to", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("action", globalContext$2.nullable(globalContext$2.string()))))), globalContext$2.method("defineMethod", globalContext$2.param("container", globalContext$2.array(globalContext$2.ref(RouterRouteT$8))), globalContext$2.param("method", globalContext$2.string()), globalContext$2.param("path", globalContext$2.string()), globalContext$2.param("opts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("get", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("post", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("put", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("delete", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("head", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("options", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("patch", globalContext$2.param("asPath", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2)))), globalContext$2.method("resource", globalContext$2.param("asName", globalContext$2.string()), globalContext$2.param("aoOpts", globalContext$2.nullable(globalContext$2.union(globalContext$2.object(globalContext$2.property("path", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("only", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("via", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("param", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member"))), true), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")), true)), globalContext$2.function()))), globalContext$2.param("lambda", globalContext$2.nullable(globalContext$2.function()))), globalContext$2.method("namespace", globalContext$2.param("asName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.param("aoOpts", globalContext$2.union(globalContext$2.object(globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("prefix", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member"))), true), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")), true)), globalContext$2.function())), globalContext$2.param("lambda", globalContext$2.nullable(globalContext$2.function()))), globalContext$2.method("member", globalContext$2.param("lambda", globalContext$2.function())), globalContext$2.method("collection", globalContext$2.param("lambda", globalContext$2.function())), globalContext$2.method("resources", globalContext$2.return(globalContext$2.array(globalContext$2.ref(Router)))), globalContext$2.method("routes", globalContext$2.return(globalContext$2.array(globalContext$2.object(globalContext$2.property("method", globalContext$2.string()), globalContext$2.property("path", globalContext$2.string()), globalContext$2.property("resource", globalContext$2.string()), globalContext$2.property("action", globalContext$2.string()), globalContext$2.property("tag", globalContext$2.string()), globalContext$2.property("template", globalContext$2.string()), globalContext$2.property("keyName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("entityName", globalContext$2.string()), globalContext$2.property("recordName", globalContext$2.nullable(globalContext$2.string())))))), globalContext$2.method("onRegister"), globalContext$2.method("onRemove"), globalContext$2.method("defineValues")];
  })), _dec2 = partOf(Module), _dec3 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec4 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec5 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec6 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec7 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec8 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec9 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec10 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), _dec11 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec12 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec13 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec14 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec15 = globalContext$2.decorate(function () {
    return globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(Router)));
  }), _dec16 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(RouterRouteT$8)))), _dec17 = globalContext$2.decorate(function () {
    return globalContext$2.nullable(globalContext$2.array(globalContext$2.ref(Router)));
  }), _dec(_class = initialize(_class = _dec2(_class = (_class2 = (_temp = _class3 = class Router extends Proxy {
    get path() {
      const _returnType = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType.assert(this._path);
    }

    get name() {
      const _returnType2 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType2.assert(this._resource || this._name);
    }

    get above() {
      const _returnType3 = globalContext$2.return(globalContext$2.nullable(globalContext$2.ref("object")));

      return _returnType3.assert(this._above);
    }

    get tag() {
      const _returnType4 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType4.assert(this._tag);
    }

    get templates() {
      const _returnType5 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType5.assert(this._templates);
    }

    get param() {
      const _returnType6 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

      return _returnType6.assert(this._param);
    }

    defaultEntityName() {
      const _returnType7 = globalContext$2.return(globalContext$2.string());

      const tmpName = this._name.replace(/\/$/, '').split('/');

      const [vsEntityName] = slice$1.call(tmpName, -1);
      return _returnType7.assert(inflect.singularize(vsEntityName));
    }

    map() {
      return;
    }

    externals() {
      return [];
    }

    root(opts) {
      let _optsType = globalContext$2.object(globalContext$2.property("to", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("action", globalContext$2.nullable(globalContext$2.string())));

      globalContext$2.param("opts", _optsType).assert(opts);
      return;
    }

    defineMethod(container, method, path, opts = {}) {
      let _containerType = globalContext$2.array(globalContext$2.ref(RouterRouteT$8));

      let _methodType = globalContext$2.string();

      let _pathType = globalContext$2.string();

      let _optsType2 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("container", _containerType).assert(container);
      globalContext$2.param("method", _methodType).assert(method);
      globalContext$2.param("path", _pathType).assert(path);
      globalContext$2.param("opts", _optsType2).assert(opts);
      let {
        to,
        at,
        resource,
        action,
        tag: asTag,
        template,
        keyName,
        entityName,
        recordName
      } = opts;
      assert(path != null, 'path is required');
      path = _pathType.assert(path.replace(/^[\/]/, ''));

      if (to != null) {
        assert(/[#]/.test(to), '`to` must be in format `<resource>#<action>`');
        [resource, action] = to.split('#');
      }

      const vsResource = this._resource;

      if (resource == null && vsResource !== '') {
        resource = vsResource;
      }

      const vsName = this._name;

      if (resource == null && vsName !== '') {
        resource = vsName;
      }

      assert(resource != null, 'options `to` or `resource` must be defined');

      if (action == null) {
        action = path;
      }

      if (!/[\/]$/.test(resource)) {
        resource += '/';
      }

      if (keyName == null) {
        keyName = this._param != null ? this._param.replace(/^\:/, '') : undefined;
      }

      if (entityName == null) {
        entityName = this.defaultEntityName();
      }

      if (!(_.isString(recordName) || _.isNull(recordName))) {
        recordName = this.defaultEntityName();
      }

      const vsParentTag = this._tag != null && this._tag !== '' ? this._tag : '';
      const vsTag = asTag != null && asTag !== '' ? `/${asTag}` : '';
      const tag = `${vsParentTag}${vsTag}`;
      path = _pathType.assert((() => {
        switch (at || this._at) {
          case 'member':
            return `${this._path}:${inflect.singularize(inflect.underscore(resource.replace(/[\/]/g, '_').replace(/[_]$/g, '')))}/${path}`;

          case 'collection':
            return `${this._path}${path}`;

          default:
            return `${this._path}${path}`;
        }
      })());

      if (template == null) {
        template = resource + action;
      }

      container.push({
        method,
        path,
        resource,
        action,
        tag,
        template,
        keyName,
        entityName,
        recordName
      });
    }

    'get'(asPath, aoOpts) {
      let _asPathType = globalContext$2.string();

      let _aoOptsType = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType).assert(aoOpts);
      this.defineMethod(this._pathes, 'get', asPath, aoOpts);
    }

    post(asPath, aoOpts) {
      let _asPathType2 = globalContext$2.string();

      let _aoOptsType2 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType2).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType2).assert(aoOpts);
      this.defineMethod(this._pathes, 'post', asPath, aoOpts);
    }

    put(asPath, aoOpts) {
      let _asPathType3 = globalContext$2.string();

      let _aoOptsType3 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType3).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType3).assert(aoOpts);
      this.defineMethod(this._pathes, 'put', asPath, aoOpts);
    }

    'delete'(asPath, aoOpts) {
      let _asPathType4 = globalContext$2.string();

      let _aoOptsType4 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType4).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType4).assert(aoOpts);
      this.defineMethod(this._pathes, 'delete', asPath, aoOpts);
    }

    head(asPath, aoOpts) {
      let _asPathType5 = globalContext$2.string();

      let _aoOptsType5 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType5).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType5).assert(aoOpts);
      this.defineMethod(this._pathes, 'head', asPath, aoOpts);
    }

    options(asPath, aoOpts) {
      let _asPathType6 = globalContext$2.string();

      let _aoOptsType6 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType6).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType6).assert(aoOpts);
      this.defineMethod(this._pathes, 'options', asPath, aoOpts);
    }

    patch(asPath, aoOpts) {
      let _asPathType7 = globalContext$2.string();

      let _aoOptsType7 = globalContext$2.nullable(globalContext$2.ref(RouteOptionsT$2));

      globalContext$2.param("asPath", _asPathType7).assert(asPath);
      globalContext$2.param("aoOpts", _aoOptsType7).assert(aoOpts);
      this.defineMethod(this._pathes, 'patch', asPath, aoOpts);
    }

    resource(asName, aoOpts = null, lambda = null) {
      var _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class4, _class5, _init3, _init4, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _class6, _temp2;

      let _asNameType = globalContext$2.string();

      let _aoOptsType8 = globalContext$2.nullable(globalContext$2.union(globalContext$2.object(globalContext$2.property("path", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("only", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("via", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string()))), true), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("param", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member"))), true), globalContext$2.property("resource", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")), true)), globalContext$2.function()));

      let _lambdaType = globalContext$2.nullable(globalContext$2.function());

      globalContext$2.param("asName", _asNameType).assert(asName);
      globalContext$2.param("aoOpts", _aoOptsType8).assert(aoOpts);
      globalContext$2.param("lambda", _lambdaType).assert(lambda);
      const vcModule = this.Module;

      if (_.isFunction(aoOpts)) {
        lambda = _lambdaType.assert(aoOpts);
        aoOpts = _aoOptsType8.assert({});
      }

      if (aoOpts == null) {
        aoOpts = _aoOptsType8.assert({});
      }

      if (lambda == null) {
        lambda = _lambdaType.assert(() => {});
      }

      let {
        path,
        module: vsModule,
        only,
        via,
        except,
        tag: asTag,
        templates: alTemplates,
        param: asParam,
        at,
        resource: asResource,
        above
      } = aoOpts;
      path = path != null ? path.replace(/^[\/]/, '') : undefined;
      const vsPath = path != null && path !== '' ? `${path}/` : path != null && path === '' ? '' : `${asName}/`;

      const vsFullPath = (() => {
        switch (at || this._at) {
          case 'member':
            const splittedPath = this._path.split('/');

            const [previously, empty] = slice$1.call(splittedPath, -2);
            return `${this._path}:${inflect.singularize(inflect.underscore(previously))}/${vsPath}`;

          case 'collection':
            return `${this._path}${vsPath}`;

          default:
            return `${this._path}${vsPath}`;
        }
      })();

      const vsParentName = this._name;
      const vsParentTemplates = this._templates != null && this._templates !== '' ? `${this._templates}/` : '';
      const vsParentTag = this._tag != null && this._tag !== '' ? this._tag : '';
      const vsName = vsModule != null && vsModule !== '' ? `${vsModule}/` : vsModule != null && vsModule === '' ? '' : `${asName}/`;
      const vsTemplates = alTemplates != null && alTemplates !== '' ? alTemplates : alTemplates != null && alTemplates === '' ? '' : vsModule != null && vsModule !== '' ? vsModule : vsModule != null && vsModule === '' ? '' : asName;
      const vsTag = asTag != null && asTag !== '' ? `/${asTag}` : '';
      const vsParam = asParam != null && asParam !== '' ? asParam : ':' + inflect.singularize(inflect.underscore((asResource != null ? asResource : `${vsParentName}${vsName}`).replace(/[\/]/g, '_').replace(/[_]$/g, '')));
      let ResourceRouter = (_dec18 = globalContext$2.annotate(globalContext$2.class("ResourceRouter", globalContext$2.extends(Router), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_path", globalContext$2.string()), globalContext$2.property("_name", globalContext$2.string()), globalContext$2.property("_module", globalContext$2.string()), globalContext$2.property("_only", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_via", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_above", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("_tag", globalContext$2.string()), globalContext$2.property("_templates", globalContext$2.string()), globalContext$2.property("_param", globalContext$2.string()), globalContext$2.property("_resource", globalContext$2.nullable(globalContext$2.string())), globalContext$2.method("map"))), _dec19 = partOf(vcModule), _dec20 = globalContext$2.decorate(globalContext$2.string()), _dec21 = globalContext$2.decorate(globalContext$2.string()), _dec22 = globalContext$2.decorate(globalContext$2.string()), _dec23 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec24 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec25 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec26 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec27 = globalContext$2.decorate(globalContext$2.string()), _dec28 = globalContext$2.decorate(globalContext$2.string()), _dec29 = globalContext$2.decorate(globalContext$2.string()), _dec30 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec18(_class4 = _dec19(_class4 = (_class5 = (_temp2 = _class6 = class ResourceRouter extends Router {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "_path", _descriptor16, this);

          _initializerDefineProperty(this, "_name", _descriptor17, this);

          _initializerDefineProperty(this, "_module", _descriptor18, this);

          _initializerDefineProperty(this, "_only", _descriptor19, this);

          _initializerDefineProperty(this, "_via", _descriptor20, this);

          _initializerDefineProperty(this, "_except", _descriptor21, this);

          _initializerDefineProperty(this, "_above", _descriptor22, this);

          _initializerDefineProperty(this, "_tag", _descriptor23, this);

          _initializerDefineProperty(this, "_templates", _descriptor24, this);

          _initializerDefineProperty(this, "_param", _descriptor25, this);

          _initializerDefineProperty(this, "_resource", _descriptor26, this);
        }

        map() {
          return lambda.call(this);
        }

      }, _class6.__filename = 'ResourceRouter', _class6.object = {}, _temp2), (_applyDecoratedDescriptor(_class5, "__filename", [nameBy], (_init3 = Object.getOwnPropertyDescriptor(_class5, "__filename"), _init3 = _init3 ? _init3.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init3;
        }
      }), _class5), _applyDecoratedDescriptor(_class5, "object", [meta], (_init4 = Object.getOwnPropertyDescriptor(_class5, "object"), _init4 = _init4 ? _init4.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init4;
        }
      }), _class5), _descriptor16 = _applyDecoratedDescriptor(_class5.prototype, "_path", [_dec20, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return vsFullPath;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class5.prototype, "_name", [_dec21, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentName}${vsName}`;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class5.prototype, "_module", [_dec22, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return vsModule;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class5.prototype, "_only", [_dec23, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return only;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class5.prototype, "_via", [_dec24, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return via;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class5.prototype, "_except", [_dec25, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return except;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class5.prototype, "_above", [_dec26, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return above;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class5.prototype, "_tag", [_dec27, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentTag}${vsTag}`;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class5.prototype, "_templates", [_dec28, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class5.prototype, "_param", [_dec29, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return vsParam;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class5.prototype, "_resource", [_dec30, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return asResource;
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "map", [method], Object.getOwnPropertyDescriptor(_class5.prototype, "map"), _class5.prototype)), _class5)) || _class4) || _class4);
      ResourceRouter.constructor = Proto;
      ResourceRouter.onInitialize();

      this._routers.push(ResourceRouter); // const vlRoutes = this._routes;
      // (this._pathes || []).forEach((item) => {
      //   vlRoutes.push(item);
      // });
      // const vlResources = this._resources;
      // if (this._routers != null) {
      // this._routers.forEach((InheritedRouter) => {


      const inheritedRouter = ResourceRouter.new();
      inheritedRouter.defineValues();

      this._resources.push(inheritedRouter); // (inheritedRouter.routes || []).forEach((item) => {
      //   vlRoutes.push(item);
      // });
      // (inheritedRouter.resources || []).forEach((item) => {
      //   vlResources.push(item);
      // });
      // });
      // }
      // this._routes = vlRoutes;
      // this._resources = vlResources;

    }

    namespace(asName, aoOpts = null, lambda = null) {
      var _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _class7, _class8, _init5, _init6, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _class9, _temp3;

      let _asNameType2 = globalContext$2.nullable(globalContext$2.string());

      let _aoOptsType9 = globalContext$2.union(globalContext$2.object(globalContext$2.property("module", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("prefix", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("tag", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("templates", globalContext$2.nullable(globalContext$2.string()), true), globalContext$2.property("at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member"))), true), globalContext$2.property("above", globalContext$2.nullable(globalContext$2.ref("object")), true)), globalContext$2.function());

      let _lambdaType2 = globalContext$2.nullable(globalContext$2.function());

      globalContext$2.param("asName", _asNameType2).assert(asName);
      globalContext$2.param("aoOpts", _aoOptsType9).assert(aoOpts);
      globalContext$2.param("lambda", _lambdaType2).assert(lambda);
      const vcModule = this.Module;

      if (_.isFunction(aoOpts)) {
        lambda = _lambdaType2.assert(aoOpts);
        aoOpts = _aoOptsType9.assert({});
      }

      if (aoOpts == null) {
        aoOpts = _aoOptsType9.assert({});
      }

      const {
        module: vsModule,
        prefix,
        tag: asTag,
        templates: alTemplates,
        at,
        above
      } = aoOpts;
      const vsParentPath = this._path;
      const vsPath = prefix != null && prefix !== '' ? `${prefix}/` : prefix != null && prefix === '' ? '' : `${asName}/`;
      const vsParentName = this._name;
      const vsParentTemplates = this._templates != null && this._templates !== '' ? `${this._templates}/` : '';
      const vsParentTag = this._tag != null && this._tag !== '' ? this._tag : '';
      const vsName = vsModule != null && vsModule !== '' ? `${vsModule}/` : vsModule != null && vsModule === '' ? '' : `${asName}/`;
      const vsTemplates = alTemplates != null && alTemplates !== '' ? alTemplates : alTemplates != null && alTemplates === '' ? '' : vsModule != null && vsModule !== '' ? vsModule : vsModule != null && vsModule === '' ? '' : asName;
      const vsTag = asTag != null && asTag !== '' ? `/${asTag}` : '';
      let NamespaceRouter = (_dec31 = globalContext$2.annotate(globalContext$2.class("NamespaceRouter", globalContext$2.extends(Router), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_path", globalContext$2.string()), globalContext$2.property("_name", globalContext$2.string()), globalContext$2.property("_except", globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), globalContext$2.property("_tag", globalContext$2.string()), globalContext$2.property("_templates", globalContext$2.string()), globalContext$2.property("_at", globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), globalContext$2.property("_above", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.method("map"))), _dec32 = partOf(vcModule), _dec33 = globalContext$2.decorate(globalContext$2.string()), _dec34 = globalContext$2.decorate(globalContext$2.string()), _dec35 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string(), globalContext$2.array(globalContext$2.string())))), _dec36 = globalContext$2.decorate(globalContext$2.string()), _dec37 = globalContext$2.decorate(globalContext$2.string()), _dec38 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.union(globalContext$2.string("collection"), globalContext$2.string("member")))), _dec39 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec31(_class7 = _dec32(_class7 = (_class8 = (_temp3 = _class9 = class NamespaceRouter extends Router {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "_path", _descriptor27, this);

          _initializerDefineProperty(this, "_name", _descriptor28, this);

          _initializerDefineProperty(this, "_except", _descriptor29, this);

          _initializerDefineProperty(this, "_tag", _descriptor30, this);

          _initializerDefineProperty(this, "_templates", _descriptor31, this);

          _initializerDefineProperty(this, "_at", _descriptor32, this);

          _initializerDefineProperty(this, "_above", _descriptor33, this);
        }

        map() {
          return lambda.call(this);
        }

      }, _class9.__filename = 'NamespaceRouter', _class9.object = {}, _temp3), (_applyDecoratedDescriptor(_class8, "__filename", [nameBy], (_init5 = Object.getOwnPropertyDescriptor(_class8, "__filename"), _init5 = _init5 ? _init5.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init5;
        }
      }), _class8), _applyDecoratedDescriptor(_class8, "object", [meta], (_init6 = Object.getOwnPropertyDescriptor(_class8, "object"), _init6 = _init6 ? _init6.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init6;
        }
      }), _class8), _descriptor27 = _applyDecoratedDescriptor(_class8.prototype, "_path", [_dec33, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentPath}${vsPath}`;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class8.prototype, "_name", [_dec34, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentName}${vsName}`;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class8.prototype, "_except", [_dec35, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return ['all'];
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class8.prototype, "_tag", [_dec36, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentTag}${vsTag}`;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class8.prototype, "_templates", [_dec37, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class8.prototype, "_at", [_dec38, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return at;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class8.prototype, "_above", [_dec39, property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return above;
        }
      }), _applyDecoratedDescriptor(_class8.prototype, "map", [method], Object.getOwnPropertyDescriptor(_class8.prototype, "map"), _class8.prototype)), _class8)) || _class7) || _class7);
      NamespaceRouter.constructor = Proto;
      NamespaceRouter.onInitialize();

      this._routers.push(NamespaceRouter); // const vlRoutes = this._routes;
      // (this._pathes || []).forEach((item) => {
      //   vlRoutes.push(item);
      // });
      // const vlResources = this._resources;
      // if (this._routers != null) {
      // this._routers.forEach((InheritedRouter) => {


      const inheritedRouter = NamespaceRouter.new();
      inheritedRouter.defineValues();

      this._resources.push(inheritedRouter); // (inheritedRouter.routes || []).forEach((item) => {
      //   vlRoutes.push(item);
      // });
      // (inheritedRouter.resources || []).forEach((item) => {
      //   vlResources.push(item);
      // });
      // });
      // }
      // this._routes = vlRoutes;
      // this._resources = vlResources;

    }

    member(lambda) {
      let _lambdaType3 = globalContext$2.function();

      globalContext$2.param("lambda", _lambdaType3).assert(lambda);
      this.namespace(null, {
        module: '',
        prefix: '',
        templates: '',
        at: 'member'
      }, lambda);
    }

    collection(lambda) {
      let _lambdaType4 = globalContext$2.function();

      globalContext$2.param("lambda", _lambdaType4).assert(lambda);
      this.namespace(null, {
        module: '',
        prefix: '',
        templates: '',
        at: 'collection'
      }, lambda);
    }

    get resources() {
      const _returnType8 = globalContext$2.return(globalContext$2.array(globalContext$2.ref(Router)));

      const vlResources = [];
      (this._resources || []).forEach(item => {
        vlResources.push(item);
      });

      if (this._resources != null) {
        this._resources.forEach(inheritedRouter => {
          (inheritedRouter.resources || []).forEach(item => {
            vlResources.push(item);
          });
        });
      }

      return _returnType8.assert(vlResources);
    }

    get routes() {
      const _returnType9 = globalContext$2.return(globalContext$2.array(globalContext$2.object(globalContext$2.property("method", globalContext$2.string()), globalContext$2.property("path", globalContext$2.string()), globalContext$2.property("resource", globalContext$2.string()), globalContext$2.property("action", globalContext$2.string()), globalContext$2.property("tag", globalContext$2.string()), globalContext$2.property("template", globalContext$2.string()), globalContext$2.property("keyName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("entityName", globalContext$2.string()), globalContext$2.property("recordName", globalContext$2.nullable(globalContext$2.string())))));

      // if ((this._routes != null) && this._routes.length > 0) {
      //   return this._routes;
      // } else {
      const vlRoutes = [];
      (this._pathes || []).forEach(item => {
        vlRoutes.push(item);
      }); //   const vlResources = [];
      //   if (this._routers != null) {
      //     this._routers.forEach((InheritedRouter) => {
      //       const inheritedRouter = InheritedRouter.new();
      //       vlResources.push(inheritedRouter);
      //       (inheritedRouter.routes || []).forEach((item) => {
      //         vlRoutes.push(item);
      //       });
      //       (inheritedRouter.resources || []).forEach((item) => {
      //         vlResources.push(item);
      //       });
      //     });
      //   }
      //   this._routes = vlRoutes;
      //   this._resources = vlResources;
      // }
      // return this._routes;

      if (this._resources != null) {
        this._resources.forEach(inheritedRouter => {
          (inheritedRouter.routes || []).forEach(item => {
            vlRoutes.push(item);
          });
        });
      }

      return _returnType9.assert(vlRoutes);
    }

    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "_path", _descriptor, this);

      _initializerDefineProperty(this, "_name", _descriptor2, this);

      _initializerDefineProperty(this, "_module", _descriptor3, this);

      _initializerDefineProperty(this, "_only", _descriptor4, this);

      _initializerDefineProperty(this, "_via", _descriptor5, this);

      _initializerDefineProperty(this, "_except", _descriptor6, this);

      _initializerDefineProperty(this, "_above", _descriptor7, this);

      _initializerDefineProperty(this, "_at", _descriptor8, this);

      _initializerDefineProperty(this, "_resource", _descriptor9, this);

      _initializerDefineProperty(this, "_tag", _descriptor10, this);

      _initializerDefineProperty(this, "_templates", _descriptor11, this);

      _initializerDefineProperty(this, "_param", _descriptor12, this);

      _initializerDefineProperty(this, "_routers", _descriptor13, this);

      _initializerDefineProperty(this, "_pathes", _descriptor14, this);

      _initializerDefineProperty(this, "_resources", _descriptor15, this);

      globalContext$2.ref(RouterInterface$1).assert(this);
    }

    onRegister() {
      super.onRegister(...arguments);
      this.defineValues();
    }

    onRemove() {
      super.onRemove(...arguments);
    }

    defineValues() {
      for (const voExternalRouter of this.externals()) {
        for (const voRoute of voExternalRouter.routes) {
          this._pathes.push(voRoute);
        }
      }

      this.map();

      if (_.isString(this._only)) {
        this._only = [this._only];
      }

      if (_.isString(this._via)) {
        this._via = [this._via];
      }

      if (_.isString(this._except)) {
        this._except = [this._except];
      }

      const voMethods = {
        list: 'get',
        detail: 'get',
        create: 'post',
        update: 'put',
        delete: 'delete'
      };
      const voPaths = {
        list: '',
        detail: null,
        create: '',
        update: null,
        delete: null
      };

      if (this._name != null && this._name !== '') {
        const vsKeyName = this._param && this._param.replace(/^\:/, '') || undefined;
        const vsEntityName = this._above && this._above.entityName || this.defaultEntityName();
        const vsAboveName = this._above && this._above.recordName || undefined; // if (_.isNil(vsAboveName) && !_.isNull(vsAboveName)) {
        //   const vsDefaultName = this.defaultEntityName();
        // }

        const vsRecordName = _.isNil(vsAboveName) && !_.isNull(vsAboveName) ? this.defaultEntityName() : vsAboveName;

        if (this._only != null) {
          this._only.forEach(asAction => {
            const vsPath = voPaths[asAction] || this._param;
            this.defineMethod(this._pathes, voMethods[asAction], vsPath, {
              action: asAction,
              resource: this._resource || this._name,
              template: this._templates + '/' + asAction,
              keyName: vsKeyName,
              entityName: vsEntityName,
              recordName: vsRecordName
            });
          });
        } else if (this._except != null) {
          for (const asAction in voMethods) {
            if (!hasProp$1.call(voMethods, asAction)) continue;
            const vsMethod = voMethods[asAction];

            if (!this._except.includes('all') && !this._except.includes(asAction)) {
              const vsPath = voPaths[asAction] || this._param;
              this.defineMethod(this._pathes, vsMethod, vsPath, {
                action: asAction,
                resource: this._resource || this._name,
                template: this._templates + '/' + asAction,
                keyName: vsKeyName,
                entityName: vsEntityName,
                recordName: vsRecordName
              });
            }
          }
        } else if (this._via != null) {
          this._via.forEach(asCustomAction => {
            const vsPath = voPaths[asCustomAction] || this._param;

            if (asCustomAction === 'all') {
              for (const asAction in voMethods) {
                if (!hasProp$1.call(voMethods, asAction)) continue;
                const vsMethod = voMethods[asAction];
                this.defineMethod(this._pathes, vsMethod, vsPath, {
                  action: asAction,
                  resource: this._resource || this._name,
                  template: this._templates + '/' + asAction,
                  keyName: vsKeyName,
                  entityName: vsEntityName,
                  recordName: vsRecordName
                });
              }
            } else {
              this.defineMethod(this._pathes, voMethods[asCustomAction], vsPath, {
                action: asCustomAction,
                resource: this._resource || this._name,
                template: this._templates + '/' + asAction,
                keyName: vsKeyName,
                entityName: vsEntityName,
                recordName: vsRecordName
              });
            }
          });
        } else {
          for (const asAction in voMethods) {
            if (!hasProp$1.call(voMethods, asAction)) continue;
            const vsMethod = voMethods[asAction];
            const vsPath = voPaths[asAction] || this._param;
            this.defineMethod(this._pathes, vsMethod, vsPath, {
              action: asAction,
              resource: this._resource || this._name,
              template: this._templates + '/' + asAction,
              keyName: vsKeyName,
              entityName: vsEntityName,
              recordName: vsRecordName
            });
          }
        }
      }
    }

  }, _class3.__filename = __filename$l, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_path", [_dec3, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '/';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_name", [_dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_module", [_dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_only", [_dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_via", [_dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_except", [_dec8, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_above", [_dec9, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_at", [_dec10, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_resource", [_dec11, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec12, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_templates", [_dec13, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_param", [_dec14, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_routers", [_dec15, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_pathes", [_dec16, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_resources", [_dec17, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "path", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "path"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "name", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "name"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "above", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "above"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tag", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "tag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "templates", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "templates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "param", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "param"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultEntityName", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultEntityName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "map", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "map"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "externals", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "externals"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "root", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "root"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defineMethod", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "defineMethod"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "post", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "post"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "put", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "put"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'delete', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'delete'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "head", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "head"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "options", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "options"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "patch", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "patch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resource", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "resource"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "namespace", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "namespace"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "member", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "member"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "collection", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "collection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resources", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "resources"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "routes", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "routes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRegister", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRegister"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRemove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defineValues", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "defineValues"), _class2.prototype)), _class2)) || _class) || _class) || _class);
});

var __filename$m = '/mediators/HttpMediator.js';

const LegacyResponseInterface$4 = globalContext$2.tdz(() => LegacyResponseInterface);
const AxiosResponse$4 = globalContext$2.tdz(() => AxiosResponse);
const Config$4 = globalContext$2.tdz(() => Config);
const RouterRouteT$9 = globalContext$2.tdz(() => RouterRouteT);
const ResourceInterface$9 = globalContext$2.tdz(() => ResourceInterface);
const RendererInterface$3 = globalContext$2.tdz(() => RendererInterface);
const ContextInterface$d = globalContext$2.tdz(() => ContextInterface);
const HttpMediatorInterface$3 = globalContext$2.tdz(() => HttpMediatorInterface);
const RouterInterface$2 = globalContext$2.tdz(() => RouterInterface);
const NotificationInterface$4 = globalContext$2.tdz(() => NotificationInterface);
const indexOf = [].indexOf; // from https://github.com/koajs/route/blob/master/index.js ###############

const decode = globalContext$2.annotate(function decode(val) {
  let _valType = globalContext$2.nullable(globalContext$2.string());

  const _returnType4 = globalContext$2.return(globalContext$2.nullable(globalContext$2.string()));

  globalContext$2.param("val", _valType).assert(val);

  // чистая функция
  if (val) {
    return _returnType4.assert(decodeURIComponent(val));
  }
}, globalContext$2.function(globalContext$2.param("val", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.nullable(globalContext$2.string()))));
const matches = globalContext$2.annotate(function matches(ctx, methodName) {
  let _ctxType = globalContext$2.ref(ContextInterface$d);

  let _methodNameType = globalContext$2.string();

  const _returnType5 = globalContext$2.return(globalContext$2.boolean());

  globalContext$2.param("ctx", _ctxType).assert(ctx);
  globalContext$2.param("methodName", _methodNameType).assert(methodName);

  if (!methodName) {
    return _returnType5.assert(true);
  }

  if (ctx.method === methodName) {
    return _returnType5.assert(true);
  }

  if (methodName === 'GET' && ctx.method === 'HEAD') {
    return _returnType5.assert(true);
  }

  return _returnType5.assert(false);
}, globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.param("methodName", globalContext$2.string()), globalContext$2.return(globalContext$2.boolean())));
var HttpMediator = (Module => {
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _temp;

  const {
    // MIGRATIONS,
    APPLICATION_ROUTER,
    // APPLICATION_MEDIATOR,
    RESOURCE_RESULT,
    METHODS,
    JSON_RENDERER,
    Pipes,
    Mediator,
    // Context,
    // Renderer,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    inject,
    Utils: {
      _,
      inflect,
      genRandomAlphaNumbers,
      statuses,
      assert
    }
  } = Module.NS;
  let HttpMediator = (_dec = globalContext$2.annotate(globalContext$2.class("HttpMediator", globalContext$2.extends(Mediator), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("_contextFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(ContextInterface$d)))), globalContext$2.property("_rendererFactory", globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RendererInterface$3)))), globalContext$2.property("_routerFactory", globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RouterInterface$2)))), globalContext$2.property("_resourceChecker", globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.boolean()))), globalContext$2.property("_eventNames", globalContext$2.ref("object")), globalContext$2.property("_httpServer", globalContext$2.ref("object")), globalContext$2.property("_composed", globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("_handler", globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), globalContext$2.property("middlewares", globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), globalContext$2.property("handlers", globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), globalContext$2.method("responseFormats", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.property("routerName", globalContext$2.string()), globalContext$2.property("defaultRenderer", globalContext$2.string()), globalContext$2.staticMethod("compose", globalContext$2.param("middlewares", globalContext$2.array(globalContext$2.function())), globalContext$2.param("handlers", globalContext$2.array(globalContext$2.nullable(globalContext$2.array(globalContext$2.function())))), globalContext$2.return(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))))), globalContext$2.staticMethod("createMethod", globalContext$2.param("methodName", globalContext$2.nullable(globalContext$2.string())), globalContext$2.return(globalContext$2.void())), globalContext$2.method("del", globalContext$2.param("args", globalContext$2.any())), globalContext$2.property("jsonRendererName", globalContext$2.string()), globalContext$2.method("listNotificationInterests", globalContext$2.return(globalContext$2.array(globalContext$2.string()))), globalContext$2.method("handleNotification", globalContext$2.param("aoNotification", globalContext$2.ref(NotificationInterface$4)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("onRegister"), globalContext$2.method("onRemove"), globalContext$2.method("serverListen"), globalContext$2.method("use", globalContext$2.param("index", globalContext$2.union(globalContext$2.number(), globalContext$2.function())), globalContext$2.param("middleware", globalContext$2.nullable(globalContext$2.function())), globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$3))), globalContext$2.method("callback", globalContext$2.return(globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))))), globalContext$2.method("handleStatistics", globalContext$2.param("reqLength", globalContext$2.number()), globalContext$2.param("resLength", globalContext$2.number()), globalContext$2.param("time", globalContext$2.number()), globalContext$2.param("aoContext", globalContext$2.ref(ContextInterface$d))), globalContext$2.method("onerror", globalContext$2.param("err", globalContext$2.ref("Error")), globalContext$2.return(globalContext$2.void())), globalContext$2.method("respond", globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("perform", _fn => {
    const T = _fn.typeParameter("T", undefined, globalContext$2.any());

    const R = _fn.typeParameter("R", undefined, T);

    const L = _fn.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$4, globalContext$2.ref(AxiosResponse$4, T, R)));

    return [globalContext$2.param("methodName", globalContext$2.string()), globalContext$2.param("url", globalContext$2.string()), globalContext$2.param("options", globalContext$2.ref(Config$4, globalContext$2.flowInto(T), globalContext$2.flowInto(R))), globalContext$2.return(globalContext$2.ref("Promise", L))];
  }), globalContext$2.method("rendererFor", globalContext$2.param("asFormat", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RendererInterface$3))), globalContext$2.method("sendHttpResponse", _fn2 => {
    const S = _fn2.typeParameter("S", undefined, globalContext$2.ref(ResourceInterface$9));

    return [globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.param("aoData", globalContext$2.nullable(globalContext$2.any())), globalContext$2.param("resource", globalContext$2.flowInto(S)), globalContext$2.param("opts", globalContext$2.ref(RouterRouteT$9)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))];
  }), globalContext$2.method("defineRoutes"), globalContext$2.method("sender", globalContext$2.param("resourceName", globalContext$2.string()), globalContext$2.param("aoMessage", globalContext$2.exactObject(globalContext$2.property("context", globalContext$2.ref(ContextInterface$d)), globalContext$2.property("reverse", globalContext$2.string()))), globalContext$2.param("route", globalContext$2.ref(RouterRouteT$9)), globalContext$2.return(globalContext$2.void())), globalContext$2.method("createNativeRoute", globalContext$2.param("opts", globalContext$2.ref(RouterRouteT$9)), globalContext$2.return(globalContext$2.void())))), _dec2 = partOf(Module), _dec3 = globalContext$2.decorate(globalContext$2.function(globalContext$2.return(globalContext$2.ref(ContextInterface$d)))), _dec4 = inject('Factory<Context>'), _dec5 = globalContext$2.decorate(globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RendererInterface$3)))), _dec6 = inject('RendererFactory<*>'), _dec7 = globalContext$2.decorate(globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.ref(RouterInterface$2)))), _dec8 = inject('RouterFactory<*>'), _dec9 = globalContext$2.decorate(globalContext$2.function(globalContext$2.param("_arg0", globalContext$2.string()), globalContext$2.return(globalContext$2.boolean()))), _dec10 = inject('ResourceChecker<*>'), _dec11 = globalContext$2.decorate(globalContext$2.ref("object")), _dec12 = globalContext$2.decorate(globalContext$2.ref("object")), _dec13 = globalContext$2.decorate(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), _dec14 = globalContext$2.decorate(globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))), _dec15 = globalContext$2.decorate(globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), _dec16 = globalContext$2.decorate(globalContext$2.array(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.boolean())))))), _dec17 = globalContext$2.decorate(globalContext$2.string()), _dec18 = globalContext$2.decorate(globalContext$2.string()), _dec19 = globalContext$2.decorate(globalContext$2.string()), _dec(_class = initialize(_class = _dec2(_class = (_class2 = (_temp = _class3 = class HttpMediator extends Mediator {
    // @property _renderers: ?{[key: string]: ?RendererInterface} = null;
    get responseFormats() {
      const _returnType6 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      return _returnType6.assert(['json', 'html', 'xml', 'atom', 'text']);
    }

    static compose(middlewares, handlers) {
      let _middlewaresType = globalContext$2.array(globalContext$2.function());

      let _handlersType = globalContext$2.array(globalContext$2.nullable(globalContext$2.array(globalContext$2.function())));

      const _returnType7 = globalContext$2.return(globalContext$2.function(globalContext$2.param("ctx", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))));

      globalContext$2.param("middlewares", _middlewaresType).assert(middlewares);
      globalContext$2.param("handlers", _handlersType).assert(handlers);
      assert(_.isArray(middlewares), 'Middleware stack must be an array!');
      assert(_.isArray(handlers), 'Handlers stack must be an array!');
      return _returnType7.assert(globalContext$2.annotate(async context => {
        let _contextType = globalContext$2.ref(ContextInterface$d);

        const _returnType7 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

        globalContext$2.param("context", _contextType).assert(context);

        for (const middleware of middlewares) {
          assert(_.isFunction(middleware), 'Middleware must be composed of functions!');
          await middleware(context);
        }

        let runned = false;

        for (const handlerGroup of handlers) {
          if (handlerGroup == null) {
            continue;
          }

          for (const handler of handlerGroup) {
            assert(_.isFunction(handler), 'Handler must be composed of functions!');

            if (await handler(context)) {
              runned = true;
              break;
            }
          }

          if (runned) {
            break;
          }
        }
      }, globalContext$2.function(globalContext$2.param("context", globalContext$2.ref(ContextInterface$d)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))));
    }

    static createMethod(methodName) {
      let _methodNameType2 = globalContext$2.nullable(globalContext$2.string());

      const _returnType8 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("methodName", _methodNameType2).assert(methodName);
      const originMethodName = methodName || 'all';

      if (methodName) {
        methodName = _methodNameType2.assert(methodName.toUpperCase());
      }

      Reflect.defineProperty(this.prototype, `${originMethodName}`, method(this.prototype, `${originMethodName}`, {
        value: globalContext$2.annotate(function (path, routeFunc) {
          let _pathType = globalContext$2.string();

          let _routeFuncType = globalContext$2.function();

          globalContext$2.param("path", _pathType).assert(path);
          globalContext$2.param("routeFunc", _routeFuncType).assert(routeFunc);
          assert(!!routeFunc, 'handler is required');
          const {
            ERROR,
            DEBUG,
            LEVELS,
            SEND_TO_LOG
          } = Module.NS.Pipes.NS.LogMessage;
          const keys = [];
          const re = pathToRegexp(path, keys);
          this.send(SEND_TO_LOG, `${methodName != null ? methodName : 'ALL'} ${path} -> ${re}`, LEVELS[DEBUG]);
          this.use(keys.length, async ctx => {
            if (!matches(ctx, methodName)) {
              return;
            }

            const m = re.exec(ctx.path);

            if (m) {
              const pathParams = m.slice(1).map(decode).reduce((prev, item, index) => {
                prev[keys[index].name] = item;
                return prev;
              }, {});
              ctx.routePath = path;
              this.send(SEND_TO_LOG, `${ctx.method} ${path} matches ${ctx.path} ${JSON.stringify(pathParams)}`, LEVELS[DEBUG]);
              ctx.pathParams = pathParams;
              return await routeFunc.call(this, ctx);
            }
          });
        }, globalContext$2.function(globalContext$2.param("path", globalContext$2.string()), globalContext$2.param("routeFunc", globalContext$2.function())))
      }));
    }

    del(...args) {
      return this.delete(...args);
    }

    // @property htmlRendererName: string
    // @property xmlRendererName: string
    // @property atomRendererName: string
    // @property textRendererName: string
    listNotificationInterests() {
      const _returnType9 = globalContext$2.return(globalContext$2.array(globalContext$2.string()));

      return _returnType9.assert([RESOURCE_RESULT]);
    }

    handleNotification(aoNotification) {
      let _aoNotificationType = globalContext$2.ref(NotificationInterface$4);

      const _returnType10 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("aoNotification", _aoNotificationType).assert(aoNotification);
      const vsName = aoNotification.getName();
      const voBody = aoNotification.getBody();
      const vsType = aoNotification.getType();

      switch (vsName) {
        case RESOURCE_RESULT:
          this.getViewComponent().emit(vsType, voBody);
      }
    }

    onRegister() {
      const voEmitter = new EventEmitter();
      voEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);

      if (!_.isFunction(voEmitter.eventNames)) {
        const eventNames = this._eventNames = {};
        const FILTER = ['newListener', 'removeListener'];
        voEmitter.on('newListener', (event, listener) => {
          if (indexOf.call(FILTER, event) < 0) {
            if (eventNames[event] == null) {
              eventNames[event] = 0;
            }

            ++eventNames[event];
          }
        });
        voEmitter.on('removeListener', (event, listener) => {
          if (indexOf.call(FILTER, event) < 0) {
            if (eventNames[event] > 0) {
              --eventNames[event];
            }
          }
        });
      }

      if (voEmitter.listeners('error').length === 0) {
        voEmitter.on('error', this.onerror.bind(this));
      }

      this.setViewComponent(voEmitter);
      this.defineRoutes();
      this.serverListen();
    }

    async onRemove() {
      const voEmitter = this.getViewComponent();
      const eventNames = typeof voEmitter.eventNames === "function" ? voEmitter.eventNames() : Object.keys(this._eventNames || {});
      eventNames.forEach(eventName => {
        voEmitter.removeAllListeners(eventName);
      });
      await new Promise(resolve => this._httpServer.close(resolve));
      console.log("after HttpMediator::onRemove", this._multitonKey);
    }

    serverListen() {
      const {
        ERROR,
        DEBUG,
        LEVELS,
        SEND_TO_LOG
      } = Module.NS.Pipes.NS.LogMessage;
      const port = typeof process !== "undefined" && process != null && process.env != null && process.env.PORT != null ? process.env.PORT : this.configs != null ? this.configs.port : 3000;
      this._httpServer = http.createServer(this.callback());

      this._httpServer.listen(port, () => {
        // console.log "listening on port #{port}"
        this.send(SEND_TO_LOG, `listening on port ${port}`, LEVELS[DEBUG]);
      });
    }

    use(index, middleware) {
      let _indexType = globalContext$2.union(globalContext$2.number(), globalContext$2.function());

      let _middlewareType = globalContext$2.nullable(globalContext$2.function());

      const _returnType11 = globalContext$2.return(globalContext$2.ref(HttpMediatorInterface$3));

      globalContext$2.param("index", _indexType).assert(index);
      globalContext$2.param("middleware", _middlewareType).assert(middleware);

      if (middleware == null) {
        middleware = _middlewareType.assert(index);
        index = _indexType.assert(null);
      }

      assert(_.isFunction(middleware), 'middleware or handler must be a function!');
      const middlewareName = middleware.name || '-';
      const {
        ERROR,
        DEBUG,
        LEVELS,
        SEND_TO_LOG
      } = Module.NS.Pipes.NS.LogMessage;
      this.send(SEND_TO_LOG, `use ${middlewareName}`, LEVELS[DEBUG]);

      if (index != null) {
        if (this.handlers[index] == null) {
          this.handlers[index] = [];
        }

        this.handlers[index].push(middleware);
      } else {
        this.middlewares.push(middleware);
      }

      return _returnType11.assert(this);
    }

    callback() {
      const _returnType12 = globalContext$2.return(globalContext$2.function(globalContext$2.param("req", globalContext$2.ref("object")), globalContext$2.param("res", globalContext$2.ref("object")), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))));

      // if (this._composed == null) {
      this._composed = this.constructor.compose(this.middlewares, this.handlers); // }

      const fn = this._composed; // if (this._handler == null) {
      // this._handler = async (req, res) => {

      return _returnType12.assert(async (req, res) => {
        const t1 = Date.now();
        const {
          ERROR,
          DEBUG,
          LEVELS,
          SEND_TO_LOG
        } = Module.NS.Pipes.NS.LogMessage;
        this.send(SEND_TO_LOG, '>>>>>> START REQUEST HANDLING', LEVELS[DEBUG]);
        res.statusCode = 404; // const voContext = Context.new(this, req, res);

        const voContext = this._contextFactory();

        voContext.setReqResPair(req, res);

        try {
          await fn(voContext);
          this.respond(voContext);
        } catch (error) {
          voContext.onerror(error);
        }

        onFinished(res, err => {
          voContext.onerror(err);
        });
        this.send(SEND_TO_LOG, '>>>>>> END REQUEST HANDLING', LEVELS[DEBUG]);
        const reqLength = voContext.request.length;
        const resLength = voContext.response.length;
        const time = Date.now() - t1;
        await this.handleStatistics(reqLength, resLength, time, voContext);
      }); // }
      // return this._handler;
    }

    async handleStatistics(reqLength, resLength, time, aoContext) {
      let _reqLengthType = globalContext$2.number();

      let _resLengthType = globalContext$2.number();

      let _timeType = globalContext$2.number();

      let _aoContextType = globalContext$2.ref(ContextInterface$d);

      globalContext$2.param("reqLength", _reqLengthType).assert(reqLength);
      globalContext$2.param("resLength", _resLengthType).assert(resLength);
      globalContext$2.param("time", _timeType).assert(time);
      globalContext$2.param("aoContext", _aoContextType).assert(aoContext);
      const {
        DEBUG,
        LEVELS,
        SEND_TO_LOG
      } = Module.NS.Pipes.NS.LogMessage;
      this.send(SEND_TO_LOG, `REQUEST LENGTH ${reqLength} byte RESPONSE LENGTH ${resLength} byte HANDLED BY ${time} ms`, LEVELS[DEBUG]);
    }

    onerror(err) {
      let _errType = globalContext$2.ref("Error");

      const _returnType13 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("err", _errType).assert(err);
      assert(_.isError(err), `non-error thrown: ${err}`);

      if (404 === err.status || err.expose) {
        return _returnType13.assert();
      }

      if (this.configs != null && this.configs.silent) {
        return _returnType13.assert();
      }

      const msg = err.stack || String(err);
      const {
        ERROR,
        DEBUG,
        LEVELS,
        SEND_TO_LOG
      } = Module.NS.Pipes.NS.LogMessage;
      this.send(SEND_TO_LOG, msg.replace(/^/gm, '  '), LEVELS[ERROR]);
    }

    respond(ctx) {
      let _ctxType2 = globalContext$2.ref(ContextInterface$d);

      const _returnType14 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("ctx", _ctxType2).assert(ctx);
      if (ctx.respond === false) return _returnType14.assert();
      let body = ctx.body;
      const code = ctx.status;

      if (statuses.empty[code]) {
        ctx.body = null;
        ctx.res.end();
        return _returnType14.assert();
      }

      if ('HEAD' === ctx.method) {
        if (!ctx.headersSent && _.isObjectLike(body)) {
          ctx.length = Buffer.byteLength(JSON.stringify(body));
        }

        ctx.res.end();
        return _returnType14.assert();
      }

      if (body == null) {
        body = ctx.message || String(code);

        if (!ctx.headersSent) {
          ctx.type = 'text';
          ctx.length = Buffer.byteLength(body);
        }

        ctx.res.end(body);
        return _returnType14.assert();
      }

      if (_.isBuffer(body) || _.isString(body)) {
        ctx.res.end(body);
        return _returnType14.assert();
      }

      if (body instanceof Stream) {
        body.pipe(ctx.res);
        return _returnType14.assert();
      }

      body = JSON.stringify(body != null ? body : null);

      if (!ctx.res.headersSent) {
        ctx.length = Buffer.byteLength(body);
      }

      ctx.res.end(body);
    }

    async perform(methodName, url, options) {
      const T = globalContext$2.typeParameter("T", undefined, globalContext$2.any());
      const R = globalContext$2.typeParameter("R", undefined, T);
      const L = globalContext$2.typeParameter("L", undefined, globalContext$2.ref(LegacyResponseInterface$4, globalContext$2.ref(AxiosResponse$4, T, R)));

      let _methodNameType3 = globalContext$2.string();

      let _urlType = globalContext$2.string();

      let _optionsType = globalContext$2.ref(Config$4, globalContext$2.flowInto(T), globalContext$2.flowInto(R));

      const _returnType2 = globalContext$2.return(globalContext$2.union(L, globalContext$2.ref("Promise", L)));

      globalContext$2.param("methodName", _methodNameType3).assert(methodName);
      globalContext$2.param("url", _urlType).assert(url);
      globalContext$2.param("options", _optionsType).assert(options);
      this.send(SEND_TO_LOG, '>>>>>> START PERFORM-REQUEST HANDLING', LEVELS[DEBUG]); // if (this._composed == null) {
      //   this._composed = this.constructor.compose(
      //     this.middlewares, this.handlers
      //   );
      // }
      // const fn = this._composed;

      const fn = this.constructor.compose(this.middlewares, this.handlers);
      const req = {
        method: methodName,
        url,
        headers: options.headers
      };

      if (options.body != null) {
        req.body = options.data || options.body || options.form;
        req.rawBody = new Buffer(JSON.stringify(req.body));
      }

      const res = {
        statusCode: 404
      }; // const voContext = Context.new(this, req, res);

      const voContext = this._contextFactory();

      voContext.setReqResPair(req, res);
      voContext.isPerformExecution = true;

      try {
        await fn(voContext);
        this.respond(voContext);
      } catch (error) {
        voContext.onerror(error);
      }

      const {
        statusCode: status,
        statusMessage: message,
        body,
        headers
      } = res;
      this.send(SEND_TO_LOG, '>>>>>> END PERFORM-REQUEST HANDLING', LEVELS[DEBUG]);
      return _returnType2.assert({
        status,
        message,
        headers,
        body
      });
    }

    rendererFor(asFormat) {
      let _asFormatType = globalContext$2.string();

      const _returnType15 = globalContext$2.return(globalContext$2.ref(RendererInterface$3));

      globalContext$2.param("asFormat", _asFormatType).assert(asFormat);
      return _returnType15.assert(this[`${asFormat}RendererName`] != null ? this._rendererFactory(this[`${asFormat}RendererName`]) : this._rendererFactory(this[`jsonRendererName`])); // if (this._renderers == null) {
      //   this._renderers = {};
      // }
      // if (this._renderers[asFormat] == null) {
      //   this._renderers[asFormat] = ((asFormat) => {
      //     const voRenderer = this[`${asFormat}RendererName`] != null ?
      //       this.facade.retrieveProxy(this[`${asFormat}RendererName`])
      //     : Renderer.new();
      //     return voRenderer;
      //   })(asFormat);
      // }
      // return this._renderers[asFormat];
    }

    async sendHttpResponse(ctx, aoData, resource, opts) {
      const S = globalContext$2.typeParameter("S", undefined, globalContext$2.ref(ResourceInterface$9));

      let _ctxType3 = globalContext$2.ref(ContextInterface$d);

      let _aoDataType = globalContext$2.nullable(globalContext$2.any());

      let _resourceType = globalContext$2.flowInto(S);

      let _optsType = globalContext$2.ref(RouterRouteT$9);

      const _returnType3 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

      globalContext$2.param("ctx", _ctxType3).assert(ctx);
      globalContext$2.param("aoData", _aoDataType).assert(aoData);
      globalContext$2.param("resource", _resourceType).assert(resource);
      globalContext$2.param("opts", _optsType).assert(opts);

      if (opts.action === 'create') {
        ctx.status = 201;
      }

      let voRenderer;

      if ((ctx.headers && ctx.headers.accept || undefined) != null) {
        const vsFormat = ctx.accepts(this.responseFormats);

        switch (vsFormat) {
          case false:
            break;

          default:
            if (this[`${vsFormat}RendererName`] != null) {
              voRenderer = this.rendererFor(vsFormat);
            }

        }
      } else {
        if (this[`${this.defaultRenderer}RendererName`] != null) {
          voRenderer = this.rendererFor(this.defaultRenderer);
        }
      }

      if (voRenderer != null) {
        ctx.body = await voRenderer.render(ctx, aoData, resource, opts);
      }
    }

    defineRoutes() {
      const voRouter = this._routerFactory(this.routerName || APPLICATION_ROUTER);

      voRouter.routes.forEach(aoRoute => {
        return this.createNativeRoute(aoRoute);
      });
    }

    sender(resourceName, aoMessage, // { method: methodName, path, resource, action }: RouterRouteT
    route) {
      let _resourceNameType = globalContext$2.string();

      let _aoMessageType = globalContext$2.exactObject(globalContext$2.property("context", globalContext$2.ref(ContextInterface$d)), globalContext$2.property("reverse", globalContext$2.string()));

      let _routeType = globalContext$2.ref(RouterRouteT$9);

      const _returnType16 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("resourceName", _resourceNameType).assert(resourceName);
      globalContext$2.param("aoMessage", _aoMessageType).assert(aoMessage);
      globalContext$2.param("route", _routeType).assert(route);

      if (this._resourceChecker(resourceName)) {
        this.send(resourceName, aoMessage, route.action);
      } else {
        this.getViewComponent().emit(aoMessage.reverse, {
          error: null,
          result: null,
          resource: {}
        });
      }
    }

    createNativeRoute(opts) {
      let _optsType2 = globalContext$2.ref(RouterRouteT$9);

      const _returnType17 = globalContext$2.return(globalContext$2.void());

      globalContext$2.param("opts", _optsType2).assert(opts);
      const {
        method: methodName,
        path
      } = opts;
      const resourceName = inflect.camelize(inflect.underscore(`${opts.resource.replace(/[\/]/g, '_')}Resource`));

      if (typeof this[methodName] === "function") {
        this[methodName](path, async context => {
          await new Promise((resolve, reject) => {
            try {
              const reverse = genRandomAlphaNumbers(32);
              this.getViewComponent().once(reverse, async ({
                error,
                result,
                resource
              }) => {
                if (error != null) {
                  console.log('>>>>>> ERROR AFTER RESOURCE', error);
                  reject(error);
                  return;
                }

                try {
                  (await this.sendHttpResponse) < object | ResourceInterface$9 > (context, result, resource, opts);
                  resolve();
                } catch (e) {
                  reject(e);
                }
              });
              this.sender(resourceName, {
                context,
                reverse
              }, opts);
            } catch (err) {
              reject(err);
            }
          });
          return true;
        });
      }
    }

    constructor() {
      super(...arguments); // this._renderers = {};

      _initializerDefineProperty(this, "_contextFactory", _descriptor, this);

      _initializerDefineProperty(this, "_rendererFactory", _descriptor2, this);

      _initializerDefineProperty(this, "_routerFactory", _descriptor3, this);

      _initializerDefineProperty(this, "_resourceChecker", _descriptor4, this);

      _initializerDefineProperty(this, "_eventNames", _descriptor5, this);

      _initializerDefineProperty(this, "_httpServer", _descriptor6, this);

      _initializerDefineProperty(this, "_composed", _descriptor7, this);

      _initializerDefineProperty(this, "_handler", _descriptor8, this);

      _initializerDefineProperty(this, "middlewares", _descriptor9, this);

      _initializerDefineProperty(this, "handlers", _descriptor10, this);

      _initializerDefineProperty(this, "routerName", _descriptor11, this);

      _initializerDefineProperty(this, "defaultRenderer", _descriptor12, this);

      _initializerDefineProperty(this, "jsonRendererName", _descriptor13, this);

      this.middlewares = [];
      this.handlers = [];
      globalContext$2.ref(HttpMediatorInterface$3).assert(this);
    }

  }, _class3.__filename = __filename$m, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_contextFactory", [_dec3, _dec4, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_rendererFactory", [_dec5, _dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_routerFactory", [_dec7, _dec8, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_resourceChecker", [_dec9, _dec10, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_eventNames", [_dec11, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_httpServer", [_dec12, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_composed", [_dec13, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_handler", [_dec14, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "middlewares", [_dec15, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "handlers", [_dec16, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "responseFormats", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "responseFormats"), _class2.prototype), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "routerName", [_dec17, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return APPLICATION_ROUTER;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "defaultRenderer", [_dec18, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'json';
    }
  }), _applyDecoratedDescriptor(_class2, "compose", [method], Object.getOwnPropertyDescriptor(_class2, "compose"), _class2), _applyDecoratedDescriptor(_class2, "createMethod", [method], Object.getOwnPropertyDescriptor(_class2, "createMethod"), _class2), _applyDecoratedDescriptor(_class2.prototype, "del", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "del"), _class2.prototype), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "jsonRendererName", [_dec19, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return JSON_RENDERER;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "listNotificationInterests", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "listNotificationInterests"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleNotification", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "handleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRegister", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRegister"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRemove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "serverListen", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "serverListen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "use", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "use"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callback", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "callback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleStatistics", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "handleStatistics"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onerror", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onerror"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "respond", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "respond"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "perform", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "perform"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rendererFor", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "rendererFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendHttpResponse", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "sendHttpResponse"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defineRoutes", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "defineRoutes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sender", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "sender"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createNativeRoute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "createNativeRoute"), _class2.prototype)), _class2)) || _class) || _class) || _class);
  METHODS.forEach(methodName => {
    // console.log 'SWITCH:', @
    HttpMediator.createMethod(methodName);
  });
  HttpMediator.createMethod(); // create 'all'
});

var __filename$n = '/commands/Resource.js';

const ResourceListResultT$3 = globalContext$2.tdz(() => ResourceListResultT);
const ResourceInterface$a = globalContext$2.tdz(() => ResourceInterface);
const ContextInterface$e = globalContext$2.tdz(() => ContextInterface);
const RecordInterface$2 = globalContext$2.tdz(() => RecordInterface);
const CollectionInterface$2 = globalContext$2.tdz(() => CollectionInterface);
const NotificationInterface$5 = globalContext$2.tdz(() => NotificationInterface);
var Resource = (Module => {
  let _t$TypeParametersSymb;

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

  const {
    RESOURCE_RESULT,
    NON_OVERRIDDEN,
    Command,
    initialize,
    partOf,
    meta,
    property,
    method,
    nameBy,
    action,
    chains,
    inject,
    Utils: {
      _,
      inflect,
      assign,
      assert,
      statuses
    }
  } = Module.NS;
  const HTTP_NOT_FOUND = statuses('not found');

  const _ResourceTypeParametersSymbol = Symbol("ResourceTypeParameters");

  let Resource = (_dec = globalContext$2.annotate(globalContext$2.class("Resource", Resource => {
    const D = Resource.typeParameter("D", undefined, globalContext$2.ref(RecordInterface$2));
    return [globalContext$2.extends(Command), globalContext$2.staticProperty("__filename", globalContext$2.any()), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("entityName", globalContext$2.return(globalContext$2.string())), globalContext$2.method("checkExistence", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("keyName", globalContext$2.return(globalContext$2.string())), globalContext$2.method("itemEntityName", globalContext$2.return(globalContext$2.string())), globalContext$2.method("listEntityName", globalContext$2.return(globalContext$2.string())), globalContext$2.method("collectionName", globalContext$2.return(globalContext$2.string())), globalContext$2.property("_collectionFactory", globalContext$2.function(globalContext$2.return(globalContext$2.ref(CollectionInterface$2, globalContext$2.flowInto(D))))), globalContext$2.method("collection", globalContext$2.return(globalContext$2.ref(CollectionInterface$2, D))), globalContext$2.property("context", globalContext$2.nullable(globalContext$2.ref(ContextInterface$e))), globalContext$2.property("recordId", globalContext$2.nullable(globalContext$2.string())), globalContext$2.property("recordBody", globalContext$2.nullable(globalContext$2.ref("object"))), globalContext$2.property("actionResult", globalContext$2.nullable(globalContext$2.any())), globalContext$2.method("constructor", globalContext$2.param("args", globalContext$2.any())), globalContext$2.staticMethod("actions", globalContext$2.return(globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.ref("object"))))), globalContext$2.method("list", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref(ResourceListResultT$3)))), globalContext$2.method("detail", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object")))), globalContext$2.method("create", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object")))), globalContext$2.method("update", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.ref("object")))), globalContext$2.method("delete", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))), globalContext$2.method("destroy", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))), globalContext$2.method("beforeActionHook", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("getRecordId", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("getRecordBody", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("omitBody", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("beforeUpdate", globalContext$2.param("args", globalContext$2.any())), globalContext$2.method("doAction", globalContext$2.param("asAction", globalContext$2.string()), globalContext$2.param("context", globalContext$2.ref(ContextInterface$e)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.any())))), globalContext$2.method("saveDelayeds", globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void()))), globalContext$2.method("execute", globalContext$2.param("aoNotification", globalContext$2.ref(NotificationInterface$5)), globalContext$2.return(globalContext$2.ref("Promise", globalContext$2.void())))];
  })), _dec2 = chains(['list', 'detail', 'create', 'update', 'delete', 'destroy'], function () {
    this.initialHook('beforeActionHook');
    this.beforeHook('getRecordId', {
      only: ['detail', 'update', 'delete', 'destroy']
    });
    this.beforeHook('checkExistence', {
      only: ['detail', 'update', 'delete', 'destroy']
    });
    this.beforeHook('getRecordBody', {
      only: ['create', 'update']
    });
    this.beforeHook('omitBody', {
      only: ['create', 'update']
    });
    this.beforeHook('beforeUpdate', {
      only: ['update']
    });
  }), _dec3 = partOf(Module), _dec4 = globalContext$2.decorate(function () {
    return globalContext$2.function(globalContext$2.return(globalContext$2.ref(CollectionInterface$2, globalContext$2.flowInto(this[_ResourceTypeParametersSymbol].D))));
  }), _dec5 = inject('CollectionFactory<*>'), _dec6 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref(ContextInterface$e))), _dec7 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.string())), _dec8 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.ref("object"))), _dec9 = globalContext$2.decorate(globalContext$2.nullable(globalContext$2.any())), _dec(_class = initialize(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = (_t$TypeParametersSymb = globalContext$2.TypeParametersSymbol, _class3 = class Resource extends Command {
    // > extends SimpleCommand implements ResourceInterface {
    get entityName() {
      const _returnType10 = globalContext$2.return(globalContext$2.string());

      // return assert.fail('Not implemented specific property');
      return _returnType10.assert(NON_OVERRIDDEN);
    }

    async checkExistence(...args) {
      if (this.recordId == null) {
        this.context.throw(HTTP_NOT_FOUND);
      }

      if (this.collection != null && !(await this.collection.includes(this.recordId))) {
        this.context.throw(HTTP_NOT_FOUND);
      }

      return args;
    }

    get keyName() {
      const _returnType11 = globalContext$2.return(globalContext$2.string());

      return _returnType11.assert(this.entityName == NON_OVERRIDDEN ? 'id' : inflect.singularize(inflect.underscore(this.entityName)));
    }

    get itemEntityName() {
      const _returnType12 = globalContext$2.return(globalContext$2.string());

      return _returnType12.assert(this.entityName == NON_OVERRIDDEN ? 'entity' : inflect.singularize(inflect.underscore(this.entityName)));
    }

    get listEntityName() {
      const _returnType13 = globalContext$2.return(globalContext$2.string());

      return _returnType13.assert(this.entityName == NON_OVERRIDDEN ? 'entities' : inflect.pluralize(inflect.underscore(this.entityName)));
    }

    get collectionName() {
      const _returnType14 = globalContext$2.return(globalContext$2.string());

      return _returnType14.assert(this.entityName == NON_OVERRIDDEN ? null : `${inflect.pluralize(inflect.camelize(this.entityName))}Collection`);
    }

    get collection() {
      const _returnType15 = globalContext$2.return(globalContext$2.ref(CollectionInterface$2, this[_ResourceTypeParametersSymbol].D));

      return _returnType15.assert(this.entityName == NON_OVERRIDDEN ? null : this._collectionFactory(this.collectionName));
    }

    constructor(...args) {
      const _typeParameters = {
        D: globalContext$2.typeParameter("D")
      };
      super(...args);

      _initializerDefineProperty(this, "_collectionFactory", _descriptor, this);

      _initializerDefineProperty(this, "context", _descriptor2, this);

      _initializerDefineProperty(this, "recordId", _descriptor3, this);

      _initializerDefineProperty(this, "recordBody", _descriptor4, this);

      _initializerDefineProperty(this, "actionResult", _descriptor5, this);

      this[_ResourceTypeParametersSymbol] = _typeParameters;
      globalContext$2.ref(ResourceInterface$a).assert(this);
    }

    static get actions() {
      const _typeParameters = {
        D: globalContext$2.typeParameter("D")
      };

      const _returnType16 = globalContext$2.return(globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.ref("object"))));

      return _returnType16.assert(this.metaObject.getGroup('actions', false));
    }

    async list() {
      const _returnType = globalContext$2.return(globalContext$2.union(globalContext$2.ref(ResourceListResultT$3), globalContext$2.ref("Promise", globalContext$2.ref(ResourceListResultT$3))));

      const vlItems = this.collection != null ? await (await this.collection.takeAll()).toArray() : [];
      return _returnType.assert({
        meta: {
          pagination: {
            limit: 'not defined',
            offset: 'not defined'
          }
        },
        items: vlItems
      });
    }

    async detail() {
      const _returnType2 = globalContext$2.return(globalContext$2.union(globalContext$2.ref("object"), globalContext$2.ref("Promise", globalContext$2.ref("object"))));

      return _returnType2.assert(this.collection != null ? await this.collection.find(this.recordId) : {});
    }

    async create() {
      const _returnType3 = globalContext$2.return(globalContext$2.union(globalContext$2.ref("object"), globalContext$2.ref("Promise", globalContext$2.ref("object"))));

      return _returnType3.assert(this.collection != null ? await this.collection.create(this.recordBody) : {});
    }

    async update() {
      const _returnType4 = globalContext$2.return(globalContext$2.union(globalContext$2.ref("object"), globalContext$2.ref("Promise", globalContext$2.ref("object"))));

      return _returnType4.assert(this.collection != null ? await this.collection.update(this.recordId, this.recordBody) : {});
    }

    async 'delete'() {
      const _returnType5 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

      this.collection != null ? await this.collection.delete(this.recordId) : null;
      this.context.status = 204;
    }

    async destroy() {
      const _returnType6 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

      this.collection != null ? await this.collection.destroy(this.recordId) : null;
      this.context.status = 204;
    }

    beforeActionHook(...args) {
      [this.context] = args;
      return args;
    }

    getRecordId(...args) {
      this.recordId = this.context.pathParams[this.keyName];
      return args;
    }

    getRecordBody(...args) {
      const body = this.context.request.body;
      this.recordBody = body && body[this.itemEntityName] || undefined;
      return args;
    }

    omitBody(...args) {
      this.recordBody = _.omit(this.recordBody, ['_id', '_rev', 'rev', 'type', '_type', '_owner', '_space', '_from', '_to']);

      if (this.collection != null) {
        const moduleName = this.collection.delegate.moduleName();
        const name = this.collection.delegate.name;
        this.recordBody.type = `${moduleName}::${name}`;
      }

      return args;
    }

    beforeUpdate(...args) {
      this.recordBody = assign({}, this.recordBody, {
        id: this.recordId
      });
      return args;
    }

    async doAction(asAction, context) {
      let _asActionType = globalContext$2.string();

      let _contextType = globalContext$2.ref(ContextInterface$e);

      const _returnType7 = globalContext$2.return(globalContext$2.union(globalContext$2.nullable(globalContext$2.any()), globalContext$2.ref("Promise", globalContext$2.nullable(globalContext$2.any()))));

      globalContext$2.param("asAction", _asActionType).assert(asAction);
      globalContext$2.param("context", _contextType).assert(context);
      const voResult = await (typeof this[asAction] === "function" ? this[asAction](context) : undefined);
      this.actionResult = voResult;
      await this.saveDelayeds();
      return _returnType7.assert(voResult);
    } // NOTE: It's abstract method. It might be replaced from SaveDelayedJobsMixin in specific custom class


    async saveDelayeds() {
      const _returnType8 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));
    }

    async execute(aoNotification) {
      let _aoNotificationType = globalContext$2.ref(NotificationInterface$5);

      const _returnType9 = globalContext$2.return(globalContext$2.union(globalContext$2.void(), globalContext$2.ref("Promise", globalContext$2.void())));

      globalContext$2.param("aoNotification", _aoNotificationType).assert(aoNotification);
      let voResult;
      const {
        ERROR,
        DEBUG,
        LEVELS,
        SEND_TO_LOG
      } = Module.NS.Pipes.NS.LogMessage;
      const resourceName = aoNotification.getName();
      const voBody = aoNotification.getBody();
      const vsAction = aoNotification.getType();

      try {
        this.send(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION START', LEVELS[DEBUG]);
        voResult = {
          result: await this.doAction(vsAction, voBody.context),
          resource: this
        };
        this.send(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION END', LEVELS[DEBUG]);
      } catch (error) {
        voResult = {
          error,
          resource: this
        };
      }

      this.send(RESOURCE_RESULT, voResult, voBody.reverse);
    }

  }), _class3[_t$TypeParametersSymb] = _ResourceTypeParametersSymbol, _class3.__filename = __filename$n, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _class2), _applyDecoratedDescriptor(_class2.prototype, "entityName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "entityName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkExistence", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "checkExistence"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "keyName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "keyName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "itemEntityName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "itemEntityName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "listEntityName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "listEntityName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "collectionName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "collectionName"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_collectionFactory", [_dec4, _dec5, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "collection", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "collection"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "context", [_dec6, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "recordId", [_dec7, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "recordBody", [_dec8, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "actionResult", [_dec9, property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2, "actions", [property], Object.getOwnPropertyDescriptor(_class2, "actions"), _class2), _applyDecoratedDescriptor(_class2.prototype, "list", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "list"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "detail", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "detail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "create", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'delete', [action], Object.getOwnPropertyDescriptor(_class2.prototype, 'delete'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "destroy", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "destroy"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "beforeActionHook", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "beforeActionHook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRecordId", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getRecordId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRecordBody", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getRecordBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "omitBody", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "omitBody"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "beforeUpdate", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "beforeUpdate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "doAction", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "doAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveDelayeds", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "saveDelayeds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "execute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "execute"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
});

var TemplatableModule = (Module => {
  const {
    initializeMixin,
    meta,
    property,
    method
  } = Module.NS;
  const cphTemplatesMap = Symbol.for('~templatesMap');
  const cphTemplatesList = Symbol.for('~templatesList');
  const cpoTemplates = Symbol.for('~templates');
  const cpmTemplatesHandler = Symbol.for('~templatesHandler');
  return ['TemplatableModule', BaseClass => {
    var _dec, _class, _class2, _init, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.method("Templates"), globalContext$2.staticMethod("templates", globalContext$2.return(globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.function())))), globalContext$2.staticMethod("defineTemplate", globalContext$2.param("filename", globalContext$2.string()), globalContext$2.param("vmFunction", globalContext$2.function()), globalContext$2.return(globalContext$2.function())), globalContext$2.staticMethod("resolveTemplate", globalContext$2.param("args", globalContext$2.any()), globalContext$2.return(globalContext$2.function())))), _dec(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      get Templates() {
        const MClass = this.constructor;
        return MClass[cpoTemplates] != null ? MClass[cpoTemplates] : MClass[cpoTemplates] = new Proxy(MClass, MClass[cpmTemplatesHandler]);
      }

      static get templates() {
        const _returnType = globalContext$2.return(globalContext$2.object(globalContext$2.indexer("key", globalContext$2.string(), globalContext$2.function())));

        return _returnType.assert(this.metaObject.getGroup('templates', false));
      }

      static defineTemplate(filename, vmFunction) {
        let _filenameType = globalContext$2.string();

        let _vmFunctionType = globalContext$2.function();

        const _returnType2 = globalContext$2.return(globalContext$2.function());

        globalContext$2.param("filename", _filenameType).assert(filename);
        globalContext$2.param("vmFunction", _vmFunctionType).assert(vmFunction);
        const vsRoot = this.prototype.ROOT || '.';
        const vsTemplatesDir = `${vsRoot}/templates/`;
        const templateName = filename.replace(vsTemplatesDir, '').replace(/\.js/, '');
        this.metaObject.addMetaData('templates', templateName, vmFunction);
        return _returnType2.assert(vmFunction);
      }

      static resolveTemplate(...args) {
        const _returnType3 = globalContext$2.return(globalContext$2.function());

        const vsRoot = this.prototype.ROOT || '.';
        const vsTemplatesDir = `${vsRoot}/templates/`;
        const templateName = path__default.resolve(...args).replace(vsTemplatesDir, '').replace(/\.js/, '');
        return _returnType3.assert(this.prototype.Templates[templateName]);
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "Templates", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "Templates"), _class2.prototype), _applyDecoratedDescriptor(_class2, "templates", [property], Object.getOwnPropertyDescriptor(_class2, "templates"), _class2), _applyDecoratedDescriptor(_class2, "defineTemplate", [method], Object.getOwnPropertyDescriptor(_class2, "defineTemplate"), _class2), _applyDecoratedDescriptor(_class2, "resolveTemplate", [method], Object.getOwnPropertyDescriptor(_class2, "resolveTemplate"), _class2)), _class2)) || _class) || _class);
    Reflect.defineProperty(Mixin, cphTemplatesMap, {
      enumerable: true,
      writable: true,
      value: null
    });
    Reflect.defineProperty(Mixin, cpoTemplates, {
      enumerable: true,
      writable: true,
      value: null
    });
    Reflect.defineProperty(Mixin, cpmTemplatesHandler, {
      enumerable: true,
      value: {
        get: (aoTarget, asName) => {
          if (!Reflect.get(aoTarget.templates, asName)) {
            if (aoTarget[cphTemplatesMap] == null) {
              const templatesMap = {};
              const vsRoot = aoTarget.prototype.ROOT || '.';
              const vsTemplatesDir = `${vsRoot}/templates/`;

              for (const vsPath of aoTarget[cphTemplatesList]) {
                const vsName = vsPath.replace(vsTemplatesDir, '').replace(/\.js/, '');
                templatesMap[vsName] = vsPath;
              }

              aoTarget[cphTemplatesMap] = templatesMap;
            }

            const vsPath = aoTarget[cphTemplatesMap][asName];

            if (vsPath) {
              aoTarget.resolve(vsPath);
            }
          }

          return Reflect.get(aoTarget.templates, asName);
        }
      }
    });
    Reflect.defineProperty(Mixin, 'onMetalize', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function (...args) {
        Reflect.getPrototypeOf(Mixin).onMetalize.apply(this, args);
        this[cphTemplatesMap] = undefined;
        this[cpoTemplates] = undefined;
        return;
      }
    });
    return Mixin;
  }];
});

var index = (Module => {
  const {
    initializeMixin,
    meta,
    constant,
    method,
    extend,
    decorator,
    util
  } = Module.NS;
  return ['RestfulAddon', BaseClass => {
    var _dec, _dec2, _class, _class2, _init, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

    let Mixin = (_dec = globalContext$2.annotate(globalContext$2.class("Mixin", globalContext$2.extends(BaseClass), globalContext$2.staticProperty("object", globalContext$2.any()), globalContext$2.property("NON_OVERRIDDEN", globalContext$2.any()), globalContext$2.property("RESOURCE_RESULT", globalContext$2.any()), globalContext$2.property("APPLICATION_ROUTER", globalContext$2.any()), globalContext$2.property("JSON_RENDERER", globalContext$2.any()), globalContext$2.property("HTTP_MEDIATOR", globalContext$2.any()), globalContext$2.property("METHODS", globalContext$2.any()), globalContext$2.property("action", globalContext$2.any()), globalContext$2.property("statuses", globalContext$2.any()))), _dec2 = extend('RestfulFacadeMixin', 'Facade'), _dec(_class = _dec2(_class = RestfulFacadeMixin(_class = BodyParseMixin(_class = BulkMethodsRendererMixin(_class = CheckAdminOnlyResourceMixin(_class = CheckApiVersionResourceMixin(_class = CheckSchemaVersionResourceMixin(_class = ContextifyApplicationMediatorMixin(_class = ContextifyApplicationMixin(_class = ContextifyResourceExecutionMixin(_class = CountMethodsRendererMixin(_class = CrudRendererMixin(_class = EditableResourceMixin(_class = OwnerableResourceMixin(_class = PerformSyntheticRequestApplicationMixin(_class = PerformSyntheticRequestMixin(_class = Resource(_class = HttpMediator(_class = Router(_class = Renderer(_class = Context(_class = HttpCookies(_class = HttpResponse(_class = HttpRequest(_class = initializeMixin(_class = (_class2 = (_temp = _class3 = class Mixin extends BaseClass {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "NON_OVERRIDDEN", _descriptor, this);

        _initializerDefineProperty(this, "RESOURCE_RESULT", _descriptor2, this);

        _initializerDefineProperty(this, "APPLICATION_ROUTER", _descriptor3, this);

        _initializerDefineProperty(this, "JSON_RENDERER", _descriptor4, this);

        _initializerDefineProperty(this, "HTTP_MEDIATOR", _descriptor5, this);

        _initializerDefineProperty(this, "METHODS", _descriptor6, this);

        _initializerDefineProperty(this, "action", _descriptor7, this);

        _initializerDefineProperty(this, "statuses", _descriptor8, this);
      }

    }, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function () {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "NON_OVERRIDDEN", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return Symbol.for('NON_OVERRIDDEN');
      }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "RESOURCE_RESULT", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 'RESOURCE_RESULT';
      }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "APPLICATION_ROUTER", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 'ApplicationRouter';
      }
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "JSON_RENDERER", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 'JsonRenderer';
      }
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "HTTP_MEDIATOR", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 'HttpMediator';
      }
    }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "METHODS", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return ['get', 'post', 'put', 'head', 'delete', 'options', 'trace', 'copy', 'lock', 'mkcol', 'move', 'purge', 'propfind', 'proppatch', 'unlock', 'report', 'mkactivity', 'checkout', 'merge', 'm-search', 'notify', 'subscribe', 'unsubscribe', 'patch', 'search', 'connect'];
      }
    }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "action", [decorator], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return action;
      }
    }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "statuses", [util], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return statuses;
      }
    })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
    return Mixin;
  }];
});

exports.ContextInterface = ContextInterface;
exports.HttpCookiesInterface = HttpCookiesInterface;
exports.HttpMediatorInterface = HttpMediatorInterface;
exports.HttpRequestInterface = HttpRequestInterface;
exports.HttpResponseInterface = HttpResponseInterface;
exports.RendererInterface = RendererInterface;
exports.RendererItemResultT = RendererItemResultT;
exports.RendererListResultT = RendererListResultT;
exports.ResourceInterface = ResourceInterface;
exports.ResourceListResultT = ResourceListResultT;
exports.RouteOptionsT = RouteOptionsT;
exports.RouterInterface = RouterInterface;
exports.RouterRouteT = RouterRouteT;
exports.TemplatableModule = TemplatableModule;
exports.default = index;
exports.loadTemplates = loadTemplates;
//# sourceMappingURL=index.dev.js.map
