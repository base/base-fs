/*!
 * base-fs <https://github.com/jonschlinkert/base-fs>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Support using the plugin on `app` or a
 * `collection` instance
 */

module.exports = function(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    if (!isValidInstance(app, fn)) return;

    /**
     * Glob patterns or filepaths to source files.
     *
     * ```js
     * app.src('src/*.hbs', {layout: 'default'});
     * ```
     * @name .src
     * @param {String|Array} `glob` Glob patterns or file paths to source files.
     * @param {Object} `options` Options or locals to merge into the context and/or pass to `src` plugins
     * @api public
     */

    this.define('src', function(patterns, options) {
      var opts = utils.extend({}, config, this.options, options);
      return (this.stream = utils.vfs.src(patterns, opts));
    });

    /**
     * Glob patterns or paths for symlinks.
     *
     * ```js
     * app.symlink('src/**');
     * ```
     * @name .symlink
     * @param {String|Array} `glob`
     * @api public
     */

    this.define('symlink', function() {
      return utils.fs.symlink.apply(this, arguments);
    });

    /**
     * Specify a destination for processed files.
     *
     * ```js
     * app.dest('dist/');
     * ```
     * @name .dest
     * @param {String|Function} `dest` File path or rename function.
     * @param {Object} `options` Options and locals to pass to `dest` plugins
     * @api public
     */

    this.define('dest', function(dir, options) {
      if (!dir) {
        throw new TypeError('expected dest to be a string or function.');
      }
      var opts = utils.extend({}, config, this.options, options);
      return utils.exhaust(utils.dest(dir, opts));
    });

    /**
     * Copy files with the given glob `patterns` to the specified `dest`.
     *
     * ```js
     * app.task('assets', function(cb) {
     *   app.copy('assets/**', 'dist/')
     *     .on('error', cb)
     *     .on('finish', cb)
     * });
     * ```
     * @name .copy
     * @param {String|Array} `patterns` Glob patterns of files to copy.
     * @param  {String|Function} `dest` Desination directory.
     * @return {Stream} Stream, to continue processing if necessary.
     * @api public
     */

    this.define('copy', function(patterns, dest, options) {
      return this.src(patterns, options)
        .pipe(this.dest(dest, options));
    });

    // return plugin if the instance is `app`
    if (this.isApp) {
      return plugin;
    }
  };
};

function isValidInstance(app, fn) {
  if (typeof fn === 'function') {
    return fn(app, 'base-fs');
  }
  return !utils.isRegistered(app, 'base-fs');
}
