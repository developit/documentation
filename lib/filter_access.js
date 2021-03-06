'use strict';

var walk = require('./walk');

/**
 * Exclude given access levels from the generated documentation: this allows
 * users to write documentation for non-public members by using the
 * `@private` tag.
 *
 * @name access
 * @public
 * @param {Array<string>} [levels=['private']] excluded access levels.
 * @param {Array<Object>} comments parsed comments (can be nested)
 * @return {Array<Object>} filtered comments
 */
module.exports = function (levels, comments) {
  levels = levels || ['private'];

  function filter(comment) {
    return levels.indexOf(comment.access) === -1;
  }

  function recurse(comment) {
    for (var scope in comment.members) {
      comment.members[scope] = comment.members[scope].filter(filter);
    }
  }

  return walk(comments.filter(filter), recurse);
};
