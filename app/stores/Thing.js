import BaseData from './Base'
import DataStore from './DataStore'
import { EventEmitter } from 'events'
import uuid from 'uuid'

import {
	ITEMS_UPDATED,
	ITEMS_GET_SUCCESS,
	DELETE_EVENT,
	CHANGE_EVENT,
	CLEAR_EVENT
} from '../constants/AppConstants'

class Thing extends EventEmitter {

	constructor( init_data ){
		super()

		if( ! ( this instanceof Thing ) ){ return new Thing( init_data ) }

		let config = {
			__data: {
				value: new DataStore( init_data ),
				writeable: false,
				configurable: true
			},
	        __facade_keys: {
				value: [],
				writeable: false,
				configurable: true
	        }
		}

		if( ! init_data 
		|| ! init_data['id'] ){
			config.id = {
	            value: ( init_data 
	            	? init_data['id'] || uuid.v4()
	            	: uuid.v4()
	            ),
	            writable: false
	        }
		}

		Object.defineProperties( this, config )

		if( init_data
		&& typeof init_data === 'object'){
			if( Array.isArray( init_data ) ){
				init_data.forEach(( _current, index ) => {
					if( _current.isData ) this.addChangeListener( _current )

					this.setFacade( index, _current )
				})
			}
			else {
				let k = []

				if( init_data.isData ){
					k = Object.keys( init_data.toObject() )

					this.addChangeListener( init_data )
				}
				else k = Object.keys( init_data )
				
				k.forEach( item => {
					let _current = init_data[ item ]

					if( _current
					&& _current.isData ){
						this.addChangeListener.call( this.__data, _current )
					}

					this.setFacade( item, _current )
				})
			}
		}
		else if( init_data ) this.setFacade( ''+init_data, init_data )

		this.addChangeListener( this.__data )
	}

	setFacade( key, val ){
		this.__facade_keys.push( key )

		Object.defineProperty( this, key, {
			value: val,
			writeable: false,
			// get: () => val,
			// set: ( key, val ) => val,
			configurable: true
		})
	}

	all( ...args ){
		// console.dir( this.__data.data ? this.__data.data.each : "NO" )
		return this.__data.data ? this.__data.data.each( ...args ) : [].forEach( ...args )
	}

	// OVERRIDES 
	forEach( ...args ){
		return this.__data.forEach( ...args )
	}

	each( ...args ){
		return this.forEach( ...args )
	}

	makeIterable( something ){
		return this.__data.makeIterable( something || this.toObject() )
	}

	dataWillChange( ...args ){
		return this.__data.dataWillChange.apply( this, [ ...args ] )
	}

	dataDidChange( ...args ){
		return this.__data.dataDidChange.apply( this, [ ...args ] )
	}

	// // Gets the value for the key in the Map object.
	get( key ){
		if( ! this.__data ) return null

		// console.dir( super.get( key ) )

		// let _data = this.__data
		let _data = this.__data,
			getFacade = _data.get( key )

		if( getFacade ) return getFacade

		else if( _data.data && typeof _data.data.get === 'function') getFacade = _data.data.get( key )

		return getFacade
	}

	// Sets the value for the key in the Map object. Returns the Map object.
	set( key, val ){
		if( ! this.__data || val === undefined ) return false

		let _data = this.__data

		if( key === 'data'
		&& typeof val === 'object'){
			this.log('Setting DATA: '+key )
			console.dir( val )
			
			if( Array.isArray( val ) ){
				val.forEach(( _current, index ) => {
					if( _current.isData ) this.addChangeListener( _current )

					this.setFacade( index, _current )
				})
			}
			else {
				let k = []

				if( val.isData ){
					k = Object.keys( val.toObject() )

					this.addChangeListener( val )
				}
				else k = Object.keys( val )
				
				k.forEach( item => {
					let _current = val[ item ]

					if( val.isData 
					&& _current
					&& _current.isData ){
						val.addChangeListener( _current )
					}

					this.setFacade( item, _current )
				})
			}
		}
		else {
			if( val.isData ) this.addChangeListener( val )
			this.setFacade( key, val )
		}

		return _data.set( key, val )
	}
	// Removes any value associated to the key and returns the value that Map.prototype.has(value) would have previously returned. Map.prototype.has(key) will return false afterwards.
	delete( key ){
		if( ! this.__data ) return null

		let _data = this.__data

		delete this[ key ]
		// delete this[ ''+key ]

		// this.delete( key )
		if( this.__data.data && typeof this.__data.data === 'function') this.__data.data.delete( key )

		return _data.delete( key )
	}

	// BUG: TODO: clearing works well, but for some reason after clearing I cannot repopulate data
	clear(){
		if( ! this.__data ) return null

		// this.__data.clear.call( this )
		this.__facade_keys.forEach( key => {
			delete this[ key ]
		})

		if( this.__data.data
		&& typeof this.__data.data.clear === 'function'){
			this.__data.data.clear()
		}

		return this.__data.clear()
	}

	addChangeListener( ...args ){
		let params = [ ...args ]

		if( params.length == 1 
		&& params[ 0 ] ){
			let this_param = params[ 0 ]

			// if( typeof this_param === 'function') this.on( CHANGE_EVENT, this_param.bind( this ) )
			if( typeof this_param === 'function') this.on( CHANGE_EVENT, ( ...args ) => {
				
				this.log('forwarded function')
				console.dir( [ ...args ] )
				console.log('===================================================\n\n')

				this_param.apply( this, [ ...args ] )
			})

			else if( this_param.isData ){
				this_param.on( CHANGE_EVENT, ( event_data, ...args ) => {
					
					this.log('forwarded thing')
					console.dir( [ event_data, ...args ] )
					console.log('===================================================\n\n')

					event_data.key = this_param+'::'+event_data.key
					this.emit( CHANGE_EVENT, this_param, event_data, ...args )
				})
			}
		}

		else if( params.length == 2 ){
			let xyz = {},
				fnz = [],
				abc = params.map(( x ) => { 
					let current = [ typeof x, x.isData ],
						isThing = current.indexOf( true ) > -1,
						isFn = current.indexOf('function') > -1

					if( isThing ) xyz = x

					else if( isFn ) fnz.push( x )

					return ( isFn || isThing) // function or thangy
				})
				.reduce(( prev, current, index ) => {
					return prev && current
				}, true )

			if( abc ){
				fnz.forEach( fn => {
					xyz.on( CHANGE_EVENT, ( ...args ) => {
						// this.log('forwarded thing AND function')
						// console.dir( [...args] )
						// console.log('===================================================\n\n')
						fn.apply( this, [ ...args ] )
						this.emit( CHANGE_EVENT, this, ...args )
					})
				})
			}
		}
	}


	log( ...args ){
        return this.__data.log.apply( this, [ ...args ] )
	}

	get length(){
		return this.__data.length
	}

	get isData(){
		return true
	}

	get isThing(){
		return true
	}

	toObject(){
		// let _json = this.__data.toObject.call( this )
		let _json = this.__data.toObject()

		return _json
	}

	toJSON(){
		return this.__data.toJSON.call( this )
	}

	toString(){
		return ( this.name || this.constructor.name ) +'#'+ ( this.id || ( new Date() ).getTime() )
	}
}

let thing = new Thing()
window.thing = thing

export default Thing
