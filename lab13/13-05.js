const net = require('net');
const PORT = 40000;

const tcpServer = net.createServer();

tcpServer.on('connection', socket => {
    let sum = 0;
    socket.on('data', data => {
        sum += +data;
    });

    const handlerInterval = setInterval(() => {
        socket.write(`SUM: ${sum}`);
    }, 3000);

    socket.on('close', () => {
        clearInterval(handlerInterval);
    });
});

tcpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});