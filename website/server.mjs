const https = false;
const dev = false;
import { domain } from './private/lib/consts.mjs';

import * as http from 'http';
import * as _https from 'https';
const createServer = (https ? _https : http).createServer;
import { parse } from 'url';
import next from 'next';
import fs from 'fs';

const app = next({ dev });
const handle = app.getRequestHandler();

var p = `/etc/letsencrypt/live/${domain}/`;
var credentials = {
  key: https && fs.readFileSync(p + 'privkey.pem'),
  cert: https && fs.readFileSync(p + 'fullchain.pem'),
};

//start an HTTP redirect server
if (https) {
  var httpServer = http.createServer(function(req, res) {
    res.writeHead(301, {
      Location: `https://${req.headers['host']}${req.url}`,
    });
    res.end();
  });
  httpServer.listen(80);
}

//start the server and log to the console
var port = https ? 443 : 80;
app.prepare().then(() => {
  createServer(credentials, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    var host = 'localhost';
    console.log(`listening on ${host}:${port}\n`);
  });
});
