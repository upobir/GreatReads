from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Series)
admin.site.register(Message)
admin.site.register(Review)
admin.site.register(ReviewComment)
admin.site.register(BookUserStatus)
