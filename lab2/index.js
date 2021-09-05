const http = require("http");
const fs = require("fs");
const path = require("path")
const PORT = 3000;

const server = http.createServer( (req, res) => {
    let url = req.url;
    console.log(url);
    switch (url) {
        case "/html": {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            const filePath = path.join(__dirname, "views", "index.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    throw err;
                }
                res.end(content);
            })
            break;
        }
        case "/png": {
            const filePath = path.join(__dirname, "views", "programming.png");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    throw err;
                }
                res.end(content);
            })
            break;
        }
        case "/api/name": {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
            });
            res.end("Yarmolik Maksim");
            break;
        }
        case "/xmlhttprequest": {

            const filePath = path.join(__dirname, "views", "xmlhttprequest.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    throw err;
                }
                res.end(content);
            })
            break;
        }
        case "/fetch": {

            const filePath = path.join(__dirname, "views", "fetch.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    throw err;
                }
                res.end(content);
            })
            break;
        }
        case "/jquery": {

            const filePath = path.join(__dirname, "views", "jquery.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    throw err;
                }
                res.end(content);
            })
            break;
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})
