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
    path('book/<int:pk>/', get_book_info, name="book"),
    path('book/<int:pk>/reviews/', get_book_reviews, name="book_reviews"),
    path('books/', get_all_books, name="all_books"),
    path('review/<int:pk>/', get_review_info, name="review"),
    path('author/<int:pk>/', get_author_info, name="author"),
    path('publisher/<int:pk>/', get_publisher_info, name="publisher"),
    path('series/<int:pk>/', get_series_info, name="series"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('apitest/', testEndPoint, name='test'),
    path('', getRoutes)
]