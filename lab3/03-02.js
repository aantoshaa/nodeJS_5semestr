const http = require("http");
const url = require("url");
const fs = require("fs");

const fact = (n) => n <= 1 ? n : n * fact(n-1)

http.createServer(function (request, response)
{
    console.log(request.url);
    let path = url.parse(request.url, true);
    switch (path.pathname)
    {
        case '/fact':
            if (typeof path.query.k !== 'undefined' )
            {
                let k = +path.query.k;
                if (Number.isInteger(k))
                {
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    response.end(JSON.stringify({ k:k, fact: fact(k)}));
                }
            }
            break;
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(fs.readFileSync('03-03.html'));
            break;

    }
}).listen(3000);

console.log('Start server at http://localhost:3000/fact?k=3');