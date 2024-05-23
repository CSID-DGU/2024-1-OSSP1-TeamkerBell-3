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
    theme=models.CharField(null=False, max_length=100, default="")

class RandomMatching(models.Model):
    comp=models.ForeignKey(Comp, related_name="randommatchings",null=False, on_delete=models.CASCADE)
    user=models.ForeignKey('user.BasicUser', related_name="randommatchings", null=False, on_delete=models.CASCADE)
    city = models.CharField(null=False, max_length=50, default="default_value")
    dong = models.CharField(null=False, max_length=50, default="default_value")
    isLeader = models.BooleanField(null=False, default=False)
    role = models.CharField(null=False, max_length=50)
    recruitNum = models.IntegerField(null=False, default=0)

class CompReview(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    review=models.TextField(null=False, default="default_value")
    comp = models.ForeignKey(Comp, related_name="compreviews", null=False, on_delete=models.CASCADE)
    