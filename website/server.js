const https = false;
const domain = 'emilien.ca';

const http = require('http');
const _https = require('https');
const createServer = (https ? _https : http).createServer;
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
//const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: false });
const handle = app.getRequestHandler();

let p = `/etc/letsencrypt/live/${domain}/`;
let credentials = {
  key: https && fs.readFileSync(p + 'privkey.pem'),
  cert: https && fs.readFileSync(p + 'fullchain.pem'),
};

//start an HTTP redirect server
if (https) {
  let httpServer = http.createServer(function (req, res) {
    res.writeHead(301, {
      Location: `https://${req.headers['host']}${req.url}`,
    });
    res.end();
  });
  httpServer.listen(80);
}

//start the server and log to the console
let port = https ? 443 : 80;
app.prepare().then(() => {
  createServer(credentials, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    let host = 'localhost';
    console.log(`listening on ${host}:${port}\n`);
  });
});
