const express = require('express');
const path = require('path');

const DIR = path.join(__dirname, 'files');

module.exports = function setupStatic(app) {
  app.use(express.static(DIR));
};
