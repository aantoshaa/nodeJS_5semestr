const webSocket = require('ws');
const PORT = 4000;

const serverWS = new webSocket.Server({port: PORT}, () => {
    console.log(`Server started on port ${PORT}...`);
});

serverWS.on('connection', ws => {
    ws.on('message', message => {
        const messageObj = JSON.parse(message);
        console.log(`Connected: ${messageObj.client}`);
        let count = 0;
        setInterval(() => {
            const body = {n: ++count, client: messageObj.client, timestamp: Date.now()};
            ws.send(`${JSON.stringify(body)}\n`);
        }, 3000);
    })
});

