'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defUn = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json'
    }
  }
};

var def = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d0',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json'
    }
  }
};

var wrapper = new _2.default(defUn);

wrapper.call('getUser').then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.log(error);
});

wrapper = new _2.default(def);

wrapper.call('getUser').then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.log(error);
});