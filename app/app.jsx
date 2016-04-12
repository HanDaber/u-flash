import './favicon.ico'
import './index.html'
import 'normalize.css/normalize.css'
import './scss/app.scss'

// import app from './app'

// import React from 'react'
// import UI from './components/App/App'
import jQuery from 'jquery'
import UI from './ui'

window.jQuery = jQuery
window.$ = jQuery

// React.render( <UI app={ app } />, document.getElementById('app') )
$('#app').html( UI )
