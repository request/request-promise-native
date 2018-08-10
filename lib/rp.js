'use strict';

var configure = require('request-promise-core/configure/request2');

// delete the request module from the require cache so that
// users can require an unaltered request instance!
var Module = require('module');
var filename = Module._resolveFilename('request', module);
delete require.cache[filename];
var request = require('request');

configure({
    request: request,
    PromiseImpl: Promise,
    expose: [
        'then',
        'catch',
        'promise'
    ]
});


module.exports = request;
