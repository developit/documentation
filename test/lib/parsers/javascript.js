'use strict';

var test = require('tap').test,
  parse = require('../../../lib/parsers/javascript');

function toComment(fn, filename) {
  return parse({
    file: filename || 'test.js',
    source: fn instanceof Function ? '(' + fn.toString() + ')' : fn
  });
}

test('parse - unknown tag', function (t) {
  t.equal(toComment(function () {
    /** @unknown */
  })[0].tags[0].title, 'unknown');
  t.end();
});

test('parse - error', function (t) {
  t.deepEqual(toComment(function () {
    /** @param {foo */
  })[0].errors, [
    'Braces are not balanced',
    'Missing or invalid tag name']);
  t.end();
});
