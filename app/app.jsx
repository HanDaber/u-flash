/*! @preserve dh process.env.APP_HASH */
import './index.html'
import './favicon.ico'
import 'normalize.css/normalize.css'
import './scss/app.scss'

import FlashClass from './components/Flash/flash'
if( ! FlashClass.isRegistered('u-flash') ){
	window.Flash = document.registerElement('u-flash', FlashClass )
}
