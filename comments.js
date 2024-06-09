// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const comments = require('./comments');

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.end('404 Not Found');
            } else {
                comments.get((err, data) => {
                    if (err) {
                        console.log(err);
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(200, {
                            'Content-Type': mime.getType(pathname)
                        });
                        res.end(data);
                    }
                });
            }
        });
    } else if (pathname === '/post') {
        comments.post(req, res);
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {
                    'Content-Type': mime.getType(pathname)
                });
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running...');
});