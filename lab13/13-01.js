const net = require('net');
const PORT = 40000;

const tcpServer = net.createServer();

tcpServer.on('connection', socket => {
    console.log('user connected');
    socket.on('data', data => {
        console.log(`message from client: "${data}"`);
        socket.write(`ECHO: ${data}`);
    });
    socket.on('close', () => {
        console.log('user disconnected');
    });
});

tcpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
