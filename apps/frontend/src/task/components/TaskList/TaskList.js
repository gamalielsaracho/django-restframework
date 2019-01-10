import React, { Component } from 'react'
import $ from 'jquery'

import TaskForm from '../TaskForm'

class TaskList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			tasks: []
		}
		this.renderTaskList = this.renderTaskList.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.completed = this.completed.bind(this)
		this.apiUrl = 'http://localhost:8000/api/v1/tasks'
	}
	 poll() {
			// body...
			$.ajax({
				// type: 'GET',
				url: this.apiUrl,
				success: (response) => {
					console.log(response)
					this.setState({ loading: false, tasks: response })
				},
				error: (response) => console.log('Error', response),
				dataType: 'json',
				complete: () => this.poll(),
				timeout: 30000 
			})
	}

	componentDidMount() {
		this.setState({ loading: true })
		var n = 0

		this.poll()
	}

	componentWillUnmount() {
		console.log('unmounted')
		// clearInterval(this.poll)
	}

	changeStyleTaskCompleted(i) {

		if (i.completed) {
			return <strike><h4>{ i.name }</h4></strike>
		} else {
			return <h4>{ i.name }</h4>
		}
	}

	renderTaskList(tasks) {
		return <div className='container'>
			<h1 className='text-center'>Todo list</h1>
			<TaskForm/>
			{
				tasks.map((i) => {
					return <div className='row centered'>
						<div className='col-lg-4 card' key={i.id}>
							{ this.changeStyleTaskCompleted(i) }
							<div className="btn-group">
								<button onClick={ () => this.deleteTask(i.id) } type="button" className="btn btn-raised btn-danger btn-sm">Delete</button>
								<button onClick={ () => this.completed(i.id) } type="button" className="btn btn-raised btn-info btn-sm">Completed</button>
							</div>
						</div>
					</div>
				})
			}
		</div>
	}

	deleteTask(id) {
		$.ajax({
			type: 'DELETE',
			url:`${this.apiUrl}/${id}`,
			success: (response) => console.log(response),
			error: (response) => console.log('Error', response)
		})
	}

	completed(id) {
		$.ajax({
			type: 'PUT',
			url: `${this.apiUrl}/${id}/`,
			data: { completed: 1 },
			success: (response) => console.log(response),
			error: (response) => console.log(response)
		})
	}

	render() {
		const { loading, tasks } = this.state
		if(loading) {
			return <div>
				<h2 className='text-center'>Cargando...</h2>
			</div>
		} else {
			return this.renderTaskList(tasks)
		}
	}
}

export default TaskList