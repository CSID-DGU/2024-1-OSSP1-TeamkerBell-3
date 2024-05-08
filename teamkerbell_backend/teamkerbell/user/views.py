# user/views.py

from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .serializers import ResumeSerializer, UserSerializer
from .models import BasicUser, Resume


@swagger_auto_schema(method="POST", tags=["유저 회원가입"], request_body=UserSerializer, operation_summary="유저 회원가입")
@api_view(['POST'])
def createUser(request):    
    if request.method == 'POST':
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    

@swagger_auto_schema(method='get', tags=["유저 정보 가져오기"])
@swagger_auto_schema(methods=['PUT','DELETE'], request_body=UserSerializer, tags=["유저 정보 붙여넣기/삭제하기"])          
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


@swagger_auto_schema(method='GET', tags=["이력서 리스트 가져오기"])
@swagger_auto_schema(methods=['POST'], request_body=ResumeSerializer, tags=["이력서 쓰기"])
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

@swagger_auto_schema(method='GET', tags=["세부 이력서 가져오기"])
@swagger_auto_schema(methods=['DELETE', 'PATCH'], tags=["세부 이력서 수정 및 삭제하기"])
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

