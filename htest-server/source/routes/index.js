const express = require('express');

const graphicalInterface = require('./graphicalInterface');

module.exports.init = function (app) {
  graphicalInterface.init(express, app);
};
