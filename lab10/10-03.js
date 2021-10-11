const WebSocket = require("ws");
const port = 4000;
const server = new WebSocket.Server({port}, () => {console.log(`WS started on port ${port}...`)});

server.on("connection", ws => {
    ws.on("message", message => {
        console.log(message.toString());
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(message);
            }
        })
    });
    ws.onclose = event => console.log(event.code, event.reason);
});
