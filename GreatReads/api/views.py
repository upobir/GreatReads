from django.conf import settings
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from GreatReads.settings import SECRET_KEY
from decouple import config
import os

from .models import *
from .serializers import *

# replace with class based views later
@api_view(['GET'])
def get_book_info(request, pk):
    # drf way, works offline but will need postgresql setup to work on heroku
    # uncomment this when you get postgres working
    # book = Book.objects.get(id=pk)
    # print(book)
    # serializer = BookSerializer(book, many = False)
    # return Response(serializer.data)

    #temp hack is to send dummy json
    data = {
        "id": pk,
        "isbn": 2,
        "title": "Lorem ipsum electric boogaloo",
        "description": "sit dor amet"
    }
    return Response(data=data)

@api_view(['GET'])
def key_test(request):
    s = str(SECRET_KEY) + ", "+ str(config("SECRET_KEY")) + ', '+os.environ.get("SECRET_KEY", 'dev default value')
    print(s)
    return Response(data=s) 