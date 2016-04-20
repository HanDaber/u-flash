# u-flash Experiment
#### Custom element that shows a message and then removes itself after a duration.

### Example:
##### 1) Include the JS (6KB gzipped)
```html 
<script src="http://d359icslfg5ozq.cloudfront.net"></script>
```

##### 2) Use the Element
```javascript
var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```
###### Full usage: ```<u-flash [ warning || error ] [ duration="5000"]>Message</u-flash>```

##### 3) (Optional) Hack it? (that's what I did!)
in node: ```npm run dev```
```javascript
import FlashClass from './components/Flash/flash'
// Define 'er
class MyFlash extends FlashClass {
    render( data ){
		let tpl_vars = { body: '<h1>I\'m <em>special</e> <pre>'+this.innerHTML+'!!</pre></h1>' }

		this.template = this.buildTemplate( tpl_vars )

		this.style.backgroundColor = '#f0a'
		this.style.color = '#fff'
		this.style.fontWeight = 'bold'

    	this.innerHTML = this.template
    }
}
// Register 'er
if( ! MyFlash.isRegistered('i-flash') ){
	window.Flash = document.registerElement('i-flash', MyFlash )
}
// Use 'er
var f = document.createElement('i-flash')
f.innerHTML = 'WEEE!'
f.setAttribute('duration', 12345 )
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```
*Removing the element relies on the animationend event from the CSS fade animation.
