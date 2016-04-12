import { EventEmitter } from 'events'
import ANDROID_BINDINGS from './modules/android_bindings'
import { BACKEND_URL } from './constants/AppConstants'
import uuid from 'uuid'

let backend_endpoint = ( str => { // Remove trailing slash
    if( str.substr( -1 ) === '/') return str.substr( 0, str.length - 1 )
    else return str
})( BACKEND_URL )

let dpd = require('dpd-js-sdk')( backend_endpoint ) // Backend API

let arrayCheck = Array.isArray,
	objectKeys = Object.keys,
	getTime = () => {
		let d = new Date()
		return d.getTime()
	}

class App extends EventEmitter {

	constructor( config ){
		super()

		this.id = uuid.v4()
		this.config = config || {}
		this.updated = false

		// Prettify JSON output (make methods non-enumerable)
		Object.defineProperties( this, {
			remote: {
				value: dpd,
				writeable: false,
				configurable: false,
				enumerable: false
			},
			_events: {
				value: this._events,
				writeable: false,
				configurable: true,
				enumerable: false
			},
			_maxListeners: {
				value: this._maxListeners,
				writeable: false,
				configurable: true,
				enumerable: false
			}
		})

		this.on('change', evt => {
			this.updated = getTime()
		})

		this.init()
	}

	init(){
		console.dir( this )
		console.log('init()')
		this.getData()
	}

	getData(){
		this.remote("/things").get( things => {
			this.emit('change', { key:'things', new_val: things })
		})
	}

	forEach( fn ){
		var arr = objectKeys( this )
		arr.forEach(( item, index ) => {
			fn( this[ item ], item )
		})
	}

	toObject(){
		let obj = {}

		this.forEach(( val, key ) => {
			if( typeof val === 'object'){
				if( arrayCheck( val ) ){
					let _temp = []

					val.forEach(( inner_item, inner_index ) => {
						_temp.push( inner_item )
					})

					obj[ key ] = _temp
				}
				else {
					let _temp = {}

					objectKeys( val ).forEach(( inner_key ) => {
						_temp[ inner_key ] = val[ inner_key ]
					})
					obj[ key ] = _temp
				}
			}
			else obj[ key ] = val
		})

		return obj
	}

	toJSON(){
		return JSON.stringify( this.toObject(), null, 4 )
	}

	toString(){
		return this.id
	}
}

let app = new App({
		name: 'App'
	}
)

window.app = app

export default app
