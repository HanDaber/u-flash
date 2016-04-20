# u-flash
### Custom 'Flash/Warning/Error' element that removes itself after a duration.
##### Usage:
```html 
<script src="http://d359icslfg5ozq.cloudfront.net"></script>
```
or
```javascript
var s = document.createElement('script')
s.type = 'text/javascript'
s.src = 'http://d359icslfg5ozq.cloudfront.net'
b.appendChild( s )
```

and then 
```html
<u-flash [duration="1000"] [warning||error]>Message!</u-flash>
```
or
```javascript
var f = document.createElement('u-flash')
f.innerHTML = 'Click me and I go away!'
f.setAttribute('duration', 2345 )
document.body.insertBefore( f, document.body.childNodes[ 0 ] )
```
