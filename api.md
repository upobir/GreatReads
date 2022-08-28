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

2. book_detailed [DONE]
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
    "picture_url": url,
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
    "thumbnail": url,
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
    "liked": bool,
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
12. genre_detailed [DONE]
```
{
    "id": int,
    "tag": str,
    "desc": str,
    "followerCount": int,
    "userFollowsGenre": bool,
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
    "followsUser": bool,
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
14. book_mid //use for search page entries and book blurbs in feed items
```
{
    "id": int,
    "title":str,
    "authors": [author_mini],
    "thumbnail": image,
    "readStatus": ...,
    "avgRating": int,
    "description": str   
}  
```
15. read_update_feed_item [DONE]
```
{
        "updateType": "readingUpdate",//to indicate read_updates in feed
        "readStatus": ...,
        "user": user_mini,
        "timeStamp": timestamp,
        "book": book_mid
}
```
16. review_feed_item [DONE]
```
{
        "updateType": "review",//to indicate reviews in feed
        "review": review_mini,
        "book": book_mid
}
```
17. message_detailed [DONE]
```
{
    "from":{
        "id": int,
        "username":str,
        //we need this to filter archived messages in frontend
        "followedByUser": str,
        //same as above, you could just send archived status but I already coded it to determin based on these 2 bools
        "followsUser": str,
    },
    "message": {
        "timestamp": timestamp,
        "text": str,
        "isRead":bool
    }
}
```
//we really don't need to pass all of "from" data when the user is the logged in one
//also, we don't need anything but from.userID to identify if a message belongs which user
//follow status can be sent once as part of conversation
//hence, this should be separate from mesage_detailed
18. message_mini 
```
{
    "from": int?,//not present if this message is for logged in user
    "timestamp": timestamp,
    "text": str,
    "isRead":bool
}
```
19. author_extra [DONE]
```
{
    "birth_date": timestamp,
    "website": str,
    "booksWritten": int,
    "avgRating": float,
    "genres": [genre_mini]
}
```
## Routes
1. GET `api/books` array of all `book_mini` [DONE]
1. GET `api/book/<id>` one `book_detailed` [DONE]
1. GET `api/book/<id>/reviews` array of `review_mini` of a book (pagination needed) [DONE]
1. GET `api/review/<id>` one `review_detailed` [DONE]
1. GET `api/author/<id>` one `author_detailed` [DONE]
1. GET `api/author/<id>/extra` one `author_extra` [DONE]
1. GET `api/author/<id>/books` array of all `book_mini` written by author [DONE]
1. GET `api/author/<id>/series` array of all `series_mini` with at least one book written by author [DONE]
1. GET `api/publisher/<id>` one `publisher_detailed` [DONE]
1. GET `api/series/<id>` one `series_mini` [DONE]
1. GET `api/books/genre/<id>` array of `book_mini` of a genre (pagination needed) [DONE]
1. GET `api/genres` array of all `genre_mini` sorted by whether user follows genre [DONE]
1. GET `api/genre/<id>` one `genre_detailed` [DONE]
1. GET `api/book/<id>/similar` array of `book_mini` that are similar (pagination needed) [DONE]
1. GET `api/user/<id>` user_detailed [DONE]
1. GET `api/user/<id>/reading` array of `book_mini` that user is reading (pagination needed) [DONE-BY-PRANTO]
1. GET `api/user/<id>/read` array of `book_mini` that user has read (pagination needed) [DONE-BY-PRANTO]
1. GET `api/user/<id>/want_to_read` array of `book_mini` that user wants to read (pagination needed) [DONE-BY-PRANTO]
1. GET `api/user/<id>/reviewed` array of `book_mini` that user has reviewed (pagination needed) [DONE-BY-PRANTO]
1. GET `api/user/<id>/reviews` array of `review_feed_item` that user has created (pagination needed)//"updateType" not necessary [DONE-BY-PRANTO]
1. GET `api/author/<id>/books` array of `book_mini` (pagination needed) [DONE]
1. GET `api/author/<id>/series` array of `series_detailed` (pagination needed) [DONE]
1. GET `api/browse/genre/<id>` array of `book_detailed` in genre sorted by release date (pagination needed) [DONE]
1. GET `api/browse/followedAuthors` array of `book_detailed` by authors followed by user sorted by release date (pagination needed) [DONE]
1. GET `api/browse/newReleases` array of `book_detailed` sorted by release date (pagination needed) [DONE]
1. GET `api/browse/newlyRated` array of `book_detailed`  sorted by review timestamp (pagination needed) [DONE]
1. GET `api/feed/all` array of `feed_item`  sorted by timestamp (pagination needed) [DONE]
1. GET `/api/messages/` array of `message_detailed` sorted by timestamp [DONE]
1. GET `/api/messages/<userID>?read=<true|false>` array of all `message_mini` for conversation between logged user and this user sorted by timestamp. BE SURE TO UPDATE USER_DETAILED TO CONTAIN followsUser field. Also, marke these messages as read IF read Query sent, default is false
1. GET `/api/search?pattern=<pattern>&type=<book|author|series>` default is book, return book_mini, author_mini or series_mini [DONE]
1. GET `/api/unread_msg_count/` returns {"count": int}

1. POST `api/book/<id>/status/post/` {
        "readStatus": book.readStatus,
        "pagesRead": int,
    } [DONE]
1. POST `/api/book/<id>/review/post/` {
        reviewRating: int(0-5),
        reviewText: string,
    } [DONE]
1. POST `/api/genre/<id>/follow/post/` {//no details just toggle for cur user
        
    } [DONE]
1. POST `/api/author/<id>/follow/post/` {//no details just toggle for cur user
        
    } [DONE]
1. POST `/api/review/<id>/comment/post/` {
        commentText: string,
    }
1. POST `/api/comment/<id>/delete/post/` {// just delete particular comment

    } [DONE]
1. POST `/api/review/<id>/like/post/` {//no details just toggle for cur user

    } [DONE]
1. POST `/api/message/<id>/post/` {//post message for logged in user
    text: messageText,
}

