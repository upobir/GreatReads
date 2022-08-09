from .models import *

def author_mini(author):
    return {
        "id": author.id,
        "name": author.name,
    }

def author_detailed(author, userid):
    return {
        "id": author.id,
        "name": author.name,
        "followCount": author.follower_count,
        "isFollowedByUser": author.followers.filter(id=userid).exists() if userid else False,
        "description": author.description,
    }

def genre_mini(genre):
    return {
        "id": genre.id,
        "name": genre.name,
    }

def book_mini(book):
    return {
        "id" : book.id,
        "title" : book.title,
        "description" : book.description,
        "authors" : [ author_mini(author) for author in book.authors.all() ],
        "avgRating" : book.avg_rating,
        "thumbnail" : book.thumbnail.url if book.thumbnail else None,
        "seriesEntry": book.series_number,
    }

def book_detailed(book, status):
    return {
        "isbn": book.isbn,
        "title": book.title,
        "description": book.description,
        "pageCount": book.pages,
        "released": book.release_date, 
        "genres": [ genre_mini(genre) for genre in book.genres.all() ],
        "readStatus":"reading", # TODO
        "readPages": 10,        # TODO
        "series": book.series.id if book.series else None,
        "seriesEntry": book.series_number ,
        "avgRating": book.avg_rating,
        "userRating": 4.6,      # TODO
        "reviewCount": book.review_count,
        "authors": [ author_mini(author) for author in book.authors.all() ],
        "publisherId" : book.publisher.id,
    }

def publisher_detailed(publisher):
    return {
        "id": publisher.id,
        "name": publisher.name,
        "address": publisher.address,
    }

def series_mini(series):
    return {
        "id": series.id,
        "name": series.name,
        "bookCount": series.book_count,
        "avgRating": series.avg_rating,
    }

def series_detailed(series):
    return {
        "id": series.id,
        "name": series.name,
        "bookCount": series.book_count,
        "avgRating": series.avg_rating,
        "books" : [ book_mini(book) for book in Book.objects.filter(series = series).order_by('series_number') ],
    }

def comment_mini(comment):
    return {
        "id": comment.id,
        "Commenter": comment.creator.username,
        "CommenterId": comment.creator.id,
        "Timestamp": comment.timestamp,
        "Text": comment.text,
    }

def review_mini(review):
    return {
        "id": review.id,
        "reviewer" : review.creator.username,
        "reviewerId" : review.creator.id,
        "body" : review.description,
        "rating": review.rating,
        "likes": review.like_count,
        "commentCount": review.comment_count,
        "Timestamp": review.timestamp,
    }

def review_detailed(review):
    return {
        "id": review.id,
        "reviewer" : review.creator.username,
        "reviewerId" : review.creator.id,
        "body" : review.description,
        "rating": review.rating,
        "likes": review.like_count,
        "Timestamp": review.timestamp,
        "commentCount": review.comment_count,
        "comments": [ comment_mini(comment) for comment in ReviewComment.objects.filter(review = review)]
    }