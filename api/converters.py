from .models import *

def get_book_status(book, userid):
    status_set = book.bookuserstatus_set.filter(user_id=userid)

    if status_set.exists():
        return convert_book_status(status_set[0])
    else:
        return None, -1

def convert_book_status(status):
    readstatus = None 
    readpages = -1

    if status.is_read:
        readstatus = "read"
        readpages = -1
    elif status.is_wishlisted:
        readstatus = "wishlisted"
        readpages = -1
    elif status.read_pages != -1:
        readstatus = "reading"
        readpages = status.read_pages

    return readstatus, readpages

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
        "picture_url": author.picture.url if author.picture else None,
    }

def author_extra(author):
    return {
        "birth_date": author.birth_date,
        "website": author.website,
        "booksWritten": author.book_count,
        "avgRating": author.avg_rating,
        "genres": [genre_mini(genre) for genre in Genre.objects.filter(book__authors=author).distinct()]
    }

def genre_mini(genre):
    return {
        "id": genre.id,
        "name": genre.name,
    }

def genre_detailed(genre, userid):
    return {
        "id": genre.id,
        "tag": genre.name,
        "desc": genre.description,
        "followerCount": genre.follower_count,
        "userFollowsGenre": genre.followers.filter(id=userid).exists() if userid else False,
    }

def book_mini(book, userid):
    return {
        "id" : book.id,
        "title" : book.title,
        "description" : book.description,
        "authors" : [ author_mini(author) for author in book.authors.all() ],
        "avgRating" : book.avg_rating,
        "thumbnail" : book.thumbnail.url if book.thumbnail else None,
        "seriesEntry": book.series_number,
        "readStatus": get_book_status(book, userid)[0],
    }

def bookshelf_stats(userid):
    bookList = BookUserStatus.objects.filter(user=userid)
    reading_count = len([iter for iter in bookList if iter.read_pages > 0])
    read_count = len([iter for iter in bookList if iter.is_read])
    wantToRead_count = len([iter for iter in bookList if iter.is_wishlisted])

    reviewList = Review.objects.filter(creator=userid)

    reviews_count = len([iter for iter in reviewList if iter.description is not None or iter.description != ""])
    ratings_count = len([iter for iter in reviewList if iter.rating is not None or iter.rating != ""])

    username = User.objects.get(id=userid).username

    return {
        "reading_count" : reading_count,
        "read_count" : read_count,
        "wantToRead_count" : wantToRead_count,
        "reviews_count" : reviews_count,
        "ratings_count" : ratings_count,
    }

def bookshelf_info(userid, loggedInUserID):
    user_name = User.objects.get(id=userid).username
    following_count = len(User.objects.get(id=userid).following.all())
    follower_count = len(User.objects.get(id=userid).followers.all())

    is_followed_by_user = User.objects.get(id=loggedInUserID).following.filter(following_user_id=userid).exists()

    return {
        "user_name" : user_name,
        "follower_count" : follower_count,
        "following_count" : following_count,
        "is_followed_by_user" : is_followed_by_user,
    }

def book_detailed(book, userid):

    reviews = book.review_set.filter(creator__id=userid)
    if reviews.exists():
        review = reviews[0]
    else:
        review = None

    readstatus, readpages = get_book_status(book, userid)

    return {
        "id": book.id, 
        "isbn": book.isbn,
        "title": book.title,
        "thumbnail" : book.thumbnail.url if book.thumbnail else None,
        "description": book.description,
        "pageCount": book.pages,
        "released": book.release_date, 
        "genres": [ genre_mini(genre) for genre in book.genres.all() ],
        "readStatus": readstatus,
        "readPages": readpages,
        "series": book.series.id if book.series else None,
        "seriesEntry": book.series_number ,
        "avgRating": book.avg_rating,
        "userRating":  review.rating if review else None,
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

def series_detailed(series, userid):
    return {
        "id": series.id,
        "name": series.name,
        "bookCount": series.book_count,
        "avgRating": series.avg_rating,
        "books" : [ book_mini(book, userid) for book in Book.objects.filter(series = series).order_by('series_number') ],
    }

def comment_mini(comment):
    return {
        "id": comment.id,
        "Commenter": comment.creator.username,
        "CommenterId": comment.creator.id,
        "Timestamp": comment.timestamp,
        "Text": comment.text,
    }

def review_mini(review, userId):
    return {
        "id": review.id,
        "reviewer" : review.creator.username,
        "reviewerId" : review.creator.id,
        "body" : review.description,
        "rating": review.rating,
        "likes": review.like_count,
        "liked": review.likers.filter(id=userId).exists() if userId else False,
        "commentCount": review.comment_count,
        "Timestamp": review.timestamp,
    }

def review_detailed(review, userId):
    return {
        "id": review.id,
        "reviewer" : review.creator.username,
        "reviewerId" : review.creator.id,
        "bookId": review.book.id,
        "body" : review.description,
        "rating": review.rating,
        "likes": review.like_count,
        "liked": review.likers.filter(id=userId).exists() if userId else False,
        "Timestamp": review.timestamp,
        "commentCount": review.comment_count,
        "comments": [ comment_mini(comment) for comment in ReviewComment.objects.filter(review = review)]
    }

def book_mid(book, userid):
    readstatus, readpages = get_book_status(book, userid)
    # readpages = -1
    # if status:
    #     

    return {
        "id": book.id,
        "title": book.title,
        "authors": [ author_mini(author) for author in book.authors.all() ],
        "thumbnail": book.thumbnail.url if book.thumbnail else None,
        "readStatus": readstatus,
        "avgRating": book.avg_rating,
        "description": book.description,
    }

def user_mini(userID):
    return {
        "id": userID,
        "username": User.objects.get(id=userID).username,
    }

def user_mini_alter(user):
    return {
        "id": user.id,
        "username": user.username
    }

def feed_item_review(review, userId):
    return {
        "updateType": "review",
        "timeStamp" : review.timestamp,
        "review" : review_mini(review, userId),
        "book": book_mid(review.book, userId)
    }

def feed_read_update(status, userId):
    readstatus, readpages = convert_book_status(status)

    return {
        "updateType": "readingUpdate",
        "readStatus": readstatus,
        "readpages": readpages,
        "user": user_mini_alter(status.user),
        "timeStamp": status.timestamp,
        "book": book_mid(status.book, userId)
    }

def review_feed_item(review_mini_data, timestamp, book_mid_data, reviewCreator):
    return {
        "updateType": "review",
        "review": review_mini_data,
        "timeStamp": timestamp,
        "book": book_mid_data,
        "user": reviewCreator,
    }

def message_detailed(message, userID):
    return {
        "from": {
            "id": message.from_user.id,
            "username": message.from_user.username,
            "followedByUser": message.from_user.followers.filter(user_id=userID).exists(),
            "followsUser": message.from_user.following.filter(following_user_id=userID).exists(),
        },
    "message": {
        "timestamp": message.timestamp,
        "text": message.text,
        "isRead": message.is_read
    }
}