const express = require('express');
const app = express();
const logger = require('morgan');
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded)