// console.log('hoal desde la appp.js')
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TaskList from '././task/components/TaskList'

class App extends Component {
	// constructor(props) {
	// 	super(props)
	// }

	render() {
		return <div>
			<TaskList/>
		</div>
	}
}

ReactDOM.render(<App/>, document.getElementById('app'))