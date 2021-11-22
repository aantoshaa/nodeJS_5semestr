const http = require('http');
const handlers = require('./handlers.js');
const {StudentPointError} = require("./StudentPointError");
const PORT = 3000;

const server = http.createServer();
server.on('request', (req, res) => {
    (async () => {
        try {
            switch (req.method) {
                case 'GET':
                    await handlers.getHandler(req, res);
                    break;
                case 'POST':
                    await handlers.postHandler(req, res);
                    break;
                case 'DELETE':
                    await handlers.deleteHandler(req, res);
                    break;
                case 'PUT':
                    await handlers.putHandler(req, res);
                    break;
                default:
                    handlers.write405(req, res);
            }
        } catch (err) {
            if (err instanceof StudentPointError) {
                res.end(JSON.stringify({error: err.error, message: err.message}));
            } else {
                res.end(JSON.stringify({message: err.message}));
            }
        }
    })();
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
