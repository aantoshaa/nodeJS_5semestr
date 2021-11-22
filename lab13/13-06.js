const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;
const X = process.argv[2];

const tcpClient = new net.Socket();

tcpClient.connect(PORT, HOST, () => {
    tcpClient.on('data', data => {
        console.log(data.toString());
    });

    const handlerInterval  = setInterval(() => {
        console.log(`+${X}`);
        tcpClient.write(X);
    }, 1000);

    setTimeout(() => {
        clearInterval(handlerInterval);
        tcpClient.destroy();
    }, 20000);
});