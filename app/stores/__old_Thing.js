import DataStore from './DataStore'
import request from 'superagent'

class Thing extends DataStore {

	constructor( ...params ){
		super( ...params )

		let args = [ ...params ]
		console.dir( args )

		let config = args[ 0 ]

		if( typeof config == 'object' && ! Array.isArray( config ) ) for( var k in config ){
			console.log( k )
			console.dir( config[ k ] )
			if( k != 'schema'
			&& k != 'endpoints'
			&& config.hasOwnProperty( k ) ){
				(( k, config ) => {
					Object.defineProperty( this, k, {
						get: () => this.get( k ) || config[ k ],
						set: val => this.set( k, val )
					})
				})( k, config )
			}
		}

		if( config 
		&& config.schema 
		&& typeof config.schema === 'object'){
			Object.defineProperty( this, 'schema', {
				value: config.schema,
				writeable: false
			})
		}

		// Abstract this out to a remote module that accepts a config object with endpoints/callbacks etc
		this.remote = {
			read: () => {
				if( config.endpoints && config.endpoints.read ){
					request( config.endpoints.read.resource + config.endpoints.read.query, ( err, res ) => {
					    if( ! err ){

							setTimeout(() => {
								console.log("\n\nRESPONSE, DATA")
								console.dir( res )
								config.endpoints.read.callback.call( this, res )
							}, 2500 )

						}
						else console.error( err )
					})
				}
			}
		}
	}

	toString(){
		return this.name || this.constructor.name
	}
}

export default Thing
