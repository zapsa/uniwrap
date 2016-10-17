import fetch from 'node-fetch';
import Wrappy from '@zapsa/wrapper-api';

var defUn = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json',
    }
  }
}

var def = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d0',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json',
    }
  }
}

let wrapper = new Wrappy(defUn);

wrapper
  .call('getUser')
  .then((data) => {console.log(data);})
  .catch((error) => {console.log(error)})

wrapper = new Wrappy(def);

wrapper
  .call('getUser')
  .then((data) => {console.log(data);})
  .catch((error) => {console.log(error)})
