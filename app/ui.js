import app from './app'
import $ from 'jquery'
import UI from './modules/ui'
import getTemplate from './ui.jade'

let MODULE = app.things,
	template = getTemplate({ name: 'things'})

console.dir( template )

let renderFn = ( container, data ) => {
	let $container = container.find('.ui-contents'),
		_data = data || [],
		$table = $('<table />', { id: 'results', class: 'table table-striped table-bordered'}),
		headers = [ 'D', 'E', 'F' ]

	let $table_header = $('<thead />')
	let $header_row = $('<tr />')
	headers.forEach( name => {
		$header_row.append('<th>'+name+'<div class="show-color '+name+'""> </div></th>')
	})
	$table_header.append( $header_row )

	let $table_body = $('<tbody />')
	_data.forEach( row => {
		let $this_row = $('<tr />')
		headers.forEach( name => {
			let value = row['butt'],
				d_value = false

			try { 
				d_value = parseInt( value ) 
				if( ! isNaN( d_value ) && value > 1 ) value = new Date( d_value )
			} catch ( e ) {
				console.error( e )
			}
			$this_row.append('<td class="'+name+' '+( ( value == null || value == 'N' || value == ' ') ? 'pending' : value )+'">'+value+'</td>')
		})
		$table_body.append( $this_row )
	})

	let $table_footer = $('<tfoot />')
	let $footer_row = $('<tr />')
	$footer_row.append('<td colspan="'+headers.length+'"><div>'+container.updated+'</div></td>')
	$table_footer.append( $footer_row )

	$table.html()
	$table.append( $table_header, $table_body, $table_footer )

	$container.html( $table )

	$( window ).trigger('render') // triggers script in index.html
}



let $UI = new UI( MODULE, renderFn, template )

export default $UI
