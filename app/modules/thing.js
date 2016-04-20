import { EventEmitter } from 'events'
import uuid from 'uuid'

let arrayCheck = Array.isArray,
	objectKeys = Object.keys



class Thing extends EventEmitter {

	constructor( config ){
		super()

		console.log( config )
		this.config = config || {}
		console.log( this.config )

		let _id = this.config.id || uuid.v4()
		// this._id = _id

		// Prettify JSON output (make methods non-enumerable)
		Object.defineProperties( this, {
			_id: {
				value: _id,
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
			},
			_data: {
				value: {},
				writeable: true,
				configurable: true,
				enumerable: false
			}
		})
	}

	init(){
		console.log(''+this+'.init()')
	}

	set data( data ){
		Object.defineProperties( this, {
			_data: {
				value: data,
				writeable: true,
				configurable: true,
				enumerable: false
			}
		})

		this.emit('change', { key: this.config.endpoint, new_val: data })
	}

	get data(){
		return this._data
	}

	// get( key ){
	// 	if( this._data[ key ] !== undefined ) return this._data[ key ]
	// 	else if( this.config[ key ] !== undefined ) return this.config[ key ]
	// 	else return undefined
	// }

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
		return this.constructor.name+'#'+this._id
	}
}


export default Thing
