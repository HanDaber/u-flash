# u-flash
#### Custom element that shows a message and then removes itself after a duration.

### Example:
##### Include the JS (6KB gzipped)
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

##### Add the element like you would any other, for example after an ajax call
```html
$('body').prepend('<u-flash duration="1000">Message!</u-flash>')
```
or
```javascript
var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
f.setAttribute('duration', 2345 )
f.setAttribute('warning', true )
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```
