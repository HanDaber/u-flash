// import ANDROID_BINDINGS from './modules/android_bindings'
import Controller from './modules/controller'
import Resource from './modules/resource'
import Thing from './modules/thing'



let things = new Controller({ endpoint: 'things'})
things.on('change', ({ new_val }) => {
	console.log('change, { key: things, '+new_val+' }')
	// this.emit('change', { key: 'things', new_val })
})



class App extends Thing {

	constructor( config, modules = [] ){
		super( config )

		// this.things = things
		// this.things.on('change', ({ new_val }) => {
		// 	console.log('we in da app now ok?')
		// 	this.emit('change', { key: 'things', new_val })
		// })
	}

	init(){
		console.log('welcome to app')
	}
}

let app = new App({
		name: 'App'
	}
)

app.init()



export default app
