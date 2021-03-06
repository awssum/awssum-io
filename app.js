// ----------------------------------------------------------------------------
//
// awssum.io - The AwsSum website.
//
// Copyright (c) Andrew Chilton, 2013.
//
// ----------------------------------------------------------------------------

// core
var http = require('http');
var path = require('path');

// npm
var express = require('express');

// local
var awssum = require('./lib/awssum.js');
var services = require('./lib/services.js');
var providers = require('./lib/providers.js');

// ----------------------------------------------------------------------------

process.title = 'awssum.io';

var app = express();

// all environments
app.set('port', process.env.PORT || 9367);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res, next) {
    res.render('awssum', {
        awssum    : awssum,
        providers : providers,
        services  : services,
    });
});

app.get('/:provider', function(req, res, next) {
    // make sure this provider exists
    var provider = req.params.provider;
    var path = '/' + provider;
    if ( !providers[path] ) {
        return next();
    }

    res.render('provider', {
        awssum    : awssum,
        providers : providers,
        services  : services,
        provider  : providers[path],
    });

});

app.get('/:provider/:service', function(req, res, next) {
    // make sure this service exists
    var provider = req.params.provider;
    var service = req.params.service;

    var path = '/' + provider + '/' + service;

    if ( !services[path] ) {
        return next();
    }

    res.render('service', {
        awssum    : awssum,
        providers : providers,
        services  : services,
        service   : services[path],
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// ----------------------------------------------------------------------------
