from django.shortcuts import render
from team.models import Team,ChooseTeam, TeamMate, TeamRole
from team.serializers import IdSerializer, TeamRoleForApplySerializer, TeamforMainSerializer, PreviousWinningSerializer
from user.models import BasicUser,Resume
from rest_framework.response import Response
from user.serializers import ResumeAndImgAndTagSerializer, ResumeAndImgSerializer
from team.serializers import ChooseTeamSerializer
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .serializers import applyResumeSerializer, RandomMatchingApplySerializer, makeTeamSerializer, CompSerializer, CompReviewSerializer, TeamInfoAndChooseTeamInfoAndTeamRoleSerializer
from .models import Comp,CompReview, RandomMatching
from user.decorator import login_required

@swagger_auto_schema(method="POST", tags=["공모전 등록하기"], request_body=CompSerializer, operation_summary="공모전 정보 입력")
@api_view(['POST'])
def createComp(request):    
    if request.method == 'POST':
        comp = CompSerializer(data=request.data)
        if comp.is_valid():
            comp.save()
            return Response(comp.data, status=status.HTTP_201_CREATED)
        return Response(comp.errors, status=status.HTTP_400_BAD_REQUEST)
    

@swagger_auto_schema(method='GET', tags=["공모전 리스트 가져오기"])
@api_view(['GET'])
def getComps(request):
    #URL에 들어가는 user_id를 의미한다.
    try:
        comps = Comp.objects.all()
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        
        # Resume들 중에 user 값이(model에 정의된 model이라는 값) user_id인 값 
        if comps.exists():  # 이력서가 존재하는지 확인
            serializer = CompSerializer(comps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        else:
            return Response({'error': {'code': 404, 'message': "Comps not found!"}}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='get', tags = ["공모전 정보 조회"])
@api_view(['GET'])
def CompInfo(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        teams = Team.objects.filter(comp = comp)
        serializer1 = CompSerializer(comp)
        reviews=CompReview.objects.filter(comp=comp).values_list('review', flat=True)
        serializer3 = TeamforMainSerializer(teams, many=True)
        finderCount=RandomMatching.objects.filter(comp=comp).count()
        return Response({"compInfo": serializer1.data,"reviewList":reviews, "teamList":serializer3.data, "finderCount": finderCount})


        


@swagger_auto_schema(method='GET', tags=["공모전 내용/후기"])
@api_view(['GET'])
def reviewList(request, comp_id):
    if request.method == 'GET':
        try:
            comp = Comp.objects.get(id=comp_id)
        except Comp.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
        reviews=CompReview.objects.filter(comp=comp).values_list('review', flat=True)
        serializer2 = CompSerializer(comp)
        return Response({"compInfo": serializer2.data,"reviewList":reviews})
        

        

@swagger_auto_schema(method='GET', tags=["팀 상세 설명"])
@api_view(['GET'])
def teamDescriptions(request, team_id, comp_id):
    if request.method == 'GET':
        try:
            team=Team.objects.get(id = team_id)
        except Team.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
        try:
            comp = Comp.objects.get(id=comp_id)
        except Comp.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
        try:
            chooseTeamObj = ChooseTeam.objects.get(team=team)
        except ChooseTeam.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TeamInfoAndChooseTeamInfoAndTeamRoleSerializer(chooseTeamObj)
        return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='GET', tags=["팀장 이력서 상세보기"])
@api_view(['GET'])
def teamDetails(request, team_id, comp_id):
    try:
        team=Team.objects.get(id = team_id)
    except:
         return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
       comp = Comp.objects.get(id=comp_id)
    except:
            return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        chooseTeamObj = ChooseTeam.objects.get(team=team)
    except:
         return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        leader = BasicUser.objects.get(id=team.leader.id)
    except:
         return Response({'error': {'code': 404, 'message': "Wrong approach1!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method=='GET':
        try:
            leaderResume = TeamMate.objects.get(user=leader, team=team).resume
        except TeamMate.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "Leader's TeamMate record not found!"}}, status=status.HTTP_404_NOT_FOUND)
        serializer = ResumeAndImgSerializer(leaderResume)
        return Response({"resumeInfo":serializer.data,"postTitle":chooseTeamObj.name})

@swagger_auto_schema(method='get', tags=["선택 매칭 생성에서 사용자 이력서 리스트 가져오기"])
@swagger_auto_schema(methods=['post'], request_body= makeTeamSerializer, tags=["선택 매칭 팀 만들기"])
@api_view(['GET','POST'])
def createTeam(request, comp_id, user_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        resumes= Resume.objects.filter(user=user)
        serializer=ResumeAndImgAndTagSerializer(resumes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer=makeTeamSerializer(data=request.data)
        if serializer.is_valid():
            recruitRoles = serializer.validated_data['recruitRole']
            recruitNumbers = serializer.validated_data['recruitNumber'] 
            if len(recruitRoles) != len(recruitNumbers):
                return Response({'error': 'recruitRole and recruitNumber lists must be of the same length'}, status=status.HTTP_400_BAD_REQUEST)
            
            recruitNum = sum(serializer.validated_data['recruitNumber'])+1
            team = Team(comp=comp, recruitNum=recruitNum, leader=user)
            team.save()
            chooseteam = ChooseTeam(team=team, comp=comp,
                                name=serializer.validated_data['name'],
                                startDate=serializer.validated_data['projectStartDate'],
                                intro=serializer.validated_data['intro'],
                                method=serializer.validated_data['method'],
                                language=serializer.validated_data['language'],
                                qualification=serializer.validated_data['qualification'],
                                )
            chooseteam.save()
            for role, number in zip(recruitRoles, recruitNumbers):
                teamrole = TeamRole(team=team, role=role, recruitNum=number)
                teamrole.save()
            resume=serializer.validated_data['resumeId']
            teammate=TeamMate(resume=resume, user=user, team=team, isTeam=True, role="팀장")
            leaderteamrole = TeamRole(team=team, role="팀장", recruitNum=1, num=1)
            teammate.save()
            leaderteamrole.save()
            return Response({'message': 'Team created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method="POST", tags=["랜덤매칭 신청하기"], request_body=RandomMatchingApplySerializer)
@api_view(['POST'])
def createRandomTeam(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='POST':
        serializer = RandomMatchingApplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(comp=comp)
            return Response({'message': 'matching created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@swagger_auto_schema(method='GET', tags=["팀 신청을 위한 이력서 목록 가져오기"])
@swagger_auto_schema(methods=['POST'], request_body=applyResumeSerializer, tags=["팀 지원하기"])
@api_view(['POST','GET'])
def applyTeam(request, team_id, comp_id, user_id):
    try:
        team=Team.objects.get(id = team_id)
    except:
         return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        try:
            chooseTeamObj = ChooseTeam.objects.get(team=team)
        except ChooseTeam.DoesNotExist:
            return Response({'error': {'code': 404, 'message': "team not found!"}}, status=status.HTTP_404_NOT_FOUND)
        
        serializer1= TeamInfoAndChooseTeamInfoAndTeamRoleSerializer(chooseTeamObj)
        teamroles=TeamRole.objects.filter(team=team)
        serializer2=TeamRoleForApplySerializer(teamroles,many=True)
        resumes=Resume.objects.filter(user=user)
        serializer3=ResumeAndImgAndTagSerializer(resumes, many=True)
        return Response({"teamInfo":serializer1.data,"selectRole":serializer2.data,"resumeList":serializer3.data})
    elif request.method == 'POST':
        serializer = applyResumeSerializer(data=request.data)
        if serializer.is_valid():
            resume=serializer.validated_data.get('resumeId')
            TeamMate(resume=resume, user=user, team=team, isTeam=False, role=serializer.validated_data.get('role')).save()
            return Response({'message': 'apply successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['DELETE'], tags=["공모전 지우기"])
@api_view(['DELETE'])
def deletecomp(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='DELETE':
        comp.delete()
        return Response({'message': 'delete successfully'}, status=status.HTTP_200_OK)
    
@swagger_auto_schema(methods=['PATCH'], request_body=CompSerializer, tags=["공모전 수정하기"])
@api_view(['PATCH'])
def patchcomp(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='PATCH':
        serializer = CompSerializer(comp, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'delete successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@swagger_auto_schema(methods=['POST'], request_body=PreviousWinningSerializer, tags=["이전 수상팀 생성"])
@api_view(['POST'])
def createwinner(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method =='POST':
        serializer = PreviousWinningSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'create successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)