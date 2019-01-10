import React, { Component } from 'react'

class TaskForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			loading: false,
			error: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		const name = event.target.name;
      	const value = event.target.value;

		this.setState({ [name]: value })
	}

	handleSubmit(e) {
		e.preventDefault()

		console.log('handleSubmit ...')
		console.log(this.state)

		$.ajax({
			type: 'POST',
			url: 'http://localhost:8000/api/v1/tasks/',
			data: { name: this.state.name, starts: 0, completed: 0 },
			success: (response) => this.setState({ name: '', error:'' }),
			error: (response) => console.log('Error', response)
		})
	}

	render() {
		const { name, loading, error } = this.state

		return <div className='row'>
			<div className='col-lg-4'>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="bmd-label-floating">Task</label>
						<input type='text' 
							name='name'
							onChange={this.handleChange} 
							value={name}
							required
							className="form-control"/>
					</div>

					<button className='btn btn-raised btn-success btn-sm' type='submit'>Send</button>
				</form>
			</div>
		</div>
	}
}

export default TaskForm