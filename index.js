'use strict';
var Promise = require('bluebird');
var crypto = require('crypto');
var account = Promise.promisifyAll(require('google-auth2-service-account'));
var MAX_AGE = 45 * 60 * 1000; //45 minutes
var Cache = require('age-cache');

function makeID(key, email, scope) {
  return crypto.createHash('sha512')
    .update(key)
    .update(email)
    .update(scope)
    .digest()
    .toString('hex');
}

var cache = new Cache(MAX_AGE);
module.exports = function getKey(key, email, scope, callback) {
  if (!Buffer.isBuffer(key) && typeof key === 'object') {
    callback = scope;
    scope = email;
    email = key.client_email;
    key = key.private_key;
  }
  var id = makeID(key, email, scope);
  if (cache.has(id)) {
    return cache.get(id);
  }
  var authKey = account.authAsync(key, {
    iss: email,
    scope: scope
  });
  cache.set(id, authKey);
  return authKey.nodeify(callback);
};
