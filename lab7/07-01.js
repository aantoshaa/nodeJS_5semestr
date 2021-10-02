const http = require('http');
const fs = require('fs');
const stat = require('./static')('./static');
const PORT = 3000;

const MIME = {
    HTML: Symbol('text/html; charset=utf-8'),
    CSS: Symbol('text/css'),
    JS: Symbol('text/javascript'),
    PNG: Symbol('image/png'),
    DOCX: Symbol('application/msword'),
    JSON: Symbol('application/json'),
    XML: Symbol('application/xml'),
    MP4: Symbol('video/mp4')
};

const server = http.createServer((req, res) => {
    switch(req.method) {
        case 'GET':
            getHandler(req, res);
            break;
        default:
            stat.writeHTTP405(req, res);
    }
});

//region Handler
const getHandler = (req, res) => {
    if      (stat.isStatic('html', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.HTML.toString() });
    else if (stat.isStatic('css', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.CSS.toString() });
    else if (stat.isStatic('js', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.JS.toString() });
    else if (stat.isStatic('png', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.PNG.toString() });
    else if (stat.isStatic('docx', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.DOCX.toString() });
    else if (stat.isStatic('json', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.JSON.toString() });
    else if (stat.isStatic('xml', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.XML.toString() });
    else if (stat.isStatic('mp4', req.url)) stat.sendFile(req, res, { 'Content-Type': MIME.MP4.toString() });
    else {
        stat.writeHTTP404(req, res);
    }
};
//endregion

server.listen(PORT,
    () => console.log(`Server started on port ${PORT}...`));