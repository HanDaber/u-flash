/*! @preserve dh process.env.APP_HASH */
import './index.html'
// import './favicon.ico'
// import 'normalize.css/normalize.css'
// import './scss/app.scss'

import FlashClass from './components/Flash/flash'
if( ! FlashClass.isRegistered('u-flash') ){
	window.Flash = document.registerElement('u-flash', FlashClass )
}

// class MyFlash extends FlashClass {
//     render( data ){
// 		let tpl_vars = { body: 'I\m special '+this.innerHTML+'!!' }

// 		this.template = this.buildTemplate( tpl_vars )

// 		this.style.backgroundColor = '#f0a'
// 		this.style.color = '#fff'
// 		this.style.fontWeight = 'bold'

//     	this.innerHTML = this.template
//     }
// }
// if( ! MyFlash.isRegistered('i-flash') ){
// 	window.Flash = document.registerElement('i-flash', MyFlash )
// }

// var f = document.createElement('i-flash')
// f.innerHTML = 'WEEE'
// f.setAttribute('duration', 12345 )
// document.body.insertBefore( f, document.body.childNodes[ 0 ] )