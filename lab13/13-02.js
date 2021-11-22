const net = require('net');

const HOST = '127.0.0.1';
const PORT = 40000;

const tcpClient = new net.Socket();
tcpClient.on('data', data => {
    console.log(`message from server: "${data}"`);
    tcpClient.destroy();
});

tcpClient.on('close', () => {
    console.log('disconnection');
});

tcpClient.connect(PORT, HOST, () => {
    console.log('successful connection');
    tcpClient.write('Hello');
});