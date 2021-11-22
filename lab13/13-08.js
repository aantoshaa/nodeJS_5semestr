const net = require('net');

const HOST = '127.0.0.1';
const PORT = process.argv[2];

const tcpClient = new net.Socket();

tcpClient.connect(+PORT, HOST, () => {
    tcpClient.on('data', data => {
        console.log(data.toString());
    });

    const handlerInterval  = setInterval(() => {
        tcpClient.write(PORT);
    }, 1000);

    setTimeout(() => {
        clearInterval(handlerInterval);
        tcpClient.destroy();
    }, 20000);
});