'use strict';

var childProcess = require('child_process'),
    // errors = require('../../errors.js'),
    path = require('path'),
    // rp = require('../../lib/rp.js'),
    startServer = require('../fixtures/server.js');


describe('Request-Promise-Native', function () {

    var stopServer = null;

    before(function (done) {

        startServer(4000, function (stop) {
            stopServer = stop;
            done();
        });

    });

    after(function (done) {

        stopServer(done);

    });

    describe('should still allow to require Request independently', function () {

        it('by not interfering with Request required afterwards', function (done) {

            childProcess.exec('node ' + path.join(__dirname, '../fixtures/require/afterwards.js'), function (err, stdout, stderr) {

                if (err) {
                    done(err);
                    return;
                }

                try {
                    expect(stdout, 'Actual stdout: ' + stdout).to.contain('rp: true, request: true');
                    done();
                } catch (e) {
                    done(e);
                }

            });

        });

        it('by not interfering with Request required beforehand', function (done) {

            childProcess.exec('node ' + path.join(__dirname, '../fixtures/require/beforehand.js'), function (err, stdout, stderr) {

                if (err) {
                    done(err);
                    return;
                }

                try {
                    expect(stdout, 'Actual stdout: ' + stdout).to.contain('request: true, rp: true');
                    done();
                } catch (e) {
                    done(e);
                }

            });

        });

        it('by not interfering with Request required beforehand and afterwards being identical', function (done) {

            childProcess.exec('node ' + path.join(__dirname, '../fixtures/require/beforehandAndAfterwards.js'), function (err, stdout, stderr) {

                if (err) {
                    done(err);
                    return;
                }

                try {
                    expect(stdout, 'Actual stdout: ' + stdout).to.contain('request1: true, rp: true, request2: true');
                    done();
                } catch (e) {
                    done(e);
                }

            });

        });

    });

});
