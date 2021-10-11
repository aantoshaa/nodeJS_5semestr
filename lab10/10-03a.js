const WebSocket = require("ws");

const ws = new WebSocket('ws://localhost:4000');
ws.onmessage = message => {
    console.log(message.data.toString());
};

let countMessages = 0;
const handler = setInterval(() => {
    ws.send(`10-01-client: ${countMessages++}`);
}, 3000);
setTimeout(() => {
    clearInterval(handler);
    ws.close(1000, 'Работа закончена');
    console.log('Работа закончена');
}, 25000);