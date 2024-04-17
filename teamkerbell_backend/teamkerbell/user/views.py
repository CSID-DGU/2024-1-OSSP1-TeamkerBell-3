# user/views.py

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import userSerializer
from .models import BasicUser



@api_view(['GET','POST'])
def createUser(request):
    if request.method == 'GET':
        query = BasicUser.objects.all()
        serializer = userSerializer(query,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        user = userSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data)
        return Response(user.errors,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])
def getUserForId(request,id):
    try:
        query = BasicUser.objects.get(id=id)
    except BasicUser.DoesNotExist:
        return Response({'error' : {
        'code' : 404,
        'message' : "Article not found!"
    }}, status = status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = userSerializer(query)
        return Response(serializer.data)
    elif request.method=='PUT':
        user = userSerializer(query,data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data)
        return Response(user.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
