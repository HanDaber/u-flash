import Thing from './stores/Thing' // Export to npm
import Remote from './stores/Remote'
import test_api from './modules/test_api'
import projects from './modules/projects'

import ANDROID_BINDINGS from './modules/android_bindings'


class User extends Thing {
	constructor( ...args ){
		super( ...args )
	}
}
let user = new User({ 
 	name: 'BOB',
 	balls: new Thing({ name: 'sckroatim', left: 'low', right: 'medium'})
})


let account = new Thing({ 
	name: 'account',
	user: user,
	projects: projects
})


class App extends Thing {

	constructor( config, modules = [] ){

		super( config )

		modules.forEach( thing => {
			// console.dir( thing )
			this.set( ( thing.name || ''+thing ), thing )
		})
	}

	init(){
		// test_api.read()
		projects.read()
	}
}

let app = new App({
		name: 'App',
		ok: 'cool',
		// api: test_api,
		account: account
	}
)

// Initialize remote data
app.init()


window.Thing = Thing
window.test_api = test_api
window.app = app


export default app
