from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

# replace with class based views later
@api_view(['GET'])
def get_book_info(request, pk):
    # print('aaaa')
    # for b in Book.objects.all():
    #     print(b, b.id, a.pk)
    book = Book.objects.get(id=pk)
    print(book)
    serializer = BookSerializer(book, many = False)
    return Response(serializer.data)


        