/* eslint-disable no-console */
const express = require('express');

const app = express();

let requests = 0;
app.use((_req, _res, next) => {
  requests++;
  console.log(requests);
  return next();
});

app.use(express.json());

app.use(require('./routes'));

const PORT = 3333;
app.listen(PORT);
