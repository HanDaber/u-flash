import BaseElement from '../Base/base'
import getTemplate from './flash.jade'
 
class FlashClass extends BaseElement {

	static default_duration = 1000

	constructor(){ super() }

    attachedCallback(){
        this._id = Math.floor( ( new Date() ).getTime()*3.14159 ) // for retreival

    	this.render()

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

        this.setAttribute('u-flash-id', this._id )

    	this.innerHTML = this.template
    }

    fadeAndRemove(){
        PrefixedEvent( this, 'AnimationEnd', evt => {
            console.dir( evt.animationName )
            let r = document.querySelector('[u-flash-id="'+this._id+'"]'),
                p = r.parentElement
            p.removeChild( r )
        })
        this.classList.add('enable')
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
