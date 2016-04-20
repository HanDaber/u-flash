# u-flash
## Custom 'Flash' message element. 
```html 
<script src="js/app.<%= version %>.js"></script>
```
or
```javascript
var s = document.createElement('script')
s.type = 'text/javascript'
s.src = 'js/app.<%= version %>.js'
b.appendChild( s )
```
and then 
```javascript
var frag = document.createDocumentFragment()

var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
f.setAttribute('duration', 2345 )
frag.appendChild( f )

document.body.insertBefore( frag, document.body.childNodes[ 0 ] )
```
or
```javascript
$('body').append('<u-flash warning duration="1234">POOP</u-flash>')
```