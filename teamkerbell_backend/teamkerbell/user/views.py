# user/views.py
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .serializers import AcceptSerializer, LoginUserSerializer, BasicUserSerializer, ResumeSerializer, UserSerializer, BookmarkSerializer, CompListSerializer, TeamAndCompNameSerializer, ResumeAndRoleAndTagSerializer
from django.contrib.auth import authenticate, login, logout
from .models import BasicUser, Resume, Bookmark, Tag, Rude
from comp.models import Comp
from .decorator import login_required
from team.models import Team, TeamEndVote, TeamMate, TeamRole, Schedule, ChooseTeam
"""
@swagger_auto_schema(method="POST", tags=["유저 회원가입"], request_body=UserSerializer, operation_summary="유저 회원가입")
@api_view(['POST'])
def createUser(request):    
    if request.method == 'POST':
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    
"""

@swagger_auto_schema(method="POST", tags=["유저 회원가입"], request_body=BasicUserSerializer, operation_summary="유저 회원가입")
@api_view(['POST'])
def createUser(request):
    if request.method == 'POST':
        user_serializer = LoginUserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            basic_user_data = request.data.copy()
            basic_user_data['user'] = user.id
            basic_user_serializer = BasicUserSerializer(data=basic_user_data)
            if basic_user_serializer.is_valid():
                basic_user_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            user.delete()
            return Response(basic_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method="POST", tags=["유저 로그인"], request_body=LoginUserSerializer, operation_summary="유저 로그인")
@api_view(['POST'])
def loginView(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=401)

@swagger_auto_schema(method="POST", tags=["유저 로그아웃"],  request_body=LoginUserSerializer, operation_summary="유저 로그아웃")      
@api_view(['POST'])

def logoutView(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

@swagger_auto_schema(method='get', tags=["유저 정보 가져오기/붙여넣기/삭제하기"])
@swagger_auto_schema(methods=['PUT','DELETE'], request_body=UserSerializer, tags=["유저 정보 가져오기/붙여넣기/삭제하기"])          
@api_view(['GET','PUT','DELETE'])

def getUserForId(request, user_id):
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data) 

    elif request.method == 'PUT':
        user_serializer = UserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(method='GET', tags=["이력서 리스트 가져오기/쓰기"])
@swagger_auto_schema(methods=['POST'], request_body=ResumeSerializer, tags=["이력서 리스트 가져오기/쓰기"])
@api_view(['POST','GET'])

def manageResume(request, user_id):
    #URL에 들어가는 user_id를 의미한다.
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "User not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        # 새로운 Resume 생성
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            print("user:", user_id, "새 Resume 생성 완료.")
            # serializer.save 좌변은 model에서 정의한 user 라는 값 우측은 user_id 로 얻어낸 user 값을 의미한다.
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        # Resume 얻어오기
        resumes = Resume.objects.filter(user=user_id)  
        # Resume들 중에 user 값이(model에 정의된 model이라는 값) user_id인 값 
        if resumes.exists():  # 이력서가 존재하는지 확인
            serializer = ResumeSerializer(resumes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': {'code': 404, 'message': "Resumes not found!"}}, status=status.HTTP_404_NOT_FOUND)

@swagger_auto_schema(method='GET', tags=["세부 이력서 가져오기/수정/삭제하기"])
@swagger_auto_schema(methods=['DELETE', 'PATCH'], tags=["세부 이력서 가져오기/수정/삭제하기"])
@api_view(['DELETE', 'PATCH', 'GET'])

def detailResume(request, user_id, resume_id):
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "User not found!"}}, status=status.HTTP_404_NOT_FOUND)

    try:
        resume = Resume.objects.get(id=resume_id, user=user_id)
    except Resume.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Resume not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        resume.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PATCH':
        serializer = ResumeSerializer(resume, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        serializer = ResumeSerializer(resume)
        return Response(serializer.data)


@swagger_auto_schema(methods=['POST'],tags=["공모전 찜하기/ 찜한 공모전 가져오기"])
@api_view(['POST'])

def compLike(request, user_id, comp_id):
        #URL에 들어가는 user_id를 의미한다.
    try:
        user = BasicUser.objects.get(id=user_id)
        comp = Comp.objects.get(id= comp_id)
    except BasicUser.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    except Comp.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Comp not found!"}},
        status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        # user_id 의 유저가 comp_id의 공모전을 찜하기
        serializer = BookmarkSerializer(data=request.data, context={'user': user, 'comp': comp})
        if serializer.is_valid():
            print("user:", user, "comp" , comp, "찜하기 완료")
            serializer.save(user=user, comp=comp)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(method='GET', tags=["공모전 찜하기/ 찜한 공모전 가져오기"])
@api_view(['GET'])

def getCompLiked(request, user_id):
    if request.method == 'GET':
        # 찜한 Comps의 ID 얻어오기
        likedComps = Bookmark.objects.filter(user=user_id)
        
        # 찜한 Comps의 ID를 리스트로 추출
        likedCompsIds = likedComps.values_list('comp', flat=True)
        
        # 추출한 ID에 해당하는 Comp 객체들 조회
        comps = Comp.objects.filter(id__in=likedCompsIds)
        #id__in 은 likedCompsIds 리스트에 포함된 어떤 값과도 일치하는 Comp 객체들을 모두 찾아라라는 뜻으로 해석
        
        if comps.exists():  # 찜한 Comps가 존재하는지 확인
            serializer = CompListSerializer(comps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': {'code': 404, 'message': "No liked comps found!"}}, status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(method='GET', tags=["나의 성취 가져오기"])
@api_view(['GET'])

def getMyAchievement(request, user_id):
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        # 칭찬 태그와 개수 가져오기
        complimentTags = Tag.objects.filter(user=user).values('id', 'count')
        complimentTagsList = [{"#{}".format(tag['id']): tag['count']} for tag in complimentTags]

        # 개선점 가져오기 (여기서는 Rude 모델에서 개선점으로 간주)
        improvementPoints = Rude.objects.filter(user=user, isrude=False).values_list('rudeness', flat=True)
        
        # 무례함 가져오기
        rudenessPoints = Rude.objects.filter(user=user, isrude=True).values_list('rudeness', flat=True)

        response_data = {
        "apiStatus": {
            "statusCode": status.HTTP_200_OK,
            "statusMessage": "OK",
        },
        "temp": 36.5,  # 이 값은 예시입니다. 실제로는 다른 방식으로 계산하거나 데이터를 가져와야 합니다.
        "complimentTag": complimentTagsList,
        "improvementPoint": list(improvementPoints),
        "rudeness": list(rudenessPoints),
        }

    return Response(response_data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='GET', tags=["나의 팀 목록 모아보기"])
@api_view(['GET'])
def myTeamList(request, user_id):
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        team = Team.objects.filter(leader=user_id, isDone=True)
        yourTeam = Team.objects.filter(leader=user_id, isDone=False)
        joinTeam = TeamMate.objects.filter(user=user_id, isTeam=False).values_list('team', flat=True)
        joinTeam_teams = Team.objects.filter(id__in=joinTeam)

        teamList= TeamAndCompNameSerializer(team, many=True)
        yourTeamList=TeamAndCompNameSerializer(yourTeam, many=True)
        jointeamList=TeamAndCompNameSerializer(joinTeam_teams, many=True)
        return Response({"teamList": teamList.data, "yourTeamList": yourTeamList.data, "joinTeamList": jointeamList.data}, status=status.HTTP_200_OK)
    
    
@swagger_auto_schema(methods=['POST'], tags=["마이페이지에서 팀 종료 투표보내기"])
@api_view(['POST'])
def teamEndVoteInMyPage(request, user_id, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)

    if request.method =='POST':
        if TeamEndVote.objects.filter(team=team,user=user).exists():
            return Response({'message': 'already voted'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            vote = TeamEndVote(user=user, team=team)
            vote.save()
            team.endVote +=1
            team.save()
            return Response({'message': 'vote successfully'}, status=status.HTTP_200_OK)

@swagger_auto_schema(methods=['DELETE'], tags=["마이페이지에서 팀 모집 취소"])
@api_view(['DELETE'])
def breakTeam(request, user_id, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method=='DELETE':
        if user.id == team.leader.id:
            TeamMate.objects.filter(team=team).delete()
            TeamRole.objects.filter(team=team).delete()
            TeamEndVote.objects.filter(team=team).delete()
            ChooseTeam.objects.filter(team=team).delete()
            Schedule.objects.filter(team=team).delete()
            team.delete()
            return Response({'message': 'delete successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'you are not leader'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
@swagger_auto_schema(methods=['DELETE'], tags=["신청 취소"])
@api_view(['DELETE'])
def cancelJoin(request, user_id, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
            teammate=TeamMate.objects.get(user=user, isTeam=False)
    except TeamMate.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "TeamMate not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'DELETE':
        teammate.delete()
        return Response({'message': 'delete successfully'}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='POST', tags=["팀 모집 완료(팀 결성 완료)"])
@api_view(['POST'])
def makeTeam(request, user_id, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if user.id == team.leader.id:
            team.recruitNum = TeamMate.objects.filter(team=team, isTeam=True).count()
            team.isDone = True
            team.save()
            TeamMate.objects.filter(team=team, isTeam=False).delete()
            return Response({'message': 'Team recruitment completed'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'you are not leader'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
@swagger_auto_schema(method='GET', tags=["팀 신청 인원 이력서 모음"])
@api_view(['GET'])
def resumeList(request, user_id, team_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        resumeId = TeamMate.objects.filter(team=team).values_list('resume', flat=True)
        resumeList = Resume.objects.filter(id__in=resumeId)
        serializer = ResumeAndRoleAndTagSerializer(resumeList, many=True, context={'team': team})
        return Response(serializer.data, status=status.HTTP_200_OK)
        

@swagger_auto_schema(method='GET', tags=["이력서 세부사항 가져오기"])
@swagger_auto_schema(methods=['POST'], request_body=AcceptSerializer, tags=["이력서 수락/거절"])
@api_view(['POST','GET'])
def resumeAccept(request, user_id, team_id, resume_id):
    try:
        team = Team.objects.get(id=team_id)
    except Team.DoesNotExist:
        return Response({'error': {'code': 404, 'message': "Team not found!"}}, status=status.HTTP_404_NOT_FOUND) 
    try:
        user = BasicUser.objects.get(id=user_id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "User not found!"}}, status=status.HTTP_404_NOT_FOUND)
    try:
        resume = Resume.objects.get(id=resume_id)
    except Resume.DoesNotExist:
        return Response({'error' : {'code' : 404, 'message' : "Resume not found!"}}, status=status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        serializer = ResumeSerializer(resume)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method=='POST':
        serializer = AcceptSerializer(data=request.data)
        if serializer.is_valid():
            try:
                teammate = TeamMate.objects.get(team=team, resume=resume, isTeam=False)  
            except TeamMate.DoesNotExist:
                return Response({'error' : {'code' : 404, 'message' : "TeamMate not found!"}}, status=status.HTTP_404_NOT_FOUND)
            try:
                teamrole = TeamRole.objects.get(team=team, role=teammate.role)  
            except TeamRole.DoesNotExist:
                return Response({'error' : {'code' : 404, 'message' : "TeamMate not found!"}}, status=status.HTTP_404_NOT_FOUND)

            
            accept = serializer.validated_data['accept']
            if accept==True:
                if teamrole.recruitNum<teamrole.num+1:
                    return Response({'message': 'full'}, status=status.HTTP_200_OK)
                else:
                    teamrole.num+=1
                teamrole.save()
                teammate.isTeam=True
                teammate.save()
                teamrole=TeamRole.objects.get(team=team, role=teammate.role)
                return Response({'message': 'Accepted'}, status=status.HTTP_200_OK)
            else:
                TeamMate.objects.filter(team=team, resume=resume, isTeam=False).delete()
                return Response({'message': 'kick Accepted'}, status=status.HTTP_200_OK)
        