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
from .auth_views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('book/<int:pk>/', BookView.as_view(), name="book"),
    path('book/<int:pk>/reviews/', BookReviewsView.as_view(), name="book_reviews"),
    path('books/', AllBookView.as_view(), name="all_books"),
    path('review/<int:pk>/', ReviewView.as_view(), name="review"),
    path('author/<int:pk>/', AuthorView.as_view(), name="author"),
    path('publisher/<int:pk>/', PublisherView.as_view(), name="publisher"),
    path('series/<int:pk>/', SeriesView.as_view(), name="series"),
    path('book/<int:pk>/status/post/', echoPostView, name="series"),

    # auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('apitest/', testEndPoint, name='test'),
    path('', getRoutes),

    path("publisherr/<int:pk>", getPublisher, name="pubbb"),
]