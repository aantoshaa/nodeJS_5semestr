const rpcWS = require('rpc-websockets').Server;
const config = {port: 4000, host: 'localhost', path: '/'};

const serverRPC = new rpcWS(config);
console.log('start rpc-server');
serverRPC.event('change');
module.exports = {serverRPC};