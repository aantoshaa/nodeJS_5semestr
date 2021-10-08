const http = require('http');

const options =
    {
        host: 'localhost',
        path: '/task1',
        port: 3000,
        method: 'GET'
    };
http.request(options, res => {
    console.log('http.request: statusCode: ', res.statusCode);
    console.log('http.request: statusMessage: ', res.statusMessage);
    console.log('http.request: socket.remoteAddress: ', res.socket.remoteAddress);
    console.log('http.request: socket.remotePort: ', res.socket.remotePort);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('body:', data);
    });
}).end();
