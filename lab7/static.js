const fs = require('fs');

class Stat {
    constructor(sfn = './static') {
        this.STATIC_FOLDER = sfn;
    }
    #pathStatic(fn) {
        return `${this.STATIC_FOLDER}${fn}`;
    }
    #pipeFile(req, res, headers) {
        res.writeHead(200, headers);
        fs.createReadStream(this.#pathStatic(req.url)).pipe(res);
    }

    isStatic(ext, fn) {
        const reg = new RegExp(`^\/.+\.${ext}$`);
        return reg.test(fn);
    }
    sendFile(req, res, headers) {
        fs.access(this.#pathStatic(req.url), fs.constants.R_OK, err => {
            if(err) {
                this.writeHTTP404(req, res)
            } else {
                this.#pipeFile(req, res, headers)
            }
        })
    }
    writeHTTP404(req, res) {
        const statusCode = 404;
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(`{"error":"${req.method}: ${req.url}, HTTP status ${statusCode}"`)
    }
    writeHTTP405(req, res) {
        const statusCode = 405;
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(`{"error":"${req.method}: ${req.url}, HTTP status ${statusCode}"`)
    }
}

module.exports = Stat;