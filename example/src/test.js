import Wrappy from '../../src/wrapper';

const defUn = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json',
    }
  }
}
const def = {
  basePath: 'https://mockaroo.com/33a82c40/download?count=1&key=e86be4d0',
  routes: {
    getUser: {
      uri: '/',
      method: 'get',
      responseType: 'json',
    }
  }
}

const tmp = {
  basePath: 'http://localhost:4242',
  routes: {
    queryReq: {
      uri: '/',
      method: 'get',
      responseType: 'json',
    }
  }
}

const lol = {
  basePath: 'http://localhost:8081',
  routes: {
    login: {
      uri: '/login/:team',
      method: 'post',
      responseType: 'json',
      contentType: 'application/json',
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
  .then((data) => { document.getElementById('result').innerHTML = JSON.stringify(data[0]); console.log(data);})
  .catch((error) => {console.log(error)})

wrapper = new Wrappy(tmp);

wrapper
  .call('queryReq', {
    query: {
      param1: 1,
      param2: 'value',
    }
  })
  .then((data) => {console.log(data);})
  .catch((error) => { document.getElementById('result').innerHTML = error.message; console.log(error)})

  wrapper
    .call('lol', {
      query: {
        param1: 1,
        param2: 'value',
        notExist: null,
        sameHere: undefined,
      }
    })
    .then((data) => {console.log(data);})
    .catch((error) => {console.log(error)})

    wrapper = new Wrappy(lol);

    wrapper
      .call('login', {
        team: 'a',
        body: JSON.stringify({
          email: 'julien@zap.lu',
          hash: 'lol',
        })
      })
      .then((data) => {console.log(data);})
      .catch((error) => {console.log(error)})
