from django.db import models

# Create your models here.
class Book(models.Model):
    # id added automatically
    isbn = models.IntegerField(unique=True)
    title = models.TextField(default="Lorem ipsum")
    description = models.TextField(default="sit dor amet")
    # todo rest

    def __str__(self):
        return self.title
