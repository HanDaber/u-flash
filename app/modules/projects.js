import Remote from '../stores/Remote'
import { API_URL } from '../constants/AppConstants'


class Project extends Remote {
	constructor( ...args ){
		super( ...args )
	}
}

class ProjectList extends Remote {
	constructor( ...args ){
		super( ...args )
	}
}

class RFI extends Remote {
	constructor( ...args ){
		super( ...args )
	}

	get schema(){
		return {
			importance: '',
			subject: '',
			files: {},
			question: '',
			answer: '',
			to: {
				name: '',
				company: '',
				address: '',
				phone: '',
				fax: '',
				email: ''
			},
			from: {
				name: '',
				company: '',
				address: '',
				phone: '',
				fax: '',
				email: ''
			}
		}
	}
}

let projects = new ProjectList({
	name: 'Projects',
	endpoints: {
		read: {
			resource: `${ API_URL }projects`,
			callback: function( res ){
				let self = this

				if( res 
				&& typeof res.body === 'object'){
					let project_data = res.body.map( p => {

						p.endpoints = {
							read: {
								resource: this.endpoints.read.resource+'/'+ p.id,
								callback: function( res ){
									this.set('documents', {
										request_for_information: new RFI({
											name: 'RFI #100'+p.id,
											date: ''+( new Date() ),
											data: res
										})
									})
								}
							}
						}

						let __project = new Project( p )

						return __project
					}),
					__projects = new Thing( project_data )

					this.set('data', __projects )
				}
			}
		}
	}
})
// projects.log()

export default projects
