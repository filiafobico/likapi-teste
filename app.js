const express = require('express');
const app = express();

const dealRouter = require('./routes/deal');

app.use(express.json());

app.use('/', dealRouter);

module.exports = app;