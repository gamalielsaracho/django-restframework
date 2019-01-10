from django.shortcuts import get_object_or_404, render
from rest_framework.views import status
from rest_framework import generics
from rest_framework.response import Response

from apps.task.serializers import TaskSerializer
from apps.task.models import Task

from django.http import HttpResponse
# Create your views here.

# root.
# def indexHome(request):
# 	return render(request, 'index.html')

# APIView
class TaskList(generics.ListCreateAPIView):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer

	def post(self, request, *args, **kwargs):
		print('request.data[completed] -------------')

		print(request.data['completed'])

		a_task = Task.objects.create(
			name=request.data['name'],
			completed=request.data['completed'],
			starts=request.data['starts']
		)

		return Response(
			data=TaskSerializer(a_task).data,
			status=status.HTTP_201_CREATED
		)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer

	def get(self, request, *args, **kwargs):
		try:
			pk = self.kwargs.get('pk', 0)

			a_task = self.queryset.get(pk=kwargs['pk'])
			return Response(TaskSerializer(a_task).data)
		except Task.DoesNotExist:
			return Response(
				data = {
					'message': 'Task with id: {} does not exist'.format(kwargs['pk'])
				},
				status=status.HTTP_404_NOT_FOUND
			)


	def put(self, request, *args, **kwargs):
		try:
			a_task = self.queryset.get(pk=kwargs["pk"])
			serializer = TaskSerializer()
			updated_task = serializer.update(a_task, request.data)
			return Response(TaskSerializer(updated_task).data)
		except Task.DoesNotExist:
			return Response(
				data={
					"message": "Song with id: {} does not exist".format(kwargs["pk"])
				},
				status=status.HTTP_404_NOT_FOUND
			)

	def delete(self, request, *args, **kwargs):
		try:
			a_task = self.queryset.get(pk=kwargs["pk"])
			a_task.delete()
			return Response(status=status.HTTP_204_NO_CONTENT)
		except Task.DoesNotExist:
			return Response(
				data={
					"message": "Song with id: {} does not exist".format(kwargs["pk"])
				},
				status=status.HTTP_404_NOT_FOUND
			)

# class TaskDetail(generics.RetrieveAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer