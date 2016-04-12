import Thing from './Thing'
import request from 'superagent'

class Remote extends Thing {

	constructor( ...args ){
		super( ...args )
	}

	create( init_data ){
		return this
	}

	read( ...args ){
		let _args = [ ...args ],
			extra_query = '',
			extra_callback = function() {}

		// Popuplate extra query and callback if passed in
		if( _args.length ){
			_args.forEach( current => {
				if( typeof current === 'string') extra_query = current
				else if( typeof current === 'function') extra_callback = current
			})
		}

		if( this.endpoints && this.endpoints.read ){
			let url = this.endpoints.read.resource + ( this.endpoints.read.query || '') + extra_query

			request( url, ( err, res ) => {
			    if( ! err ){
					this.log("RESPONSE, DATA")
					console.dir( res )
					this.endpoints.read.callback.call( this, res )
				}
				else console.error( err )

				extra_callback.call( this )
			})
		}

		else extra_callback.call( this )

		return this
	}

	update( something ){
		return this
	}

	destroy( wat ){
		return this
	}
}

export default Remote
