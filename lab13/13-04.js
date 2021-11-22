const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;

const tcpClient = new net.Socket();

tcpClient.connect(PORT, HOST, () => {
    tcpClient.on('data', data => {
        console.log(data.toString());
    });

    const handlerInterval  = setInterval(() => {
        const randNumber = Math.round(Math.random() * 10); // [0,10]
        console.log(`randNumber: ${randNumber}`);
        tcpClient.write(randNumber.toString());
    }, 1000);

    setTimeout(() => {
        clearInterval(handlerInterval);
        tcpClient.destroy();
    }, 20000);
});