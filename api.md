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

6. series_detailed
```
{
    "id": int,
    "name": str,
    "bookCount": int,
    "avgRating": float,
    "books": [book_mini],
}
```

7. review_mini
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

8. review_detailed
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

9. comment_mini
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
2. GET `api/book/<id>` one `book_detailed`
3. GET `api/book/<id>/reviews` array of `review_mini` of a book (pagination needed)
4. GET `api/review/<id>` one `review_detailed`
5. GET `api/author/<id>` one `author_detailed`
6. GET `api/publisher/<id>` one `publisher_detailed`
7. GET `api/series/<id>` one `series_detailed`
8. GET `api/books/genre/<id>` array of `book_mini` of a genre (pagination needed)
9. GET `api/books/new_rated` array of `book_mini` that are newly genre (pagination needed)
10. GET `api/books/followed_author` array of `book_mini` that are from followed author
11. GET `api/book/<id>/similar` array of `book_mini` that are similar
12. GET `api/bookshelf/reading` array of `book_mini` that user is reading
13. GET `api/bookshelf/read` array of `book_mini` that user has read
14. GET `api/bookshelf/want_to_read` array of `book_mini` that user wants to read
15. GET `api/bookshelf/`
