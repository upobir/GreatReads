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
        data = review_detailed(review)
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

class BookStatusView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")
        
        book = Book.objects.get(id=pk)
        user = User.objects.get(id=request.user.id)
        status = BookUserStatus.objects.filter(book=book,user=user)
        if not status:
            status = BookUserStatus.objects.create(book=book, user=user, is_read=False, is_wishlisted=False, read_pages = -1)
        else:
            status = status[0]
            status.is_read = False
            status.is_wishlisted = False
            status.read_pages = -1

        if request.data['readStatus'] == 'read':
            status.is_read = True
            status.save()
        elif request.data['readStatus'] == 'wishlisted':
            status.is_wishlisted = True
            status.save()
        elif request.data['readStatus'] == 'reading':
            status.read_pages = request.data['pagesRead']   # Sanitization?
            status.save()

        return Response("ok")

class BookReviewPostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        user = User.objects.get(id=request.user.id)
        book = Book.objects.get(id=pk)

        reviews = Review.objects.filter(creator=user, book=book)

        rating = request.data["reviewRating"]
        description = request.data["reviewText"]

        if reviews:
            reviews[0].rating = rating
            reviews[0].description = description
            reviews[0].save()
        else:
            Review.objects.create(rating = rating, description = description, creator = user, book = book)

        return Response("ok")


class GenreFollowPostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        genre = Genre.objects.get(id=pk)
        
        if genre.followers.filter(id=request.user.id).exists():
            genre.followers.remove(User.objects.get(id=request.user.id))
        else:
            genre.followers.add(User.objects.get(id=request.user.id))

        return Response("ok")

class AuthorFollowPostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        author = Author.objects.get(id=pk)
        
        if author.followers.filter(id=request.user.id).exists():
            author.followers.remove(User.objects.get(id=request.user.id))
        else:
            author.followers.add(User.objects.get(id=request.user.id))

        return Response("ok")

class ReviewCommentPostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        review = Review.objects.get(id=pk)
        user = User.objects.get(id=request.user.id)

        commentText = request.data["commentText"]

        ReviewComment.objects.create(text=commentText, creator=user, review=review)

        return Response("ok")

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
