const http = require('http');

const params = JSON.stringify({x: 3, y: 5, s: 'Hello'});
const option = {
    host: 'localhost',
    path: '/task4',
    port: 3000,
    method: 'POST',
    headers: { 'content-type':'application/json', 'accept':'application/json' }
};

http.request(option, res => {
    console.log('http.request: statusCode: ', res.statusCode);

    res.on('data', (data) => {
        console.log('body:', data.toString());
    });
}).end(params);