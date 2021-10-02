const http = require('http');
const url = require('url');
const fs = require('fs');
const { parse } = require('querystring');
const send = require('sendmail_lildev1l');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const path = url.parse(req.url);
    if(path.pathname === '/') {
        switch (req.method) {
            case 'GET':
                fs.readFile('index.html', (err, data) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    res.end(data);
                });
                break;
            case 'POST':
                req.on('data', data => {
                    let params = parse(data.toString());
                    send(params.to,  params.message);
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<h2>${params.message}</h2>`)
                });
                break;
        }
    }
}).listen(PORT,
    () => console.log(`Server started on port ${PORT}...`));