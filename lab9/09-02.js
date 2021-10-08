const http = require('http');
const query = require('querystring');

const params = query.stringify({x: 3, y: 5});
const option = {
    host: 'localhost',
    path: '/task2?' + params,
    port: 3000,
    method: 'GET'
};

http.request(option, res => {
    console.log('http.request: statusCode: ', res.statusCode);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('body:', data);
    });
}).end();