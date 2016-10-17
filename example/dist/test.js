'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _wrapperApi = require('@zapsa/wrapper-api');

var _wrapperApi2 = _interopRequireDefault(_wrapperApi);

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

var wrapper = new _wrapperApi2.default(defUn);

wrapper.call('getUser').then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.log(error);
});

wrapper = new _wrapperApi2.default(def);

wrapper.call('getUser').then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.log(error);
});