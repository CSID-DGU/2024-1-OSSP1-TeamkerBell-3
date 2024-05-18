from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from .serializers import CompSerializer
from .models import Comp
from user.decorator import login_required
@swagger_auto_schema(method="POST", tags=["공모전 등록하기"], request_body=CompSerializer, operation_summary="공모전 정보 입력")
@api_view(['POST'])
@login_required
def createComp(request):    
    if request.method == 'POST':
        comp = CompSerializer(data=request.data)
        if comp.is_valid():
            comp.save()
            return Response(comp.data, status=status.HTTP_201_CREATED)
        return Response(comp.errors, status=status.HTTP_400_BAD_REQUEST)
    

@swagger_auto_schema(method='GET', tags=["공모전 리스트 가져오기"])
@api_view(['GET'])
@login_required
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
