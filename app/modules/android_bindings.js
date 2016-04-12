let Android = window.Android || {
	showToast: function( string ){
		if( window.alert ) window.alert( string )
		else console.log( string )
	}
},
_export = {
	ANDROID_BINDINGS: {
		showAndroidToast: function( toast ){
        	Android.showToast( toast )
    	}
    }
}

window.ANDROID_BINDINGS = _export.ANDROID_BINDINGS

export default _export