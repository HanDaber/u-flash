import Thing from './stores/Thing' // Export to npm
import { EBS_API_URL } from './constants/AppConstants'

var main = new Thing({
	endpoint: EBS_API_URL,
	onRemoteGet: ( res, self ) => {
		console.dir( res )
		self.set('response', res.body ) 
	}
})

// Example:
// main.addChangeListener(( event ) => { console.dir( this );console.dir( event ) })[ .bind( something ) ]

// Initialize remote data
main.remote.get()

window.Thing = Thing
window.main = main

export default main
