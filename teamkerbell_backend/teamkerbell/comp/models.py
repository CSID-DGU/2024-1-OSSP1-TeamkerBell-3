from django.db import models

# Create your models here.
class Comp(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    name=models.CharField(null=True,max_length=225)
    startDate=models.CharField(null=True,max_length=225)
    endDate=models.CharField(null=True,max_length=225)
    organization=models.CharField(null=True,max_length=225)
    eligibillty=models.TextField(null=True)
    applicationMethod=models.TextField(null=True)
    context=models.TextField(null=True)
    reward=models.TextField(null=True,max_length=225)
    contact=models.TextField(null=True)
    link=models.CharField(null=True,max_length=225)
    img=models.TextField(null=True)
