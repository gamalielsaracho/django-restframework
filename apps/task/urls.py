from django.conf.urls import url
from apps.task.views import TaskList, TaskDetail
from django.urls import path

app_name = 'task'

urlpatterns = [
	url(r'^tasks/$', TaskList.as_view(), name='tasks_list_api'),
	url(r'^tasks/(?P<pk>\d+)/$', TaskDetail.as_view(), name='task_detail')
]