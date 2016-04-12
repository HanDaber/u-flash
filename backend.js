/**
 * Module dependencies.
 */

var express = require('express'), 
	cors = require('cors'),
	uuid = require('uuid'),
	pjson = require('./package.json'),
	dotenv = require('dotenv'),
	deployd = require('deployd'),
	__port = 3000,
	print = function( x ){
		return JSON.stringify( x, null, 4 )
	}

dotenv.load()

var app = express()

app.set('port', process.env.PORT || __port )
app.use( cors() )

app.get('', function( req, res ){
	res.send('hello')
})

app.get('/', function( req, res ){
	res.send('/hello')
})

app.get('/test', function( req, res ){
	res.send({
		test: true,
		test_quality: 'ok',
		endpoint: 'backend'
	})
})


app.get('/pid', function( req, res ){
	res.send( process.pid )
})


/**
 * Start Deployd server (backend).
 */
process.chdir( __dirname+'/backend')
var backend = deployd({
  port: __port,
  db: { connectionString: process.env.MONGODB }
});

backend.listen();

backend.on('listening', function() {
  console.log('Backend server listening on port %d in %s mode', __port, app.get('env') );
});

backend.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});

console.log('FE_URI: '+process.env.FE_URI )
console.log('BE_URI: '+process.env.BE_URI )
