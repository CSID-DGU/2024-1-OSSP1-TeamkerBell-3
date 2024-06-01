from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .models import PreviousWinning, Team, TeamEndVote, TeamRole, TeamMate, OutReason, FinalCheck, Schedule, ChooseTeam
from .serializers import RoleListSerializer, TeamforMainSerializer, PreviousWinningSerializer,ScheduleAndCommitSerializer, ScheduleSerializer,TeamMateSerializer, ResumeAndRoleAndImgSerializer,  MemberListSerializer, ReportSerializer, KickAndRunSerializer, CombinedSerializer, IdSerializer, PlusMatchingSerializer, ScoreTagSerializer, ImprovementSerializer, ReviewSerializer
from comp.models import RandomMatching, CompReview, Comp
from user.models import BasicUser, Resume, Tag, Rude
import random
from django.db import transaction
from user.decorator import login_required
from comp.serializers import CompSerializer
# Create your views here.




@swagger_auto_schema(method='get', tags=["일정 및 커밋 진행사항 보기"])
@swagger_auto_schema(methods=['post'], request_body=ScheduleAndCommitSerializer, tags=["일정정보 및 깃허브 레포 주소 전송하기"])
@api_view(['GET', 'POST'])

@transaction.atomic
def teamScheduleAndCommit(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='GET':
        schedule = team.schedules.all()
        serializer = ScheduleSerializer(schedule, many=True)
        repository = team.repository
        return Response({"scheduleList": serializer.data, "repository": repository})
    elif request.method == 'POST':
        serializer = ScheduleAndCommitSerializer(data=request.data) 
        if serializer.is_valid():
            scheduledata = serializer.validated_data.get('schedule')
            repository = serializer.validated_data.get('repository')
            if scheduledata:
                scheduleList=[scheduledata]          
                for schedule in scheduleList:
                    schedule_serializer = ScheduleSerializer(data = schedule)
                    if schedule_serializer.is_valid():
                        schedule_serializer.save(team=team)
                    else:
                        return Response(schedule_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
               
            if repository:
                team.repository = repository
                team.save()
            return Response({'message': 'schedule and commit date saved successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='get', tags=["팀원 이력서 정보 보기"])
@api_view(['GET'])

def teamMateList(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='GET':
        #랜덤매칭의 경우 이력서가 없음
        if team.isRandom == False:
            teammateList = team.teammates.filter(isTeam=True)
            resume_list = [teammate.resume for teammate in teammateList]
            serializer = ResumeAndRoleAndImgSerializer(resume_list, many=True,  context={'team': team})
            return Response(serializer.data)
        else:
            teammateList = team.teammates.filter(isTeam=True)
            serializer = TeamMateSerializer(teammateList, many=True)
            return Response(serializer.data)

@swagger_auto_schema(method='get', tags=["팀원 목록(상호평가 창)"])
@swagger_auto_schema(methods=['post'], request_body=CombinedSerializer, tags=["상호평가 전송"])
@api_view(['GET', 'POST'])

@transaction.atomic
def mutualReview(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)  
    if request.method == 'GET':
        #팀원의 수와 반대투표수가 같은 경우
        if TeamMate.objects.filter(team=team, isTeam=True).count() == TeamEndVote.objects.filter(team=team).count():
            teammates = team.teammates.filter(isTeam=True)
            users = [teammate.user for teammate in teammates]
            serializer = MemberListSerializer(users, many=True)
            return Response({"memberList":serializer.data, "isEnd":True})
        else:
            return Response({"isEnd": False})
    elif request.method == 'POST':
        serializer = CombinedSerializer(data=request.data)
        if serializer.is_valid():
        # 유효성 검증이 성공한 경우의 로직 처리
            improvement_serializerList =  ImprovementSerializer(data=request.data.get('improvements'), many=True)  
            if improvement_serializerList.is_valid():
                for improvement_serializer in improvement_serializerList.data:
                    improvement = ImprovementSerializer(data=improvement_serializer)
                    if improvement.is_valid():
                        user = BasicUser.objects.get(id=improvement.validated_data['id'].id)
                        reporter = BasicUser.objects.get(id=improvement.validated_data['reporter'].id)
                        if FinalCheck.objects.filter(user=user,reporter=reporter,team=team).exists():
                            return Response({'message': 'report already saved '},status=status.HTTP_400_BAD_REQUEST)
                        else:
                            rude = Rude(user=user, rudeness=improvement.validated_data['improvement'], isrude=False, reporter=reporter)
                            rude.save()
            score_serializerList=ScoreTagSerializer(data=request.data.get('score_tags'), many=True)
            if score_serializerList.is_valid():
                for score_serializer in score_serializerList.data:
                    score = ScoreTagSerializer(data=score_serializer)
                    if score.is_valid():
                        total = (score.validated_data['participation'] + score.validated_data['contribution'] + score.validated_data['attitude'])/3
                        if(total>=5):
                            user=BasicUser.objects.get(id=score.validated_data['id'].id)
                            user.score+=0.3
                        elif(total>=4):
                            user=BasicUser.objects.get(id=score.validated_data['id'].id)
                            user.score+=0.1
                        elif(total>=3):
                            pass
                        elif(total>=2):
                            user=BasicUser.objects.get(id=score.validated_data['id'].id)
                            user.score-=0.1
                        elif(total>=1):
                            user=BasicUser.objects.get(id=score.validated_data['id'].id)
                            user.score-=0.3
                        user.save()
                        tags = score.validated_data['tag']
                        for tag in tags:
                            try:
                                maketag=Tag.objects.get(user=user.id, num=tag)
                            except Tag.DoesNotExist:
                                newTag=Tag(user=user, num=tag, count=0)
                                newTag.save()
                                maketag=Tag.objects.get(user=user.id, num=tag)
                            maketag.count+=1
                            maketag.save()
            review = ReviewSerializer(data=serializer.validated_data.get('review'))
            if review.is_valid():
                compreview=CompReview(review=review.validated_data['review'], comp=team.comp)
                compreview.save()
            improvement_serializerList =  ImprovementSerializer(data=request.data.get('improvements'), many=True)  
            if improvement_serializerList.is_valid():
                for improvement_serializer in improvement_serializerList.data:
                    improvement = ImprovementSerializer(data=improvement_serializer)
                    if improvement.is_valid():
                        user = BasicUser.objects.get(id=improvement.validated_data['id'].id)
                        reporter = BasicUser.objects.get(id=improvement.validated_data['reporter'].id)
                        FinalCheck(user=user, reporter=reporter, team=team).save()  
            if FinalCheck.objects.filter(team=team).count() == team.recruitNum*(team.recruitNum-1):
                TeamMate.objects.filter(team=team).delete()
                TeamRole.objects.filter(team=team).delete()
                Schedule.objects.filter(team=team).delete()
                TeamEndVote.objects.filter(team=team).delete()
                FinalCheck.objects.filter(team=team).delete()
                ChooseTeam.objects.filter(team=team).delete()
                team.leader = None
                team.save()
            return Response({'message': 'review saved successfully'},status=status.HTTP_200_OK)
        else:
        # 유효성 검증 실패
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='get', tags=["팀원 목록(비매너신고 창)"])
@swagger_auto_schema(methods=['post'], request_body= ReportSerializer, tags=["신고하기"])
@api_view(['GET','POST'])

@transaction.atomic
def reportUser(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)  
    #팀원 목록 넘기기
    if request.method == 'GET':
        teammates = team.teammates.filter(isTeam=True)
        users = [teammate.user for teammate in teammates]
        serializer = MemberListSerializer(users, many=True)
        return Response(serializer.data)
    #신고처리
    elif request.method == 'POST':
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
        # 유효성 검증이 성공한 경우의 로직 처리
            reporter = serializer.validated_data['reporter']
            if Rude.objects.filter(reporter=reporter,isrude=True).exists():
                return Response({'message': 'report already saved '},status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save(isrude=True)
            return Response({'message': 'report saved successfully'},status=status.HTTP_200_OK)
        else:
        # 유효성 검증 실패
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['get'], tags=["팀 관리페이지 생성(종료투표, 추가모집, 퇴출, 탈퇴)"])
@api_view(['GET'])

def manageTeam(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'GET':
        teammates = team.teammates.filter(isTeam=True)
        users = [teammate.user for teammate in teammates]
        serializer = MemberListSerializer(users, many=True)
        return Response({"memberList": serializer.data, "leader": team.leader.id, "endVote": team.endVote, "recruitNum": team.recruitNum})


@swagger_auto_schema(methods=['POST'],request_body= IdSerializer, tags=["팀 종료 투표보내기"])
@api_view(['POST'])

@transaction.atomic
def teamEndVote(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    serializer = IdSerializer(data=request.data)

    if request.method =='POST':
        if serializer.is_valid():
            user = serializer.validated_data.get('id')
            if TeamEndVote.objects.filter(team=team,user=user).exists():
                return Response({'message': 'already voted'}, status=status.HTTP_200_OK)
            else:
                vote = TeamEndVote(user=user, team=team)
                vote.save()
                team.endVote +=1
                team.save()
                return Response({'message': 'vote successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['post'], request_body=RoleListSerializer, tags=["추가 매칭 신청"])
@api_view(['POST'])
@transaction.atomic
def plusMatching(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = RoleListSerializer(data=request.data)
        
        if serializer.is_valid():
            insufficient_roles = []
            role_list = serializer.validated_data['roleList']
            
            for role_data in role_list:
                plusUser = PlusMatchingSerializer(data=role_data)
                if plusUser.is_valid():
                    role = plusUser.validated_data.get('role')
                    recruitNum = plusUser.validated_data.get('recruitNum')
                    users = list(RandomMatching.objects.filter(comp=team.comp, role=role, isLeader=False))
                    random.shuffle(users)
                    
                    if len(users) < recruitNum:
                        insufficient_roles.append(role)
                    else:
                        for userR in users[:recruitNum]:
                            try:
                                teamrole = TeamRole.objects.get(team=team, role=userR.role)
                            except TeamRole.DoesNotExist:
                                newrole = TeamRole(team=team, role=userR.role, recruitNum=1, num=0)
                                newrole.save()
                                teamrole = TeamRole.objects.get(team=team, role=userR.role)
                            teamrole.num += 1
                            if teamrole.recruitNum < teamrole.num:
                                teamrole.recruitNum += 1
                            teamrole.save()

                            dummyresume = Resume(
                                user=userR.user,
                                name=userR.user.nickname,
                                email=userR.user.email,
                                phone=userR.user.phone,
                                tier="없음",
                                userIntro="없음",
                                skill="없음",
                                experience="없음",
                                githubLink="없음",
                                snsLink="없음",
                                city=userR.city,
                                dong=userR.dong
                            )
                            dummyresume.save()
                            TeamMate(team=team, user=userR.user, resume=dummyresume, role=userR.role, isTeam=True).save()
                            userR.delete()

            if insufficient_roles:
                return JsonResponse({'insufficient_roles': insufficient_roles}, status=status.HTTP_200_OK)
            return Response({'message': "Matching completed successfully."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
                

@swagger_auto_schema(methods=['post'], request_body=KickAndRunSerializer, tags=["퇴출하기"])
@api_view(['POST'])

@transaction.atomic
def KickUser(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)  
    if request.method == 'POST':
        serializer = KickAndRunSerializer(data=request.data)
        if serializer.is_valid():     
            try:
                teammate = TeamMate.objects.get(user=serializer.validated_data.get('user'), team=team)
            except TeamMate.DoesNotExist:
                return Response({'error': 'TeamMate not found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                teamrole = TeamRole.objects.get(team=team_id, role=teammate.role)
            except TeamRole.DoesNotExist:
                return Response({'error': 'TeamRole not found'}, status=status.HTTP_404_NOT_FOUND)
            if TeamEndVote.objects.filter(team=team, user=serializer.validated_data.get('user')).exists():
                team.endVote -= 1
                team.save()
                TeamEndVote.objects.filter(team=team, user=serializer.validated_data.get('user')).delete()
            teamrole.num -= 1
            teamrole.save()
            teammate.delete()
            print(serializer.validated_data.get('user'))
            kickreason=OutReason(user=serializer.validated_data.get('user'), team=team, isKick=True, reason=serializer.validated_data.get('reason'))
            kickreason.save()
            return Response(status=status.HTTP_200_OK)
        else:
        # 유효성 검증 실패
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@swagger_auto_schema(methods=['post'], request_body=KickAndRunSerializer, tags=["탈퇴하기"])
@api_view(['POST'])

@transaction.atomic
def RunUser(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)  

    if request.method == 'POST':
        serializer = KickAndRunSerializer(data=request.data)
        if serializer.is_valid():
            try:
                teammate = TeamMate.objects.get(user=serializer.validated_data.get('user'), team=team)
            except TeamMate.DoesNotExist:
                return Response({'error': 'TeamMate not found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                teamrole = TeamRole.objects.get(team=team_id, role=teammate.role)
            except TeamRole.DoesNotExist:
                return Response({'error': 'TeamRole not found'}, status=status.HTTP_404_NOT_FOUND)
            if TeamEndVote.objects.filter(team=team, user=serializer.validated_data.get('user')).exists():
                team.endVote -= 1
                team.save()
                TeamEndVote.objects.filter(team=team, user=serializer.validated_data.get('user')).delete()
            teamrole.num -= 1
            teamrole.save()
            teammate.delete()
            print(serializer.validated_data.get('user'))
            kickreason=OutReason(user=serializer.validated_data.get('user'), team=team, isKick=False, reason=serializer.validated_data.get('reason'))
            kickreason.save()
            return Response(status=status.HTTP_200_OK)
        else:
        # 유효성 검증 실패
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get', tags=["팀이 참가중인 공모전 정보 보기"])
@api_view(['GET'])
def teamCompInfo(requset, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND)  
    if requset.method == 'GET':
        comp= Comp.objects.get(id=team.comp.id)
        serializer = CompSerializer(comp)
        winning = PreviousWinning.objects.filter(comp=team.comp)
        winningserializer = PreviousWinningSerializer(winning, many=True)
        return Response({"compInfo":serializer.data, "priviousWinningList":winningserializer.data}, status=status.HTTP_200_OK)


@swagger_auto_schema(method='get', tags=["모든 팀 리스트 모아보기"])
@api_view(['GET'])
def allTeamList(requset):
    if requset.method == 'GET':
        teamList=Team.objects.filter(isDone=False, isRandom=False)
        serializer = TeamforMainSerializer(teamList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
