'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateQueryParams(params) {
  var enc = encodeURIComponent;
  var ret = Object.keys(params).map(function (key) {
    if (!params[key]) return null;
    return enc(key) + '=' + enc(params[key]);
  }).join('&');
  return ret;
}

var Wrapper = function () {
  function Wrapper(definition) {
    (0, _classCallCheck3.default)(this, Wrapper);

    this.def = definition;
  }

  (0, _createClass3.default)(Wrapper, [{
    key: 'buildUrl',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name, params) {
        var uri, splitted, finalUrl, last;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uri = this.def.routes[name].uri;
                splitted = uri.substr(1).split('/');
                finalUrl = this.def.basePath + (this.def.prefix ? this.def.prefix : '');
                last = uri.slice(-1);


                splitted.forEach(function (part) {
                  var toAdd = part;
                  if (part.startsWith(':')) {
                    var clean = part.substr(1);
                    if (!params[clean]) {
                      throw new Error('Missing parameter: ' + clean);
                    }
                    toAdd = params[clean];
                  }
                  if (toAdd !== '') {
                    finalUrl += '/' + toAdd;
                  }
                });
                if (last === '/' && uri !== '/') {
                  finalUrl += last;
                }
                if (params.query) {
                  finalUrl += '?' + generateQueryParams(params.query);
                }
                return _context.abrupt('return', finalUrl);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function buildUrl(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return buildUrl;
    }()
  }, {
    key: 'createRequest',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name, params) {
        var init;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                init = {
                  method: this.def.routes[name].method,
                  mode: 'cors',
                  headers: (0, _extends3.default)({}, params.headers)
                };

                if (this.def.routes[name].contentType) {
                  init.headers['Content-Type'] = this.def.routes[name].contentType;
                }
                if (params && params.body && this.def.routes[name].method !== 'get') {
                  init.body = params.body;
                }
                return _context2.abrupt('return', init);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createRequest(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return createRequest;
    }()
  }, {
    key: 'callMultiple',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(pArray) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', Promise.all(pArray));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function callMultiple(_x5) {
        return _ref3.apply(this, arguments);
      }

      return callMultiple;
    }()
  }, {
    key: 'call',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(name) {
        var _this = this;

        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { body: {}, headers: {} };
        var url, req;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.def.routes[name]) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('No such handler: ' + name);

              case 2:
                _context5.next = 4;
                return this.buildUrl(name, params);

              case 4:
                url = _context5.sent;
                _context5.next = 7;
                return this.createRequest(name, params);

              case 7:
                req = _context5.sent;
                return _context5.abrupt('return', fetch(url, req).then(function () {
                  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(response) {
                    var data;
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (response) {
                              _context4.next = 2;
                              break;
                            }

                            throw new Error('No response');

                          case 2:
                            if (response.ok) {
                              _context4.next = 8;
                              break;
                            }

                            _context4.next = 5;
                            return response.body.json();

                          case 5:
                            data = _context4.sent;

                            console.warn(response);
                            throw { message: 'Request error: status is ' + response.status + ' (' + response.statusText + ')', status: response.status, data: data };

                          case 8:
                            if (!(response.status === 204 || _this.def.routes[name].responseType && _this.def.routes[name].responseType === 'no-content')) {
                              _context4.next = 10;
                              break;
                            }

                            return _context4.abrupt('return', null);

                          case 10:
                            _context4.t0 = _this.def.routes[name].responseType;
                            _context4.next = _context4.t0 === 'text/plain' ? 13 : _context4.t0 === 'blob' ? 14 : 15;
                            break;

                          case 13:
                            return _context4.abrupt('return', response.text());

                          case 14:
                            return _context4.abrupt('return', response.blob());

                          case 15:
                            return _context4.abrupt('return', response.json());

                          case 16:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this);
                  }));

                  return function (_x8) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function call(_x6) {
        return _ref4.apply(this, arguments);
      }

      return call;
    }()
  }]);
  return Wrapper;
}();

exports.default = Wrapper;