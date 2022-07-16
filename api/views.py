from django.conf import settings
from django.shortcuts import render
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
    print(book)


    data = {
        "isbn": book.isbn,
        "title": book.title,
        "description": book.description,
        "pageCount": book.pages,
        "released": book.release_date, 
        "genres": [             # TODO
            # {"name": "lorem", "id":1},
            # {"name": "impsum", "id":2},
            # {"name": "sit", "id":3},
            # {"name": "dor", "id":4},
            # {"name": "amet", "id":5}
        ],
        "readStatus":"reading", # TODO
        "readPages": 10,        # TODO
        "seriesEntry": book.series_number ,
        "avgRating": 4.6,       # TODO
        "userRating": 4.6,      # TODO
        "reviewCount": 1520,    # TODO
        "reviews":[             # TODO
        #     {
        #         "id": 1,
        #         "reviewer": "Vraig",
        #         "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        #         "rating":4.5,
        #         "likes": 58,
        #         "commentCount": 19,
        #         "comments": [
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             }
        #         ]
        #     },
        #     {
        #         "id": 2,
        #         "reviewer": "Vraig",
        #         "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        #         "rating":4.5,
        #         "likes": 58,
        #         "commentCount": 19,
        #         "comments": [
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             }
        #         ]
        #     },{
        #         "id": 3,
        #         "reviewer": "Vraig",
        #         "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        #         "rating":4.5,
        #         "likes": 58,
        #         "commentCount": 19,
        #         "comments": [
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             }
        #         ]
        #     },{
        #         "id": 4,
        #         "reviewer": "Vraig",
        #         "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        #         "rating":4.5,
        #         "likes": 58,
        #         "commentCount": 19,
        #         "comments": [
        #             {
        #                 "commenter": "Tamahome",
        #                 "timeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "commenter": "Tamahome",
        #                 "timeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "commenter": "Tamahome",
        #                 "timeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "text": "You go girl! (the audiobook is 45 hours)"
        #             }
        #         ]
        #     }
        ]
    }

    # serializer = BookSerializer(book, many = False)
    # print(serializer.data)
    # return Response(serializer.data)

    return Response(data)


@api_view(['GET'])
def key_test(request):
    s = str(SECRET_KEY) + ", "+ str(config("SECRET_KEY")) + ', '+os.environ.get("SECRET_KEY", 'dev default value')
    print(s)
    return Response(data=s) 

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