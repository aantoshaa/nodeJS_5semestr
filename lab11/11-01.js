const webSocket = require('ws');
const fs = require('fs');
const port = 4000;

const serverWS = new webSocket.Server({port}, () => {console.log(`WS started on port ${port}...`)});

let count = 0;
serverWS.on('connection', ws => {
    const webSocketStream = webSocket.createWebSocketStream(ws);
    const file = fs.createWriteStream(`./upload/fileFromClient.txt`);
    webSocketStream.pipe(file);
});

