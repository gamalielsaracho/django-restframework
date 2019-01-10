from rest_framework.serializers import ModelSerializer

from apps.task.models import Task

# Esto nos va a poder permitir traducir la información que guarda django
# que son los objetos a un json o xml. 
class TaskSerializer(ModelSerializer):

	class Meta:
		model = Task
		# que campos vamos a mostrar.
		fields = ('id', 'name', 'completed', 'starts')
		# fields = '__all__'