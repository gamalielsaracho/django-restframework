"""todolist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

# to rest_framework
from django.conf import settings
from rest_framework.authtoken import views


urlpatterns = [
    path('', include('apps.frontend.urls', namespace='frontend')),
    path('admin/', admin.site.urls),
    # api/v1
    url(r'^api/v1/', include('apps.task.urls', namespace='task')),
]

urlpatterns += [
    url(r'^api/v1/auth', include('rest_framework.urls', namespace='rest_framework'))
]
