# u-flash Experiment
#### Custom element that shows a message and then removes itself after a duration.

### Example:
##### 1) Include the JS (6KB gzipped):
like
```html 
<script src="http://d359icslfg5ozq.cloudfront.net"></script>
```
or
```javascript
var s = document.createElement('script')
s.type = 'text/javascript'
s.src = 'http://d359icslfg5ozq.cloudfront.net'
document.body.appendChild( s )
```

##### 2) Use it, for example after an ajax call?
with jQuery
```html
$('body').prepend('<u-flash duration="1000">Message!</u-flash>')
```
or vanilla
```javascript
var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
f.setAttribute('duration', 2345 )
f.setAttribute('warning', true )
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```

##### 3) (Optional) Hack it? (That's what I did)
in node: ```npm run dev```
```javascript
import FlashClass from './components/Flash/flash'
class MyFlash extends FlashClass {
    render( data ){
		let tpl_vars = { body: 'I\m special '+this.innerHTML+'!!' }

		this.template = this.buildTemplate( tpl_vars )

		this.style.backgroundColor = '#f0a'
		this.style.color = '#fff'
		this.style.fontWeight = 'bold'

    	this.innerHTML = this.template
    }
}
// Register your new element
if( ! MyFlash.isRegistered('i-flash') ){
	window.Flash = document.registerElement('i-flash', MyFlash )
}
// Use 'er
var f = document.createElement('i-flash')
f.innerHTML = 'WEEE'
f.setAttribute('duration', 12345 )
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```
*Removing the element relies on the animationend event from the CSS fade out.
