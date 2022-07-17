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

    print('user:', request.user)

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
        "series": book.series.id,
        "seriesEntry": book.series_number ,
        "avgRating": book.avg_rating,
        "userRating": 4.6,      # TODO
        "reviewCount": book.review_count,
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
            "description" : book.description,
            "authors" : [{
                "id":author.id,
                "name":author.name
            } for author in book.authors.all()],
            "avgRating" : book.avg_rating,
            "thumbnail" : None,

        } for book in Book.objects.all()
    ]

    return Response(data)

@api_view(['GET'])
def get_author_info(request, pk):
    author = Author.objects.get(id=pk)
    data = {
        "followCount": author.follower_count,
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
def get_series_info(request, pk):
    series = Series.objects.get(id=pk)

    data = {
        "id": series.id,
        "name": series.name,
        "bookCount": series.book_count,
        "avgRating": series.avg_rating,
        "books" : [
            {
                "id": book.id,
                "title": book.title,
                "seriesEntry": book.series_number,
            } for book in Book.objects.filter(series = series).order_by('series_number')
        ]
    }
    return Response(data)

@api_view(['GET'])
def get_book_reviews(request, pk):
    book = Book.objects.get(id=pk)

    data = [{
            "id": review.id,    
            "reviewer" : review.creator.username,
            "body" : review.description,
            "rating": review.rating,
            "likes": review.like_count,
            "commentCount": review.comment_count,
        } for review in Review.objects.filter(book=book)]
    return Response(data)

@api_view(['GET'])
def get_review_info(request, pk):
    review = Review.objects.get(id=pk)
    data = {
            "id": pk,
            "reviewer" : review.creator.username,
            "body" : review.description,
            "rating": review.rating,
            "likes": review.like_count,
            "Timestamp": review.timestamp,
            "commentCount": review.comment_count,
            "comments": [
                {
                    "Commenter": comment.creator.username,
                    "Timestamp": comment.timestamp,
                    "Text": comment.text
                } for comment in ReviewComment.objects.filter(review = review)
            ]
        }
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