// Load modules

var Lab = require('lab');
var Hapi = require('hapi');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;


describe('josepoo', function () {

    it('can be added as a plugin to hapi', function (done) {

        var server = new Hapi.Server();
        server.pack.require('../', {
          locales : ['en', 'es'],
          defaultLocale : 'en',
          directory : './test/locales'
        }, function (err) {

            expect(err).to.not.exist;
            done();
        });
    });
});
