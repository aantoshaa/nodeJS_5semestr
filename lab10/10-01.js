const http = require('http');
const fs = require('fs');
const {write400} = require('./response');
const portServer = 3000;

//region WebSocket
const WebSocket = require("ws");
const port = 4000;
const server = new WebSocket.Server({port}, () => {console.log(`WS started on port ${port}...`)});

server.on("connection", ws => {
    let countMessages = 0;
    let countMessagesFromClient;
    ws.on("message", message => {
        console.log(message.toString());
        countMessagesFromClient = message.toString().split(' ')[1];
    });
    ws.onclose = event => console.log(event.code, event.reason);
    setInterval(() => {
        ws.send(`10-01-server: ${countMessagesFromClient}->${countMessages++}`);
    }, 5000);
});
//endregion

http.createServer((req, res) => {
    switch (req.url) {
        case '/start':
            fs.createReadStream('./views/index.html').pipe(res);
            break;
        default:
            write400(req, res);
    }
})
    .listen(portServer, () => {
        console.log(`Server started on port ${portServer}...`);
    });