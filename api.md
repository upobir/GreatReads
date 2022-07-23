## JSONs
List of all kinds of jsons

1. book_mini
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

3. author_mini
```
{
    "id": int,
    "name": str,
}
```

4. author_detailed
```
{
    "id": int,
    "name": str,
    "followCount": int,
    "isFollowedByUser": bool,
    "description": str,
}
```

5. publisher_detailed
```
{
    "id": int,
    "name": str,
    "address": str,
}
```

6. series_mini
```
{
    "id": int,
    "name": name,
    "bookCount": int,
    "avgRating": float,
}
```

7. series_detailed
```
{
    "id": int,
    "name": str,
    "bookCount": int,
    "avgRating": float,
    "books": [book_mini],
}
```

8. review_mini
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

9. review_detailed
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

10. comment_mini
```
{
    "id": int,
    "Commenter": str,
    "CommenterId": int,
    "Timestamp": datetime,
    "Text": str,
}
```

## Routes
1. GET `api/books` array of all `book_mini`
1. GET `api/book/<id>` one `book_detailed`
1. GET `api/book/<id>/reviews` array of `review_mini` of a book (pagination needed)
1. GET `api/review/<id>` one `review_detailed`
1. GET `api/author/<id>` one `author_detailed`
1. GET `api/publisher/<id>` one `publisher_detailed`
1. GET `api/series/<id>` one `series_mini`
1. GET `api/books/genre/<id>` array of `book_mini` of a genre (pagination needed)
1. GET `api/genres` array of all `<genre, genreID>`
1. GET `api/books/new_rated` array of `book_mini` that are newly genre (pagination needed)
1. GET `api/books/followed_author` array of `book_mini` that are from followed author (pagination needed)
1. GET `api/book/<id>/similar` array of `book_mini` that are similar (pagination needed)
1. GET `api/user/<id>` ????
1. GET `api/user/<id>/reading` array of `book_mini` that user is reading (pagination needed)
1. GET `api/user/<id>/read` array of `book_mini` that user has read (pagination needed)
1. GET `api/user/<id>/want_to_read` array of `book_mini` that user wants to read (pagination needed)
1. GET `api/user/<id>/reviewed` array of `book_mini` that user has reviewed (pagination needed)
1. GET `api/user/<id>/reviews` array of `review_mini` that user has created (pagination needed)
1. GET `api/user/<id>/messages` ????
1. GET `api/messages` ????
1. GET `api/author/<id>/books` array of `book_mini` (pagination needed)
1. GET `api/author/<id>/series` array of `series_mini` (pagination needed)
1. POST `api/book/<id>/status/post/` {
        "readStatus": book.readStatus,
        "pagesRead": int,
    }
1. POST `/api/book/<id>/review/post/` {
        reviewRating: reviewRating,
        reviewText: reviewText,
    }

