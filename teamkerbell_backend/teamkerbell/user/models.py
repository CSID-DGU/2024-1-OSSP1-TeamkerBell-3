# models.py
from django.db import models

class BasicUser(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    email = models.CharField(null=False,max_length=50)
    password=models.CharField(null=False,max_length=50)
    nickname = models.CharField(null=False, max_length=50, default='Anonymous')
