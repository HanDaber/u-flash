import Thing from './thing'
import backend from './backend'



let getTime = () => {
		let d = new Date()
		return d.getTime()
	}



class Resource extends Thing {

	constructor( config ){

		config.id = '/'+config.id

		super( config )

		if( ! config.endpoint ) throw 'Exception: Resource requires an endpoint.'+this;
		if( ! config.id ) throw 'Exception: Resource requires an id.'+this;

		this.updated = false

		// Prettify JSON output (make methods non-enumerable)
		Object.defineProperties( this, {
			remote: {
				value: backend(`/${ this.config.endpoint }${ this.config.id }`),
				writeable: false,
				configurable: false,
				enumerable: false
			}
		})

		this.on('change', evt => {
			this.updated = getTime()
		})
	}

	init(){
		if( ! this.updated ) this.getData()
	}

	getData( then ){
		console.log(''+this+'.getData()')
		if( this.remote ) this.remote.get( data => {
			console.log('getData() got data')

			// data.endpoint = `${ this.config.endpoint }${ this.config.id }`

			if( then && typeof then == 'function') then( data )

			this.data = data
			// this.data = new Resource( data )
		})
	}
	setData( data ){
		console.dir( this )
		if( this.remote ) this.remote.put( data, res => {
			console.log('setData() got res')
			console.dir( res )
		})
	}

	toString(){
		return this.constructor.name+'#'+this.endpoint+this._id
	}
}


export default Resource
