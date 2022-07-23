
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

export function loginEndpoint(){
    return  `/api/login/`
}

