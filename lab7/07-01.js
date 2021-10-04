const http = require('http');
const fs = require('fs');
const { stat, MIME, getHeader } = require('./static');
const st = stat('./static');
const PORT = 3000;

const server = http.createServer((req, res) => {
    switch(req.method) {
        case 'GET':
            getHandler(req, res);
            break;
        default:
            st.writeHTTP405(req, res);
    }
});

//region Handler
const getHandler = (req, res) => {
    if      (st.isStatic('html', req.url)) st.sendFile(req, res, getHeader(MIME.HTML));
    else if (st.isStatic('css', req.url)) st.sendFile(req, res, getHeader(MIME.CSS));
    else if (st.isStatic('js', req.url)) st.sendFile(req, res, getHeader(MIME.JS));
    else if (st.isStatic('png', req.url)) st.sendFile(req, res, getHeader(MIME.PNG));
    else if (st.isStatic('docx', req.url)) st.sendFile(req, res, getHeader(MIME.DOCX));
    else if (st.isStatic('json', req.url)) st.sendFile(req, res, getHeader(MIME.JSON));
    else if (st.isStatic('xml', req.url)) st.sendFile(req, res, getHeader(MIME.XML));
    else if (st.isStatic('mp4', req.url)) st.sendFile(req, res, getHeader(MIME.MP4));
    else {
        st.writeHTTP404(req, res);
    }
};
//endregion

server.listen(PORT,
    () => console.log(`Server started on port ${PORT}...`));