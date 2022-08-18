from msilib.schema import AppId
from rest_framework.response import Response
from rest_framework.decorators import APIView,api_view

from GreatReads.settings import SECRET_KEY
from decouple import config

from .models import *
from .serializers import *
from .converters import *
from django.contrib.auth.models import User
from django.db.models import Max

class BookView(APIView):
    def get(self, request, pk):
        print('user:', request.user.id)

        book = Book.objects.prefetch_related('review_set').get(id=pk)

        data = book_detailed(book, request.user.id)

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

        data = [review_mini(review, request.user.id) for review in Review.objects.prefetch_related('likers').filter(book=book)]
        return Response(data)


class ReviewView(APIView):
    def get(self, request, pk):
        review = Review.objects.prefetch_related('likers').get(id=pk)
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


class BrowseByGenreView(APIView):
    def get(self, request, pk):
        books = Book.objects.prefetch_related('review_set').filter(genres__id=pk).order_by("-release_date")  # TODO nulls

        data = [book_detailed(book, request.user.id) for book in books]
        return Response(data)

class BrowseNewReleaseView(APIView):
    def get(self, request):
        books = Book.objects.prefetch_related('review_set').all().order_by("-release_date")  # TODO nulls

        data = [book_detailed(book, request.user.id) for book in books]
        return Response(data)


class BrowseFollowedAuthorsView(APIView):
    def get(self, request):
        books = Book.objects.prefetch_related('review_set').filter(authors__followers__id=request.user.id).order_by("-release_date")  # TODO nulls

        data = [book_detailed(book, request.user.id) for book in books]
        return Response(data)

class BrowseNewlyRatedView(APIView):
    def get(self, request):
        books = Book.objects.prefetch_related('review_set').all().annotate(max_update_time=Max('review__timestamp')).order_by("-max_update_time")  # TODO nulls

        data = [book_detailed(book, request.user.id) for book in books]
        return Response(data)

class AuthorBooksView(APIView):
    def get(self, request, pk):
        books = Book.objects.filter(authors__id=pk)

        data = [book_mini(book, request.user.id) for book in books]
        return Response(data)

class AuthorSeriesView(APIView):
    def get(self, request, pk):
        seriess = Series.objects.filter(book__authors__id=pk).distinct()

        data = [series_mini(series) for series in seriess]
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
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.read_pages > 0]
        elif bookshelfCategory == 3:    # reviewed
            data = [ book_mini(iter.book, userID) for iter in bookList if iter.read_pages > 0]

        return Response(data)

class BookShelfUserInfo(APIView):
    def get(self, request, userID):
        if not request.user.id:
            return Response("fail")

        print("User ID: ", userID)        
        data = bookshelf_info(userID, request.user.id)

        return Response(data)

class BookUserStatusStats(APIView):
    def get(self, request, userID):
        if not request.user.id:
            return Response("fail")

        print("User ID: ", userID)        
        data = bookshelf_stats(userID)

        return Response(data)

class BookShelfViewReviews(APIView):
    def get(self, request, userID):
        review_creator = User.objects.get(id=userID)
        print("Preparing review_feed_item...")

        data = []

        for reviewIter in Review.objects.filter(creator=review_creator):
            review_mini_data = review_mini(reviewIter, userID)  # field review_mini of review_feed_item
            timestamp = reviewIter.timestamp    # field timestamp of review_feed_item
            book = book_mid(reviewIter.book, review_creator)    # field book of review_feed_item
            user = user_mini(userID)

            data.append(review_feed_item(review_mini_data, timestamp, book, user))

        return Response(data)

class FollowUser(APIView):
    def post(self, request, followingUserID):
        if not request.user.id:
            return Response("fail")

        followerUser = User.objects.get(id=request.user.id)
        followingUser = User.objects.get(id=followingUserID)
        UserFollowing.objects.create(user_id=followerUser, following_user_id=followingUser)

        return Response({"status": "success"})

class UnFollowUser(APIView):
    def post(self, request, followingUserID):
        if not request.user.id:
            return Response("fail")

        followerUserID = request.user.id
        followingUser = UserFollowing.objects.get(user_id=followerUserID, following_user_id=followingUserID)
        followingUser.delete()

        return Response({"status": "success"})

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
