const webSocket = require('ws');
const PORT = 4000;

const serverWS = new webSocket.Server({port: PORT}, () => {
    console.log(`WS started on port ${PORT}...`);
});

serverWS.on('connection', (ws) => {
    ws.on('pong', data => {
        console.log('PONG', data.toString())
    });
    ws.on('ping', data => {
        console.log('PING', data.toString())
    });
});


let count = 0;
setInterval(() => {
    serverWS.clients.forEach(client => {
        client.send(`11-03-server: ${++count}\n`);
    });
}, 15 * 1000);

setInterval(() => {
    serverWS.clients.forEach(client => {
        client.ping('server: ping');
    });
    console.log(`server: ping, ${serverWS.clients.size} connected clients`)
}, 5 * 1000);
