const http = require('http');
const db = require('./DB');
const User = require('./User');
const fs = require('fs');
const url = require("url");
const PORT = 3000;

const server = http.createServer();

server.on('request', (req, res) => {

    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    console.log(url.pathname);
    switch(url.pathname) {
        case '/api/db':
            console.log(req.method);
            db.emit(req.method, req, res);
            break;
        case '/':
            fs.readFile("./04-02.html", (err, data) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                res.end(data);
            });
            break;
    }
});


//region eventListeners
db.on('GET', (req, res) => {
    db.select().then(data => res.end(JSON.stringify(data)));
});
db.on('POST', (req, res) => {
    req.on('data', data => {
        const user = JSON.parse(data);
        db.insert(user).then(() => res.end(JSON.stringify(user)));
    })
});
db.on('PUT', (req, res) => {
    req.on('data', data => {
        const user = JSON.parse(data);
        db.update(user)
            .then(() => res.end(JSON.stringify(user)))
            .catch(() => {});
    })
});
db.on('DELETE', (req, res) => {
    const id = +url.parse(req.url, true).query.id;

    db.deleteUser(id)
        .then(deletedUser => res.end(JSON.stringify(deletedUser)))
        .catch(() => {});
});
//endregion

server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

