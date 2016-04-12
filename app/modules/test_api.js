import Remote from '../stores/Remote'
import { 
	TEST_API_URL,
	TEST_BACKEND_URL 
} from '../constants/AppConstants'

let test_api = new Remote({
	name: 'API',
	endpoints: {
		read: {
			resource: TEST_API_URL,
			query: '?',
			callback: function( res ){
				this.set('data', res.body ) 

				let be = new Remote({
					name: 'backend_stuff',
					endpoints: {
						read: {
							resource: TEST_BACKEND_URL,
							callback: resp => {
								this.set('_private_backend_stuff', resp.body )
							}
						}
					}
				})
				
				this.set('__B_E_', be )

				be.read( x => console.dir( x ) )
			}
		}
	},
	schema: {
		'Query String': {
			type: 'text',
			valid: '*'
		}
	}
})

export default test_api
