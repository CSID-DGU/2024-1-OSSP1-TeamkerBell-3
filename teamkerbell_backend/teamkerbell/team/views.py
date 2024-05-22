from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .models import Team, TeamEndVote, TeamRole, TeamMate, OutReason
from .serializers import ScheduleAndCommitSerializer, ScheduleSerializer,TeamMateSerializer, ResumeAndRoleSerializer,  MemberListSerializer, ReportSerializer, KickAndRunSerializer, CombinedSerializer, IdSerializer, PlusMatchingSerializer, ScoreTagSerializer, ImprovementSerializer, ReviewSerializer
from comp.models import RandomMatching, CompReview
from user.models import BasicUser, Resume, Tag, Rude
import random
from django.db import transaction
from user.decorator import login_required
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
            scheduleList = ScheduleSerializer(serializer.validated_data.get('scheduleList'),many=True)
            repository = serializer.validated_data.get('repository')
            if scheduleList:          
                for schedule in scheduleList.data:
                    schedule_serializer = ScheduleSerializer(data = schedule)
                    if schedule_serializer.is_valid():
                        schedule_serializer.save()
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
            serializer = ResumeAndRoleSerializer(resume_list, many=True,  context={'team': team})
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
            return Response(serializer.data)
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
                        if Rude.objects.filter(user=user.id,reporter=reporter,isrude=False).exists():
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
        if serializer.is_valid(isrude=True):
        # 유효성 검증이 성공한 경우의 로직 처리
            if Rude.objects.filter(reporter=serializer.validated_data('reporter'),isrude=True).exists():
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


@swagger_auto_schema(methods=['post'],request_body= PlusMatchingSerializer(many=True), tags=["추가 매칭 신청"])
@api_view(['POST'])

@transaction.atomic
def plusMatching(request, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    serializerList = PlusMatchingSerializer(data=request.data, many=True)
    if request.method =='POST':
        if serializerList.is_valid():
            insufficient_roles=[]
            for serializer in serializerList.data:
                plusUser = PlusMatchingSerializer(data=serializer)
                if plusUser.is_valid():
                    role = plusUser.validated_data.get('role')
                    recruitNum = plusUser.validated_data.get('recruitNum')
                    users = list(RandomMatching.objects.filter(comp=team.comp, role=role, isLeader=False))  # 쿼리셋을 리스트로 변환
                    random.shuffle(users)  # 사용자 목록을 랜덤하게 섞음
                    
                    if len(users) < recruitNum:
                        insufficient_roles.append(role)  # 모집 인원이 부족한 역할을 리스트에 추가
                    else:
                        for userR in users[:recruitNum]:  # 모집 인원 수만큼 사용자를 선택
                            try:
                                teamrole = TeamRole.objects.get(team=team, role=userR.role)
                            except TeamRole.DoesNotExist:#TeamRole테이블에 정보가 없는 경우 새로운 직군을 팀 직군리스트에 넣어줌
                                newrole=TeamRole(team=team, role=userR.role,recruitNum=1, num=0)
                                newrole.save()
                                teamrole = TeamRole.objects.get(team=team, role=userR.role)
                            teamrole.num +=1
                            if teamrole.recruitNum < teamrole.num:#모집 인원보다 많은경우 최대 인원을 늘려줌
                                teamrole.recruitNum +=1
                            teamrole.save()
                            #더미 이력서 생성
                            dummyresume=Resume(user=userR.user, name=userR.user.nickname,email=userR.user.email, phone=userR.user.phone, tier="없음",userIntro="없음",skill="없음",experience="없음", githubLink="없음", snsLink="없음", city=userR.city, dong=userR.dong)
                            dummyresume.save()
                            TeamMate(team=team, user=userR.user, resume=dummyresume, role=userR.role, isTeam=True).save()
                            userR.delete()

            if insufficient_roles:
                # 모집할 수 없었던 역할에 대한 정보 반환
                return JsonResponse({'insufficient_roles': insufficient_roles}, status=status.HTTP_200_OK)
            return Response({'message': "Matching completed successfully."}, status=status.HTTP_200_OK)
        else:
            return Response(serializerList.errors, status=status.HTTP_400_BAD_REQUEST)        
                

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
                teammate = TeamMate.objects.get(user=serializer.validated_data.get('user'))
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
                teammate = TeamMate.objects.get(user=serializer.validated_data.get('user'))
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


