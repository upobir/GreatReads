from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg
from cloudinary.models import CloudinaryField
from django.utils import timezone

# Create your models here.

# The user we need
# class User(models.Model):
#     username
#     email
#     profile_picture
#     password_hash
#     followers

# https://stackoverflow.com/questions/58794639/how-to-make-follower-following-system-with-django-model
class UserFollowing(models.Model):
    user_id = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    # UserFollowing.objects.create(user_id=user.id, following_user_id=follow.id)

    def __str__(self):
        return f"{self.user_id.username} follows {self.following_user_id.username}"


class Author(models.Model):
    name = models.CharField(max_length=100)
    picture = CloudinaryField('image', default=None, null=True, blank=True)
    description = models.TextField(blank=True)
    birth_date = models.DateField()
    website = models.URLField(null=True, blank=True)
    twitter_link = models.URLField(null=True, blank=True)
    followers = models.ManyToManyField(User, blank=True)  #using User

    def __str__(self):
        return self.name

    @property
    def follower_count(self):
        return self.followers.all().count()

    @property
    def book_count(self):
        return self.book_set.all().count()

    @property
    def avg_rating(self):
        book_ratings = [book.avg_rating for book in self.book_set.all()] # Book.objects.filter(authors=self)]
        if not book_ratings:
            return 0
        else:
            return sum(book_ratings)/len(book_ratings)

class Publisher(models.Model):
    address = models.TextField()
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Series(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    @property
    def book_count(self):
        return Book.objects.filter(series=self).count()

    @property
    def avg_rating(self):
        book_ratings = [book.avg_rating for book in Book.objects.filter(series=self)]
        if not book_ratings:
            return 0
        else:
            return sum(book_ratings)/len(book_ratings)

class Genre(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    followers = models.ManyToManyField(User, blank=True) #using User

    def __str__(self):
        return self.name

    @property
    def follower_count(self):
        return self.followers.all().count()
        

class Message(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    text = models.TextField()
    from_user = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE) #using User
    to_user = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE) #using User
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.from_user.username} to {self.to_user.username} : {self.text if len(self.text) < 15 else self.text[:15]+'...'}"


class Book(models.Model):
    isbn = models.CharField(max_length=12, unique=True)
    title = models.TextField(default="Lorem ipsum")
    pages = models.IntegerField() # TODO add validator?
    release_date = models.DateField(null=True, blank=True)
    language = models.CharField(max_length=100, default='English')
    description = models.TextField(default="sit dor amet")
    thumbnail = CloudinaryField('image', default=None, null=True, blank=True)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    series = models.ForeignKey(Series, null=True, blank=True, on_delete=models.SET_NULL)
    series_number = models.IntegerField(null=True, blank=True) # TODO add validator?
    authors = models.ManyToManyField(Author)
    genres = models.ManyToManyField(Genre, blank=True)
    readers = models.ManyToManyField(User, blank=True, through='BookUserStatus') #using User

    @property
    def review_count(self):
        return self.review_set.count() # Review.objects.filter(book=self).count()

    @property
    def avg_rating(self):
        avg = self.review_set.aggregate(Avg('rating'))['rating__avg']  #Review.objects.filter(book=self).aggregate(Avg('rating'))['rating__avg']
        return 0 if avg is None else avg

    def __str__(self):
        return self.title

class Review(models.Model):
    timestamp = models.DateTimeField()
    rating = models.IntegerField() # TODO add validator?
    description = models.TextField(blank=True)
    creator = models.ForeignKey(User, related_name='created_reviews', on_delete=models.CASCADE) #using User
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    likers = models.ManyToManyField(User, related_name='liked_reviews', blank=True) #using User

    @property
    def like_count(self):
        return self.likers.all().count()

    @property
    def comment_count(self):
        return self.reviewcomment_set.count() # ReviewComment.objects.filter(review=self).count()

class ReviewComment(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    text = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE) #using User
    review = models.ForeignKey(Review, on_delete=models.CASCADE)

class BookUserStatus(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE) #using User
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    is_read = models.BooleanField()
    is_wishlisted = models.BooleanField()
    read_pages = models.IntegerField() # TODO add validator?