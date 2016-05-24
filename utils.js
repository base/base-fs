'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('dest');
require('is-registered');
require('is-valid-instance');
require('stream-exhaust', 'exhaust');
require('extend-shallow', 'extend');
require('through2', 'through');
require('vinyl-fs', 'vfs');
require = fn;

/**
 * Utils
 */

utils.isValid = function(app) {
  if (!utils.isValidInstance(app, ['app', 'collection', 'list', 'views'])) {
    return false;
  }
  if (utils.isRegistered(app, 'base-fs')) {
    return false;
  }
  return true;
};

/**
 * Expose `utils`
 */

module.exports = utils;
