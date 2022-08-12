from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import APIView,api_view

from GreatReads.settings import SECRET_KEY
from decouple import config

from .models import *
from .serializers import *
from .converters import *
from django.contrib.auth.models import User

class BookView(APIView):
    def get(self, request, pk):
        print('user:', request.user.id)

        book = Book.objects.get(id=pk)

        review = Review.objects.filter(book=book, creator__id=request.user.id) if request.user.id else None
        review = review[0] if review else None

        data = book_detailed(book, request.user.id, review)

        return Response(data)


class AllBookView(APIView):
    def get(self, request):
        data = [ book_mini(book, request.user.id) for book in Book.objects.all() ]
        return Response(data)
    

class AuthorView(APIView):
    def get(self, request, pk):
        author = Author.objects.get(id=pk)
        data = author_detailed(author, request.user.id)
        return Response(data)


class PublisherView(APIView):
    def get(self, request, pk):
        publisher = Publisher.objects.get(id=pk)
        data = publisher_detailed(publisher)
        return Response(data)


class SeriesView(APIView):
    def get(self, request, pk):
        series = Series.objects.get(id=pk)

        data = series_detailed(series, request.user.id)
        
        return Response(data)

class BookReviewsView(APIView):
    def get(self, request, pk):
        book = Book.objects.get(id=pk)

        data = [review_mini(review) for review in Review.objects.filter(book=book)]
        return Response(data)


class ReviewView(APIView):
    def get(self, request, pk):
        review = Review.objects.get(id=pk)
        data = review_detailed(review, request.user.id)
        return Response(data)

class  GenreBookView(APIView):
    def get(self, request, pk):
        genre = Genre.objects.get(id=pk)

        data = [book_mini(book, request.user.id) for book in Book.objects.filter(genres=genre)] 

        return Response(data)

class AllGenreView(APIView):
    def get(self, request):

        data = [genre_mini(genre) for genre in Genre.objects.all()]  # TODO sort

        return Response(data)

class GenreView(APIView):
    def get(self, request, pk):
        genre = Genre.objects.get(id=pk)

        data = genre_detailed(genre, request.user.id)

        return Response(data)


# virtual bookself
class BookUserStatusView(APIView):
    def get(self, request, userID, bookshelfCategory):
        if not request.user.id:
            return Response("fail")

        print("User ID: ", userID, "\tCategory: ", bookshelfCategory)
        
        bookList = BookUserStatus.objects.filter(user=userID)
        
        data = []

        if bookshelfCategory == 0:      # want to read
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.is_wishlisted]
        elif bookshelfCategory == 1:    # read
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.is_read]
        elif bookshelfCategory == 2:    # reading
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.read_pages != -1]
        elif bookshelfCategory == 3:    # reviewed
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.read_pages != -1]

        return Response(data)



@api_view(['POST'])
def echoPostView(request,  **kwargs):
    print(request, request.data, kwargs)
    return Response("ok")


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET'])
def getPublisher(request, pk):
    publisher = Publisher.objects.get(pk=pk)
    data = {
        "address": publisher.address,
        "name": publisher.name,
        "description": publisher.description
    }
    return Response(data)
