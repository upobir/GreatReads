from rest_framework.response import Response
from rest_framework.decorators import api_view

from GreatReads.settings import SECRET_KEY
from decouple import config
import os

from .models import *
from .serializers import *

# replace with class based views later
@api_view(['GET'])
def get_book_info(request, pk):
    book = Book.objects.get(id=pk)

    data = {
        "isbn": book.isbn,
        "title": book.title,
        "description": book.description,
        "pageCount": book.pages,
        "released": book.release_date, 
        "genres": [             # TODO
            # {"name": "lorem", "id":1},
            # {"name": "impsum", "id":2},
            # {"name": "sit", "id":3},
            # {"name": "dor", "id":4},
            # {"name": "amet", "id":5}
        ],
        "readStatus":"reading", # TODO
        "readPages": 10,        # TODO
        "seriesEntry": book.series_number ,
        "avgRating": 4.6,       # TODO
        "userRating": 4.6,      # TODO
        "reviewCount": 1520,    # TODO
        "authorIds": [author.id for author in book.authors.all()],
        "publisherId" : book.publisher.id,
        "reviews": [1, 2, 4], # TODO placeholder for now
        #[review.id for review in book.reviews.all()], # NOTE actual code
    }

    return Response(data)

@api_view(['GET'])
def get_all_books(request):

    data = [
        {
            "id" : book.id,
            "title" : book.title,
            "desc" : book.description,
            "authorIds" : [author.id for author in book.authors.all()],
            "avgRating" : 4.6, # TODO
            "thumbnail" : None,

        } for book in Book.objects.all()
    ]

    return Response(data)

@api_view(['GET'])
def get_author_info(request, pk):
    author = Author.objects.get(id=pk)
    data = {
        "followCount": 178000, # TODO
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
def get_review_info(request, pk):
    # review = Review.objects.get(id=pk)

    data = { #TODO fix this
        "id": pk,
        "reviewer" : "User_"+str(pk), 
        "body" : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        "rating":4.5,
        "likes": 58,
        "commentCount": 0,
        "comments": [

        ],
    }
        #     {
        #         "id": 1,
        #         "reviewer": "Vraig",
        #         "body": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro blanditiis accusantium, nemo doloribus voluptatibus, natus autem tenetur voluptas non minima dolores suscipit tempora consequatur corrupti sint sapiente commodi voluptate corporis.",
        #         
        #         "comments": [
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             },
        #             {
        #                 "Commenter": "Tamahome",
        #                 "TimeStamp": "Oct 05, 2010 08:10PM" ,
        #                 "Text": "You go girl! (the audiobook is 45 hours)"
        #             }
        #         ]
        #     }
    return Response(data)

@api_view(['POST'])
def login(request):
    print(request)
    # I haven't been able to get this via request.POST, most likely need to change how the response is made is react 
    print(request.body)
    return Response(data="ok") 

