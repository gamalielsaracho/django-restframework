function tasksList() {
	// setTimeout(function(){
		$('#tasksList').html('')
		console.log('ssssssss')
		$.get('http://localhost:8000/api/v1/tasks/')
		.then(function(response) {
			console.log(response)
			response.map(function(i) {
				var task = '<div class="card">'+
					'<p class="text-left"><strong>Name: </strong>'+i.name+'</p>'+
					'<p class="text-left"><strong>Completed: </strong>'+i.completed+'</p>'+
					'<p class="text-left"><strong>Starts: </strong>'+i.starts+'</p>'+
					'<div class="btn-group" role="group" aria-label="Basic example">'+
					  '<button type="button" class="btn btn-outline-success btn-sm">Completed</button>'+
					  '<button data-id='+i.id+' type="button" class="btn btn-outline-info btn-sm edit">Edit</button>'+
					  '<button onclick="deleteTask('+i.id+')" type="button" class="btn btn-outline-danger btn-sm delete">Delete</button>'+
					'</div>'
				'</div>'+
				'<br/>'

				$('#tasksList').append(task)
			})

		})
		.catch(function (err) {
			console.log(err)
		})

		// tasksList()
	// }, 1000);
	
}

tasksList()

// (function poll(){
//    setTimeout(function(){
//       $.ajax({ url: "server", success: function(data){
//         //Update your dashboard gauge
//         salesGauge.setValue(data.value);

//         //Setup the next poll recursively
//         poll();
//       }, dataType: "json"});
//   }, 30000);
// })();

var id_task = null
$('div div div div').on('click', '.edit', function () {

	id_task = this.getAttribute("data-id")

	alert('El id es: '+id_task)
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/api/v1/tasks/'+id_task,
		// data:,
		success: function (data) {
			console.log(data)
			$('#name')[0].value = data.name
		},
		error: function(data) {
			console.log('Error',data)
		}
	})
})


function taskSave(e) {
	$('#formTask').on('submit', function (event) {
		event.preventDefault()

		var inputName = $('#name')[0].value
		
		var dataForm = {
			name: inputName,
			starts: 0
		}

		console.log('al ENVIAR EL FORM'+id_task)

		if (!id_task) {

			$.post('http://localhost:8000/api/v1/tasks/', dataForm)
			.then(function (response) {
				console.log(response)
			})
			.catch(function(error) {
				console.log(error)
			})
		} else {
			$.ajax({
				type: 'PUT',
				url: 'http://localhost:8000/api/v1/tasks/'+id_task+'/',
				data:dataForm,
				success: function (data) {
					console.log(data)
				},
				error: function(data) {
					console.log('Error',data)
				}
			})
		}

		inputName = ''
	})
}

taskSave()

function deleteTask(id) {
	$.ajax({
		type: 'DELETE',
		url:'http://localhost:8000/api/v1/tasks/'+id,
		// data: {  }
		success: function (data) {
			console.log(data)
		},
		error: function (data) {
			console.log('Error', data)
		}
	})
}