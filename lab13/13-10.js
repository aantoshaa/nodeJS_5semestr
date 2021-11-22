const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const PORT = 5000;

client.on('message', (message, remoteInfo) => {
    console.log(message.toString());
    client.close();
});

client.send('Hello', PORT, 'localhost', err => {
    if (err) {
        client.close();
    }
});
