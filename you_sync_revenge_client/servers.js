// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
//added this middleware
var history = require('connect-history-api-fallback');

app = express()
//started middleware
app.use(history());

app.use(serveStatic("./dist"))
var port = process.env.PORT || 3000
app.listen(port)
console.log('server started ' + port)
