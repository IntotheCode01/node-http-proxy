/*
  modifyBody-middleware.js: Example of middleware which modifies response

  Copyright (c) Nodejitsu 2013

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    connect = require('connect'),
    httpProxy = require('../../lib/http-proxy');

//
// Basic Connect App
//
connect.createServer(
  function (req, res, next) {
    var _write = res.write;

    res.write = function (data) {
      _write.call(res, data.toString().replace("Ruby", "nodejitsu"));
    }
    next();
  },
  function (req, res) {
    proxy.web(req, res);
  }
).listen(8000);

//
// Basic Http Proxy Server
//
var proxy = httpProxy.createProxyServer({
  target: 'http://localhost:9000'
});

//
// Target Http Server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, I know Ruby\n');
}).listen(9000);

util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8000'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9000 '.yellow);

