# models.py
from django.db import models
from django.utils import timezone

class BasicUser(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    email = models.CharField(null=False,max_length=50)
    password=models.CharField(null=False,max_length=50)
    nickname = models.CharField(null=False, max_length=50, default='Anonymous')
    phone =models.CharField(null=False, max_length=50, default="default_value")
    email = models.CharField(null=False, max_length=50, default="default_value")
    date = models.DateField(null=False, default=timezone.now)
    img = models.TextField(null=False, default="default_value")


class Resume(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    user = models.ForeignKey(BasicUser, related_name='resumes', on_delete=models.CASCADE)
    name = models.CharField(null=False,max_length=50)
    email = models.CharField(null=False,max_length=50)
    phone = models.CharField(null=False,max_length=50)
    tier = models.CharField(null=True,max_length=50)
    userIntro = models.CharField(null=True,max_length=500)
    skill = models.CharField(null=True,max_length=500)
    experience = models.CharField(null=True,max_length=500)
    githubLink = models.CharField(null=True,max_length=100)
    snsLink = models.CharField(null=True,max_length=200)
    city = models.CharField(null=True,max_length=20)
    dong = models.CharField(null=True,max_length=20)


class Tag(models.Model):
    id = models.IntegerField(primary_key=True, null=False)
    user = models.ForeignKey(BasicUser,related_name='tags',on_delete=models.CASCADE)
    count = models.IntegerField(null=False, default=0)

class Rude(models.Model):
    id = models.IntegerField(primary_key=True, null=False)
    user = models.ForeignKey(BasicUser,related_name='rudes',on_delete=models.CASCADE)
    rudeness= models.CharField(null=True,max_length=300)
    isrude= models.BooleanField(null=True)

class Bookmark(models.Model):
    user=models.ForeignKey(BasicUser,related_name='bookmarks', null=False, on_delete=models.CASCADE)
    comp=models.ForeignKey('comp.Comp', null=False, on_delete=models.CASCADE)
    class Meta:
        unique_together = (('user','comp'),)



