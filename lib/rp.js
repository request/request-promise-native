'use strict';

var configure = require('../../promise-core/configure/request2'),
    stealthyRequire = require('stealthy-require')(require);

// Load Request freshly - so that users can require an unaltered request instance!
var request = stealthyRequire('request');


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
