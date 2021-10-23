const webSocket = require('ws');

const ws = new webSocket('ws://localhost:4000/');
const webSocketStream = webSocket.createWebSocketStream(ws);

webSocketStream.pipe(process.stdout);

const client = process.argv[2] ?? 'ClientA';
const body = {client: client, timestamp: Date.now()};

ws.onopen = () => {
    ws.send(JSON.stringify(body));
};

