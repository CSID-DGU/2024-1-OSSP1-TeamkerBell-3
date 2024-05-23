from django.db import models
from django.utils import timezone


# Create your models here.

class Team(models.Model):
    id = models.AutoField(primary_key=True,null=False)
    comp = models.ForeignKey('comp.Comp', related_name= 'teams', on_delete=models.SET_NULL, null=True)
    recruitNum=models.IntegerField(null=False, default=0)
    startDate=models.DateField(null=False, default=timezone.now)#생성날짜
    leader=models.ForeignKey('user.BasicUser', related_name='teams',on_delete=models.SET_NULL, null=True)
    endVote =models.IntegerField(null=False, default=0)
    isRandom=models.BooleanField(null=False, default=False)
    isDone=models.BooleanField(null=False, default=False)
    repository = models.CharField(null=False, max_length=100, default="http://github.com")

class TeamMate(models.Model):
    resume = models.ForeignKey('user.Resume', related_name='teammates', on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey('user.BasicUser', related_name="teammates", on_delete=models.CASCADE)
    team = models.ForeignKey(Team, related_name="teammates", on_delete=models.CASCADE)
    isTeam=models.BooleanField(null=False, default=False)
    role=models.CharField(null=False, default="role")
    class Meta:
        unique_together = (('resume','user','team'),)

class ChooseTeam(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    comp = models.ForeignKey('comp.Comp', related_name= 'chooseteams', on_delete=models.SET_NULL, null=True)
    name = models.CharField(null=False, max_length=255,default="default_value")
    startDate = models.CharField(null=False, max_length=50, default='0')#프로젝트시작날짜
    intro = models.TextField(null=False, default="default_value")
    method = models.CharField(null=False, max_length=50, default="default_value")
    language = models.CharField(null=False, max_length=50, default="default_value")
    qualification = models.TextField(null=False, default="default_value")
    class Meta:
        unique_together = (('team','comp'),)


class TeamRole(models.Model):
    role=models.CharField(null=False, max_length=50)
    team = models.ForeignKey(Team, related_name="teamroles", on_delete=models.CASCADE)
    recruitNum = models.IntegerField(null=False, default=0)
    num= models.IntegerField(null=False, default=0)
    class Meta:
        unique_together = (('role','team'),)

class Schedule(models.Model):
    id=models.AutoField(primary_key=True, null=False)
    team = models.ForeignKey(Team, related_name="schedules", null=False, on_delete=models.CASCADE)
    startDate = models.CharField(null=False, max_length=50, default="default_value")
    endDate = models.CharField(null=False, max_length=50, default="default_value")
    schedule = models.CharField(null=False, max_length=255, default="default_value")

class OutReason(models.Model):
    id=models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey('user.BasicUser',related_name="reasons",on_delete=models.SET_NULL, null=True)#유저 아이디, 시리얼라이즈 작성을 위해 user가 아닌 id로 설정
    team =models.ForeignKey(Team, related_name="reasons", on_delete=models.SET_NULL, null=True)
    isKick=models.BooleanField(null=False, default=False)
    reason = models.TextField(null=False, default="default_value")

class TeamEndVote(models.Model):
    team = models.ForeignKey(Team, related_name="teamendvotes", on_delete=models.CASCADE, null=False)
    user = models.ForeignKey('user.BasicUser',related_name="teamendvotes",on_delete=models.CASCADE, null=False)

class PreviousWinning(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    img = models.TextField(null=True)
    comp = models.ForeignKey('comp.Comp', related_name= 'previouswinnings', on_delete=models.SET_NULL, null=True)
    title= models.CharField(null=False, max_length=100, default="default_value")
    interview = models.TextField(null=False)
