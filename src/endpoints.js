
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Fetch() determines relative URL by starting with /
 * We need that.
 * If you forget it, you will see fetch URL including the react host url
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export function bookFetchEndpoint(bookID){
    return  `/api/book/${bookID}/`
}
export function bookReviewsFetchEndpoint(bookID){
    return  `/api/book/${bookID}/reviews/`
}
export function bookReadStatusPostEndpoint(bookID){
    return  `/api/book/${bookID}/status/post/`
}
export function reviewPostEndpoint(bookID){
    return  `/api/book/${bookID}/review/post/`
}
export function bookshelfViewEndpoint(userID, bookshelfCategory){
    return  `/api/user/${userID}/${bookshelfCategory}/`
}
export function bookshelfStatsEndpoint(userID){
    return  `/api/user/${userID}/stats/`
}
export function bookshelfUserInfoEndpoint(userID){
    return  `/api/user/${userID}/info/`
}
export function followUserEndpoint(userID){
    return  `/api/follow/${userID}/`
}
export function unFollowUserEndpoint(userID){
    return  `/api/unfollow/${userID}/`
}
export function seriesFetchEndpoint(seriesID){
    return  `/api/series/${seriesID}/`
}

export function reviewFetchEndpoint(reviewID){
    return  `/api/review/${reviewID}/`
}
export function authorFetchEndpoint(authorID){
    return  `/api/author/${authorID}/`
}

export function bookBrowseEndpoint(){
    return  `/api/books/`
}

export function browseGenreEndpoint(genreID){
    // return  `/api/browse/genre/${genreID}/`
    return  `/api/books/`
}

export function browseNewReleasesEndpoint(){
    // return  `/api/browse/newReleases/`
    return  `/api/books/`

}

export function browseNewlyRatedEndpoint(){
    // return  `/api/browse/newlyRated`
    return  `/api/books/`
}

export function browseFollowedAuthorEndpoint(){
    // return  `/api/browse/followedAuthors`
    return  `/api/books/`
}

export function feedAllEndpoint(){
    return  `/api/feed/all`
}
export function feedReadUpdatesEndpoint(){
    return  `/api/feed/readUpdates`
}
export function feedReviewsEndpoint(){
    return  `/api/feed/reviews`
}
export function loginEndpoint(){
    // return  `/api/login/`
    return  `/api/books/`
}

export function genreFollowToggleEndpoint(genreID){
    return `/api/genre/${genreID}/follow/post/`
}
export function authorFollowToggleEndpoint(authorID){
    return `/api/author/${authorID}/follow/post/`
}

export function commentPostEndpoint(reviewID){
    return `/api/review/${reviewID}/comment/post/`
}

export function commentDeleteEndpoint(commentID){
    return `/api/comment/${commentID}/delete/post/`
}