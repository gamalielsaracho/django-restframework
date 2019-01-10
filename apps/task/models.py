from django.db import models

# Create your models here.

class Task(models.Model):
	name = models.CharField(max_length=255)
	# completed = models.BooleanField(default=False)
	completed = models.IntegerField(default=0)
	starts = models.IntegerField(default=0)