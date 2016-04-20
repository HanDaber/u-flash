var util = require('util'),
	webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	pkg = require('./package.json'),
	port = pkg.config.devPort,
	host = pkg.config.devHost,
	configPath = process.argv[2] || './webpack/config',
	config = require( configPath )

var server = new WebpackDevServer( webpack( config ), config.devServer )

server.listen( port, host, function( err ){
	if( err ){ console.log("dev-server.js::15 Error:\n"+err ) }
	var url = util.format('http://%s:%d', host, port )
	console.log('Listening at %s', url )
})

var api = require('./server')
