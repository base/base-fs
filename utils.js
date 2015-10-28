'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('src-stream', 'src');
require('through2', 'through');
require('vinyl-fs', 'vfs');
require = fn;

/**
 * Expose `utils`
 */

module.exports = utils;
