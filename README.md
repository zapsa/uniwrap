# API Wrapper

## Install

```
npm install --save @zapsa/wrapper-api
```

## Define

```javascript
// contentType is for the Request header's 'Content-Type'
// responseType is for the Response header's 'Content-Type'
// cf: https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods
// works for fetch or any other http client
const def = {
  basePath: 'http://api.example.com',
  prefix: '/v0', // not required
  routes: {
    'getUser': { // call name
      uri: '/user/:id', // :id auto processed by 'call' and it's parameters
      method: 'get',
      responseType: 'json',
    },
    'createUser': {
      uri: '/user',
      method: 'post',
      contentType: 'application/xml', // I know xml sucks, it's just an example
      responseType: 'json',
    },
    ...
  },
};
```

## Instantiate

```javascript
// app.config.js
import Wrappy from '@zapsa/wrapper-api'; // wrapper inside node_modules

import def from './def.js';

const wrapper = new Wrappy(def);
// OR directly define, whatever
const wrapper = new Wrappy({...});

export default wrapper;
```

## Use

### Syntax

```javascript
import wrapper from './app.config.js';

async function apiCalls() {
  try {
    wrapper.call('getUser', {id: 24}).then((user) => {
      ...
    });
  } catch (err) {
    // handle error
    console.log('Error: ', err);
  }
  // OR
  wrapper.call('getUser', {id: 24}) // still works as async returns a promise
  .then((user) => {...})
  .catch((e) => {
    // handle not found or whatever
    console.log('Error: ', err);
  });
  // OR
  try {
    const user = await wrapper.call('getUser', {id: 24});
    const userList = await wrapper.call('createUser', {
      headers: {Authorization: 'Bearer <ANiceToken>'},
      body: {name: 'Foo'},
    });
    //OR
    const ret = wrapper.callMultiple([
      wrapper.call('getUser', {id: 24}),
      wrapper.call('createUser', {...}),
      ...
    ]); // ret = [response for getUser, response for createUser, ...]; <- Very powerful
  } catch(err) {
    console.log('Error: ', err); // Errors are caught, allelujah!
  }
}
```

### Use of a body, parameters and headers

```javascript
const def = {
  basePath: 'https://api.example.com',
  routes: {
    createUser: {
      uri: '/users',
      method: 'post',
      responseType: 'json',
      contentType: 'json',
    },
    getUsers: {
      uri: '/users',
      method: 'get',
      responseType: 'json',
    }
    getUser: {
      uri: '/users/:id/field/:param',
      method: 'get',
      responseType: 'json',
    }
  }
}

const wrapper = new Wrapper(def);

// Adding a body

wrapper.call('createUser', {
  body: {
    firstName: 'User',
    lastName: 'One',
  }
})
.then((user) => {...})
.catch((e) => e);

// Using query parameters

wrapper.call('getUsers', {
  query: {
    firstName: 'John',
    limit: 0,
  }
})
.then((user) => {...})
.catch((e) => e);

// Using URI params

wrapper.call('getUser', {
  id: 1,
  param: ':param value',
})
.then((user) => {...})
.catch((e) => e);

// Overwriting headers

wrapper.call('getUser', {
  headers: {
    Authorization: 'Bearer <TOKEN>',
  }
})
.then((user) => {...})
.catch((e) => e);
```
