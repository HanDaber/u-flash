import { API_URL, BACKEND_URL } from '../constants/AppConstants'
import Resource from './resource'


let backend_endpoint = ( str => { // Remove trailing slash
    if( str.substr( -1 ) === '/') return str.substr( 0, str.length - 1 )
    else return str
})( BACKEND_URL )

let dpd = require('dpd-js-sdk')( backend_endpoint ) // Backend API

let getTime = () => {
		let d = new Date()
		return d.getTime()
	}



class Controller extends Resource {

	constructor( config ){
		config.id = ''
		super( config )

		Object.defineProperties( this, {
			_data: {
				value: [],
				writeable: true,
				configurable: true,
				enumerable: false
			}
		})
	}

	init(){
		if( ! this.updated ) this.getData()
	}

	forEach( fn ){
		this._data.forEach( fn )
	}

	create( data ){
		if( this.remote ) this.remote.post( data, res => {
			console.log('create() got res')
			console.dir( res )
			this.getData()
		})
	}
	getData( then ){
		console.log(''+this+'getData()')
		if( this.remote ) this.remote.get( data => {
			console.log('getData() got data')

			let items = data.map( datum => {
				datum.endpoint = this.config.endpoint
				return new Resource( datum )
			})

			if( then && typeof then == 'function') then( items )

			this.data = items
		})
	}
	setData( data ){
		console.dir( this )
		if( this.remote ) this.remote.put( data, res => {
			console.log('setData() got res')
			console.dir( res )
		})
	}
}


export default Controller
