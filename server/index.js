var express = require('express');
var app = module.exports = express.createServer();
require('dotenv').config()

app.listen(process.env.PORT);