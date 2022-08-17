
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Fetch() determines relative URL by starting with /
 * We need that.
 * If you forget it, you will see fetch URL including the react host url
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export function bookDetailsURL(noteID){
    return  `/book/${noteID}/`
}
export function userDetailsURL(userID){
    if(userID != null)
        return `/user/${userID}/`
    return '#'
}
export function loginURL(){
    return '/login/'
}
export function reviewDetailsURL(bookID, reviewID){
    return `${bookDetailsURL(bookID)}review/${reviewID}/`
}
export function browseAllURL(){
    return "/browse/all"
}
export function authorDetailsURL(authorID){
    return `/author/${authorID}/`
}
export function genreBrowseURL(genreID){
    return `/browse/genre/${genreID}/`
}

export function followedAuthorBrowseURL(){
    return `/browse/followedAuthors/`
}
export function newReleasesBrowseURL(){
    return `/browse/newReleases/`
}
export function newlyRatedBrowseURL(){
    return `/browse/newlyRated/`
}

export function myBookShelfURL(user){
    return `/user/${user.user_id}/`
}
export function registerURL(){
    return `/register/`
}
const myFeedURL = "/feed/"
const homeURL = "/home/"
export { homeURL,myFeedURL}