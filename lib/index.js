var i18n = require('i18n');
var _ = require('lodash');

exports.register = function (plugin, options, next) {

  i18n.configure(options);
  plugin.ext('onPreResponse', function (request, extNext) {
    //  If is an error message
    if(request.response.isBoom) {
      i18n.setLocale(getLocale(request, options));
      request.response.output.payload.message = i18n.__(request.response.output.payload.message);
      return extNext(request.response);  
    }

    extNext();
  });
  next();
};

var getLocale = function(request, options) {
  i18n.init(request.raw.req);
  if(_.contains(_.keys(i18n.getCatalog()), request.raw.req.language)) {
    return request.raw.req.language;
  } else {
    return options.defaultLocale;
  }
};