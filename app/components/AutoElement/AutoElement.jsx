import React from 'react'

class AutoElement extends React.Component {

	constructor( ...args ){
		super( ...args )
		this.state = {
			thing: this.props.thing,
			projection: this.props.projection
		}
	}

	getProjection(){
		let thing = this.state.thing,
			keys = this.state.projection || thing.__facade_keys,
			flabberghaster = keys.map( do_the_thing.bind( thing ) )

			function do_the_thing( key ){

				if( ['endpoints'].indexOf( key ) > -1 ) return ''

				let _key = key,
					_val = this[ _key ],
					_type = ( _val == null ? null : typeof _val )

				console.dir( _val )

				switch( _type ){

					case 'object':
						if( _val === null ) return ''
						
						else if( Array.isArray( _val ) ){
							let _ret = _val.map(( v, k, o ) => {
								return do_the_thing.call( o, k )
							})

							return (
								<div className={ _type }>
									{ _key+': ' }{ _ret }
								</div>
							)
						}

						else {
							let _obj = ( _val.isThing ? _val.toObject() : _val ),
								_type = ( _val.isThing ? 'thing' : 'object' ),
								_ret = []

							for( var inner_key of Object.keys( _obj ) ){
								let inner_val = _obj[ inner_key ]
								
								_ret.push( do_the_thing.call( _obj, inner_key ) )
							}

							return (
								<div className={ _type }>
									<dl>
										<dt>{ _key+': '}</dt>
										<dd>{ _ret }</dd>
									</dl>
								</div>
							)
						}
						break;

					// case 'function':
					// 	return <pre className={ _type }><span>{ _key+': '+_val }</span></pre>
					// 	break;

					case 'string':
						return <div className={ _type }><span>{ _key+': '+_val }</span></div>
						break;

					case 'number':
						return <div className={ _type }><span>{ _key+': '+_val }</span></div>
						break;

					case null:
						return <div className={ _type }><span>{ _key+': '+_val }</span></div>
						break;

					default:
						return ''
						break;
				}
			}

		return flabberghaster
	}

	render(){
		let _thing = this.state.thing

		return (
			<div id={ _thing.id } >
				{ this.getProjection() }
			</div>
		)
	}
}


export default AutoElement
