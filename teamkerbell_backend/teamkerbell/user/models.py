# models.py
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class BasicUser(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    email = models.CharField(null=False,max_length=50)
    password=models.CharField(null=False,max_length=50)
    nickname = models.CharField(null=False, max_length=50, default='Anonymous')
    phone =models.CharField(null=False, max_length=50, default="default_value")
    email = models.CharField(null=False, max_length=50, default="default_value")
    date = models.DateField(null=False, default=timezone.now)
    img = models.TextField(null=False, default="default_value")
    score = models.FloatField(null=False, default=36.5)


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
    id = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(BasicUser,related_name='tags',on_delete=models.CASCADE)
    count = models.IntegerField(null=False, default=0)
    num =models.IntegerField(null=False, default=0)

class Rude(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(BasicUser,related_name='rudes',on_delete=models.CASCADE)
    rudeness= models.CharField(null=True,max_length=300)
    isrude= models.BooleanField(null=True)
    reporter = models.ForeignKey(BasicUser,related_name='reporters',on_delete=models.CASCADE, null=True)

class Bookmark(models.Model):
    user=models.ForeignKey(BasicUser,related_name='bookmarks', null=False, on_delete=models.CASCADE)
    comp=models.ForeignKey('comp.Comp', null=False, on_delete=models.CASCADE)
    class Meta:
        unique_together = (('user','comp'),)



class MyLoginUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class LoginUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = MyLoginUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email