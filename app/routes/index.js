// /**
//  * Module dependencies.
//  */

// var express = require('express'), 
// 	fs = require('fs'),
// 	http = require('http'), 
// 	path = require('path'),
// 	jsdom = require("jsdom"),
// 	request = require('request'),
// 	cors = require('cors'),
// 	print = function( x ){
// 		return JSON.stringify( x, null, 4 )
// 	}

// var app = express()

// app.set('port', process.env.PORT || 8080 )
// app.use( cors() )

app.get('/test', function( req, res ){
	res.send({ test: true })
})

app.get('/pid', function( req, res ){
	res.sendStatus( process.pid )
})


// var server = app.listen( app.get('port'), function(){
// 	var host = server.address().address,
// 		port = server.address().port

//   console.log('App listening at http://%s:%s', host, port )
//   console.log('@@@PID: '+process.pid+"\n"+print( server.address() ) )
// })
