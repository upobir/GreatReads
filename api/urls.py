"""GreatReads URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *
from .post_views import *
from .auth_views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('books/', AllBookView.as_view(), name="all_books"),
    path('book/<int:pk>/', BookView.as_view(), name="book"),
    path('book/<int:pk>/reviews/', BookReviewsView.as_view(), name="book_reviews"),
    path('review/<int:pk>/', ReviewView.as_view(), name="review"),
    path('author/<int:pk>/', AuthorView.as_view(), name="author"),
    path('publisher/<int:pk>/', PublisherView.as_view(), name="publisher"),
    path('series/<int:pk>/', SeriesView.as_view(), name="series"),
    path('books/genre/<int:pk>/', GenreBookView.as_view(), name='all_books_genre'),
    path('genres/', AllGenreView.as_view(), name='all_genres'),
    path('genre/<int:pk>/', GenreView.as_view(), name='genre'),
    path('book/<int:pk>/similar/', SimilarBookView.as_view(), name='similar_books'),

    path('book/<int:pk>/review/post/', BookReviewPostView.as_view(), name="review_post"),
    path('book/<int:pk>/status/post/', BookStatusView.as_view(), name="status_post"),
    path('genre/<int:pk>/follow/post/', GenreFollowPostView.as_view(), name='genre_follow_post'),
    path('author/<int:pk>/follow/post/', AuthorFollowPostView.as_view(), name='author_follow_post'),
    path('review/<int:pk>/comment/post/', ReviewCommentPostView.as_view(), name="review_comment_post"),
    path('comment/<int:pk>/delete/post/', CommentDeletePostView.as_view(), name="comment_delete_post"),
    path('review/<int:pk>/like/post/', ReviewLikePostView.as_view(), name="review_like_post"),

    path('browse/newReleases/', BrowseNewReleaseView.as_view(), name="browse_new_release"),
    path('browse/genre/<int:pk>/', BrowseByGenreView.as_view(), name="browse_genre"),
    path('browse/followedAuthors/', BrowseFollowedAuthorsView.as_view(), name='browse_followed_author'),
    path('browse/newlyRated/', BrowseNewlyRatedView.as_view(), name='browse_newly_rated'),

    path('author/<int:pk>/books/', AuthorBooksView.as_view(), name='author_books'),
    path('author/<int:pk>/series/', AuthorSeriesView.as_view(), name='author_series'),
    path('author/<int:pk>/extra/', AuthorExtraView.as_view(), name='author_extra'),

    path('search/', SearchView.as_view(), name='search'),
    path('feed/all/', FeedView.as_view(), name='feed'),

    # virtual bookshelf
    path('user/<int:userID>/<int:bookshelfCategory>/', BookUserStatusView.as_view(), name="bookuserstatus_view"),
    path('user/<int:userID>/stats/', BookUserStatusStats.as_view(), name="bookuserstatus_stats"),
    path('user/<int:userID>/info/', BookShelfUserInfo.as_view(), name="bookuserstatus_stats"),
    path('user/<int:userID>/reviews/', BookShelfViewReviews.as_view(), name="bookshelf_viewreviews"),

    # follow/unfollow user
    path('follow/<int:followingUserID>/', FollowUser.as_view(), name="follow_user"),
    path('unfollow/<int:followingUserID>/', UnFollowUser.as_view(), name="unfollow_user"),

    # auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('apitest/', testEndPoint, name='test'),
    path('', getRoutes),

    #test
    path('imgPostTest/', echoPostView, name='imgTest'),

    path("publisherr/<int:pk>", getPublisher, name="pubbb"),
]