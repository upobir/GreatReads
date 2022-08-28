from sqlite3 import Timestamp
from time import time
from rest_framework.response import Response
from rest_framework.decorators import APIView

from GreatReads.settings import SECRET_KEY
from decouple import config

from .models import *
from .serializers import *
from .converters import *
from django.contrib.auth.models import User
from django.utils import timezone


class BookStatusView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")
        
        book = Book.objects.get(id=pk)
        user = User.objects.get(id=request.user.id)
        status = BookUserStatus.objects.filter(book=book,user=user)
        if not status:
            status = BookUserStatus.objects.create(book=book, user=user, is_read=False, is_wishlisted=False, read_pages = -1, timestamp=timezone.now())
        else:
            status = status[0]
            status.is_read = False
            status.is_wishlisted = False
            status.read_pages = -1
            status.timestamp = timezone.now()

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
            reviews[0].timestamp = timezone.now()
            reviews[0].save()
        else:
            Review.objects.create(rating = rating, description = description, creator = user, book = book, timestamp=timezone.now())

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

        comment =ReviewComment.objects.create(text=commentText, creator=user, review=review, timestamp=timezone.now())
        # print(comment)
        return Response({"status":"ok", "commentID": comment.id})

class CommentDeletePostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        comment = ReviewComment.objects.get(id=pk)

        if comment.creator.id != request.user.id:
            return Response("unauthorized")

        comment.delete()

        return Response("ok")

class ReviewLikePostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        review = Review.objects.get(id=pk)

        if review.likers.filter(id=request.user.id).exists():
            review.likers.remove(User.objects.get(id=request.user.id))
        else:
            review.likers.add(User.objects.get(id=request.user.id))

        return Response("ok")

class UserMessagePostView(APIView):
    def post(self, request, pk):
        if not request.user.id:
            return Response("fail")

        text = request.data['text']

        Message.objects.create(text=text, from_user = User.objects.get(id=request.user.id), to_user = User.objects.get(id=pk), is_read=False)

        return Response("ok")