const http = require('http');
const xmlbuilder = require('xmlbuilder');

const requestXml = xmlbuilder.create('request');
requestXml.element('params', {x: 3, y: 5, s: 'Hello'});

const option = {
    host: 'localhost',
    path: '/task5',
    port: 3000,
    method: 'POST',
    headers: { 'content-type':'application/xml', 'accept':'application/xml' }
};

const req = http.request(option, res => {
    console.log('http.request: statusCode: ', res.statusCode);

    res.on('data', (data) => {
        console.log('body:', data.toString());
    });
});

req.write(requestXml.toString({pretty:true}));
req.end();