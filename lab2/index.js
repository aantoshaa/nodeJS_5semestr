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
            getViewAndSend("index.html", res);
            break;
        }
        case "/png": {
            getViewAndSend("programming.png", res);
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
            getViewAndSend("xmlhttprequest.html", res);
            break;
        }
        case "/fetch": {
            getViewAndSend("fetch.html", res);
            break;
        }
        case "/jquery": {
            getViewAndSend("jquery.html", res);
            break;
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});

function getViewAndSend(fileName, response) {
    let filePath = path.join(__dirname, "views", fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
        }
        response.end(data);
    });
}