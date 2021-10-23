const rpcWS = require('rpc-websockets').Client;

const ws = new rpcWS('ws://localhost:4000/');
ws.on('open', () => {
    ws.login({login: '123', password: '123'})
        .then(async () => {
            const fibArray = await ws.call('fib', [7]);
            const fib = fibArray[fibArray.length - 1];
            console.log('result:',
                await ws.call('sum', [
                    await ws.call('square', [3]),
                    await ws.call('square', [5, 4]),
                    await ws.call('mul', [3, 5, 7, 9, 11, 13])])
                + fib
                * await ws.call('mul', [2, 4, 6])
            );
            //ws.close();
        });
});