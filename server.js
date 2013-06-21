var express = require('express');
var image_proxy = require('./image-proxy');
var url = require('url');
var http = require('http');
var app = express();

app.use(express.static(__dirname));

app.get('/fetch', image_proxy());

app.listen(3000);
console.log('Listening on port 3000');