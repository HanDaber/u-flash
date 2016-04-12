import { DEFAULT_RETURN_VALUE } from '../constants/AppConstants'

class BaseData extends Map {

	constructor( init_data ){

		console.log('BaseData')
		console.dir( init_data )

		super()

		if( init_data
		&& typeof init_data === 'object'){
			if( Array.isArray( init_data ) ){
				// Handle each item of init_data
				init_data.forEach(( item, index ) => this.set( index, item ) )
			}
			else {
				let k = Object.keys( init_data )
console.dir( this )
				k.forEach( key => this.set( key, init_data[ key ] ) )
			}
		}
	}

	log( stuff ){
        let style = 'color:orangered; font-family:"Lucida Console", Monaco, monospace; font-size:0.9em;'

        if ( ! stuff ) console.log('%c'+this+": %O: "+this.toJSON(), style, this )
        
        else console.log('%c'+this+': %O', style, stuff )
        
        return this
	}

	get length(){
		return this.size
	}

	get isData(){
		return true
	}

	dataWillChange( ...args ){
		return this
	}

	dataDidChange( ...args ){
		return this
	}

	// get( key ){
	// 	return Map.prototype.get.call( this, key )
	// }

	// Sets the value for the key in the Map object. Returns the Map object.
	set( key, val ){
		let _current = this.get( key ),
			old = ( typeof _current === 'object'
				? Object.create( _current )
				: _current
			) || DEFAULT_RETURN_VALUE,
			params = { key: key, old_val: old, new_val: val }

		this.dataWillChange('set', params )
		let setted = Map.prototype.set.apply( this, [ key, val ] )
		this.dataDidChange('set', params )
		return setted
	}
	
	// Removes any value associated to the key and returns the value that Map.prototype.has(value) would have previously returned. Map.prototype.has(key) will return false afterwards.
	delete( key ){
		let old = this.toJSON(),
			params = { key: key, old_val: old, new_val: undefined }

		this.dataWillChange('delete', params )
		let deleted = Map.prototype.delete.call( this, key )
		this.dataDidChange('delete', params )
		return deleted
	}

	// Removes all key/value pairs from the Map object.
	clear(){
		let params = { key: this }

		this.dataWillChange('clear', params )
		let cleared = Map.prototype.clear.call( this )
		this.dataDidChange('clear', params )
		return cleared // Returning Map.prototype defaults because we are not overriding ALL methods.
	}

	toObject(){
		let obj = {}
		function ABCDEFG( val, key ){
			if( val.isData ) obj[ key ] = val.toObject() 

			else if( typeof val === 'object'){
				if( Array.isArray( val ) ){
					let _temp = []

					val.forEach(function( inner_item, inner_index ){
						if( inner_item.isData ) _temp.push( inner_item.toObject() )

						else _temp.push( inner_item )
					})

					obj[ key ] = _temp
				}
				else {
					let _temp = {}

					Object.keys( val ).forEach(function( inner_key ){
						if( val[ inner_key ].isData ) _temp[ inner_key ] = val[ inner_key ].toObject()

						else _temp[ inner_key ] = val[ inner_key ]
					})
					obj[ key ] = _temp
				}
			}
			else obj[ key ] = val
		}

		this.forEach( ABCDEFG )
		return obj
	}

	toJSON(){
		return JSON.stringify( this.toObject(), null, 4 )
	}

    toString(){ return this.type || this.name || this.constructor.name }
}

let basedata = new BaseData()
window.basedata = basedata

export default BaseData
