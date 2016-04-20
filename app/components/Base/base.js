import 'document-register-element'
import getTemplate from './base.jade'
import './base.scss'

// shim for safari:
if( typeof HTMLElement !== 'function'){
    var _HTMLElement = function(){}
    _HTMLElement.prototype = HTMLElement.prototype
    HTMLElement = _HTMLElement
}

class BaseElement extends HTMLElement {

	static getTemplate = getTemplate

	static isRegistered = name => document.createElement( name ).constructor !== HTMLElement // check if this element is registered with the document

	constructor(){ super() }
	// Fires when an instance of the element is created.
	createdCallback(){}
    // Fires when an instance was inserted into the document.
    attachedCallback(){ this.render() }
    // Fires when an instance was removed from the document.
    detachedCallback(){}
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback( attr, oldVal, newVal ){}

    render(){
		let tpl_vars = { body: this.innerHTML }

		this.template = this.buildTemplate( tpl_vars )

		this.innerHTML = this.template
    }

	getFromTemplate( attribute ){ // <div aatribute="value"...
		let elems = document.querySelectorAll('['+attribute+']'),
			value = false

		for( var i = 0, l = elems.length; i < l; i++ ){
			if( value !== false ) break;

			let this_elem = elems[ i ],
				these_attrs = this_elem.attributes
			
			for( var j = 0, m = these_attrs.length; j < m; j++ ){
				let this_attr = these_attrs[ j ]
			
				if( this_attr.name === attribute ){
					value = this_attr.value
					break;
				}
			}
		}

		return value
	}

	buildTemplate( tpl_vars ){
		let getTemplate = ( typeof this.getTemplate == 'function' ? this.getTemplate : BaseElement.getTemplate )

		return getTemplate( tpl_vars )
	}

	isRegistered(){
		return BaseElement.isRegistered( this.constructor.name )
	}
}

export default BaseElement
