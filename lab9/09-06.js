const http = require('http');
const fs = require('fs');

let bound = 'divider';
let body = `--${bound}\r\n`;
body += 'Content-Disposition:form-data; name="file"; Filename="MyFile.txt"\r\n';
body += 'Content-Type:text/plain\r\n\r\n';
body += fs.readFileSync('MyFile.txt');
body += `\r\n--${bound}--\r\n`;

let options=
    {
        host: 'localhost',
        path: `/task6-7`,
        port: 3000,
        method:'POST',
        headers: {'Content-Type':`multipart/form-data; boundary=${bound}`}
    };

const req = http.request(options);

req.end(body);