import Wrappy from '../../src/wrapper';

const def = {
    basePath: 'http://localhost:8888',
    routes: {
        getEmptyJSON: {
            uri: '/empty',
            method: 'get',
            responseType: 'json',
        },
        getEmptyBlob: {
            uri: '/empty',
            method: 'get',
            responseType: 'blob',
        }
    }
}

let wrapper = new Wrappy(def);

wrapper.call('getEmptyJSON')
.then((data) => {
    $('#result-empty-json').innerHTML = data;
})
.catch((error) => {
    console.log(error)
});

wrapper.call('getEmptyJSON')
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.log(error)
});
