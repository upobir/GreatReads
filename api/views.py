from urllib import request
from rest_framework.response import Response
from rest_framework.decorators import APIView,api_view

from GreatReads.settings import SECRET_KEY
from decouple import config

from .models import *
from .serializers import *

class BookView(APIView):
    def get(self, request, pk):
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
            "series": book.series.id if book.series else None,
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


class AllBookView(APIView):
    def get(self, request):
        print('user:', request.user)
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
    

class AuthorView(APIView):
    def get(self, request, pk):
        author = Author.objects.get(id=pk)
        data = {
            "followCount": author.follower_count,
            "isFollowedByUser": False, # TODO
            "description": author.description,
            "name": author.name,
            "id": pk
        }
        return Response(data)


class PublisherView(APIView):
    def get(self, request, pk):
        publisher = Publisher.objects.get(id=pk)
        data = {
            "address": publisher.address,
            "name": publisher.name,
            "id": pk
        }
        return Response(data)


class SeriesView(APIView):
    def get(self, request, pk):
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

class BookReviewsView(APIView):
    def get(self, request, pk):
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


class ReviewView(APIView):
    def get(self, request, pk):
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


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)
