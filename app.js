'use strict';

const express = require('express');
const app = express();

const asciiEgg = require('./ascii-egg');

const sendFileOpts = {
  root: __dirname
};

const getTime = () => {
  // You found the Easter Egg at Mon Sep 12 2016 15:36:57 GMT-0500 (CDT)
  return new Date().toString();
};

const eggFinder = (req, res, next) => {
  if (req.path.includes('egg')) {
    const currentTime = getTime();    
    console.log('You found the Easter Egg at '+ currentTime);
    console.log(asciiEgg)
  }
  next();
};

app.use(eggFinder);

// app.use(express.static('public'));

app.get('/home', (req, res) => {
  res.sendFile('./html/home.html', sendFileOpts);
});

app.get('/see-our-chickens', (req, res) => {
  res.sendFile('./html/see-our-chickens.html', sendFileOpts);
});

app.get('/see-our-eggs', (req, res) => {
  res.sendFile('./html/see-our-eggs.html', sendFileOpts);
});

app.use( (req, res, next) => {
  let err = new Error('no route found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send(err.message);
});

app.listen(3000, () => {
  console.log(`app at: http://localhost:3000`);
});