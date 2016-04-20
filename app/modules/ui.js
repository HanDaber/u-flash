import $ from 'jquery'

let getTime = () => {
	let d = new Date()
	return d
}



class UI extends $ {
	constructor( module, renderFunction, template = '<div />'){
		super( template )

		this.updated = false
		
		console.dir( this )

		module.on('change', ({ new_val }) => {
			this.updated = getTime()
			renderFunction( this, new_val )
		})
	}
}

export default UI