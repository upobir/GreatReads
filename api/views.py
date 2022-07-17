from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from GreatReads.settings import SECRET_KEY
from decouple import config
import os

from .models import *
from .serializers import *

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# replace with class based views later
@api_view(['GET'])
def get_book_info(request, pk):
    book = Book.objects.get(id=pk)

    data = {
        "isbn": book.isbn,
        "title": book.title,
        "description": book.description,
        "pageCount": book.pages,
        "released": book.release_date, 
        "genres": [             
            {
                "name": genre.name,
                "id": genre.id ,
            } for genre in book.genres.all()
        ],
        "readStatus":"reading", # TODO
        "readPages": 10,        # TODO
        "seriesEntry": book.series_number ,
        "avgRating": 4.6,       # TODO
        "userRating": 4.6,      # TODO
        "reviewCount": 1520,    # TODO
        "authors": [
            {
                "id":author.id,
                "name":author.name
            } for author in book.authors.all()
        ],
        "publisherId" : book.publisher.id,
    }

    return Response(data)

@api_view(['GET'])
def get_all_books(request):
    data = [
        {
            "id" : book.id,
            "title" : book.title,
            "desc" : book.description,
            "authorIds" : [author.id for author in book.authors.all()],
            "avgRating" : 4.6, # TODO
            "thumbnail" : None,

        } for book in Book.objects.all()
    ]

    return Response(data)

@api_view(['GET'])
def get_author_info(request, pk):
    author = Author.objects.get(id=pk)
    data = {
        "followCount": 178000, # TODO
        "isFollowedByUser": False, # TODO
        "description": author.description,
        "name": author.name,
        "id": pk
    }
    return Response(data)

@api_view(['GET'])
def get_publisher_info(request, pk):
    publisher = Publisher.objects.get(id=pk)
    data = {
        "address": publisher.address,
        "name": publisher.name,
        "id": pk
    }
    return Response(data)

@api_view(['GET'])
def get_book_reviews(request, pk):
    book = Book.objects.get(id=pk)

    data = [{
            "id": pk,
            "reviewer" : "User_"+str(pk), 
            "body" : review.description,
            "rating":4.5,
            "likes": 58,
            "commentCount": 0,
        } for review in book.reviews.all()]
        #         "comments": [
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #         ]
        #     }
    return Response(data)

@api_view(['POST'])
def login(request):
    print(request)
    # I haven't been able to get this via request.POST, most likely need to change how the response is made is react 
    print(request.body)
    return Response(data="ok") 


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)