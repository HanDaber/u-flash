import BaseElement from '../Base/base'
import getTemplate from './flash.jade'
import uuid from 'uuid'
 
class FlashClass extends BaseElement {

	static default_duration = 1000

	constructor(){ super() }

    attachedCallback(){
        this._id = uuid.v4()

    	this.render()

        this.setAttribute('u-flash-id', this._id )
        this.classList.add('u-flash')

		this.onclick = evt => {
			this.fadeAndRemove()
			evt.stopPropagation()
		}

		let time = this.getFromTemplate('duration')
		setTimeout(() => this.fadeAndRemove(), ( time || FlashClass.default_duration ) )
    }

    render( data ){
		let tpl_vars = { body: this.innerHTML }

		this.template = this.buildTemplate( tpl_vars )

    	this.innerHTML = this.template
    }

    fadeAndRemove(){
        console.log('fadeAndRemove:')
        console.dir( this )
        this.classList.add('enable')

        let remove = ( id ) => {
            let r = document.querySelector('[u-flash-id="'+id+'"]')
            if( r ){
                let p = r.parentElement
                p.removeChild( r )
            }
        }

        PrefixedEvent( this, 'AnimationEnd', evt => {
            console.dir( evt )
            console.dir( this )
            remove( this._id )
        })
    }

	getTemplate( vars ){
		return getTemplate( vars )
	}
}
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}


export default FlashClass
