
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

