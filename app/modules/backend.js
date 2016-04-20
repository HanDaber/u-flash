import { API_URL, BACKEND_URL } from '../constants/AppConstants'

let backend_endpoint = ( str => { // Remove trailing slash
    if( str.substr( -1 ) === '/') return str.substr( 0, str.length - 1 )
    else return str
})( BACKEND_URL )

let DPD = require('dpd-js-sdk')( backend_endpoint ) // Backend API

export default DPD
