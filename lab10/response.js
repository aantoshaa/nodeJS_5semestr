exports.write400 = (req, res) => {
    const statusCode = 400;
    res.writeHead(statusCode, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`Error ${statusCode}<br>Request: ${req.method} ${req.url}`);
};