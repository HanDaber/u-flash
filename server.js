"use strict"
/**
 * Module dependencies.
 */

var express = require('express'), 
	cors = require('cors'),
	pjson = require('./package.json'),
	AWS = require('aws-sdk'),
	DOC = require("dynamodb-doc"),
	request = require('request'),
	fs = require('fs'),
	__port = 8080,
	print = function( x ){
		return JSON.stringify( x, null, 4 )
	},
	readModuleFile = function( path, callback ){
	    try {
	        var filename = require.resolve( path );
	        fs.readFile( filename, 'utf8', callback );
	    } catch ( e ) {
	        callback( e );
	    }
	}

var app = express()

app.set('port', process.env.PORT || __port )
app.use( cors() )

app.use('', ( req, res, next ) => { // To handle nginx routing config
	var remove_path = pjson.config.serverBasePath
	if( req.url.indexOf( remove_path ) > -1 ){
		var redirect_to = req.url.replace( remove_path, '')
		redirect_to = (redirect_to == '' ? '/' : redirect_to)

		console.log('redirecting '+req.url+' to '+redirect_to );

		req.url = redirect_to
		// return res.redirect( redirect_to )
	}
	// else 
	next()
})
app.use(( req, res, next ) => {
	res.on('end', () => {})
	next()
})

app.get('', ( req, res ) => {
	res.send('hello')
})
app.get('/', ( req, res ) => {
	res.send('/hello')
})

app.get('/test', ( req, res ) => {
	res.send({
		test: true,
		test_quality: 'fine',
		endpoint: 'server',
		pid: process.pid
	})
})

app.get('/projects', ( req, res ) => {
	res.send({
		id: req.params.id,
		docs: []
	})
})
app.get('/projects/:id', ( req, res ) => {
	res.send({
		id: req.params.id,
		doc: {}
	})
})



var server = app.listen( app.get('port'), () => {
	var host = server.address().address,
		port = server.address().port

  console.log('server.js: '+pjson.description+' web server listening at http://%s:%s on '+( new Date() ), host, port )
  console.log('@@@ - PID: '+process.pid+"\n"+print( server.address() ) )
})
