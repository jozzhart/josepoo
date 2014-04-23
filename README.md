josepoo
=======

A HAPI plugin for i18n of error messages, leveraging the [i18n module](https://www.npmjs.org/package/i18n)


Install **hapi** and **josepoo** and have it saved to your *package.json* dependencies:
```
npm install hapi --save
npm install josepoo --save
```

## Add plugin to server ##


```

var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 8000);

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        reply('hello world');
    }
});

//  Josepoo options
var josepooOptions = {
  // setup some locales - other locales default to en silently
  locales:['en', 'es'],
  // where to store json files - defaults to './locales' relative to modules directory
  directory: './locales',
  // whether to write new locale information to disk - defaults to true
  updateFiles: false
}

//  Add the plugin
server.pack.require('josepoo', josepooOptions, function (err) {
  if (!err && err !== null) {
    server.log(['error'], 'Plugin "josepoo" load error: ' + err);
  } else {
    server.log(['start'], 'josepoo loaded');
  }
});

// Start the server
server.start();
```
 


## Create you locales ##

Example ```./locales/es.json```

```
{
  "Hello" : "Hola",
  "Not good" : "No esta bien"
}

```

