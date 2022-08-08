from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import APIView,api_view

from GreatReads.settings import SECRET_KEY
from decouple import config

from .models import *
from .serializers import *
from .converters import *

class BookView(APIView):
    def get(self, request, pk):
        print('user:', request.user.id)

        book = Book.objects.get(id=pk)
        data = book_detailed(book)

        return Response(data)


class AllBookView(APIView):
    def get(self, request):
        data = [ book_mini(book) for book in Book.objects.all() ]
        return Response(data)
    

class AuthorView(APIView):
    def get(self, request, pk):
        author = Author.objects.get(id=pk)
        data = author_detailed(author)
        return Response(data)


class PublisherView(APIView):
    def get(self, request, pk):
        publisher = Publisher.objects.get(id=pk)
        data = publisher_detailed(publisher)
        return Response(data)


class SeriesView(APIView):
    def get(self, request, pk):
        series = Series.objects.get(id=pk)

        data = series_detailed(series)
        
        return Response(data)

class BookReviewsView(APIView):
    def get(self, request, pk):
        book = Book.objects.get(id=pk)

        data = [review_mini(review) for review in Review.objects.filter(book=book)]
        return Response(data)


class ReviewView(APIView):
    def get(self, request, pk):
        review = Review.objects.get(id=pk)
        data = review_detailed(review)
        return Response(data)
@api_view(['POST'])
def echoPostView(request,  **kwargs):
    print(request, request.data, kwargs)
    return Response("ok")

# @api_view(['POST'])
# def bookReviewPostView(request,book_pk):
#     print("aaa", book_pk)
#     print(request, request.data)
#     # Review.objects.create(request.data)
#     return Response("ok")

@api_view(['POST'])
def bookReviewPostView(request, book_pk):
    print("aaaaaaaa--------------------------------------------------")
    print("request", request.data)
    print('user:', request.user.id)
    user = User.objects.get(id=request.user.id);
    book = Book.objects.get(id=book_pk)
    # print("aaa", book_pk)
    rating = int(request.data["reviewRating"])
    text = str(request.data["reviewText"])

    Review.objects.create(rating=rating, creator=user,description=text, book=book)

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
