from django.shortcuts import render
from team.models import Team,ChooseTeam
from team.serializers import TeamSerializer
from user.models import BasicUser,Resume
from rest_framework.response import Response
from user.serializers import ResumeSerializer
from team.serializers import ChooseTeamSerializer
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .serializers import CompSerializer, CompReviewSerializer
from .models import Comp,CompReview
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
            return Response({'error': {'code': 404, 'message': "Resumes not found!"}}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='POST', tags = ["공모전 정보 조회/찜"])
@api_view(['POST'])
def CompInfo(request, comp_id):
    try:
        comp = Comp.objects.get(id=comp_id)
    except:
        return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        compReview = CompReview.objects.get(id=comp_id)
    except:
        return Response({'error': {'code': 404, 'message': "comp review not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        teams = Team.objects.get(comp = comp)
    except:
        return Response({'error': {'code': 404, 'message': "teams not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        serializer1 = CompSerializer(comp)
        serializer2 = CompReviewSerializer(compReview)
        serializer3 = TeamSerializer(teams)
        return Response({"compInfo": serializer1.data,"reviewList":serializer2.data, "teamList":serializer3.data})


        


@swagger_auto_schema(method='GET', tags=["공모전 내용/후기"])
@api_view(['GET'])
def reviewList(request, comp_id):
    if request.method == 'GET':
        try:
            comp = Comp.objects.get(id=comp_id)
        except:
            return Response({'error': {'code': 404, 'message': "comp not found!"}}, status=status.HTTP_404_NOT_FOUND)
        try:
            compReview = CompReview.objects.get(id=comp_id)
        except:
            return Response({'error': {'code': 404, 'message': "comp review not found!"}}, status=status.HTTP_404_NOT_FOUND)
        
        
        serializer1 = CompReviewSerializer(compReview)
        serializer2 = CompSerializer(comp)
        return Response({"Comp Information": serializer2.data,"Comp Review Set":serializer1.data})
        

        

@swagger_auto_schema(method='GET', tags=["팀 상세 설명"])
@api_view(['GET'])
def teamDescriptions(request, team_id, comp_id):
    if request.method == 'GET':
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
            Leader = BasicUser.objects.get(id=team.user.id)
        except:
            return Response({'error': {'code': 404, 'message': "Wrong approach1!"}}, status=status.HTTP_404_NOT_FOUND)
        serializer = ChooseTeamSerializer(chooseTeamObj)
        return Response({"chooseTeamInfo":serializer.data,"postTitle":chooseTeamObj.name})

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
        Leader = BasicUser.objects.get(id=team.user.id)
    except:
         return Response({'error': {'code': 404, 'message': "Wrong approach1!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        leaderResume = Resume.objects.get(id=Leader.id)
    except:
         return Response({'error': {'code': 404, 'message': "Wrong approach2!"}}, status=status.HTTP_404_NOT_FOUND)
    serializer = ResumeSerializer(leaderResume)
    return Response({"resumeInfo":serializer.data,"postTitle":chooseTeamObj.name})
