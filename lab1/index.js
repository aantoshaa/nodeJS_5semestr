const http = require("http");
const PORT = 3000;

const server = http.createServer( (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write('<h1>Hello World</h1>');
    res.write('<br>Method: ' + req.method);
    res.write('<br>URL: ' + req.url);

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});

