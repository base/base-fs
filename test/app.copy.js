require('mocha');
var path = require('path');
var assert = require('assert');
var rimraf = require('rimraf');
var base = require('base-methods');
var bfs = require('..');
var app;

var fixtures = path.join(__dirname, 'fixtures/copy/*.txt');
var outpath = path.join(__dirname, 'out-fixtures');

describe('copy()', function() {
  beforeEach(function (done) {
    rimraf(outpath, done);
    app = base();
    app.use(bfs);
  });

  afterEach(function (done) {
    rimraf(outpath, done);
  });

  describe('streams', function () {
    it('should copy files', function (done) {
      app.copy(fixtures, path.join(__dirname, 'actual'))
        .on('data', function (file) {
          assert.equal(typeof file, 'object');
        })
        .on('end', done);
    });
  });
});
