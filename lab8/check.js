const isJson = (headers, header, mime) => {
    let rc = false;
    if(headers[header]) {
        rc = headers[header].includes(mime);
    }
    return rc;
};
exports.isJsonContentType = (hs) => isJson(hs, 'content-type', 'application/json');
exports.isJsonAccept = (hs) => isJson(hs, 'accept', 'application/json');