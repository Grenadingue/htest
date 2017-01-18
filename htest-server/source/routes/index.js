const express = require('express');

const graphicalInterface = require('./graphicalInterface');

module.exports.initHttpRoutes = (app) => {
  graphicalInterface.initHttpRoutes(express, app);
};

module.exports.initSocketIoEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('oh a new client is connected !');
    graphicalInterface.initSocketIoEvents(socket);
  });
};
