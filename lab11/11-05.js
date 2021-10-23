const rpcWS = require('rpc-websockets').Server;
const config = {port: 4000, host: 'localhost', path: '/'};

const server = new rpcWS(config);
server.setAuth(l => l.login === '123' && l.password === '123');

server.register('square', square).public();
server.register('sum', sum).public();
server.register('mul', mul).public();

server.register('fib', fib).protected();
server.register('fact', fact).protected();

//region Operations
function square(params) {
    if (params.length === 2) {
        return params[0] * params[1];
    } else {
        return Math.PI * params[0] ** 2;
    }
}

function sum(params) {
    return params.reduce((sum, nextItem) => sum + nextItem, 0);
}

function mul(params) {
    return params.reduce((mul, nextItem) => mul * nextItem, 1);
}

function fib(n) {
    const iterFibN = iterFib(n);
    return Array.from(iterFibN);
}

function* iterFib(n) {
    let current = 1, prev = 0;
    for (let i = 0; i <= n; i++) {
        if (i < 1) {
            yield prev;
        } else {
            yield current;
            const buf = current;
            current +=  prev;
            prev = buf;
        }
    }
}

function fact(n) {
    if (n <= 1) {
        return 1;
    }
    return n * fact(n - 1);
}
//endregion