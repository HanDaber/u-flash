// import backend from '../../modules/backend'
import DPD from 'dpd-js-sdk' // Backend API
import BaseElement from '../Base/base'
import jQuery from 'jquery'

let $ = jQuery

import getTemplate from './remote.jade'

let prettyJSON = data => JSON.stringify( data, null, 4 )

class RemoteItemClass extends BaseElement {
	constructor(){ super() }

	// static required_attributes = ['resource']
	// static optional_attributes = ['actions']
	// static possible_actions = ['read', 'update', 'destroy']

	// Fires when an instance of the element is created.
	createdCallback(){
		let str_resource = this.getResourceStringFromTemplate(),
			endpoint = this.getIdFromTemplate()

		// DPD don't do https
		if( str_resource.indexOf('https://') === 0 ) str_resource = str_resource.replace('https://', 'http://')

		let remote = DPD( str_resource )()

		this._id = endpoint || ''

		remote.endpoint = str_resource+( endpoint ? '/'+endpoint : '')
		this.remote = remote

		// this.template = this.buildTemplate()
	}
    // Fires when an instance was inserted into the document.
    attachedCallback(){
    	this.render()
    	// this.read()

		this.onclick = evt => {
			let action = $( evt.target ).attr('action')

			if( action && typeof this[ action ] === 'function'){
				this[ action ]()

				$( this ).find('nav button').removeClass('disabled').removeAttr('disabled')
				$( this ).find('nav button[action='+action+']').addClass('disabled').attr('disabled', 'disabled')

				evt.action = action
				$( this ).trigger('action', evt )

				evt.stopPropagation()
			} else if( action ) {
				let flash = document.createDocumentFragment(),
					err = document.createElement('x-flash')
				err.setAttribute('duration', 10*1000 )
				err.setAttribute('warning', true )
				err.innerHTML = 'NOT IMPLEMENTED'
				flash.appendChild( err )
				this.appendChild( flash )
			}
		}
    }
    // Fires when an instance was removed from the document.
    detachedCallback(){}
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback( attr, oldVal, newVal ){
    	console.dir( this )
    	console.log(`attributeChangedCallback( ${attr}, ${oldVal}, ${newVal} ) `)
    }

    render( data ){
		var tpl_vars,
			$el;
		if( data ){
			this.template = this.buildTemplate()
			$el = this.template

			console.dir( data )

			let str = prettyJSON( data, null, 4 ),
				$tmp = $('<pre>'+str+'</pre>')

			$el.find('.body').html( $tmp )
		} else {
			tpl_vars = { body: this.innerHTML }
			this.template = this.buildTemplate( tpl_vars )
			$el = this.template
		}

		// jQuery.extend( [deep ], target, object1 [, objectN ] )
    	$( this ).html( $el )
    	// this.innerHTML = this.template.html()
    }

    // getProjection( data, projector ){
    // 	return ''
    // }

    read(){
    	console.dir( this )
    	let remote = this.remote

		// remote.get({ id: false }, items => { // test if resource exists
		// 	console.dir( items )
		// 	if( ! items.status ){
				let handleData = ( data ) => { // test if endpoint/id exists
					console.dir( data )
					if( ! data.status ){
						this.render( data )
					} else {
						let flash = document.createDocumentFragment(),
							err = document.createElement('x-flash')
						err.setAttribute('duration', 10*1000 )
						err.setAttribute('error', true )
						err.innerHTML = prettyJSON( data )
						flash.appendChild( err )
						this.appendChild( flash )
					}
				}

				if( this._id === ''){
					remote.get( handleData )
				}
				else {
					remote.get({ id: this._id }, handleData )
				}
			// } else { console.error( items ) }
		// })
    }
    update(){}
    destroy(){}

	getResourceStringFromTemplate(){
		var $buh = $( this ).filter(function(){
		    return $( this ).attr('resource')
		}).first(),
			resource = $buh.attr('resource') || ''

		if( resource.indexOf('http://') !== 0 && resource.indexOf('https://') !== 0 ){ // resource doesn't start with http[s]
			if( window.location.protocol.indexOf('file:') !== 0 ) resource = window.location.protocol+'//'+resource
			else resource = 'http://'+resource
		}

		return resource
	}

	getActionsFromTemplate(){
		var $buh = $( this ).filter(function(){
		    return $( this ).attr('actions')
		}).first(),
			actions = $buh.attr('actions') || ''

		return actions.split(' ')
	}

	getIdFromTemplate(){
		var $buh = $( this ).filter(function(){
		    return $( this ).attr('id')
		}).first()

		return $buh.attr('id')
	}

	buildTemplate( tpl_vars ){
		let getTemplate = ( typeof this.getTemplate == 'function' ? this.getTemplate : RemoteItemClass.getTemplate )
		let tpl = getTemplate( tpl_vars ),
			$tpl = $( tpl )

		var allowed_actions = this.getActionsFromTemplate()
		if( allowed_actions[ 0 ] !== '*') $tpl.find('button').each(function(){
			let action = $( this ).attr('action')
			if( allowed_actions.indexOf( action ) < 0 ){ // its not in there
				$( this ).remove()
			}
		})

		return $tpl
	}

	getTemplate( vars ){
		return getTemplate( vars )
	}
}



export default RemoteItemClass
// export var RemoteItemClass = RemoteItemClass
// export var RemoteItem = document.registerElement('remote-item', RemoteItemClass )
