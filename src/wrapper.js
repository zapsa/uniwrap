function generateQueryParams(params) {
  const enc = encodeURIComponent;
  const ret = Object.keys(params)
  .map((key) => {
    if (!params[key]) return null
    return enc(key) + '=' + enc(params[key])
  })
  .join('&');
  console.log('Query Params:', ret);
  return ret;
}

class Wrapper {
  constructor(definition) {
    this.def = definition;
  }

  async buildUrl(name, params) {
    const uri = this.def.routes[name].uri;
    const splitted = uri.substr(1).split('/');
    let finalUrl = this.def.basePath + ((this.def.prefix) ? this.def.prefix : '');
    const last = this.def.routes[name].uri.slice(-1);

    splitted.forEach((part) => {
      let toAdd = part;
      if (part.startsWith(':')) {
        const clean = part.substr(1);
        if (!params[clean]) {
          throw new Error(`Missing parameter: ${clean}`);
        }
        toAdd = params[clean];
      }
      if (toAdd !== '') {
        finalUrl += `/${toAdd}`;
      }
    });
    if (last === '/') {
      finalUrl += last;
    }
    if (params.query) {
      finalUrl += '?' + generateQueryParams(params.query);
    }
    console.log('Call to:', finalUrl);
    return finalUrl;
  }

  async createRequest(name, params) {
    const init = {
      method: this.def.routes[name].method,
      mode: 'cors',
      headers: { ...params.headers },
    };
    if (this.def.routes[name].contentType) {
      init.headers['Content-Type'] = this.def.routes[name].contentType;
    }
    if (params && params.body && this.def.routes[name].method !== 'get') {
      init.body = params.body;
    }
    console.log(init);
    return init;
  }

  async callMultiple(pArray) {
    return Promise.all(pArray);
  }

  async call(name, params = { body: {}, headers: {} }) {
    if (!this.def.routes[name]) {
      throw new Error(`No such handler: ${name}`);
    }
    const url = await this.buildUrl(name, params);
    const req = await this.createRequest(name, params);
    return fetch(url, req).then((response) => {
      if (!response.ok) {
        throw new Error(`Request error: status is ${response.status} (${response.statusText})`); // TODO: add status
      }
      switch (this.def.responseType) {
        case 'blob':
          return response.blob();
        default:
          return response.json();
      }
    });
  }
}

export default Wrapper;
