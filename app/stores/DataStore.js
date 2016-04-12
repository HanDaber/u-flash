import { EventEmitter } from 'events'
// import BaseData from './BaseData'
import BaseData from './Base'

import {
	ITEMS_UPDATED,
	ITEMS_GET_SUCCESS,
	CHANGE_EVENT,
	CLEAR_EVENT
} from '../constants/AppConstants'

class DataStore extends BaseData {

	constructor( init_data ){
		super( init_data )

		Object.defineProperty( this, '__events', {
			value: new EventEmitter(),
			writeable: false,
			configurable: true
		})
	}

	dataWillChange( event_type, event_data ){
		let key = event_data.key

		if( event_type === 'delete') delete this[ key ]

		else if( event_type === 'set'){
			Object.defineProperty( this, key, {
				value: event_data.new_val,
				writeable: false,
				configurable: true
			})
		}

		return this
	}

	dataDidChange( type, data ){
		if( this.__events ) this.emitChange( data )
		return this
	}

	emit( ...args ){ return this.__events.emit( ...args ) }
	on( ...args ){ return this.__events.on( ...args ) }
	off( ...args ){ return this.__events.removeListener( ...args ) }

	emitChange( ...args ){
		this.emit( CHANGE_EVENT, ...args )
	}

	addChangeListener( callback ){
		this.on( CHANGE_EVENT, callback.bind( this ) )
	}

	removeChangeListener( callback ){
		this.off( CHANGE_EVENT, callback )
	}
}

let store = new DataStore()
window.store = store

// export default store
export default DataStore
