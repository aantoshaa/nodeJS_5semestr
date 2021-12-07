const http = require('http');
const db = require('./DB');
const User = require('./User');
const fs = require('fs');
const url = require("url");
const statistic = require("./Statistic");
const PORT = 3000;

const server = http.createServer();

//region request
server.on('request', (req, res) => {
    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    switch(url.pathname) {
        case '/api/db':
            console.log(req.method);
            db.emit(req.method, req, res);
            server.emit('requestCounting');
            break;
        case '/':
            fs.readFile("04-02.html", (err, data) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                res.end(data);
            });
            break;
        case '/api/ss':
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(statistic));
            break;
    }
});
//endregion

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

//region stdin
let sd_timer = null;
let sc_timer = null;
let ss_timer = null;

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = null;
    while((chunk = process.stdin.read()) !== null) {
        let x = 0;
        let chunkArray = chunk.trim().split(' ');

        switch (chunkArray[0]) {
            case 'sd':
                x = parseInt(chunkArray[1]);
                if(x > 0)
                {
                    if(sd_timer != null)
                    {
                        console.log('shut down server timer was cleared');
                        clearTimeout(sd_timer);
                    }
                    console.log(`server will be closed after ${x*1000} ms`);

                    sd_timer = setTimeout(()=>
                    {
                        console.log('server is closed');
                        server.close();
                        process.exit();
                    }, x * 1000);
                }
                else
                {
                    if(sd_timer != null)
                    {
                        console.log('shut down server timer was cleared');
                        clearTimeout(sd_timer);
                    }
                }
                break;
            case 'sc':
                x = parseInt(chunkArray[1]);
                if(x > 0)
                {
                    if(sc_timer == null)
                    {
                        console.log(`DataBase state fixation >>> enabled, every ${x * 1000} ms`);

                        sc_timer = setInterval(()=>
                        {
                            console.log('committed');
                            server.emit('commitCounting')
                        }, x * 1000);
                        sc_timer.unref();
                    }
                }
                else
                {
                    if(sc_timer != null)
                    {
                        console.log('database state fixation >>> disabled');
                        clearInterval(sc_timer);
                        sc_timer = null;
                    }
                }
                break;
            case 'ss':
                x = parseInt(chunkArray[1]);
                if(x > 0)
                {
                    if(ss_timer == null)
                    {
                        statistic.reset();
                        statistic.startDate = Date();

                        console.log(`Statistic writing >>> enabled for ${x * 1000} ms`);

                        ss_timer = setTimeout(()=>
                        {
                            console.log('Statistic writing >>> enabled');
                            clearTimeout(ss_timer);
                            statistic.finishDate = Date();
                            statistic.ssEnabled = true;
                            ss_timer = null;
                        }, x * 1000);
                    }
                } else {
                    console.log('Statistic writing >>> disabled');
                    clearTimeout(ss_timer);
                    statistic.finishDate = Date();
                    statistic.ssEnabled = false;
                    ss_timer = null;
                }
                break;
        }
    }
});

server.on('requestCounting', () => {
    if(statistic.ssEnabled)
        {
            statistic.requestsCount += 1
        }
});
server.on('commitCounting', () => {
    if(statistic.ssEnabled)
        {
            statistic.commitsCount += 1
        }
});

//endregion