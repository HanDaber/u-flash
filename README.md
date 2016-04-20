# u-flash
### Custom 'Flash/Warning/Error' element that removes itself after a duration.

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
```html
<u-flash [duration="1000"] [warning||error]>Message!</u-flash>
```
```javascript
var frag = document.createDocumentFragment()

var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
f.setAttribute('duration', 2345 )
frag.appendChild( f )

document.body.insertBefore( frag, document.body.childNodes[ 0 ] )
```
