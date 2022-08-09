## JSONs
List of all kinds of jsons

1. book_mini [DONE]
```
{
    "id": int,
    "title": str,
    "description": str,
    "authors": [author_mini],
    "avgRating": float,
    "thumbnail": path?,
    "seriesEntry": int?,
}
```

2. book_detailed 
```
{
    "id": int,
    "isbn": str,
    "title": str,
    "pageCount": int,
    "released": date?,
    "genres": [genre_mini],
    "readStatus": "reading"/"wishlisted"/"read"/null,
    "readPages": int?,
    "series": int?,
    "seriesEntry": int?,
    "avgRating": float,
    "userRating": float,
    "reviewCount": int,
    "authors": [author_mini]
    "publisherId": int,
}
```

3. author_mini [DONE]
```
{
    "id": int,
    "name": str,
}
```

4. author_detailed [DONE]
```
{
    "id": int,
    "name": str,
    "followCount": int,
    "isFollowedByUser": bool,
    "description": str,
}
```

5. publisher_detailed [DONE]
```
{
    "id": int,
    "name": str,
    "address": str,
}
```

6. series_mini [DONE]
```
{
    "id": int,
    "name": name,
    "bookCount": int,
    "avgRating": float,
}
```

7. series_detailed [DoNE]
```
{
    "id": int,
    "name": str,
    "bookCount": int,
    "avgRating": float,
    "books": [book_mini],
}
```

8. review_mini [DONE]
```
{
    "id": int,
    "reviewer": str,
    "reviewerId": int,
    "body": str,
    "rating": int,
    "likes": int,
    "Timestamp": datetime,
    "commentCount": int,
}
```

9. review_detailed [DONE]
```
{
    "id": int,
    "reviewer": str,
    "reviewerId": int,
    "body": str,
    "rating": int,
    "likes": int,
    "Timestamp": datetime,
    "commentCount": int,
    "comments": [comment_mini],
}
```

10. comment_mini [DONE]
```
{
    "id": int,
    "Commenter": str,
    "CommenterId": int,
    "Timestamp": datetime,
    "Text": str,
}
```
11. genre_mini [DONE]
```
{
    "id": int,
    "tag": str,
}
```
12. genre_detailed
```
{
    "id": int,
    "tag": str,
    "desc": str,
    "followerCount": int,
    "userFollowsGenre": int,
}
```
13. user_detailed
```
{
    "id": int,
    "name": str,
    "followerCount": int,
    "followCount": int,
    "followedByUser": int,
}
```
13. user_stats
```
{
    "numReading": int,
    "numRead": int,
    "numWantToRead": int,
    "reading": int,
    "numReviewd": int,
    "numRated": int,
    "avgRating": float,
}
```

## Routes
1. GET `api/books` array of all `book_mini` [DONE]
1. GET `api/book/<id>` one `book_detailed`
1. GET `api/book/<id>/reviews` array of `review_mini` of a book (pagination needed) [DONE]
1. GET `api/review/<id>` one `review_detailed` [DONE]
1. GET `api/author/<id>` one `author_detailed` [DONE]
1. GET `api/publisher/<id>` one `publisher_detailed` [DONE]
1. GET `api/series/<id>` one `series_mini` [DONE]
1. GET `api/books/genre/<id>` array of `book_mini` of a genre (pagination needed)
1. GET `api/genres` array of all `genre_mini` sorted by whether user follows genre
1. GET `api/genre/<id>` one `genre_detailed`
1. GET `api/books/new_rated` array of `book_mini` that are newly genre (pagination needed)
1. GET `api/books/followed_author` array of `book_mini` that are from followed author (pagination needed)
1. GET `api/book/<id>/similar` array of `book_mini` that are similar (pagination needed)
1. GET `api/user/<id>` user_detailed
1. GET `api/user/<id>/reading` array of `book_mini` that user is reading (pagination needed)
1. GET `api/user/<id>/read` array of `book_mini` that user has read (pagination needed)
1. GET `api/user/<id>/want_to_read` array of `book_mini` that user wants to read (pagination needed)
1. GET `api/user/<id>/reviewed` array of `book_mini` that user has reviewed (pagination needed)
1. GET `api/user/<id>/reviews` array of `review_mini` that user has created (pagination needed)
1. GET `api/user/<id>/messages` ????
1. GET `api/messages` ????
1. GET `api/author/<id>/books` array of `book_mini` (pagination needed)
1. GET `api/author/<id>/series` array of `series_mini` (pagination needed)
1. GET `api/browse/genre/<id>` array of `book_detailed` in genre sorted by release date (pagination needed)
1. GET `api/browse/followedAuthors` array of `book_detailed` by authors followed by user sorted by release date (pagination needed)
1. GET `api/browse/newReleases` array of `book_detailed` sorted by release date (pagination needed)
1. GET `api/browse/newlyRated` array of `book_detailed`  sorted by review timestamp (pagination needed)
1. POST `api/book/<id>/status/post/` {
        "readStatus": book.readStatus,
        "pagesRead": int,
    }
1. POST `/api/book/<id>/review/post/` {
        reviewRating: int(0-5),
        reviewText: string,
    }
1. POST `/api/genre/<id>/follow/post/` {//no details just toggle for cur user
        
    }
1.  POST `/api/author/<id>/follow/post/` {//pranta should've done this already, please merge and update this
        
    }
