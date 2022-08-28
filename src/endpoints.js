
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
export function bookshelfViewReviewsEndpoint(userID){
    return  `/api/user/${userID}/reviews/`
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
export function reviewLikeToggleEndpoint(reviewID){
    return `/api/review/${reviewID}/like/post/`
}
export function authorFetchEndpoint(authorID){
    return  `/api/author/${authorID}/`
}
export function authorExtraFetchEndpoint(authorID){
    return  `/api/author/${authorID}/extra/`
}
export function authorBooksFetchEndpoint(authorID){
    return  `/api/author/${authorID}/books/`
}
export function authorSeriesFetchEndpoint(authorID){
    return  `/api/author/${authorID}/series/`
}
export function bookBrowseEndpoint(){
    return  `/api/books/`
}
export function similarBooksEndpoint(bookID){
    return `/api/book/${bookID}/similar/`
}

export function browseGenreEndpoint(genreID){
    return  `/api/browse/genre/${genreID}/`
    // return  `/api/books/`
}

export function browseNewReleasesEndpoint(){
    return  `/api/browse/newReleases/`

}

export function browseNewlyRatedEndpoint(){
    return  `/api/browse/newlyRated/`
}

export function browseFollowedAuthorEndpoint(){
    return  `/api/browse/followedAuthors`
    // return  `/api/books/`
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

export function genresFetchEndpoint(){
    return '/api/genres/'
}

export function genreFetchEndpoint(genreID){
    return `/api/genre/${genreID}/`
}

export function messagePostEndpoint(toUserID){
    return `/api/messages/${toUserID}/post/`
}

export function messagesWithUserFetchEndpoint(toUserID, markRead){
    if(markRead)
        return `/api/messages/${toUserID}/?read=true`
    else
        return `/api/messages/${toUserID}/`
}
export function messagesFetchEndpoint(){
    return `/api/messages/`
}
export function userDetailsEndpoint(toUserID){
    return `/api/user/${toUserID}/`
}

export function searchEndpoint(pattern, type){
    //return  `/api/search/`
    return  `/api/search?pattern=${pattern}&type=${type}`
}