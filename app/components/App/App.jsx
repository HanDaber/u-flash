import './_App.scss'

import React from 'react'
import ProjectList from '../ProjectList/ProjectList'

export default class App_UI extends React.Component {

	constructor( ...args ){
		super( ...args )
		this.state = {
			app: this.props.app
		}
	}

	componentDidMount(){
		app.addChangeListener( this.onChange.bind( this ) )
	}

	componentWillUnmount(){
		app.removeChangeListener( this.onChange.bind( this ) )
	}

	onChange( ...args ){
		let app = this.state.app,
			style = 'color: orange'

		let print = string => console.log('%c'+string, style )

		print('%cApp_UI change', style )
		print('this')
		console.dir( this )
		print('args')
		console.dir( args )
		print('app main:')
		console.dir( app )
		print('===================================================\n\n')

		this.setState({ app: app })
	}

	render() {
		var _app = this.state.app,
			test = _app.api.test,
			entries = _app
				? _app.makeIterable()
				: ['a', 'b']

		console.dir( entries )

		return (
			<div className={'app this-is-the-app'} >
				<div className="main-pane">
					<ProjectList />
				</div>
			</div>
		)
	}
}
