import React from 'react'
// import AutoElement from '../AutoElement/AutoElement'
import app from '../../app'

let MODULE = app.account.projects

class ProjectList extends React.Component {

	constructor( ...args ){
		super( ...args )
		this.state = {
			data: MODULE
		}
	}

	render(){
		let _thing = this.state.data,
			_data = _thing.get('data') || [],
			headers = [ 'Part_Number', 'Creation_Date', 'Engineer', 'ERF_Demand', 'MRP_Demand', 
						'BOM_TimeStamp', 'RevA_TimeStamp', 'IR2000', 'Drawing_Loaded_TimeStamp', 'Fair_Loaded_TimeStamp', 
						'PreviousDash_FAIR', 'PreviousDash_2000IR', 'PreviousDash_Purchase_History', 'Matgen_Class', 'Matgen_Category', 
						'Matgen_Noun', 'Matgen_Modifier_1', 'Matgen_Modifier_2', 'Cleaning_Requirement', 'Critical_Classification', 'CE' ],
			stuff = []

		window.thing = _thing

		let header_row = []
		headers.forEach( name => {
			header_row.push(<th>{ name }</th>)
		})
		let $header_row = <thead><tr>{ header_row }</tr></thead>

		let table_body = []
		_data.forEach( row => {
			let this_row = []
			headers.forEach( name => {
				this_row.push(<td>{ row[ name ] }</td>)
			})
			let $this_row = <tr>{ this_row }</tr>
			table_body.push( $this_row )
		})
		let $table_body = <tbody>{ table_body }</tbody>

		let $table = <table id="results">{ $header_row }{ $table_body }</table>

		return (
			<div className={ _thing.id } >
				{ $table }
			</div>
		)
	}
}


export default ProjectList
