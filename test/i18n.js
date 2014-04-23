// Load modules

var Lab = require('lab');
var Sinon = require('sinon');
var Hapi = require('hapi');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;


describe('i18n', function () {

  var server = null;

  var errorHandler = function (request, reply) {
    reply(Hapi.error.badRequest('Not good'));
  };

  var helloHandler = function (request, reply) {

      reply('Hello');
  };

  function setupServer(done) {

    server = new Hapi.Server(0);
    server.route([
      { method: 'GET',  path: '/hello', handler: helloHandler },
      { method: 'GET',  path: '/error', handler: errorHandler }
    ]);

    server.pack.require('../', {
      locales : ['en', 'es'],
      defaultLocale : 'en',
      directory : './test/locales'
    }, done);
  }

  function makeRequest(url, payload, locale, callback) {
    var next = function (res) {
      return callback(res.result);
    };

    server.inject({
      method: 'get',
      url: url,
      headers : {
        'Accept-Language' : locale
      }
    }, next);
  }

  before(setupServer);

  it('doesn\'t interfere with none error response', function (done) {

    makeRequest('/hello', {}, 'es', function (res) {
      console.log(res)
      expect(res).to.equal('Hello');
      done();
    });
  });

  it('tranlates error message into defined locale', function (done) {
    makeRequest('/error', {}, 'es', function(res) {
      expect(res.message).to.equal('No esta bien');
      done();
    });
  });

  it('defaults to default locale if the locale is not found', function (done) {
    makeRequest('/error', {}, 'de', function(res) {
      expect(res.message).to.equal('Not good');
      done();
    });
  });

});